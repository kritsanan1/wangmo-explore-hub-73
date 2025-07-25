import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Eye,
  MousePointer,
  TrendingUp,
  DollarSign,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  Pause,
  Play,
  Edit,
  RotateCcw,
  Plus,
  BarChart3,
  Target,
  Users,
  Globe
} from "lucide-react";
import PricingPlans from "./PricingPlans";
import PaymentWorkflow from "./PaymentWorkflow";

interface Advertisement {
  id: string;
  title: string;
  title_thai?: string;
  business_name: string;
  status: 'active' | 'pending' | 'paused' | 'expired';
  plan_type: string;
  views: number;
  clicks: number;
  start_date: string;
  end_date?: string;
  created_at: string;
  image_url?: string;
}

interface Subscription {
  id: string;
  plan_type: string;
  status: string;
  amount_thb: number;
  current_period_start: string;
  current_period_end: string;
  advertisement_id: string;
}

const AdvertisingDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const { toast } = useToast();

  // Fetch user's advertisements
  const { data: advertisements = [], isLoading: adsLoading, refetch: refetchAds } = useQuery({
    queryKey: ['user-advertisements'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('advertisements')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Advertisement[];
    }
  });

  // Fetch user's subscriptions
  const { data: subscriptions = [], isLoading: subsLoading } = useQuery({
    queryKey: ['user-subscriptions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ad_subscriptions')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Subscription[];
    }
  });

  // Calculate analytics
  const analytics = {
    totalViews: advertisements.reduce((sum, ad) => sum + (ad.views || 0), 0),
    totalClicks: advertisements.reduce((sum, ad) => sum + (ad.clicks || 0), 0),
    totalSpent: subscriptions.reduce((sum, sub) => sum + sub.amount_thb, 0),
    activeAds: advertisements.filter(ad => ad.status === 'active').length,
    avgCTR: 0
  };

  analytics.avgCTR = analytics.totalViews > 0 ? 
    (analytics.totalClicks / analytics.totalViews * 100) : 0;

  const handleSelectPlan = (planId: string, isYearly: boolean) => {
    const planPrices = {
      basic: { monthly: 500, yearly: 5000 },
      premium: { monthly: 2000, yearly: 20000 },
      enterprise: { monthly: 5000, yearly: 50000 }
    };

    const planNames = {
      basic: 'Basic',
      premium: 'Premium',
      enterprise: 'Enterprise'
    };

    const price = isYearly ? planPrices[planId as keyof typeof planPrices].yearly : 
                            planPrices[planId as keyof typeof planPrices].monthly;

    setSelectedPlan({
      id: planId,
      name: planNames[planId as keyof typeof planNames],
      price,
      isYearly
    });
    setActiveTab("payment");
  };

  const handlePaymentSuccess = () => {
    setSelectedPlan(null);
    setActiveTab("dashboard");
    refetchAds();
    toast({
      title: "Advertisement Created!",
      description: "Your ad is now live and reaching customers.",
    });
  };

  const handleAdAction = async (adId: string, action: 'pause' | 'activate' | 'renew') => {
    try {
      let updateData = {};
      
      switch (action) {
        case 'pause':
          updateData = { status: 'paused' };
          break;
        case 'activate':
          updateData = { status: 'active' };
          break;
        case 'renew':
          // This would typically create a new subscription
          toast({
            title: "Renewal",
            description: "Renewal feature coming soon. Please create a new ad for now.",
          });
          return;
      }

      const { error } = await supabase
        .from('advertisements')
        .update(updateData)
        .eq('id', adId);

      if (error) throw error;

      refetchAds();
      toast({
        title: "Success",
        description: `Advertisement ${action}d successfully.`,
      });
    } catch (error) {
      console.error('Error updating ad:', error);
      toast({
        title: "Error",
        description: "Failed to update advertisement. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'paused':
        return <Pause className="h-4 w-4 text-orange-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'paused':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      default:
        return 'bg-red-50 text-red-700 border-red-200';
    }
  };

  if (activeTab === "payment" && selectedPlan) {
    return (
      <PaymentWorkflow
        selectedPlan={selectedPlan}
        onBack={() => setActiveTab("create")}
        onPaymentSuccess={handlePaymentSuccess}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
          Business Advertising Dashboard
        </h1>
        <p className="text-lg text-muted-foreground">
          แดชบอร์ดการโฆษณาธุรกิจ - Manage your ads and reach more customers in Wang Sam Mo
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="my-ads">My Ads</TabsTrigger>
          <TabsTrigger value="create">Create Ad</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="space-y-6">
          {/* Analytics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                    <p className="text-2xl font-bold text-foreground">
                      {analytics.totalViews.toLocaleString()}
                    </p>
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
                    <p className="text-2xl font-bold text-foreground">
                      {analytics.totalClicks.toLocaleString()}
                    </p>
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
                    <p className="text-2xl font-bold text-foreground">
                      {analytics.avgCTR.toFixed(1)}%
                    </p>
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
                    <p className="text-2xl font-bold text-foreground">
                      {analytics.totalSpent.toLocaleString()} THB
                    </p>
                  </div>
                  <DollarSign className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Manage your advertising campaigns efficiently
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button onClick={() => setActiveTab("create")} className="h-auto p-6 flex flex-col items-center gap-2">
                  <Plus className="h-8 w-8" />
                  <div className="text-center">
                    <div className="font-semibold">Create New Ad</div>
                    <div className="text-xs opacity-80">Start advertising your business</div>
                  </div>
                </Button>
                
                <Button variant="outline" onClick={() => setActiveTab("my-ads")} className="h-auto p-6 flex flex-col items-center gap-2">
                  <BarChart3 className="h-8 w-8" />
                  <div className="text-center">
                    <div className="font-semibold">View My Ads</div>
                    <div className="text-xs opacity-80">Manage existing campaigns</div>
                  </div>
                </Button>
                
                <Button variant="outline" onClick={() => setActiveTab("analytics")} className="h-auto p-6 flex flex-col items-center gap-2">
                  <Target className="h-8 w-8" />
                  <div className="text-center">
                    <div className="font-semibold">View Analytics</div>
                    <div className="text-xs opacity-80">Track performance metrics</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Ads */}
          {advertisements.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Recent Advertisements</CardTitle>
                <CardDescription>Your latest advertising campaigns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {advertisements.slice(0, 3).map((ad) => (
                    <div key={ad.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(ad.status)}
                        <div>
                          <p className="font-medium">{ad.title}</p>
                          <p className="text-sm text-muted-foreground">{ad.business_name}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(ad.status)}>
                          {ad.status.charAt(0).toUpperCase() + ad.status.slice(1)}
                        </Badge>
                        <p className="text-sm text-muted-foreground mt-1">
                          {(ad.views || 0).toLocaleString()} views
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* My Ads Tab */}
        <TabsContent value="my-ads" className="space-y-6">
          {adsLoading ? (
            <div className="text-center py-8">Loading your advertisements...</div>
          ) : advertisements.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Advertisements Yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start advertising your business to reach more customers
                </p>
                <Button onClick={() => setActiveTab("create")}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Ad
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {advertisements.map((ad) => (
                <Card key={ad.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{ad.title}</CardTitle>
                        <CardDescription>{ad.business_name}</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={`capitalize ${getStatusColor(ad.status)}`}>
                          {getStatusIcon(ad.status)}
                          <span className="ml-1">{ad.status}</span>
                        </Badge>
                        <Badge variant="outline" className="capitalize">
                          {ad.plan_type}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">
                          {(ad.views || 0).toLocaleString()}
                        </p>
                        <p className="text-sm text-muted-foreground">Views</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">
                          {(ad.clicks || 0).toLocaleString()}
                        </p>
                        <p className="text-sm text-muted-foreground">Clicks</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-purple-600">
                          {ad.views > 0 ? ((ad.clicks / ad.views) * 100).toFixed(1) : "0"}%
                        </p>
                        <p className="text-sm text-muted-foreground">CTR</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium">
                          {new Date(ad.start_date).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-muted-foreground">Start Date</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      {ad.status === 'active' ? (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleAdAction(ad.id, 'pause')}
                        >
                          <Pause className="h-4 w-4 mr-1" />
                          Pause
                        </Button>
                      ) : ad.status === 'paused' ? (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleAdAction(ad.id, 'activate')}
                        >
                          <Play className="h-4 w-4 mr-1" />
                          Activate
                        </Button>
                      ) : null}
                      
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleAdAction(ad.id, 'renew')}
                      >
                        <RotateCcw className="h-4 w-4 mr-1" />
                        Renew
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Create Ad Tab */}
        <TabsContent value="create" className="space-y-6">
          <PricingPlans onSelectPlan={handleSelectPlan} />
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Total Impressions</span>
                    <span className="font-bold">{analytics.totalViews.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Total Clicks</span>
                    <span className="font-bold">{analytics.totalClicks.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Average CTR</span>
                    <span className="font-bold">{analytics.avgCTR.toFixed(2)}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Active Campaigns</span>
                    <span className="font-bold">{analytics.activeAds}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Investment Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Total Spent</span>
                    <span className="font-bold">{analytics.totalSpent.toLocaleString()} THB</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Cost per Click</span>
                    <span className="font-bold">
                      {analytics.totalClicks > 0 ? 
                        (analytics.totalSpent / analytics.totalClicks).toFixed(2) : "0"} THB
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Cost per 1000 Views</span>
                    <span className="font-bold">
                      {analytics.totalViews > 0 ? 
                        ((analytics.totalSpent / analytics.totalViews) * 1000).toFixed(2) : "0"} THB
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvertisingDashboard;
