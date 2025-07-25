import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Plus, Minus, Trash2, ShoppingBag, ArrowLeft, CreditCard, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";

const Cart = () => {
  const { state, removeItem, updateQuantity, clearCart } = useCart();
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const { items, total } = state;

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const handleCheckout = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear cart and show success
      clearCart();
      setOrderConfirmed(true);
      
      toast({
        title: "Order Confirmed!",
        description: `Order confirmed for ${total.toLocaleString()} THB!`,
      });
      
      // Reset confirmation after 5 seconds
      setTimeout(() => {
        setOrderConfirmed(false);
      }, 5000);
      
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

  if (orderConfirmed) {
    return (
      <Layout>
        <div className="min-h-screen py-16 bg-gradient-to-br from-green-50 to-emerald-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="text-center py-12">
              <CardContent>
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
                <h1 className="text-3xl font-bold text-green-700 mb-4">
                  Order Confirmed!
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Thank you for supporting Wang Sam Mo local products!
                </p>
                <div className="space-y-4">
                  <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
                    <Link to="/services">
                      <ShoppingBag className="mr-2 h-5 w-5" />
                      Continue Shopping
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link to="/">
                      <ArrowLeft className="mr-2 h-5 w-5" />
                      Back to Home
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen py-16 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Button asChild variant="outline" className="mb-4">
              <Link to="/services">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t('back')} to Products
              </Link>
            </Button>
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
              {t('cart.title')}
            </h1>
            <p className="text-lg text-muted-foreground">
              ตะกร้าสินค้าท้องถิ่นวังสามหมอ - Wang Sam Mo Local Products Cart
            </p>
          </div>

          {items.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-6" />
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                  {t('cart.empty')}
                </h2>
                <p className="text-gray-500 mb-8">
                  Discover authentic Wang Sam Mo products and support local businesses
                </p>
                <Button asChild size="lg" className="bg-amber-600 hover:bg-amber-700">
                  <Link to="/services">
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    Shop Local Products
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <ShoppingBag className="mr-2 h-5 w-5" />
                      Cart Items ({items.length})
                    </CardTitle>
                    <CardDescription>
                      Authentic products from Wang Sam Mo, Udon Thani
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="border rounded-lg p-4 bg-gray-50">
                        <div className="flex items-start space-x-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-md shadow-sm"
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                              {item.name}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2">
                              {item.name_thai}
                            </p>
                            <p className="text-lg font-bold text-amber-600 mb-3">
                              {item.price.toLocaleString()} {t('currency')} / {item.category}
                            </p>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <span className="text-sm font-medium text-gray-700">
                                  {t('cart.quantity')}:
                                </span>
                                <div className="flex items-center space-x-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                    className="h-8 w-8 p-0"
                                  >
                                    <Minus className="h-4 w-4" />
                                  </Button>
                                  <span className="text-lg font-semibold w-12 text-center">
                                    {item.quantity}
                                  </span>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                    className="h-8 w-8 p-0"
                                  >
                                    <Plus className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                              
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => removeItem(item.id)}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4 mr-1" />
                                {t('cart.remove')}
                              </Button>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <p className="text-lg font-bold text-gray-900">
                              {(item.price * item.quantity).toLocaleString()} {t('currency')}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary */}
              <div className="space-y-6">
                <Card className="sticky top-20">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                    <CardDescription>
                      Review your Wang Sam Mo products
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t('cart.subtotal')}:</span>
                        <span className="font-semibold">
                          {total.toLocaleString()} {t('currency')}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Shipping:</span>
                        <span className="font-semibold text-green-600">Free</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-lg">
                        <span className="font-semibold">{t('cart.total')}:</span>
                        <span className="font-bold text-xl text-amber-600">
                          {total.toLocaleString()} {t('currency')}
                        </span>
                      </div>
                    </div>

                    <Alert>
                      <AlertDescription>
                        Supporting local Wang Sam Mo businesses with every purchase. 
                        Free delivery within Udon Thani province.
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-3">
                      <Button
                        onClick={handleCheckout}
                        disabled={isProcessing}
                        size="lg"
                        className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                      >
                        {isProcessing ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Processing...
                          </>
                        ) : (
                          <>
                            <CreditCard className="mr-2 h-5 w-5" />
                            {t('cart.checkout')} - {total.toLocaleString()} {t('currency')}
                          </>
                        )}
                      </Button>
                      
                      <Button asChild variant="outline" size="lg" className="w-full">
                        <Link to="/services">
                          {t('cart.continue')}
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
