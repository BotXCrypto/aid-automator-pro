import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  return new Response(JSON.stringify({ 
    message: 'Coming soon: Telegram integration',
    status: 'placeholder',
    description: 'This endpoint will allow automated import of scholarship data from Telegram channels and groups.'
  }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
});
