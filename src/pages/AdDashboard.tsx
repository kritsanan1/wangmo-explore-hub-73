import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { 
  Upload, 
  Eye, 
  MousePointer, 
  Calendar, 
  CreditCard, 
  CheckCircle, 
  Clock,
  DollarSign,
  TrendingUp,
  Star,
  AlertCircle
} from "lucide-react";

const AdDashboard = () => {
  const [adPlan, setAdPlan] = useState<"basic" | "premium">("basic");

  // Mock data for user's existing ads
  const userAds = [
    {
      id: "1",
      title: "Bua Daeng Homestay - Garden Paradise",
      plan: "premium",
      status: "active",
      views: 1247,
      clicks: 89,
      ctr: 7.1,
      expiresAt: "2024-12-31",
      revenue: 2000
    },
    {
      id: "2", 
      title: "Traditional Pickled Vegetables",
      plan: "basic",
      status: "pending",
      views: 0,
      clicks: 0,
      ctr: 0,
      expiresAt: "2024-12-15",
      revenue: 500
    }
  ];

  const totalRevenue = userAds.reduce((sum, ad) => sum + ad.revenue, 0);
  const totalViews = userAds.reduce((sum, ad) => sum + ad.views, 0);
  const totalClicks = userAds.reduce((sum, ad) => sum + ad.clicks, 0);
  const avgCTR = totalViews > 0 ? (totalClicks / totalViews * 100).toFixed(1) : "0";

  return (
    <Layout>
      <div className="min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
              Business Advertising Dashboard
            </h1>
            <p className="text-lg text-muted-foreground">
              แดชบอร์ดการโฆษณาธุรกิจ - Manage your ads and reach more customers in Wang Sam Mo
            </p>
          </div>

          {/* Analytics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                    <p className="text-2xl font-bold text-foreground">{totalViews.toLocaleString()}</p>
                  </div>
                  <Eye className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Clicks</p>
                    <p className="text-2xl font-bold text-foreground">{totalClicks}</p>
                  </div>
                  <MousePointer className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Avg. CTR</p>
                    <p className="text-2xl font-bold text-foreground">{avgCTR}%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Spent</p>
                    <p className="text-2xl font-bold text-foreground">{totalRevenue.toLocaleString()} THB</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="my-ads" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="my-ads">My Ads</TabsTrigger>
              <TabsTrigger value="create-ad">Create New Ad</TabsTrigger>
              <TabsTrigger value="pricing">Pricing Plans</TabsTrigger>
            </TabsList>

            {/* My Ads Tab */}
            <TabsContent value="my-ads" className="space-y-6">
              <div className="grid gap-6">
                {userAds.map((ad) => (
                  <Card key={ad.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{ad.title}</CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge variant={ad.plan === "premium" ? "default" : "secondary"}>
                            {ad.plan === "premium" ? "Premium" : "Basic"}
                          </Badge>
                          <Badge 
                            variant={ad.status === "active" ? "default" : ad.status === "pending" ? "secondary" : "destructive"}
                          >
                            {ad.status === "active" && <CheckCircle className="h-3 w-3 mr-1" />}
                            {ad.status === "pending" && <Clock className="h-3 w-3 mr-1" />}
                            {ad.status === "rejected" && <AlertCircle className="h-3 w-3 mr-1" />}
                            {ad.status.charAt(0).toUpperCase() + ad.status.slice(1)}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-blue-600">{ad.views.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">Views</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-green-600">{ad.clicks}</p>
                          <p className="text-sm text-muted-foreground">Clicks</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-purple-600">{ad.ctr}%</p>
                          <p className="text-sm text-muted-foreground">CTR</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-orange-600">{ad.revenue} THB</p>
                          <p className="text-sm text-muted-foreground">Spent</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium">{ad.expiresAt}</p>
                          <p className="text-sm text-muted-foreground">Expires</p>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm">
                          Edit Ad
                        </Button>
                        <Button variant="outline" size="sm">
                          Renew
                        </Button>
                        <Button variant="destructive" size="sm">
                          Pause
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Create Ad Tab */}
            <TabsContent value="create-ad" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Create New Advertisement</CardTitle>
                  <CardDescription>
                    Design your ad to promote your business to visitors of Wang Sam Mo
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Plan Selection */}
                  <div className="space-y-2">
                    <Label>Select Ad Plan</Label>
                    <Select value={adPlan} onValueChange={(value: "basic" | "premium") => setAdPlan(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic Plan - 500 THB/month (300x250px)</SelectItem>
                        <SelectItem value="premium">Premium Plan - 2,000 THB/month (728x90px + Analytics)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Business Name */}
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Business Name</Label>
                    <Input
                      id="businessName"
                      placeholder="Enter your business name"
                    />
                  </div>

                  {/* Ad Title */}
                  <div className="space-y-2">
                    <Label htmlFor="adTitle">Ad Title</Label>
                    <Input
                      id="adTitle"
                      placeholder="e.g., Stay at Bua Daeng Homestay - 800 THB/night"
                      maxLength={60}
                    />
                    <p className="text-sm text-muted-foreground">Maximum 60 characters</p>
                  </div>

                  {/* Ad Description */}
                  <div className="space-y-2">
                    <Label htmlFor="adDescription">Description</Label>
                    <Textarea
                      id="adDescription"
                      placeholder="Describe your business offering..."
                      rows={3}
                      maxLength={120}
                    />
                    <p className="text-sm text-muted-foreground">Maximum 120 characters</p>
                  </div>

                  {/* Website Link */}
                  <div className="space-y-2">
                    <Label htmlFor="adLink">Website/Contact Link</Label>
                    <Input
                      id="adLink"
                      type="url"
                      placeholder="https://your-website.com or phone number"
                    />
                  </div>

                  {/* Image Upload */}
                  <div className="space-y-2">
                    <Label>Ad Image</Label>
                    <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Upload an image for your ad (max 100KB for fast loading)
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Recommended: {adPlan === "premium" ? "728x90 pixels" : "300x250 pixels"}
                      </p>
                      <Button variant="outline" className="mt-2">
                        Choose File
                      </Button>
                    </div>
                  </div>

                  {/* Ad Preview */}
                  <div className="space-y-2">
                    <Label>Preview</Label>
                    <div className="border rounded-lg p-4 bg-muted/30">
                      <p className="text-sm text-muted-foreground mb-2">Ad preview will appear here</p>
                      <div className={`border-2 border-dashed border-muted-foreground/30 rounded ${
                        adPlan === "premium" ? "h-20" : "h-40"
                      } flex items-center justify-center`}>
                        <p className="text-muted-foreground">
                          {adPlan === "premium" ? "728x90 Banner" : "300x250 Banner"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Payment Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Payment Summary</h3>
                    <div className="bg-muted/30 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span>Plan:</span>
                        <span className="font-medium">
                          {adPlan === "premium" ? "Premium" : "Basic"} 
                        </span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span>Duration:</span>
                        <span>30 days</span>
                      </div>
                      <div className="flex justify-between items-center font-semibold text-lg">
                        <span>Total:</span>
                        <span>{adPlan === "premium" ? "2,000" : "500"} THB</span>
                      </div>
                    </div>
                    
                    <Button className="w-full" size="lg">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Proceed to Payment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Pricing Tab */}
            <TabsContent value="pricing" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Basic Plan */}
                <Card>
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl">Basic Plan</CardTitle>
                    <CardDescription>Perfect for small local businesses</CardDescription>
                    <div className="flex items-baseline justify-center gap-1 mt-4">
                      <span className="text-3xl font-bold text-primary">500</span>
                      <span className="text-sm text-muted-foreground">THB/month</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Medium banner ads (300x250 pixels)</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Homepage sidebar placement</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>30-day active period</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Basic analytics (views, clicks)</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Mobile-optimized display</span>
                      </li>
                    </ul>
                    <Button className="w-full" variant="outline">
                      Choose Basic Plan
                    </Button>
                  </CardContent>
                </Card>

                {/* Premium Plan */}
                <Card className="border-primary shadow-lg relative">
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
                    Most Popular
                  </Badge>
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl">Premium Plan</CardTitle>
                    <CardDescription>Maximum visibility for your business</CardDescription>
                    <div className="flex items-baseline justify-center gap-1 mt-4">
                      <span className="text-3xl font-bold text-primary">2,000</span>
                      <span className="text-sm text-muted-foreground">THB/month</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Large banner ads (728x90 pixels)</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Priority homepage placement</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>30-day active period</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Advanced analytics & reporting</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Click tracking & conversion data</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <Star className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <span>Featured badge display</span>
                      </li>
                    </ul>
                    <Button className="w-full">
                      Choose Premium Plan
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Features Comparison */}
              <Card>
                <CardHeader>
                  <CardTitle>Why Advertise with Tour Der Wang?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <Eye className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                      <h3 className="font-semibold mb-2">High Visibility</h3>
                      <p className="text-sm text-muted-foreground">
                        Reach thousands of tourists visiting Wang Sam Mo monthly
                      </p>
                    </div>
                    <div className="text-center">
                      <DollarSign className="h-8 w-8 mx-auto mb-2 text-green-500" />
                      <h3 className="font-semibold mb-2">Affordable Pricing</h3>
                      <p className="text-sm text-muted-foreground">
                        Budget-friendly plans designed for small local businesses
                      </p>
                    </div>
                    <div className="text-center">
                      <TrendingUp className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                      <h3 className="font-semibold mb-2">Measurable Results</h3>
                      <p className="text-sm text-muted-foreground">
                        Track views, clicks, and customer engagement in real-time
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default AdDashboard;