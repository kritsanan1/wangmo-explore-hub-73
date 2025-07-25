import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[VERIFY-PAYMENT] ${step}${detailsStr}`);
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

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");

    const { session_id } = await req.json();
    if (!session_id) throw new Error("Session ID is required");

    logStep("Verifying session", { session_id });

    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });
    const session = await stripe.checkout.sessions.retrieve(session_id);

    logStep("Session retrieved", { 
      status: session.payment_status, 
      subscription: session.subscription,
      metadata: session.metadata 
    });

    if (session.payment_status === "paid" && session.subscription) {
      const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
      const advertisementId = session.metadata?.advertisement_id;

      if (advertisementId && advertisementId !== "pending") {
        // Activate the advertisement
        const { error: updateError } = await supabaseServiceClient
          .from("advertisements")
          .update({
            status: "active",
            start_date: new Date().toISOString()
          })
          .eq("id", advertisementId);

        if (updateError) {
          logStep("Error activating advertisement", { error: updateError });
          throw new Error(`Failed to activate advertisement: ${updateError.message}`);
        }

        // Create subscription record
        const { error: subError } = await supabaseServiceClient
          .from("ad_subscriptions")
          .insert({
            user_id: session.metadata?.user_id,
            advertisement_id: advertisementId,
            stripe_subscription_id: subscription.id,
            stripe_customer_id: subscription.customer as string,
            plan_type: session.metadata?.plan_type,
            status: "active",
            amount_thb: subscription.items.data[0].price.unit_amount! / 100, // Convert from cents
            current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString()
          });

        if (subError) {
          logStep("Error creating subscription record", { error: subError });
          throw new Error(`Failed to create subscription record: ${subError.message}`);
        }

        logStep("Advertisement activated and subscription created", { advertisementId });
      }

      return new Response(JSON.stringify({ 
        success: true, 
        advertisement_activated: true,
        subscription_id: subscription.id
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    } else {
      return new Response(JSON.stringify({ 
        success: false, 
        payment_status: session.payment_status 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in verify-payment", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});