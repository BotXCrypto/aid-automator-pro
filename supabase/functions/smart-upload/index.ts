import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";
import * as XLSX from "https://esm.sh/xlsx@0.18.5";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Verify admin authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(token);

    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Check if user is admin
    const { data: roleData } = await supabaseClient
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .maybeSingle();

    if (!roleData) {
      return new Response(JSON.stringify({ error: 'Admin access required' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Parse multipart form data
    const formData = await req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return new Response(JSON.stringify({ error: 'No file provided' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const fileName = file.name.toLowerCase();
    const fileExtension = fileName.split('.').pop();
    
    console.log(`Processing file: ${fileName}, type: ${file.type}`);

    let extractedItems: any[] = [];

    // Handle Excel files
    if (fileExtension === 'xlsx' || fileExtension === 'xls') {
      const arrayBuffer = await file.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      
      console.log(`Found ${data.length} rows in Excel file`);
      
      extractedItems = data.map((row: any) => ({
        title: row.title || row.Title || '',
        university: row.university || row.University || null,
        country: row.country || row.Country || null,
        degree: normalizeDegree(row.degree || row.Degree || null),
        funding: normalizeFunding(row.funding || row.Funding || null),
        deadline: row.deadline || row.Deadline || null,
        description: row.description || row.Description || null,
        link: row.link || row.Link || null,
        category: determineCategory(row),
      })).filter(item => item.title);
    }
    // Handle PDF and DOC files with AI extraction
    else if (fileExtension === 'pdf' || fileExtension === 'doc' || fileExtension === 'docx') {
      // Store file temporarily in storage
      const filePath = `${user.id}/${Date.now()}-${file.name}`;
      const arrayBuffer = await file.arrayBuffer();
      
      const { error: uploadError } = await supabaseClient.storage
        .from('admin-uploads')
        .upload(filePath, arrayBuffer, {
          contentType: file.type,
          upsert: true,
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw new Error('Failed to upload file to storage');
      }

      // Get the file content as text (simplified - in production, use a PDF parser)
      const fileText = await file.text().catch(() => '');
      
      // Use AI to extract scholarship data
      const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
      if (!LOVABLE_API_KEY) {
        throw new Error('LOVABLE_API_KEY is not configured');
      }

      const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${LOVABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'google/gemini-2.5-flash',
          messages: [
            {
              role: 'system',
              content: `You are an AI that extracts scholarship, internship, and education news data from documents. 
Extract ALL scholarships/opportunities found in the text and return them as a JSON array.
Each item should have: title, university, country, degree (bachelor/master/phd/undergraduate/postgraduate), 
funding (fully_funded/partially_funded/not_funded), deadline (YYYY-MM-DD), description, link, category (scholarship/internship/news).
Return ONLY a JSON array of objects, no additional text.`
            },
            {
              role: 'user',
              content: fileText || `Extract scholarship data from this ${fileExtension} file: ${fileName}`
            }
          ],
        }),
      });

      if (!aiResponse.ok) {
        const errorText = await aiResponse.text();
        console.error('AI extraction error:', errorText);
        throw new Error('Failed to extract data with AI');
      }

      const aiData = await aiResponse.json();
      const aiContent = aiData.choices?.[0]?.message?.content;
      
      try {
        const parsed = JSON.parse(aiContent);
        extractedItems = Array.isArray(parsed) ? parsed : [parsed];
        
        // Normalize the extracted data
        extractedItems = extractedItems.map(item => ({
          ...item,
          degree: normalizeDegree(item.degree),
          funding: normalizeFunding(item.funding),
          category: item.category || 'scholarship',
        }));
      } catch (e) {
        console.error('Failed to parse AI response:', e);
        throw new Error('Failed to parse extracted data');
      }

      // Clean up the uploaded file
      await supabaseClient.storage
        .from('admin-uploads')
        .remove([filePath]);
    }
    else {
      return new Response(JSON.stringify({ error: 'Unsupported file type. Please upload Excel, PDF, or DOC files.' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (extractedItems.length === 0) {
      return new Response(JSON.stringify({ error: 'No valid data found in file' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Insert into user_submissions for admin review
    const submissions = extractedItems.map(item => ({
      title: item.title,
      university: item.university,
      country: item.country,
      degree: item.degree,
      funding: item.funding,
      deadline: item.deadline,
      description: item.description,
      link: item.link,
      category: item.category,
      status: 'pending',
      submitted_by_name: `File Upload: ${file.name}`,
      submitted_by_email: user.email,
    }));

    const { data: insertedData, error: insertError } = await supabaseClient
      .from('user_submissions')
      .insert(submissions)
      .select();

    if (insertError) {
      console.error('Insert error:', insertError);
      return new Response(JSON.stringify({ 
        error: 'Failed to save extracted data', 
        details: insertError.message 
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`Successfully inserted ${insertedData?.length || 0} items for review`);

    return new Response(JSON.stringify({ 
      status: 'success', 
      inserted: insertedData?.length || 0,
      message: `Successfully extracted ${insertedData?.length || 0} items from ${file.name}. Review them in the Submissions tab.`,
      fileType: fileExtension,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in smart-upload function:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

// Helper functions
function normalizeDegree(degree: string | null): string | null {
  if (!degree) return null;
  const normalized = degree.toLowerCase().trim();
  if (normalized === 'masters' || normalized === 'master') return 'master';
  if (normalized === 'bachelors' || normalized === 'bachelor') return 'bachelor';
  if (normalized === 'phd' || normalized === 'doctorate') return 'phd';
  if (normalized === 'undergraduate') return 'undergraduate';
  if (normalized === 'postgraduate') return 'postgraduate';
  return normalized;
}

function normalizeFunding(funding: string | null): string | null {
  if (!funding) return null;
  const normalized = funding.toLowerCase().trim();
  if (normalized.includes('full')) return 'fully_funded';
  if (normalized.includes('partial')) return 'partially_funded';
  if (normalized.includes('none') || normalized.includes('not')) return 'not_funded';
  return normalized;
}

function determineCategory(row: any): string {
  const category = (row.category || row.Category || '').toLowerCase();
  if (category.includes('internship')) return 'internship';
  if (category.includes('news')) return 'news';
  return 'scholarship';
}
