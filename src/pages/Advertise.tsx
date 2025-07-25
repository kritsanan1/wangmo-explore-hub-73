import Layout from "@/components/Layout";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, Megaphone, CreditCard, BarChart3, Eye, MousePointer, TrendingUp, CheckCircle, Upload, Star } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHeading from "@/components/seo/SEOHeading";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

interface AdPlan {
  id: string;
  name: string;
  nameThai: string;
  price: number;
  color: string;
  features: string[];
  featuresThai: string[];
  recommended?: boolean;
}

const adPlans: AdPlan[] = [
  {
    id: 'basic',
    name: 'Basic Plan',
    nameThai: 'แพ็คเกจพื้นฐาน',
    price: 500,
    color: 'bg-blue-500',
    features: [
      'Medium banner ads (300x250px)',
      'Basic business listing',
      'Email support',
      'Monthly performance report'
    ],
    featuresThai: [
      'โฆษณาแบนเนอร์ขนาดกลาง (300x250px)',
      'การลิสต์ธุรกิจพื้นฐาน',
      'การสนับสนุนทางอีเมล',
      'รายงานผลงานรายเดือน'
    ]
  },
  {
    id: 'premium',
    name: 'Premium Plan',
    nameThai: 'แพ็คเกจพรีเมียม',
    price: 2000,
    color: 'bg-purple-500',
    features: [
      'Large banner ads (728x90px)',
      'Featured business listing',
      'Real-time analytics dashboard',
      'Priority email & phone support',
      'Social media promotion',
      'SEO optimization'
    ],
    featuresThai: [
      'โฆษณาแบนเนอร์ขนาดใหญ่ (728x90px)',
      'การลิสต์ธุรกิจแบบเด่น',
      'แดชบอร์ดการวิเคราะห์แบบเรียลไทม์',
      'การสนับสนุนอีเมลและโทรศัพท์ลำดับแรก',
      'การโปรโมทโซเชียลมีเดีย',
      'การปรับแต่ง SEO'
    ],
    recommended: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise Plan',
    nameThai: 'แพ็คเกจองค์กร',
    price: 5000,
    color: 'bg-orange-500',
    features: [
      'Exclusive banner placements',
      'Premium business profile',
      'Advanced analytics & insights',
      'Dedicated account manager',
      'Custom ad formats',
      'A/B testing capabilities',
      '24/7 priority support',
      'Multi-location support'
    ],
    featuresThai: [
      'การจัดวางแบนเนอร์เฉพาะ',
      'โปรไฟล์ธุรกิจระดับพรีเมียม',
      'การวิเคราะห์และข้อมูลเชิงลึกขั้นสูง',
      'ผู้จัดการบัญชีเฉพาะ',
      'รูปแบบโฆษณาที่กำหนดเอง',
      'ความสามารถในการทดสอบ A/B',
      'การสนับสนุนลำดับแรก 24/7',
      'การสนับสนุนหลายสถานที่'
    ]
  }
];

const Advertise = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState<string>('premium');
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: '',
    description: '',
    website: '',
    phone: '',
    email: '',
    adTitle: '',
    adDescription: '',
    targetKeywords: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    // Simulate form submission
    toast({
      title: language === 'th' ? "ส่งคำขอสำเร็จ!" : "Application Submitted!",
      description: language === 'th' 
        ? "เราจะติดต่อกลับภายใน 24 ชั่วโมง"
        : "We'll contact you within 24 hours",
    });
  };

  const businessTypes = [
    { value: 'homestay', label: language === 'th' ? 'โฮมสเตย์' : 'Homestay' },
    { value: 'restaurant', label: language === 'th' ? 'ร้านอาหาร' : 'Restaurant' },
    { value: 'products', label: language === 'th' ? 'ผลิตภัณฑ์ท้องถิ่น' : 'Local Products' },
    { value: 'services', label: language === 'th' ? 'บริการ' : 'Services' },
    { value: 'tours', label: language === 'th' ? 'ทัวร์' : 'Tours' },
    { value: 'other', label: language === 'th' ? 'อื่นๆ' : 'Other' }
  ];

  return (
    <Layout>
      {/* Header Section */}
      <section className="relative py-16 bg-gradient-to-br from-purple-50 via-blue-50 to-amber-50 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1556740758-90de374c12ad?w=1200&h=800')",
          }}
        />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Back Button */}
          <div className="mb-8">
            <Link to="/">
              <Button variant="outline" className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {language === 'th' ? 'กลับสู่ห���้าแรก' : 'Back to Homepage'}
              </Button>
            </Link>
          </div>

          {/* Page Title */}
          <div className="text-center mb-12">
            <SEOHeading 
              level={1} 
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
              keywords={["Wang Sam Mo", "advertise", "business promotion", "local marketing"]}
            >
              {language === 'th' ? 'สร้างโฆษณาของคุณ' : 'Create Your Advertisement'}
            </SEOHeading>
            <p className="text-xl text-gray-600 mb-6">
              {language === 'th' 
                ? 'เข้าถึงลูกค้าท้องถิ่นมากกว่า 10,000 คนต่อเดือนด้วยแพลตฟอร์มโฆษณาที่ใช้งานง่าย'
                : 'Reach over 10,000 local customers monthly with our easy-to-use advertising platform'
              }
            </p>
          </div>
        </div>
      </section>

      {/* Plan Selection Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <SEOHeading level={2} className="text-3xl font-bold text-gray-900 mb-4">
              {language === 'th' ? 'เลือกแพ็คเกจที่เหมาะกับคุณ' : 'Choose Your Perfect Plan'}
            </SEOHeading>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {language === 'th' 
                ? 'แต่ละแพ็คเกจออกแบบมาเพื่อตอบสนองความต้องการของธุรกิจในขนาดที่แตกต่างกัน'
                : 'Each plan is designed to meet the needs of different business sizes and goals'
              }
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {adPlans.map((plan) => (
              <Card 
                key={plan.id} 
                className={`relative cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                  selectedPlan === plan.id 
                    ? 'ring-4 ring-purple-300 shadow-2xl' 
                    : 'shadow-lg hover:shadow-xl'
                } ${plan.recommended ? 'border-2 border-purple-400' : ''}`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-purple-500 text-white px-4 py-1 text-sm font-semibold">
                      <Star className="mr-1 h-3 w-3" />
                      {language === 'th' ? 'แนะนำ' : 'Recommended'}
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center">
                  <div className={`w-16 h-16 ${plan.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Megaphone className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl">
                    {language === 'th' ? plan.nameThai : plan.name}
                  </CardTitle>
                  <div className="text-3xl font-bold text-gray-900">
                    {plan.price.toLocaleString()} {language === 'th' ? 'บาท' : 'THB'}
                    <span className="text-base font-normal text-gray-600">
                      /{language === 'th' ? 'เดือน' : 'month'}
                    </span>
                  </div>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3">
                    {(language === 'th' ? plan.featuresThai : plan.features).map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6">
                    <Button 
                      className={`w-full ${
                        selectedPlan === plan.id 
                          ? 'bg-purple-600 hover:bg-purple-700' 
                          : 'bg-gray-600 hover:bg-gray-700'
                      } text-white`}
                    >
                      {selectedPlan === plan.id 
                        ? (language === 'th' ? 'เลือกแล้ว' : 'Selected') 
                        : (language === 'th' ? 'เลือกแพ็คเกจนี้' : 'Select Plan')
                      }
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <SEOHeading level={2} className="text-3xl font-bold text-gray-900 mb-4">
              {language === 'th' ? 'ข้อมูลธุรกิจของคุณ' : 'Your Business Information'}
            </SEOHeading>
            <p className="text-gray-600">
              {language === 'th' 
                ? 'กรอกข้อมูลเพื่อสร้างโฆษณาที่มีประสิทธิภาพสำหรับธุรกิจของคุณ'
                : 'Fill in the details to create an effective advertisement for your business'
              }
            </p>
          </div>

          <Card className="shadow-lg">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Business Information */}
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="businessName" className="text-base font-semibold">
                      {language === 'th' ? 'ชื่อธุรกิจ' : 'Business Name'}
                    </Label>
                    <Input
                      id="businessName"
                      value={formData.businessName}
                      onChange={(e) => handleInputChange('businessName', e.target.value)}
                      placeholder={language === 'th' ? 'เช่น บัวแดงโฮมสเตย์' : 'e.g. Bua Daeng Homestay'}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label className="text-base font-semibold">
                      {language === 'th' ? 'ประเภธุรกิจ' : 'Business Type'}
                    </Label>
                    <RadioGroup 
                      value={formData.businessType} 
                      onValueChange={(value) => handleInputChange('businessType', value)}
                      className="mt-2"
                    >
                      {businessTypes.map((type) => (
                        <div key={type.value} className="flex items-center space-x-2">
                          <RadioGroupItem value={type.value} id={type.value} />
                          <Label htmlFor={type.value}>{type.label}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-base font-semibold">
                      {language === 'th' ? 'เบอร์โทรศัพท์' : 'Phone Number'}
                    </Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder={language === 'th' ? 'เช่น 089-6220962' : 'e.g. 089-6220962'}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-base font-semibold">
                      {language === 'th' ? 'อีเมล' : 'Email'}
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder={language === 'th' ? 'เช่น info@buadaeng.com' : 'e.g. info@buadaeng.com'}
                      className="mt-2"
                    />
                  </div>
                </div>

                {/* Advertisement Content */}
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="adTitle" className="text-base font-semibold">
                      {language === 'th' ? 'หัวข้อโฆษณา' : 'Advertisement Title'}
                    </Label>
                    <Input
                      id="adTitle"
                      value={formData.adTitle}
                      onChange={(e) => handleInputChange('adTitle', e.target.value)}
                      placeholder={language === 'th' ? 'เช่น พักผ่อนที่บัวแดงโฮมสเตย์' : 'e.g. Stay at Bua Daeng Homestay'}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="adDescription" className="text-base font-semibold">
                      {language === 'th' ? 'คำอธิบายโฆษณา' : 'Advertisement Description'}
                    </Label>
                    <Textarea
                      id="adDescription"
                      value={formData.adDescription}
                      onChange={(e) => handleInputChange('adDescription', e.target.value)}
                      placeholder={language === 'th' 
                        ? 'อธิบายสิ่งที่ดีที่สุดเกี่ยวกับธุรกิจของคุณ...'
                        : 'Describe what makes your business special...'
                      }
                      rows={4}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="targetKeywords" className="text-base font-semibold">
                      {language === 'th' ? 'คำสำคัญ (แฮชแท็ก)' : 'Keywords (Hashtags)'}
                    </Label>
                    <Input
                      id="targetKeywords"
                      value={formData.targetKeywords}
                      onChange={(e) => handleInputChange('targetKeywords', e.target.value)}
                      placeholder={language === 'th' ? 'เช่น #วังสามหมอ #โฮมสเตย์' : 'e.g. #WangSamMo #Homestay'}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label className="text-base font-semibold">
                      {language === 'th' ? 'อัปโหลดรูปภาพ' : 'Upload Image'}
                    </Label>
                    <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">
                        {language === 'th' 
                          ? 'คลิกเพื่ออัปโหลดหรือลากไฟล์มาวาง (ขนาดไม่เกิน 100KB)'
                          : 'Click to upload or drag and drop (Max 100KB)'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Selected Plan Summary */}
              <div className="mt-8 p-6 bg-purple-50 rounded-lg border border-purple-200">
                <h4 className="text-lg font-semibold text-purple-900 mb-4">
                  {language === 'th' ? 'สรุปแพ็คเกจที่เลือก' : 'Selected Plan Summary'}
                </h4>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">
                      {language === 'th' 
                        ? adPlans.find(p => p.id === selectedPlan)?.nameThai
                        : adPlans.find(p => p.id === selectedPlan)?.name
                      }
                    </p>
                    <p className="text-sm text-gray-600">
                      {language === 'th' ? 'การเรียกเก็บเงินรายเดือน' : 'Monthly billing'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-purple-600">
                      {adPlans.find(p => p.id === selectedPlan)?.price.toLocaleString()} THB
                    </p>
                    <p className="text-sm text-gray-600">
                      /{language === 'th' ? 'เดือน' : 'month'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-8 text-center">
                <Button 
                  onClick={handleSubmit}
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-12 py-4 text-lg font-semibold rounded-lg shadow-lg"
                >
                  <CreditCard className="mr-2 h-5 w-5" />
                  {language === 'th' ? 'ดำเนินการชำระเงิน' : 'Proceed to Payment'}
                </Button>
                <p className="text-sm text-gray-600 mt-4">
                  {language === 'th' 
                    ? 'โฆษณาของคุณจะเผยแพร่ภายใน 5 นาที��ลังการชำระเงิน'
                    : 'Your ad will be live within 5 minutes after payment'
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <SEOHeading level={2} className="text-3xl font-bold text-gray-900 mb-4">
              {language === 'th' ? 'ทำไมต้องเลือกเรา?' : 'Why Choose Us?'}
            </SEOHeading>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">
                {language === 'th' ? 'เข้าถึงกว้าง' : 'Wide Reach'}
              </h4>
              <p className="text-gray-600">
                {language === 'th' 
                  ? 'เข้าถึงลูกค้าท้องถิ่นมากกว่า 10,000 คนต่อเดือน'
                  : 'Reach over 10,000 local customers monthly'
                }
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">
                {language === 'th' ? 'การวิเคราะห์แบบเรียลไทม์' : 'Real-time Analytics'}
              </h4>
              <p className="text-gray-600">
                {language === 'th' 
                  ? 'ติดตามผลการโฆษณาและปรับปรุงได้ทันที'
                  : 'Track ad performance and optimize in real-time'
                }
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">
                {language === 'th' ? 'เพิ่มยอดขาย' : 'Boost Sales'}
              </h4>
              <p className="text-gray-600">
                {language === 'th' 
                  ? 'ธุรกิจที่ใช้บริการเพิ่มยอดขายเฉลี่ย 35%'
                  : 'Businesses see an average 35% increase in sales'
                }
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Advertise;
