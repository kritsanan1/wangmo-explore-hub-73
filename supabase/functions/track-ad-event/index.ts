import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[TRACK-AD-EVENT] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseServiceClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  try {
    logStep("Function started");

    const { advertisement_id, event_type } = await req.json();
    
    if (!advertisement_id || !event_type) {
      throw new Error("Missing required parameters: advertisement_id and event_type");
    }

    if (!['view', 'click'].includes(event_type)) {
      throw new Error("Invalid event_type. Must be 'view' or 'click'");
    }

    logStep("Tracking event", { advertisement_id, event_type });

    // Get client information
    const userAgent = req.headers.get("User-Agent") || null;
    const referer = req.headers.get("Referer") || null;
    const clientIP = req.headers.get("X-Forwarded-For") || 
                     req.headers.get("X-Real-IP") || 
                     "unknown";

    // Insert analytics record
    const { error: analyticsError } = await supabaseServiceClient
      .from("ad_analytics")
      .insert({
        advertisement_id,
        event_type,
        ip_address: clientIP,
        user_agent: userAgent,
        referrer: referer
      });

    if (analyticsError) {
      logStep("Error inserting analytics", { error: analyticsError });
      throw new Error(`Failed to insert analytics: ${analyticsError.message}`);
    }

    // Update advertisement counters
    if (event_type === 'view') {
      const { error: viewError } = await supabaseServiceClient
        .from("advertisements")
        .update({ 
          views: supabaseServiceClient.rpc('increment_views', { advertisement_id })
        })
        .eq('id', advertisement_id);

      if (viewError) {
        logStep("Error updating views", { error: viewError });
      }
    } else if (event_type === 'click') {
      const { error: clickError } = await supabaseServiceClient
        .from("advertisements")
        .update({ 
          clicks: supabaseServiceClient.rpc('increment_clicks', { advertisement_id })
        })
        .eq('id', advertisement_id);

      if (clickError) {
        logStep("Error updating clicks", { error: clickError });
      }
    }

    logStep("Event tracked successfully");

    return new Response(JSON.stringify({ 
      success: true,
      message: `${event_type} tracked successfully`
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in track-ad-event", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
