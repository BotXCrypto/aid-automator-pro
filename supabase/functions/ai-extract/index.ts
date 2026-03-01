import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

// Deno runtime global (this file runs on Deno in Supabase functions)
declare const Deno: any;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Optional debug bypass: if you set an env var `AI_EXTRACT_DEBUG_KEY` in the function
    // and send header `x-debug-key: <value>` the function will bypass auth and role checks.
    // This is useful for testing without sharing tokens. Do NOT enable this in production.
    const debugHeader = req.headers.get('x-debug-key');
    const DEBUG_KEY = Deno.env.get('AI_EXTRACT_DEBUG_KEY');
    let debugBypass = false;
    if (debugHeader && DEBUG_KEY && debugHeader === DEBUG_KEY) {
      console.log('ai-extract: debug bypass activated');
      debugBypass = true;
    }

    let user: any = null;
    if (!debugBypass) {
      // Verify admin authentication
      const authHeader = req.headers.get('Authorization');
      if (!authHeader) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const token = authHeader.replace('Bearer ', '');
      // Verify user token
      const { data: authData, error: authError } = await supabaseClient.auth.getUser(token);
      user = authData?.user ?? null;

      if (authError || !user) {
        console.error('Auth error:', authError);
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Check if user is admin
      const { data: roleData, error: roleError } = await supabaseClient
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .eq('role', 'admin')
        .maybeSingle();

      if (roleError) {
        console.error('Role lookup error:', roleError);
        return new Response(JSON.stringify({ error: 'Internal server error' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      if (!roleData || roleData.role !== 'admin') {
        return new Response(JSON.stringify({ error: 'Admin access required' }), {
          status: 403,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    } else {
      // Debug bypass: create a fake admin user for testing
      user = { id: 'debug-admin', email: Deno.env.get('AI_EXTRACT_DEBUG_EMAIL') ?? 'debug@example.com' };
    }

    const { text } = await req.json();

    if (!text || typeof text !== 'string') {
      return new Response(JSON.stringify({ error: 'Text is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const DEEPSEEK_API_KEY = Deno.env.get('DEEPSEEK_API_KEY');
    if (!DEEPSEEK_API_KEY) {
      throw new Error('DEEPSEEK_API_KEY is not configured');
    }

    // Use DeepSeek AI to extract structured scholarship data
    const aiResponse = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: `You are an AI assistant that extracts scholarship information from text. 
Extract the following fields and return them as a JSON object:
- title (string): The scholarship name/title
- university (string): The university or institution
- country (string): The country
- degree (string): Degree level (use: "bachelor", "master", "phd", "undergraduate", or "postgraduate")
- funding (string): Funding type (use: "fully_funded", "partially_funded", or "not_funded")
- deadline (string): Application deadline in YYYY-MM-DD format if possible
- description (string): Brief description
- link (string): Application link or website URL

If a field cannot be determined, use null. Return ONLY the JSON object, no additional text.`
          },
          {
            role: 'user',
            content: text
          }
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "extract_scholarship",
              description: "Extract scholarship information from text",
              parameters: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  university: { type: "string" },
                  country: { type: "string" },
                  degree: { type: "string" },
                  funding: { type: "string" },
                  deadline: { type: "string" },
                  description: { type: "string" },
                  link: { type: "string" }
                },
                required: ["title"],
                additionalProperties: false
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "extract_scholarship" } }
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('AI gateway error:', aiResponse.status, errorText);
      
      if (aiResponse.status === 429) {
        return new Response(JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      if (aiResponse.status === 402) {
        return new Response(JSON.stringify({ error: 'Payment required. Please add credits to your workspace.' }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      throw new Error(`AI gateway error: ${errorText}`);
    }

    const aiData = await aiResponse.json();
    console.log('AI Response:', JSON.stringify(aiData));

    // Extract the tool call result
    const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall || !toolCall.function?.arguments) {
      throw new Error('No structured data returned from AI');
    }

    const extractedData = JSON.parse(toolCall.function.arguments);
    console.log('Extracted data:', extractedData);

    // Normalize enum values to match database schema
    const normalizeDegree = (degree: string | null) => {
      if (!degree) return null;
      const normalized = degree.toLowerCase().trim();
      // Map common variations to valid enum values
      if (normalized === 'masters' || normalized === 'master') return 'master';
      if (normalized === 'bachelors' || normalized === 'bachelor') return 'bachelor';
      if (normalized === 'phd' || normalized === 'doctorate') return 'phd';
      if (normalized === 'undergraduate') return 'undergraduate';
      if (normalized === 'postgraduate') return 'postgraduate';
      return normalized; // Return as-is if no mapping found
    };

    const normalizeFunding = (funding: string | null) => {
      if (!funding) return null;
      const normalized = funding.toLowerCase().trim();
      if (normalized === 'fully_funded' || normalized === 'full' || normalized === 'fully funded') return 'fully_funded';
      if (normalized === 'partially_funded' || normalized === 'partial' || normalized === 'partially funded') return 'partially_funded';
      if (normalized === 'not_funded' || normalized === 'none' || normalized === 'not funded') return 'not_funded';
      return normalized;
    };

    // Store in user_submissions table for admin review
    const submissionData = {
      title: extractedData.title,
      university: extractedData.university || null,
      country: extractedData.country || null,
      degree: normalizeDegree(extractedData.degree),
      funding: normalizeFunding(extractedData.funding),
      deadline: extractedData.deadline || null,
      description: extractedData.description || null,
      link: extractedData.link || null,
      category: 'scholarship',
      status: 'pending',
      submitted_by_name: 'AI Extraction',
      submitted_by_email: user.email || null,
    };

    const { data: insertedSubmission, error: insertError } = await supabaseClient
      .from('user_submissions')
      .insert([submissionData])
      .select()
      .single();

    if (insertError) {
      console.error('Insert error:', insertError);
      return new Response(JSON.stringify({ 
        error: 'Failed to save extracted data',
        details: insertError.message,
        extractedData 
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ 
      status: 'success',
      data: extractedData,
      submission_id: insertedSubmission.id,
      message: 'Scholarship data extracted and saved for review'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ai-extract function:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
