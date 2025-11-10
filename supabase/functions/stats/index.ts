import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

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
      Deno.env.get('SUPABASE_PUBLISHABLE_KEY') ?? ''
    );

    // Count scholarships (approved posts with category = scholarship)
    const { count: scholarshipsCount } = await supabaseClient
      .from('posts')
      .select('*', { count: 'exact', head: true })
      .eq('category', 'scholarship')
      .eq('status', 'approved');

    // Count internships (approved posts with category = internship)
    const { count: internshipsCount } = await supabaseClient
      .from('posts')
      .select('*', { count: 'exact', head: true })
      .eq('category', 'internship')
      .eq('status', 'approved');

    // Count pending posts
    const { count: pendingPostsCount } = await supabaseClient
      .from('posts')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending');

    // Count pending submissions
    const { count: pendingSubmissionsCount } = await supabaseClient
      .from('user_submissions')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending');

    const totalPending = (pendingPostsCount || 0) + (pendingSubmissionsCount || 0);

    return new Response(JSON.stringify({ 
      total_scholarships: scholarshipsCount || 0,
      total_internships: internshipsCount || 0,
      pending_approvals: totalPending,
      pending_posts: pendingPostsCount || 0,
      pending_submissions: pendingSubmissionsCount || 0
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in stats function:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
