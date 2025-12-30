import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

// Deno runtime global
declare const Deno: any;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  try {
    // If GET: verification for Meta webhook
    if (req.method === 'GET') {
      const url = new URL(req.url);
      const verifyToken = Deno.env.get('WHATSAPP_VERIFY_TOKEN');
      const mode = url.searchParams.get('hub.mode');
      const token = url.searchParams.get('hub.verify_token');
      const challenge = url.searchParams.get('hub.challenge');
      if (mode === 'subscribe' && token && verifyToken && token === verifyToken) {
        return new Response(challenge || 'ok', { headers: { ...corsHeaders, 'Content-Type': 'text/plain' } });
      }
      return new Response(JSON.stringify({ status: 'noop' }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    // POST — incoming WhatsApp message (Meta) or Twilio
    const contentType = req.headers.get('content-type') || '';
    let text: string | null = null;

    if (contentType.includes('application/json')) {
      const body = await req.json().catch(() => ({}));
      // Meta format: entry[].changes[].value.messages[].text.body
      const messages = body.entry?.[0]?.changes?.[0]?.value?.messages;
      if (messages && messages.length > 0) {
        text = messages[0].text?.body || null;
      }
    } else if (contentType.includes('application/x-www-form-urlencoded')) {
      const form = await req.formData();
      text = form.get('Body') as string | null;
    }

    if (!text) return new Response(JSON.stringify({ status: 'noop', message: 'no text found' }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

    const SUPABASE_URL = Deno.env.get('SUPABASE_URL') ?? '';
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    const DEEPSEEK_API_KEY = Deno.env.get('DEEPSEEK_API_KEY');

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      console.error('Missing Supabase env vars');
      return new Response(JSON.stringify({ error: 'Server misconfigured' }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
    if (!DEEPSEEK_API_KEY) {
      console.error('Missing DEEPSEEK_API_KEY');
      return new Response(JSON.stringify({ error: 'AI key missing' }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const supabaseClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const aiResp = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${DEEPSEEK_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: 'deepseek-chat', messages: [ { role: 'system', content: 'Extract scholarship fields as JSON: title, university, country, degree, funding, deadline, description, link. Return ONLY JSON.' }, { role: 'user', content: text } ], tools: [{ type: 'function', function: { name: 'extract_scholarship', parameters: { type: 'object' } } }], tool_choice: { type: 'function', function: { name: 'extract_scholarship' } } })
    });

    if (!aiResp.ok) { const errText = await aiResp.text(); console.error('AI error:', aiResp.status, errText); return new Response(JSON.stringify({ error: 'AI gateway error', details: errText }), { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }); }

    const aiData = await aiResp.json();
    const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall || !toolCall.function?.arguments) { console.error('No structured data returned from AI'); return new Response(JSON.stringify({ error: 'No structured data returned from AI' }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }); }

    const extracted = JSON.parse(toolCall.function.arguments);
    const normalizeDegree = (d: string | null) => { if (!d) return null; const n = d.toLowerCase().trim(); if (n.includes('master')) return 'master'; if (n.includes('bachelor')) return 'bachelor'; if (n.includes('phd')||n.includes('doctor')) return 'phd'; return n; };
    const normalizeFunding = (f: string | null) => { if (!f) return null; const n = f.toLowerCase(); if (n.includes('full')) return 'fully_funded'; if (n.includes('part')||n.includes('partial')) return 'partially_funded'; return 'not_funded'; };

    const submission = { title: extracted.title, university: extracted.university || null, country: extracted.country || null, degree: normalizeDegree(extracted.degree), funding: normalizeFunding(extracted.funding), deadline: extracted.deadline || null, description: extracted.description || null, link: extracted.link || null, category: 'scholarship', status: 'pending', submitted_by_name: 'WhatsApp Import', submitted_by_email: null };

    const { data: inserted, error: insertErr } = await supabaseClient.from('user_submissions').insert([submission]).select().single();
    if (insertErr) { console.error('Insert error:', insertErr); return new Response(JSON.stringify({ error: 'DB insert failed', details: insertErr.message }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }); }

    return new Response(JSON.stringify({ status: 'success', submission_id: inserted.id }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

  } catch (err) {
    console.error('import-whatsapp error:', err);
    return new Response(JSON.stringify({ error: 'Internal server error', details: err instanceof Error ? err.message : String(err) }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});
