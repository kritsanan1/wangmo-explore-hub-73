import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CreditCard, Lock, CheckCircle } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

interface StripeCheckoutProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const StripeCheckout = ({ onSuccess, onCancel }: StripeCheckoutProps) => {
  const { state, clearCart } = useCart();
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
  });

  const { items, total } = state;
  const vatAmount = Math.round(total * 0.07); // 7% VAT
  const finalTotal = total + vatAmount;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Simulate Stripe payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Simulate successful payment
      const orderId = `WSM-${Date.now()}`;
      
      // Clear cart
      clearCart();
      
      // Show success toast
      toast({
        title: "Payment Successful!",
        description: `Order ${orderId} confirmed for ${finalTotal.toLocaleString()} THB`,
      });
      
      // Call success callback
      onSuccess();
      
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "There was an issue processing your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="h-6 w-6 mr-2" />
            Secure Checkout
          </CardTitle>
          <CardDescription>
            Complete your purchase of Wang Sam Mo local products
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Order Summary */}
            <div className="bg-amber-50 p-4 rounded-lg">
              <h3 className="font-semibold text-amber-800 mb-3">Order Summary</h3>
              <div className="space-y-2">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.quantity}x {item.name}</span>
                    <span>{(item.price * item.quantity).toLocaleString()} THB</span>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>{total.toLocaleString()} THB</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>VAT (7%):</span>
                  <span>{vatAmount.toLocaleString()} THB</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span className="text-amber-600">{finalTotal.toLocaleString()} THB</span>
                </div>
              </div>
            </div>

            {/* Customer Information */}
            <div className="space-y-4">
              <h3 className="font-semibold">Customer Information</h3>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            {/* Payment Information */}
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center">
                <Lock className="h-4 w-4 mr-2" />
                Payment Information
              </h3>
              
              <div>
                <Label htmlFor="name">Cardholder Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Full name on card"
                  required
                />
              </div>

              <div>
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  value={formData.cardNumber}
                  onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    value={formData.expiryDate}
                    onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                    placeholder="MM/YY"
                    maxLength={5}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    value={formData.cvv}
                    onChange={(e) => handleInputChange('cvv', e.target.value)}
                    placeholder="123"
                    maxLength={4}
                    required
                  />
                </div>
              </div>
            </div>

            <Alert>
              <Lock className="h-4 w-4" />
              <AlertDescription>
                Your payment information is encrypted and secure. This is a demo checkout for Wang Sam Mo local products.
              </AlertDescription>
            </Alert>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="flex-1"
                disabled={isProcessing}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isProcessing}
                className="flex-1 bg-amber-600 hover:bg-amber-700"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Pay {finalTotal.toLocaleString()} THB
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default StripeCheckout;
