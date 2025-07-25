import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Eye, 
  MousePointer, 
  TrendingUp, 
  Star,
  MapPin,
  Phone,
  ExternalLink,
  Megaphone,
  BarChart3
} from "lucide-react";
import SectionHeader from "./SectionHeader";
import { useLanguage } from "@/contexts/LanguageContext";

interface AdPlan {
  id: string;
  name: string;
  nameThai: string;
  price: number;
  color: 'basic' | 'premium' | 'enterprise';
  features: string[];
  featuresThai: string[];
}

interface SampleAd {
  id: string;
  title: string;
  titleThai: string;
  category: 'homestay' | 'restaurant' | 'product';
  image: string;
  description: string;
  descriptionThai: string;
  link: string;
  contact?: string;
  hashtag: string;
  plan: AdPlan;
  metrics?: {
    views: number;
    clicks: number;
  };
}

const adPlans: Record<string, AdPlan> = {
  basic: {
    id: 'basic',
    name: 'Basic Plan',
    nameThai: 'แพ็คเกจพื้นฐาน',
    price: 500,
    color: 'basic',
    features: ['Medium banner ads', 'Basic listing', 'Email support'],
    featuresThai: ['โฆษณาแบนเนอร์ขนาดกลาง', 'การลิสต์พื้นฐาน', 'การสนับสนุนทางอีเมล']
  },
  premium: {
    id: 'premium',
    name: 'Premium Plan',
    nameThai: 'แพ็คเกจพรีเมียม',
    price: 2000,
    color: 'premium',
    features: ['Large banner ads', 'Featured listing', 'Analytics dashboard', 'Priority support'],
    featuresThai: ['โฆษณาแบนเนอร์ขนาดใหญ่', 'การลิสต์แบบเด่น', 'แดชบอร์ดการวิเคราะห์', 'การสนับสนุนระดับพรีเมียม']
  },
  enterprise: {
    id: 'enterprise',
    name: 'Enterprise Plan',
    nameThai: 'แพ็คเกจองค์กร',
    price: 5000,
    color: 'enterprise',
    features: ['Exclusive banner placements', 'Detailed analytics', 'Custom ad formats', '24/7 support'],
    featuresThai: ['การจัดวางแบนเนอร์เฉพาะ', 'การวิเคราะห์แบบละเอียด', 'รูปแบบโฆษณาที่กำหนดเอง', 'การสนับสนุน 24/7']
  }
};

const sampleAds: SampleAd[] = [
  {
    id: 'bua-daeng-homestay-ad',
    title: 'Bua Daeng Homestay',
    titleThai: 'บัวแดงโฮมสเตย์',
    category: 'homestay',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop',
    description: 'Stay with us for 800 THB/night! Garden views, WiFi, breakfast included.',
    descriptionThai: 'พักกับเราในราคา 800 บาท/คืน! วิวสวน, WiFi, รวมอาหารเช้า',
    link: '/services?category=homestays',
    contact: '089-6220962',
    hashtag: '#tourderwang',
    plan: adPlans.premium,
    metrics: {
      views: 1250,
      clicks: 89
    }
  },
  {
    id: 'baan-suan-rim-nam-ad',
    title: 'Baan Suan Rim Nam Restaurant',
    titleThai: 'ร้านบ้านสวนริมน้ำ',
    category: 'restaurant',
    image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400&h=300&fit=crop',
    description: 'Savor authentic Issan food by the river. Call 089-6220962 to reserve!',
    descriptionThai: 'ลิ้มรสอาหารอีสานแท้ริมแม่น้ำ โทร 089-6220962 เพื่อจอง!',
    link: '/restaurants',
    contact: '089-6220962',
    hashtag: '#วังสามหมอ',
    plan: adPlans.basic,
    metrics: {
      views: 890,
      clicks: 54
    }
  },
  {
    id: 'handicrafts-ad',
    title: 'Wang Sam Mo Handicrafts',
    titleThai: 'งานฝีมือวังสามหมอ',
    category: 'product',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
    description: 'Unique Issan crafts for 500 THB. Shop now!',
    descriptionThai: 'งานฝีมืออีสานที่เป็นเอกลักษณ์ ราคา 500 บาท ช้อปเลย!',
    link: '/services?category=handicrafts',
    hashtag: '#ที่นี่วังสามหมอ',
    plan: adPlans.enterprise,
    metrics: {
      views: 2100,
      clicks: 156
    }
  }
];

const AdvertisementPromotionSection = () => {
  const { language } = useLanguage();

  const getPlanBadgeColor = (color: string) => {
    switch (color) {
      case 'basic':
        return 'bg-blue-500 text-white';
      case 'premium':
        return 'bg-purple-500 text-white';
      case 'enterprise':
        return 'bg-orange-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'homestay':
        return MapPin;
      case 'restaurant':
        return Phone;
      case 'product':
        return Star;
      default:
        return Star;
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50/60 via-purple-50/40 to-amber-50/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-5 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1556740758-90de374c12ad?w=1200&h=800')",
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          title={language === 'th' ? 'โปรโมทธุรกิจของคุณ' : 'Promote Your Business'}
          titleThai={language === 'th' ? 'แพลตฟอร์มโฆษณาที่สร้างเอง' : '#ทัวร์เดอวัง'}
          subtitle={language === 'th' 
            ? 'สร้างและจัดการโฆษณาของธุรกิจท้องถิ่นด้วยตัวคุณเอง'
            : 'Create and manage your own business advertisements with our self-service platform'
          }
          linkTo="/why-advertise"
          linkText={language === 'th' ? 'ทำไมต้องโฆษณา?' : 'Why Advertise?'}
          className="text-center mb-12"
        />

        {/* Sample Ads Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {sampleAds.map((ad) => {
            const CategoryIcon = getCategoryIcon(ad.category);
            
            return (
              <Card 
                key={ad.id} 
                className="group overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-white/90 backdrop-blur-sm border-2 hover:border-purple-300"
              >
                {/* Ad Image */}
                <div className="relative">
                  <img 
                    src={ad.image}
                    alt={language === 'th' ? ad.titleThai : ad.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  
                  {/* Promoted Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-red-500 text-white text-xs font-semibold px-2 py-1 shadow-lg">
                      {language === 'th' ? 'โฆษณา' : 'Promoted'}
                    </Badge>
                  </div>

                  {/* Plan Badge */}
                  <div className="absolute top-4 right-4">
                    <Badge className={`${getPlanBadgeColor(ad.plan.color)} text-xs font-semibold px-2 py-1 shadow-lg`}>
                      {language === 'th' ? ad.plan.nameThai : ad.plan.name}
                    </Badge>
                  </div>

                  {/* Category Icon */}
                  <div className="absolute bottom-4 left-4">
                    <div className="bg-white/90 rounded-full p-2 shadow-lg">
                      <CategoryIcon className="h-4 w-4 text-purple-600" />
                    </div>
                  </div>

                  {/* Hashtag */}
                  <div className="absolute bottom-4 right-4">
                    <Badge className="bg-green-600/90 text-white text-xs">
                      {ad.hashtag}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-bold text-gray-900 mb-2 flex items-center justify-between">
                    <span>{language === 'th' ? ad.titleThai : ad.title}</span>
                    <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-purple-600 transition-colors" />
                  </CardTitle>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {language === 'th' ? ad.descriptionThai : ad.description}
                  </p>
                  {ad.contact && (
                    <p className="text-purple-600 text-sm font-medium mt-1">
                      📞 {ad.contact}
                    </p>
                  )}
                </CardHeader>

                <CardContent className="pt-0">
                  {/* Metrics (for Premium/Enterprise) */}
                  {ad.metrics && ad.plan.id !== 'basic' && (
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <div className="flex items-center justify-center mb-1">
                            <Eye className="h-4 w-4 text-blue-500 mr-1" />
                            <span className="text-sm font-semibold text-gray-900">
                              {ad.metrics.views.toLocaleString()}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600">
                            {language === 'th' ? 'ยอดดู' : 'Views'}
                          </p>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center mb-1">
                            <MousePointer className="h-4 w-4 text-green-500 mr-1" />
                            <span className="text-sm font-semibold text-gray-900">
                              {ad.metrics.clicks}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600">
                            {language === 'th' ? 'คลิก' : 'Clicks'}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Link to={ad.link}>
                      <Button 
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-2 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                      >
                        {ad.category === 'homestay' ? (language === 'th' ? 'เยี่ยมชมโฮมสเตย์' : 'Visit Homestay') :
                         ad.category === 'restaurant' ? (language === 'th' ? 'ดูเมนู' : 'View Menu') :
                         (language === 'th' ? 'ช้อปเลย' : 'Shop Now')}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>

                    {/* Plan Footer */}
                    <div className="text-center text-xs text-gray-500 bg-gray-50 rounded-lg p-2">
                      {language === 'th' 
                        ? `โปรโมทโดย ${ad.title} (${ad.plan.nameThai}, ${ad.plan.price.toLocaleString()} บาท/เดือน)`
                        : `Promoted by ${ad.title} (${ad.plan.name}, ${ad.plan.price.toLocaleString()} THB/month)`
                      }
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to Action Section */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white text-center shadow-2xl">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 rounded-full p-4">
                <Megaphone className="h-8 w-8" />
              </div>
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              {language === 'th' 
                ? 'เริ่มโปรโมทธุรกิจของคุณวันนี้!'
                : 'Start Promoting Your Business Today!'
              }
            </h3>
            
            <p className="text-lg mb-8 text-white/90">
              {language === 'th' 
                ? 'เข้าถึงลูกค้าท้องถิ่นมากกว่า 10,000 คนต่อเดือนด้วยแพลตฟอร์มโฆษณาที่ใช้งานง่าย'
                : 'Reach over 10,000 local customers monthly with our easy-to-use advertising platform'
              }
            </p>

            {/* Plan Comparison */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {Object.values(adPlans).map((plan) => (
                <div key={plan.id} className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <h4 className="font-bold text-lg mb-2">
                    {language === 'th' ? plan.nameThai : plan.name}
                  </h4>
                  <div className="text-2xl font-bold mb-3">
                    {plan.price.toLocaleString()} {language === 'th' ? 'บาท' : 'THB'}
                    <span className="text-sm font-normal text-white/80">
                      /{language === 'th' ? 'เดือน' : 'month'}
                    </span>
                  </div>
                  <ul className="text-sm space-y-1 text-white/90">
                    {(language === 'th' ? plan.featuresThai : plan.features).slice(0, 2).map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <div className="w-1.5 h-1.5 bg-white rounded-full mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/advertise">
                <Button 
                  size="lg"
                  className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <Megaphone className="mr-2 h-5 w-5" />
                  {language === 'th' ? 'สร้างโฆษณาของคุณ' : 'Create Your Ad'}
                </Button>
              </Link>
              
              <Link to="/why-advertise">
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white/10 font-semibold px-8 py-3 rounded-lg backdrop-blur-sm"
                >
                  <BarChart3 className="mr-2 h-5 w-5" />
                  {language === 'th' ? 'ทำไมต้องโฆษณา?' : 'Why Advertise?'}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Success Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-white/70 backdrop-blur-sm rounded-lg border border-purple-200">
            <div className="text-2xl font-bold text-purple-600 mb-1">250+</div>
            <div className="text-sm text-gray-600">
              {language === 'th' ? 'ธุรกิจที่เชื่อถือ' : 'Trusted Businesses'}
            </div>
          </div>
          <div className="text-center p-4 bg-white/70 backdrop-blur-sm rounded-lg border border-blue-200">
            <div className="text-2xl font-bold text-blue-600 mb-1">10K+</div>
            <div className="text-sm text-gray-600">
              {language === 'th' ? 'ผู้เยี่ยมชมรายเดือน' : 'Monthly Visitors'}
            </div>
          </div>
          <div className="text-center p-4 bg-white/70 backdrop-blur-sm rounded-lg border border-green-200">
            <div className="text-2xl font-bold text-green-600 mb-1">95%</div>
            <div className="text-sm text-gray-600">
              {language === 'th' ? 'ความพึงพอใจ' : 'Satisfaction Rate'}
            </div>
          </div>
          <div className="text-center p-4 bg-white/70 backdrop-blur-sm rounded-lg border border-orange-200">
            <div className="text-2xl font-bold text-orange-600 mb-1">24/7</div>
            <div className="text-sm text-gray-600">
              {language === 'th' ? 'การสนับสนุน' : 'Support Available'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvertisementPromotionSection;
