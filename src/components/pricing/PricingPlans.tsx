import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  CheckCircle, 
  Crown, 
  Star, 
  Zap, 
  CreditCard,
  Calendar,
  TrendingUp,
  Eye,
  MousePointer,
  DollarSign,
  Shield,
  Headphones,
  Rocket
} from "lucide-react";

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  popularBadge?: boolean;
  premiumBadge?: boolean;
  adSize: string;
  placement: string[];
  analytics: string;
  support: string;
  icon: React.ReactNode;
}

const pricingPlans: PricingPlan[] = [
  {
    id: "basic",
    name: "Basic",
    description: "Perfect for small local businesses",
    monthlyPrice: 500,
    yearlyPrice: 5000, // 2 months free
    adSize: "300x250 pixels",
    placement: ["Homepage sidebar"],
    analytics: "Basic views & clicks",
    support: "Email support",
    icon: <Star className="h-5 w-5" />,
    features: [
      "Medium banner ads (300x250 pixels)",
      "Homepage sidebar placement",
      "30-day active period",
      "Basic analytics (views, clicks)",
      "Mobile-optimized display",
      "Email support"
    ]
  },
  {
    id: "premium",
    name: "Premium",
    description: "Maximum visibility for your business",
    monthlyPrice: 2000,
    yearlyPrice: 20000, // 2 months free
    adSize: "728x90 pixels",
    placement: ["Homepage banner", "Category pages"],
    analytics: "Advanced analytics & reporting",
    support: "Priority email support",
    popularBadge: true,
    icon: <TrendingUp className="h-5 w-5" />,
    features: [
      "Large banner ads (728x90 pixels)",
      "Priority homepage placement",
      "Category page integration",
      "30-day active period",
      "Advanced analytics & reporting",
      "Click tracking & conversion data",
      "Featured badge display",
      "Priority email support"
    ]
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Dominate all sections with maximum reach",
    monthlyPrice: 5000,
    yearlyPrice: 50000, // 2 months free
    adSize: "Multiple sizes",
    placement: ["All sections", "Priority search results"],
    analytics: "Detailed analytics & demographics",
    support: "Dedicated account manager",
    premiumBadge: true,
    icon: <Crown className="h-5 w-5" />,
    features: [
      "Multiple banner sizes across all sections",
      "Homepage + Services + Restaurants + Attractions",
      "Priority in search results",
      "30-day active period",
      "Detailed analytics & demographics",
      "Video ad support",
      "A/B testing capabilities",
      "Dedicated account manager",
      "24/7 priority support"
    ]
  }
];

interface PricingPlansProps {
  onSelectPlan: (planId: string, isYearly: boolean) => void;
  selectedPlan?: string;
  isLoading?: boolean;
}

const PricingPlans = ({ onSelectPlan, selectedPlan, isLoading }: PricingPlansProps) => {
  const [isYearly, setIsYearly] = useState(false);

  const calculateSavings = (monthly: number, yearly: number) => {
    const yearlySavings = (monthly * 12) - yearly;
    const percentSaved = Math.round((yearlySavings / (monthly * 12)) * 100);
    return { amount: yearlySavings, percent: percentSaved };
  };

  return (
    <div className="space-y-8">
      {/* Billing Toggle */}
      <div className="flex items-center justify-center space-x-4">
        <Label htmlFor="billing-toggle" className="text-sm font-medium">
          Monthly
        </Label>
        <div className="relative">
          <Switch
            id="billing-toggle"
            checked={isYearly}
            onCheckedChange={setIsYearly}
          />
          {isYearly && (
            <Badge className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs">
              Save 17%
            </Badge>
          )}
        </div>
        <Label htmlFor="billing-toggle" className="text-sm font-medium">
          Yearly
          <span className="text-green-600 ml-1 text-xs">(2 months free)</span>
        </Label>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {pricingPlans.map((plan) => {
          const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
          const savings = calculateSavings(plan.monthlyPrice, plan.yearlyPrice);
          const isSelected = selectedPlan === plan.id;

          return (
            <Card 
              key={plan.id} 
              className={`relative transition-all duration-200 ${
                plan.popularBadge ? 'border-primary shadow-lg' : 
                plan.premiumBadge ? 'border-2 border-thai-red shadow-xl' : ''
              } ${isSelected ? 'ring-2 ring-primary' : ''}`}
            >
              {/* Badges */}
              {plan.popularBadge && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
                  Most Popular
                </Badge>
              )}
              {plan.premiumBadge && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-thai-red text-thai-red-foreground">
                  <Crown className="h-3 w-3 mr-1" />
                  Enterprise
                </Badge>
              )}

              <CardHeader className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <div className={`p-2 rounded-full ${
                    plan.premiumBadge ? 'bg-thai-red/10 text-thai-red' : 'bg-primary/10 text-primary'
                  }`}>
                    {plan.icon}
                  </div>
                </div>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                
                <div className="mt-4">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className={`text-3xl font-bold ${
                      plan.premiumBadge ? 'text-thai-red' : 'text-primary'
                    }`}>
                      {price.toLocaleString()}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      THB/{isYearly ? 'year' : 'month'}
                    </span>
                  </div>
                  
                  {isYearly && savings.percent > 0 && (
                    <div className="mt-2">
                      <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                        Save {savings.amount.toLocaleString()} THB/year
                      </Badge>
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent>
                {/* Quick Info */}
                <div className="space-y-2 mb-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-muted-foreground" />
                    <span>{plan.adSize}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MousePointer className="h-4 w-4 text-muted-foreground" />
                    <span>{plan.placement.join(", ")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <span>{plan.analytics}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Headphones className="h-4 w-4 text-muted-foreground" />
                    <span>{plan.support}</span>
                  </div>
                </div>

                {/* Features List */}
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full ${
                    plan.premiumBadge 
                      ? 'bg-thai-red hover:bg-thai-red/90 text-thai-red-foreground' 
                      : ''
                  }`}
                  variant={plan.popularBadge ? "default" : "outline"}
                  onClick={() => onSelectPlan(plan.id, isYearly)}
                  disabled={isLoading}
                >
                  {isLoading && selectedPlan === plan.id ? (
                    "Processing..."
                  ) : (
                    <>
                      <CreditCard className="mr-2 h-4 w-4" />
                      Choose {plan.name}
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Why Choose Us Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Why Advertise with Tour Der Wang?</CardTitle>
          <CardDescription className="text-center">
            Join hundreds of local businesses reaching thousands of tourists monthly
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-50 p-3 rounded-full w-fit mx-auto mb-3">
                <Eye className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">High Visibility</h3>
              <p className="text-sm text-muted-foreground">
                Reach 10,000+ monthly visitors exploring Wang Sam Mo
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-50 p-3 rounded-full w-fit mx-auto mb-3">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Affordable Pricing</h3>
              <p className="text-sm text-muted-foreground">
                Budget-friendly plans designed for small local businesses
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-50 p-3 rounded-full w-fit mx-auto mb-3">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Measurable Results</h3>
              <p className="text-sm text-muted-foreground">
                Track views, clicks, and customer engagement in real-time
              </p>
            </div>
            <div className="text-center">
              <div className="bg-orange-50 p-3 rounded-full w-fit mx-auto mb-3">
                <Shield className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-2">Secure Payments</h3>
              <p className="text-sm text-muted-foreground">
                Safe and secure payment processing with Stripe
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Security */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Shield className="h-4 w-4" />
          <span>Secure payment processing powered by Stripe</span>
        </div>
        <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
          <span>• SSL Encrypted</span>
          <span>• PCI Compliant</span>
          <span>• 30-day Money Back Guarantee</span>
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;
