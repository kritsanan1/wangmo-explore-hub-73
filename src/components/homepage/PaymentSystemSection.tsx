import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ShoppingCart, CreditCard, Shield, ArrowRight, Package, Home, Gift } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { useCart } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

interface PaymentOption {
  id: string;
  type: 'product' | 'homestay' | 'combo';
  title: string;
  titleThai: string;
  image: string;
  price: number;
  originalPrice?: number;
  description: string;
  descriptionThai: string;
  hashtag: string;
  icon: React.ElementType;
  features?: string[];
}

const paymentOptions: PaymentOption[] = [
  {
    id: 'pickled-vegetables',
    type: 'product',
    title: 'Buy Pickled Vegetables',
    titleThai: 'ซื้อผักดองวังสามหมอ',
    image: 'https://images.unsplash.com/photo-1587334474613-c1226d65cd4e?w=400&h=300&fit=crop',
    price: 300,
    description: 'Securely purchase authentic Wang Sam Mo pickled vegetables with Stripe.',
    descriptionThai: 'ซื้อผักดองแท้จากวังสามหมอด้วยระบบชำระเงินที่ปลอดภัย',
    hashtag: '#วังสามหมอ',
    icon: Package,
    features: ['500g package', 'Traditional recipe', 'Free shipping in Udon Thani']
  },
  {
    id: 'bua-daeng-homestay',
    type: 'homestay',
    title: 'Book Bua Daeng Homestay',
    titleThai: 'จองบัวแดงโฮมสเตย์',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop',
    price: 800,
    description: 'Reserve your stay at Bua Daeng Homestay with instant Stripe payment.',
    descriptionThai: 'จองที่พักบัวแดงโฮมสเตย์ด้วยการชำระเงินทันที',
    hashtag: '#tourderwang',
    icon: Home,
    features: ['Garden views', 'WiFi included', 'Breakfast included', 'Call 089-6220962']
  },
  {
    id: 'local-experience-package',
    type: 'combo',
    title: 'Local Experience Package',
    titleThai: 'แพ็คเกจประสบการณ์ท้องถิ่น',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
    price: 1000,
    originalPrice: 1100,
    description: 'Enjoy a homestay and local products with one secure payment.',
    descriptionThai: 'เพลิดเพลินกับโฮมสเตย์และผลิตภัณฑ์ท้องถิ่นในการชำระเงินครั้งเดียว',
    hashtag: '#ที่นี่วังสามหมอ',
    icon: Gift,
    features: ['1 night homestay', 'Pickled vegetables set', 'Local handicraft', 'Save 100 THB!']
  }
];

const PaymentSystemSection = () => {
  const { addItem } = useCart();
  const { language, t } = useLanguage();
  const { toast } = useToast();

  const handleAddToCart = (item: PaymentOption) => {
    if (item.type === 'homestay') {
      // For homestays, redirect to booking form instead of adding to cart
      return;
    }

    const cartItem = {
      id: item.id,
      name: language === 'th' ? item.titleThai : item.title,
      price: item.price,
      image: item.image,
      category: item.type === 'combo' ? 'Package' : 'Product'
    };

    addItem(cartItem);
    
    toast({
      title: language === 'th' ? "เพิ่มในตะกร้าแล้ว!" : "Added to Cart!",
      description: language === 'th' 
        ? `${item.titleThai} ถูกเพิ่มในตะกร้าของคุณแล้ว`
        : `${item.title} has been added to your cart`,
    });
  };

  const getButtonText = (item: PaymentOption) => {
    if (item.type === 'homestay') {
      return language === 'th' ? 'จองเลย' : 'Book Now';
    }
    return language === 'th' ? 'เพิ่มในตะกร้า' : 'Add to Cart';
  };

  const getButtonLink = (item: PaymentOption) => {
    if (item.type === 'homestay') {
      return '/services?category=homestays';
    }
    return '/cart';
  };

  return (
    <section className="py-16 bg-gradient-to-br from-green-50/60 via-amber-50/40 to-red-50/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-5 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=800')",
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          title={language === 'th' ? 'ช้อปและพักอย่างง่ายดาย' : 'Shop & Stay with Ease'}
          titleThai={language === 'th' ? 'ระบบชำระเงินที่ปลอดภัย' : '#ที่นี่วังสามหมอ'}
          subtitle={language === 'th' 
            ? 'ชำระเงินปลอดภัยสำหรับผลิตภัณฑ์ท้องถิ่นและการจองโฮมสเตย์'
            : 'Secure payments for local products and homestay bookings'
          }
          linkTo="/payments"
          linkText={language === 'th' ? 'เรียนรู้เกี่ยวกับการชำระเงิน' : 'Learn About Payments'}
          className="text-center mb-12"
        />

        {/* Secure Payment Badge */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 border-2 border-green-200 shadow-lg">
            <div className="flex items-center space-x-3">
              <Shield className="h-6 w-6 text-green-600" />
              <CreditCard className="h-6 w-6 text-blue-600" />
              <div className="text-center">
                <p className="font-semibold text-gray-900 text-sm">
                  {language === 'th' ? 'ชำระเงินปลอดภัยด้วย Stripe' : 'Secure Payment with Stripe'}
                </p>
                <p className="text-xs text-gray-600">
                  {language === 'th' 
                    ? 'รองรับบัตรเครดิต, โมบายเพย์, โอนธนาคาร'
                    : 'Credit/Debit Cards, Mobile Payments, Bank Transfers'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Options Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {paymentOptions.map((option) => (
            <Card 
              key={option.id} 
              className="group overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-white/90 backdrop-blur-sm border-2 hover:border-amber-300"
            >
              {/* Card Header with Image */}
              <div className="relative">
                <img 
                  src={option.image}
                  alt={language === 'th' ? option.titleThai : option.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                
                {/* Price Badge */}
                <div className="absolute top-4 right-4">
                  <Badge className="bg-green-600 text-white px-3 py-1 text-lg font-bold shadow-lg">
                    {option.originalPrice && (
                      <span className="line-through text-red-200 mr-2 text-sm">
                        {option.originalPrice} THB
                      </span>
                    )}
                    {option.price} THB
                  </Badge>
                </div>
                
                {/* Type Badge */}
                <div className="absolute top-4 left-4">
                  <Badge variant="outline" className="bg-white/90 border-amber-400 text-amber-800 font-medium">
                    <option.icon className="h-3 w-3 mr-1" />
                    {option.type === 'product' ? (language === 'th' ? 'สินค้า' : 'Product') :
                     option.type === 'homestay' ? (language === 'th' ? 'โฮมสเตย์' : 'Homestay') :
                     (language === 'th' ? 'แพ็คเกจ' : 'Package')}
                  </Badge>
                </div>

                {/* Hashtag */}
                <div className="absolute bottom-4 left-4">
                  <Badge className="bg-blue-600/90 text-white text-xs">
                    {option.hashtag}
                  </Badge>
                </div>
              </div>

              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-bold text-gray-900 mb-2">
                  {language === 'th' ? option.titleThai : option.title}
                </CardTitle>
                <p className="text-gray-600 leading-relaxed">
                  {language === 'th' ? option.descriptionThai : option.description}
                </p>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Features */}
                {option.features && (
                  <div className="mb-4">
                    <ul className="space-y-1">
                      {option.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-center">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Action Button */}
                <div className="space-y-3">
                  {option.type === 'homestay' ? (
                    <Link to={getButtonLink(option)}>
                      <Button 
                        className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                      >
                        <Home className="mr-2 h-4 w-4" />
                        {getButtonText(option)}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  ) : (
                    <Button 
                      onClick={() => handleAddToCart(option)}
                      className="w-full bg-gradient-to-r from-amber-600 to-green-600 hover:from-amber-700 hover:to-green-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      {getButtonText(option)}
                    </Button>
                  )}
                  
                  {(option.type === 'product' || option.type === 'combo') && (
                    <Link to="/cart">
                      <Button 
                        variant="outline" 
                        className="w-full border-amber-600 text-amber-700 hover:bg-amber-50 font-medium"
                      >
                        {language === 'th' ? 'ดูตะกร้า' : 'View Cart'}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Payment Methods Info */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border-2 border-green-200 shadow-lg">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {language === 'th' ? 'วิธีการชำระเงินที่รองรับ' : 'Supported Payment Methods'}
            </h3>
            <p className="text-gray-600">
              {language === 'th' 
                ? 'ชำระเงินได้หลากหลายวิธ��ผ่านระบบ Stripe ที่ปลอดภัย'
                : 'Multiple secure payment options through Stripe integration'
              }
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
              <div className="font-semibold text-gray-900 text-sm mb-1">Visa</div>
              <div className="text-xs text-gray-600">Credit/Debit</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
              <div className="font-semibold text-gray-900 text-sm mb-1">Mastercard</div>
              <div className="text-xs text-gray-600">Credit/Debit</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
              <div className="font-semibold text-gray-900 text-sm mb-1">Apple Pay</div>
              <div className="text-xs text-gray-600">Mobile Payment</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
              <div className="font-semibold text-gray-900 text-sm mb-1">
                {language === 'th' ? 'โอนธนาคาร' : 'Bank Transfer'}
              </div>
              <div className="text-xs text-gray-600">Thai Banks</div>
            </div>
          </div>

          <div className="text-center">
            <Link to="/payments">
              <Button variant="outline" className="border-green-600 text-green-700 hover:bg-green-50">
                <Shield className="mr-2 h-4 w-4" />
                {language === 'th' ? 'เรียนรู้เพิ่มเติมเกี่ยวกับความปลอดภัย' : 'Learn More About Security'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentSystemSection;
