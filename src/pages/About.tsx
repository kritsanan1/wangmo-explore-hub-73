import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Heart, 
  Users, 
  MapPin, 
  Star, 
  TrendingUp, 
  DollarSign, 
  Megaphone, 
  ShoppingBag, 
  Briefcase,
  BarChart3,
  CheckCircle,
  Target,
  Globe,
  Handshake
} from "lucide-react";

const About = () => {
  const businessPlans = [
    {
      name: "Basic Listing",
      price: "Free",
      currency: "",
      period: "",
      description: "Perfect for getting started",
      features: [
        "Basic business listing",
        "Contact information display",
        "Photo gallery (up to 3 images)",
        "Customer reviews",
        "Location on map"
      ],
      popular: false
    },
    {
      name: "Standard Plan",
      price: "1,000",
      currency: "THB",
      period: "/month",
      description: "Most popular for local businesses",
      features: [
        "Featured listing badge",
        "Priority in search results",
        "Unlimited photos",
        "Basic booking system",
        "Customer reviews & ratings",
        "Monthly analytics report",
        "Social media integration"
      ],
      popular: true
    },
    {
      name: "Premium Plan",
      price: "3,000",
      currency: "THB",
      period: "/month",
      description: "Complete business growth package",
      features: [
        "All Standard Plan features",
        "Banner advertising slots",
        "Detailed analytics dashboard",
        "Custom business page design",
        "Priority customer support",
        "Marketing consultation",
        "Special event promotion"
      ],
      popular: false
    }
  ];

  const revenueStreams = [
    {
      icon: <Megaphone className="h-8 w-8 text-orange-500" />,
      title: "Banner Advertising",
      description: "Promote your business with eye-catching banners on our homepage and category pages.",
      pricing: "500-2,000 THB/month",
      features: ["Prime homepage placement", "Category page visibility", "Mobile-optimized ads"]
    },
    {
      icon: <ShoppingBag className="h-8 w-8 text-green-500" />,
      title: "E-commerce Sales",
      description: "Sell your local products through our online marketplace with secure payment processing.",
      pricing: "5-10% commission",
      features: ["Product listings", "Secure payments", "Order management", "Customer support"]
    },
    {
      icon: <Briefcase className="h-8 w-8 text-blue-500" />,
      title: "Job Listings",
      description: "Post job openings to attract local talent and grow your business.",
      pricing: "200-500 THB per listing",
      features: ["30-day active listing", "Application management", "Candidate screening tools"]
    },
    {
      icon: <DollarSign className="h-8 w-8 text-purple-500" />,
      title: "Booking Commissions",
      description: "Accept bookings for your services and accommodations with our integrated system.",
      pricing: "5-10% per booking",
      features: ["Real-time availability", "Secure payments", "Guest communication", "Review system"]
    }
  ];

  const communityStats = [
    { label: "Local Businesses", value: "150+", icon: <Users className="h-5 w-5" /> },
    { label: "Tourist Visits", value: "2,500+", icon: <MapPin className="h-5 w-5" /> },
    { label: "Average Rating", value: "4.8/5", icon: <Star className="h-5 w-5" /> },
    { label: "Revenue Generated", value: "₿500K+", icon: <TrendingUp className="h-5 w-5" /> }
  ];

  return (
    <Layout>
      <div className="min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              About Tour Der Wang
            </h1>
            <h2 className="text-xl lg:text-2xl text-muted-foreground mb-6">
              เกี่ยวกับทัวร์เดอร์วัง
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Connecting travelers with authentic experiences while empowering local businesses 
              in Wang Sam Mo, Udon Thani. Together, we're building a sustainable tourism ecosystem 
              that benefits our entire community.
            </p>
          </div>

          {/* Community Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {communityStats.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-2 text-primary">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Our Mission */}
          <section className="mb-16">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-6 flex items-center gap-2">
                  <Heart className="h-8 w-8 text-red-500" />
                  Our Mission
                </h3>
                <p className="text-lg text-muted-foreground mb-4">
                  Wang Sam Mo is a hidden gem in Udon Thani province, rich in cultural heritage 
                  and natural beauty. Our mission is to showcase the authentic charm of our community 
                  while creating sustainable economic opportunities for local businesses.
                </p>
                <p className="text-lg text-muted-foreground mb-6">
                  From the serene Wang Yai Park to traditional homestays like Bua Daeng and Ban Diam, 
                  we celebrate the unique experiences that make Wang Sam Mo special.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">Sustainable Tourism</Badge>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">Community Driven</Badge>
                  <Badge variant="secondary" className="bg-orange-100 text-orange-800">Cultural Heritage</Badge>
                </div>
              </div>
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-8 rounded-lg">
                <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Why Wang Sam Mo?
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Authentic northern Thai culture and traditions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Beautiful natural landscapes and serene parks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Warm hospitality from local families</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Affordable and genuine travel experiences</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Close proximity to Udon Thani (only 103 km)</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <Separator className="my-16" />

          {/* Business Partnership Section */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
                <Handshake className="h-8 w-8 text-blue-500" />
                Partner with Us
              </h3>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Join our growing community of local businesses and start reaching more customers today. 
                Choose a plan that fits your needs and budget.
              </p>
            </div>

            {/* Pricing Plans */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {businessPlans.map((plan, index) => (
                <Card key={index} className={`relative ${plan.popular ? 'border-primary shadow-lg' : ''}`}>
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
                      Most Popular
                    </Badge>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <div className="flex items-baseline justify-center gap-1 mt-4">
                      <span className="text-3xl font-bold text-primary">{plan.price}</span>
                      <span className="text-sm text-muted-foreground">{plan.currency}</span>
                      <span className="text-sm text-muted-foreground">{plan.period}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className="w-full" 
                      variant={plan.popular ? "default" : "outline"}
                    >
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Revenue Streams */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
                <Target className="h-8 w-8 text-green-500" />
                Revenue Opportunities
              </h3>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Multiple ways to generate income and grow your business through our platform.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {revenueStreams.map((stream, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      {stream.icon}
                      <CardTitle className="text-xl">{stream.title}</CardTitle>
                    </div>
                    <CardDescription className="text-base">
                      {stream.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium text-muted-foreground">Pricing:</span>
                      <Badge variant="outline" className="text-primary border-primary">
                        {stream.pricing}
                      </Badge>
                    </div>
                    <ul className="space-y-1">
                      {stream.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Success Stories */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
                <BarChart3 className="h-8 w-8 text-purple-500" />
                Success Stories
              </h3>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Real results from our business partners in Wang Sam Mo.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Sahamui & Sons Restaurant</CardTitle>
                  <CardDescription>Traditional Thai Cuisine</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Monthly Bookings:</span>
                      <span className="font-semibold text-green-600">+150%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Customer Reviews:</span>
                      <span className="font-semibold">4.8/5 ⭐</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Revenue Growth:</span>
                      <span className="font-semibold text-green-600">+85%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Bua Daeng Homestay</CardTitle>
                  <CardDescription>Traditional Accommodation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Occupancy Rate:</span>
                      <span className="font-semibold text-green-600">92%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Guest Rating:</span>
                      <span className="font-semibold">4.9/5 ⭐</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Repeat Guests:</span>
                      <span className="font-semibold text-green-600">45%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Local Products Market</CardTitle>
                  <CardDescription>Handicrafts & Food</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Products Sold:</span>
                      <span className="font-semibold text-green-600">500+ items</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Vendor Earnings:</span>
                      <span className="font-semibold">₿250K/month</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Customer Satisfaction:</span>
                      <span className="font-semibold">4.7/5 ⭐</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center bg-gradient-to-r from-primary/10 to-accent/10 p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Ready to Join Our Community?</h3>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Whether you're a local business owner or a traveler seeking authentic experiences, 
              Tour Der Wang is here to connect you with the heart of Wang Sam Mo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8">
                List Your Business
              </Button>
              <Button size="lg" variant="outline" className="px-8">
                Explore Attractions
              </Button>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default About;