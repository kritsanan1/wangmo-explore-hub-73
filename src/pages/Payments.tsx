import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Shield, CreditCard, Smartphone, Building, Lock, CheckCircle, AlertTriangle, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHeading from "@/components/seo/SEOHeading";
import { useLanguage } from "@/contexts/LanguageContext";

const Payments = () => {
  const { language } = useLanguage();

  const paymentMethods = [
    {
      category: 'Credit & Debit Cards',
      categoryThai: 'บัตรเครดิตและเดบิต',
      icon: CreditCard,
      methods: [
        { name: 'Visa', logo: '💳', supported: true },
        { name: 'Mastercard', logo: '💳', supported: true },
        { name: 'American Express', logo: '💳', supported: true },
        { name: 'JCB', logo: '💳', supported: true }
      ]
    },
    {
      category: 'Mobile Payments',
      categoryThai: 'การชำระผ่านมือถือ',
      icon: Smartphone,
      methods: [
        { name: 'Apple Pay', logo: '📱', supported: true },
        { name: 'Google Pay', logo: '📱', supported: true },
        { name: 'Samsung Pay', logo: '📱', supported: true },
        { name: 'LINE Pay', logo: '📱', supported: true }
      ]
    },
    {
      category: 'Bank Transfers',
      categoryThai: 'การโอนผ่านธนาคาร',
      icon: Building,
      methods: [
        { name: 'Bangkok Bank', logo: '🏦', supported: true },
        { name: 'Kasikorn Bank', logo: '🏦', supported: true },
        { name: 'Siam Commercial Bank', logo: '🏦', supported: true },
        { name: 'Krung Thai Bank', logo: '🏦', supported: true }
      ]
    }
  ];

  const securityFeatures = [
    {
      title: 'PCI DSS Compliance',
      titleThai: 'มาตรฐาน PCI DSS',
      description: 'Stripe is certified to PCI Service Provider Level 1, the most stringent level of certification.',
      descriptionThai: 'Stripe ได้รับการรับรองตามมาตรฐาน PCI Service Provider Level 1 ซึ่งเป็นระดับการรับรองที่เข้มงวดที่สุด',
      icon: Shield
    },
    {
      title: 'End-to-End Encryption',
      titleThai: 'การเข้ารหัสแบบครบวงจร',
      description: 'All payment data is encrypted using industry-standard SSL/TLS protocols.',
      descriptionThai: 'ข้อมูลการชำระเงินทั้งหมดถูกเข้ารหัสด้วยโปรโตคอล SSL/TLS มาตรฐานอุตสาหกรรม',
      icon: Lock
    },
    {
      title: 'Fraud Protection',
      titleThai: 'การป้องกันการฉ้อโกง',
      description: 'Advanced machine learning algorithms detect and prevent fraudulent transactions.',
      descriptionThai: 'อัลกอริธึมการเรียนรู้ของเครื่องขั้นสูงตรวจจับและป้องกันการทำธุรกรรมที่ฉ้อโกง',
      icon: CheckCircle
    }
  ];

  const faqs = [
    {
      question: 'Is my payment information secure?',
      questionThai: 'ข้อมูลการชำระเงินของฉันปลอดภัยหรือไม่?',
      answer: 'Yes, all payment information is processed through Stripe, which uses bank-level security and encryption.',
      answerThai: 'ใช่ ข้อมูลการชำระเงินทั้งหมดประมวลผลผ่าน Stripe ซึ่งใช้ความปลอดภัยและการเข้ารหัสระดับธนาคาร'
    },
    {
      question: 'What happens if my payment fails?',
      questionThai: 'จะเกิดอะไรขึ้นหากการชำระเงินของฉันล้มเหลว?',
      answer: 'If a payment fails, you will be notified immediately and can try again with a different payment method.',
      answerThai: 'หากการชำระเงินล้มเหลว คุณจะได้รับการแจ้งเตือนทันทีและสามารถลองใหม่ด้วยวิธีการชำระเงินอื่น'
    },
    {
      question: 'Do you store my credit card information?',
      questionThai: 'คุณเก็บข้อมูลบัตรเครดิตข��งฉันไว้หรือไม่?',
      answer: 'No, we do not store any credit card information. All payment data is securely handled by Stripe.',
      answerThai: 'ไม่ เราไม่เก็บข้อมูลบัตรเครดิตใดๆ ข้อมูลการชำระเงินทั้งหมดจัดการอย่างปลอดภัยโดย Stripe'
    },
    {
      question: 'Can I get a refund?',
      questionThai: 'ฉันสามารถขอเงินคืนได้หรือไม่?',
      answer: 'Refund policies vary by merchant. Please contact the business directly for refund requests.',
      answerThai: 'นโยบายการคืนเงินแตกต่างกันตามผู้ขาย โปรดติดต่อธุรกิจโดยตรงสำหรับคำขอคืนเงิน'
    }
  ];

  return (
    <Layout>
      {/* Header Section */}
      <section className="relative py-16 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=800')",
          }}
        />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Back Button */}
          <div className="mb-8">
            <Link to="/">
              <Button variant="outline" className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {language === 'th' ? 'กลับสู่หน้าแรก' : 'Back to Homepage'}
              </Button>
            </Link>
          </div>

          {/* Page Title */}
          <div className="text-center mb-12">
            <SEOHeading 
              level={1} 
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
              keywords={["Wang Sam Mo", "payments", "Stripe", "secure payment"]}
            >
              {language === 'th' ? 'ระบบการชำระเงินที่ปลอดภัย' : 'Secure Payment System'}
            </SEOHeading>
            <p className="text-xl text-gray-600 mb-6">
              {language === 'th' 
                ? 'ชำระเงินปลอดภัยด้วยเทคโนโลยี Stripe ระดับโลก'
                : 'Safe and secure payments powered by world-class Stripe technology'
              }
            </p>
            
            <div className="flex justify-center">
              <Badge className="bg-green-500 text-white px-4 py-2 text-lg">
                <Shield className="mr-2 h-5 w-5" />
                {language === 'th' ? 'รับประกันความปลอดภัย 100%' : '100% Secure Guarantee'}
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Methods Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <SEOHeading level={2} className="text-3xl font-bold text-gray-900 mb-4">
              {language === 'th' ? 'วิธีการชำระเงินที่รองรับ' : 'Supported Payment Methods'}
            </SEOHeading>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {language === 'th' 
                ? 'เรารองรับวิธีการชำระเงินที่หลากหลายเพื่อความสะดวกของคุณ'
                : 'We support a wide variety of payment methods for your convenience'
              }
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {paymentMethods.map((category, index) => (
              <Card key={index} className="shadow-lg border-2 hover:border-green-300 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <category.icon className="mr-3 h-6 w-6 text-green-600" />
                    {language === 'th' ? category.categoryThai : category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {category.methods.map((method, methodIndex) => (
                      <div key={methodIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">{method.logo}</span>
                          <span className="font-medium">{method.name}</span>
                        </div>
                        {method.supported && (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Security Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <SEOHeading level={2} className="text-3xl font-bold text-gray-900 mb-4">
              {language === 'th' ? 'คุณสมบัติด้านความปลอดภัย' : 'Security Features'}
            </SEOHeading>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {language === 'th' 
                ? 'ระบบการชำระเงินของเราใช้เทคโนโลยีความปลอดภัยชั้นนำของโลก'
                : 'Our payment system uses world-leading security technology'
              }
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {securityFeatures.map((feature, index) => (
              <Card key={index} className="text-center shadow-lg">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <feature.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">
                    {language === 'th' ? feature.titleThai : feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    {language === 'th' ? feature.descriptionThai : feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <SEOHeading level={2} className="text-3xl font-bold text-gray-900 mb-4">
              {language === 'th' ? 'คำถามที่พบบ่อย' : 'Frequently Asked Questions'}
            </SEOHeading>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <HelpCircle className="mr-3 h-5 w-5 text-blue-600" />
                    {language === 'th' ? faq.questionThai : faq.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 pl-8">
                    {language === 'th' ? faq.answerThai : faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-white">
            <h3 className="text-3xl font-bold mb-4">
              {language === 'th' 
                ? 'พร้อมเริ่มช้อปแล้วหรือยัง?'
                : 'Ready to Start Shopping?'
              }
            </h3>
            <p className="text-xl mb-8 text-white/90">
              {language === 'th' 
                ? 'เพลิดเพลินกับการช้อปปิ้งผลิตภัณฑ์ท้องถิ่นและการจองโฮมสเตย์อย่างปลอดภัย'
                : 'Enjoy secure shopping for local products and homestay bookings'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button 
                  size="lg"
                  className="bg-white text-green-600 hover:bg-gray-100 font-semibold px-8 py-3"
                >
                  {language === 'th' ? 'เริ่มช้อปปิ้ง' : 'Start Shopping'}
                </Button>
              </Link>
              <Link to="/cart">
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white/10 font-semibold px-8 py-3"
                >
                  {language === 'th' ? 'ดูตะกร้า' : 'View Cart'}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Payments;
