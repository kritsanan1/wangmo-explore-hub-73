import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  CreditCard,
  Upload,
  Eye,
  Calendar,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Shield,
  Clock,
  Star,
  Info
} from "lucide-react";

interface AdFormData {
  businessName: string;
  title: string;
  titleThai: string;
  description: string;
  descriptionThai: string;
  linkUrl: string;
  imageUrl: string;
  videoUrl?: string;
}

interface PaymentWorkflowProps {
  selectedPlan: {
    id: string;
    name: string;
    price: number;
    isYearly: boolean;
  };
  onBack: () => void;
  onPaymentSuccess: () => void;
}

const PaymentWorkflow = ({ selectedPlan, onBack, onPaymentSuccess }: PaymentWorkflowProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [adData, setAdData] = useState<AdFormData>({
    businessName: "",
    title: "",
    titleThai: "",
    description: "",
    descriptionThai: "",
    linkUrl: "",
    imageUrl: "",
    videoUrl: ""
  });
  const { toast } = useToast();

  // Check for successful payment on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('success');
    const sessionId = urlParams.get('session_id');
    
    if (success === 'true' && sessionId) {
      verifyPayment(sessionId);
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const verifyPayment = async (sessionId: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('verify-payment', {
        body: { session_id: sessionId }
      });

      if (error) throw error;

      if (data.success && data.advertisement_activated) {
        toast({
          title: "Payment Successful!",
          description: "Your advertisement has been activated and is now live.",
        });
        onPaymentSuccess();
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
      toast({
        title: "Verification Error",
        description: "There was an issue verifying your payment. Please contact support.",
        variant: "destructive",
      });
    }
  };

  const handleStepComplete = (step: number) => {
    if (step === 1 && validateStep1()) {
      setCurrentStep(2);
    } else if (step === 2 && validateStep2()) {
      setCurrentStep(3);
    }
  };

  const validateStep1 = () => {
    if (!adData.businessName || !adData.title || !adData.description || !adData.linkUrl) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    // Additional validation for media and preview
    return true;
  };

  const handleCreateAdAndPayment = async () => {
    if (!validateStep1() || !validateStep2()) return;

    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('create-ad-subscription', {
        body: {
          plan_type: selectedPlan.id,
          billing_cycle: selectedPlan.isYearly ? 'yearly' : 'monthly',
          advertisement_data: {
            business_name: adData.businessName,
            title: adData.title,
            title_thai: adData.titleThai,
            description: adData.description,
            description_thai: adData.descriptionThai,
            link_url: adData.linkUrl,
            image_url: adData.imageUrl,
            video_url: adData.videoUrl
          }
        }
      });

      if (error) throw error;

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Error creating ad:', error);
      toast({
        title: "Error",
        description: "Failed to create advertisement. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getAdPreviewSize = () => {
    switch (selectedPlan.id) {
      case 'premium':
        return { width: '728px', height: '90px', label: '728x90 Banner' };
      case 'enterprise':
        return { width: '728px', height: '180px', label: 'Multiple Sizes' };
      default:
        return { width: '300px', height: '250px', label: '300x250 Banner' };
    }
  };

  const steps = [
    { number: 1, title: "Ad Content", description: "Create your advertisement" },
    { number: 2, title: "Media & Preview", description: "Upload images and preview" },
    { number: 3, title: "Payment", description: "Complete your purchase" }
  ];

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
              currentStep >= step.number 
                ? 'bg-primary border-primary text-primary-foreground' 
                : 'border-muted-foreground text-muted-foreground'
            }`}>
              {currentStep > step.number ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                step.number
              )}
            </div>
            <div className="ml-3">
              <p className={`text-sm font-medium ${
                currentStep >= step.number ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {step.title}
              </p>
              <p className="text-xs text-muted-foreground">{step.description}</p>
            </div>
            {index < steps.length - 1 && (
              <ArrowRight className="h-5 w-5 text-muted-foreground mx-4" />
            )}
          </div>
        ))}
      </div>

      {/* Selected Plan Summary */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">{selectedPlan.name} Plan</h3>
              <p className="text-sm text-muted-foreground">
                {selectedPlan.isYearly ? '12 months' : '1 month'} billing cycle
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">
                {selectedPlan.price.toLocaleString()} THB
              </p>
              <p className="text-sm text-muted-foreground">
                {selectedPlan.isYearly && "Save 17% with yearly billing"}
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={onBack}>
              Change Plan
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Step Content */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Step 1: Advertisement Content</CardTitle>
            <CardDescription>
              Create compelling content for your advertisement
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Business Name */}
            <div className="space-y-2">
              <Label htmlFor="businessName">
                Business Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="businessName"
                placeholder="Enter your business name"
                value={adData.businessName}
                onChange={(e) => setAdData({...adData, businessName: e.target.value})}
              />
            </div>

            {/* Ad Title */}
            <div className="space-y-2">
              <Label htmlFor="adTitle">
                Ad Title (English) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="adTitle"
                placeholder="e.g., Stay at Bua Daeng Homestay - 800 THB/night"
                maxLength={60}
                value={adData.title}
                onChange={(e) => setAdData({...adData, title: e.target.value})}
              />
              <p className="text-sm text-muted-foreground">
                Maximum 60 characters ({60 - adData.title.length} remaining)
              </p>
            </div>

            {/* Ad Title Thai */}
            <div className="space-y-2">
              <Label htmlFor="adTitleThai">Ad Title (Thai)</Label>
              <Input
                id="adTitleThai"
                placeholder="e.g., พักที่บัวแดง โฮมสเตย์ - 800 บาท/คืน"
                maxLength={60}
                value={adData.titleThai}
                onChange={(e) => setAdData({...adData, titleThai: e.target.value})}
              />
              <p className="text-sm text-muted-foreground">
                Optional - Maximum 60 characters
              </p>
            </div>

            {/* Ad Description */}
            <div className="space-y-2">
              <Label htmlFor="adDescription">
                Description (English) <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="adDescription"
                placeholder="Describe your business offering..."
                rows={3}
                maxLength={120}
                value={adData.description}
                onChange={(e) => setAdData({...adData, description: e.target.value})}
              />
              <p className="text-sm text-muted-foreground">
                Maximum 120 characters ({120 - adData.description.length} remaining)
              </p>
            </div>

            {/* Ad Description Thai */}
            <div className="space-y-2">
              <Label htmlFor="adDescriptionThai">Description (Thai)</Label>
              <Textarea
                id="adDescriptionThai"
                placeholder="อธิบายเกี่ยวกับธุรกิจของคุณ..."
                rows={3}
                maxLength={120}
                value={adData.descriptionThai}
                onChange={(e) => setAdData({...adData, descriptionThai: e.target.value})}
              />
              <p className="text-sm text-muted-foreground">Optional - Maximum 120 characters</p>
            </div>

            {/* Website Link */}
            <div className="space-y-2">
              <Label htmlFor="adLink">
                Website/Contact Link <span className="text-red-500">*</span>
              </Label>
              <Input
                id="adLink"
                type="url"
                placeholder="https://your-website.com or phone number"
                value={adData.linkUrl}
                onChange={(e) => setAdData({...adData, linkUrl: e.target.value})}
              />
              <p className="text-sm text-muted-foreground">
                Website URL, Facebook page, or phone number where customers can reach you
              </p>
            </div>

            <Button onClick={() => handleStepComplete(1)} className="w-full">
              Continue to Media Upload
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      )}

      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Step 2: Media & Preview</CardTitle>
            <CardDescription>
              Upload images and preview your advertisement
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Image Upload */}
            <div className="space-y-2">
              <Label>Ad Image</Label>
              <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">
                  Upload an image for your ad (max 2MB for fast loading)
                </p>
                <p className="text-xs text-muted-foreground mb-3">
                  Recommended: {getAdPreviewSize().label}
                </p>
                <Button variant="outline">
                  Choose File
                </Button>
              </div>
            </div>

            {/* Video Upload (Enterprise only) */}
            {selectedPlan.id === 'enterprise' && (
              <div className="space-y-2">
                <Label>Video Ad (Optional)</Label>
                <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Upload a video for your ad (max 10MB, MP4 format)
                  </p>
                  <Button variant="outline">
                    Choose Video File
                  </Button>
                </div>
              </div>
            )}

            {/* Ad Preview */}
            <div className="space-y-2">
              <Label>Preview</Label>
              <div className="border rounded-lg p-4 bg-muted/30">
                <p className="text-sm text-muted-foreground mb-3">
                  Your ad will appear like this:
                </p>
                
                <div className="bg-white rounded border p-4 shadow-sm">
                  <div 
                    className="border-2 border-dashed border-muted-foreground/30 rounded flex items-center justify-center relative"
                    style={{ 
                      width: getAdPreviewSize().width, 
                      height: getAdPreviewSize().height,
                      maxWidth: '100%',
                      minHeight: '120px'
                    }}
                  >
                    <div className="text-center p-4">
                      <h3 className="font-semibold text-sm mb-1">
                        {adData.title || "Your Ad Title Here"}
                      </h3>
                      {adData.titleThai && (
                        <p className="text-xs text-muted-foreground mb-2">{adData.titleThai}</p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        {adData.description || "Your description will appear here..."}
                      </p>
                      <Badge className="mt-2" variant="outline">
                        {adData.businessName || "Business Name"}
                      </Badge>
                    </div>
                    {selectedPlan.id !== 'basic' && (
                      <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs">
                        {selectedPlan.id === 'enterprise' ? 'Premium' : 'Featured'}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setCurrentStep(1)} className="flex-1">
                Back to Content
              </Button>
              <Button onClick={() => handleStepComplete(2)} className="flex-1">
                Continue to Payment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Step 3: Complete Payment</CardTitle>
            <CardDescription>
              Review and complete your advertisement purchase
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Order Summary */}
            <div className="bg-muted/30 rounded-lg p-4 space-y-3">
              <h3 className="font-semibold">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Plan:</span>
                  <span className="font-medium">{selectedPlan.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Billing Cycle:</span>
                  <span>{selectedPlan.isYearly ? '12 months' : '1 month'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Business:</span>
                  <span>{adData.businessName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Ad Title:</span>
                  <span>{adData.title}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center font-semibold text-lg">
                  <span>Total:</span>
                  <span>{selectedPlan.price.toLocaleString()} THB</span>
                </div>
                {selectedPlan.isYearly && (
                  <p className="text-xs text-green-600">
                    You're saving 17% with yearly billing!
                  </p>
                )}
              </div>
            </div>

            {/* Payment Security Info */}
            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>
                Your payment is secured by Stripe with 256-bit SSL encryption. 
                We never store your card information.
              </AlertDescription>
            </Alert>

            {/* Terms and Conditions */}
            <div className="text-xs text-muted-foreground space-y-1">
              <p>By proceeding with payment, you agree to our:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Terms of Service and Privacy Policy</li>
                <li>Advertisement Content Guidelines</li>
                <li>30-day money-back guarantee (if ad is not approved)</li>
                <li>Automatic renewal based on selected billing cycle</li>
              </ul>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setCurrentStep(2)} className="flex-1">
                Back to Preview
              </Button>
              <Button 
                onClick={handleCreateAdAndPayment}
                disabled={isSubmitting}
                className="flex-1"
                size="lg"
              >
                <CreditCard className="mr-2 h-4 w-4" />
                {isSubmitting ? "Processing..." : `Pay ${selectedPlan.price.toLocaleString()} THB`}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PaymentWorkflow;
