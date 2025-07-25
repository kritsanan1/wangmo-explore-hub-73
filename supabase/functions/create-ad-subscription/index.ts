import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-AD-SUBSCRIPTION] ${step}${detailsStr}`);
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
    logStep("Stripe key verified");

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");
    
    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseServiceClient.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    const user = userData.user;
    if (!user?.email) throw new Error("User not authenticated or email not available");
    logStep("User authenticated", { userId: user.id, email: user.email });

    const { plan_type, advertisement_data } = await req.json();
    
    // Validate plan type and get pricing
    const planPricing = {
      basic: { amount: 50000, name: "Basic Plan" }, // 500 THB in cents
      premium: { amount: 200000, name: "Premium Plan" }, // 2,000 THB in cents
      enterprise: { amount: 500000, name: "Enterprise Plan" } // 5,000 THB in cents
    };

    if (!planPricing[plan_type as keyof typeof planPricing]) {
      throw new Error("Invalid plan type");
    }

    const selectedPlan = planPricing[plan_type as keyof typeof planPricing];
    logStep("Plan selected", { plan_type, amount: selectedPlan.amount });

    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });
    
    // Check if customer exists
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    let customerId: string;
    
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      logStep("Existing customer found", { customerId });
    } else {
      const customer = await stripe.customers.create({
        email: user.email,
        name: advertisement_data.business_name || user.email
      });
      customerId = customer.id;
      logStep("New customer created", { customerId });
    }

    // Create checkout session for subscription
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [
        {
          price_data: {
            currency: "thb",
            product_data: { 
              name: `${selectedPlan.name} - Wang Sam Mo Advertising`,
              description: `Monthly advertising subscription for ${advertisement_data.business_name}` 
            },
            unit_amount: selectedPlan.amount,
            recurring: { interval: "month" },
          },
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${req.headers.get("origin")}/ad-dashboard?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/ad-dashboard?canceled=true`,
      metadata: {
        user_id: user.id,
        plan_type: plan_type,
        advertisement_id: "pending"
      }
    });

    logStep("Checkout session created", { sessionId: session.id, url: session.url });

    // Store advertisement data temporarily (will be activated after payment)
    const { data: adData, error: adError } = await supabaseServiceClient
      .from("advertisements")
      .insert({
        user_id: user.id,
        title: advertisement_data.title,
        title_thai: advertisement_data.title_thai,
        description: advertisement_data.description,
        description_thai: advertisement_data.description_thai,
        business_name: advertisement_data.business_name,
        link_url: advertisement_data.link_url,
        image_url: advertisement_data.image_url,
        video_url: advertisement_data.video_url,
        plan_type: plan_type,
        status: "pending", // Will be activated after payment
        start_date: new Date().toISOString(),
        end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now
      })
      .select()
      .single();

    if (adError) {
      logStep("Error creating advertisement", { error: adError });
      throw new Error(`Failed to create advertisement: ${adError.message}`);
    }

    logStep("Advertisement created", { advertisementId: adData.id });

    // Update session metadata with actual advertisement ID
    await stripe.checkout.sessions.update(session.id, {
      metadata: {
        ...session.metadata,
        advertisement_id: adData.id
      }
    });

    return new Response(JSON.stringify({ 
      url: session.url,
      advertisement_id: adData.id,
      session_id: session.id
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in create-ad-subscription", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});