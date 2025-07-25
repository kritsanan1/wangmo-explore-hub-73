import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Advertisement {
  id: string;
  title: string;
  title_thai?: string;
  business_name: string;
  description: string;
  description_thai?: string;
  link_url: string;
  image_url?: string;
  video_url?: string;
  plan_type: string;
  status: string;
}

interface BannerAdDisplayProps {
  placement: "homepage_sidebar" | "homepage_banner" | "category_page";
  size?: "small" | "medium" | "large";
  className?: string;
}

const BannerAdDisplay = ({ placement, size = "medium", className = "" }: BannerAdDisplayProps) => {
  const [ad, setAd] = useState<Advertisement | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchActiveAd();
  }, [placement]);

  const fetchActiveAd = async () => {
    try {
      setIsLoading(true);
      
      // Determine which ads to show based on placement and plan type
      let planTypes: string[] = [];
      
      switch (placement) {
        case "homepage_banner":
          planTypes = ["premium", "enterprise"];
          break;
        case "homepage_sidebar":
          planTypes = ["basic", "premium", "enterprise"];
          break;
        case "category_page":
          planTypes = ["premium", "enterprise"];
          break;
      }

      const { data, error } = await supabase
        .from('advertisements')
        .select('*')
        .eq('status', 'active')
        .in('plan_type', planTypes)
        .gte('end_date', new Date().toISOString())
        .order('plan_type', { ascending: false }) // Enterprise first, then premium, then basic
        .order('created_at', { ascending: false })
        .limit(1);

      if (error) {
        console.error('Error fetching ad:', error);
        return;
      }

      if (data && data.length > 0) {
        setAd(data[0]);
        // Track view
        trackAdView(data[0].id);
      } else {
        // Fallback to sample Wang Sam Mo ads for demonstration
        const sampleAds = [
          {
            id: 'sample-1',
            title: 'Stay with us, 800 THB/night! #ทัวร์เดอวัง',
            title_thai: 'พักกับเราเพียง 800 บาท/คืน!',
            business_name: 'Bua Daeng Homestay',
            description: 'Experience authentic Wang Sam Mo culture with garden views and home-cooked meals.',
            description_thai: 'สัมผัสวัฒนธรรมวังสามหมออย่างแท้จริง',
            link_url: '/services',
            image_url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop',
            plan_type: 'premium',
            status: 'active'
          },
          {
            id: 'sample-2',
            title: 'Taste Issan cuisine!',
            title_thai: 'ลิ้มรสอาหารอีสาน!',
            business_name: 'Sahamui & Sons',
            description: 'Authentic Issan dishes at Sahamui & Sons, Wang Sam Mo favorite.',
            description_thai: 'อาหารอีสานแท้ที่ส��หมุยและลูก',
            link_url: '/restaurants',
            image_url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop',
            plan_type: 'basic',
            status: 'active'
          }
        ];

        // Choose ad based on placement
        const selectedAd = placement === 'homepage_banner'
          ? sampleAds[0]  // Premium ad for banner
          : sampleAds[1]; // Basic ad for sidebar

        setAd(selectedAd);
      }
    } catch (error) {
      console.error('Error in fetchActiveAd:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const trackAdView = async (adId: string) => {
    try {
      await supabase.functions.invoke('track-ad-event', {
        body: {
          advertisement_id: adId,
          event_type: 'view'
        }
      });
    } catch (error) {
      console.error('Error tracking ad view:', error);
    }
  };

  const trackAdClick = async (adId: string) => {
    try {
      await supabase.functions.invoke('track-ad-event', {
        body: {
          advertisement_id: adId,
          event_type: 'click'
        }
      });
    } catch (error) {
      console.error('Error tracking ad click:', error);
    }
  };

  const handleAdClick = () => {
    if (!ad) return;
    
    trackAdClick(ad.id);
    
    // Open link
    if (ad.link_url.startsWith('http')) {
      window.open(ad.link_url, '_blank', 'noopener,noreferrer');
    } else if (ad.link_url.startsWith('tel:') || ad.link_url.includes('@')) {
      window.location.href = ad.link_url;
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "small":
        return "h-24 max-w-sm";
      case "large":
        return "h-32 md:h-24 max-w-4xl";
      default:
        return "h-40 md:h-32 max-w-2xl";
    }
  };

  const getLayoutClasses = () => {
    if (placement === "homepage_banner" || size === "large") {
      return "flex-row items-center";
    }
    return "flex-col";
  };

  if (isLoading) {
    return (
      <div className={`${getSizeClasses()} ${className} animate-pulse`}>
        <Card>
          <CardContent className="p-4 h-full">
            <div className="h-full bg-muted rounded"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!ad || !isVisible) {
    return null;
  }

  return (
    <div className={`${getSizeClasses()} ${className} relative group`}>
      <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow cursor-pointer border-primary/20">
        <CardContent className={`p-4 h-full flex ${getLayoutClasses()} gap-4`}>
          {/* Dismiss Button */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0 bg-background/80 hover:bg-background"
            onClick={(e) => {
              e.stopPropagation();
              setIsVisible(false);
            }}
          >
            <X className="h-3 w-3" />
          </Button>

          {/* Premium/Enterprise Badge */}
          {(ad.plan_type === "premium" || ad.plan_type === "enterprise") && (
            <Badge 
              className="absolute top-2 left-2 text-xs bg-primary/90 text-primary-foreground"
            >
              {ad.plan_type === "enterprise" ? "Premium" : "Featured"}
            </Badge>
          )}

          {/* Ad Image */}
          {ad.image_url && (
            <div className={`flex-shrink-0 ${
              placement === "homepage_banner" || size === "large" 
                ? "w-24 h-16" 
                : "w-full h-20"
            }`}>
              <img
                src={ad.image_url}
                alt={ad.business_name}
                className="w-full h-full object-cover rounded"
                loading="lazy"
              />
            </div>
          )}

          {/* Ad Content */}
          <div className="flex-1 min-w-0 flex flex-col justify-center">
            <div className="mb-1">
              <h3 className="font-semibold text-sm leading-tight line-clamp-1">
                {ad.title}
              </h3>
              {ad.title_thai && (
                <p className="text-xs text-muted-foreground line-clamp-1">
                  {ad.title_thai}
                </p>
              )}
            </div>
            
            <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
              {ad.description}
            </p>
            
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-xs">
                {ad.business_name}
              </Badge>
              <Button
                size="sm"
                variant="outline"
                className="h-6 px-2 text-xs"
                onClick={handleAdClick}
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                Visit
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sponsored Label */}
      <div className="absolute -bottom-1 -right-1 bg-muted/80 text-muted-foreground px-2 py-0.5 rounded-tl text-xs">
        Sponsored
      </div>
    </div>
  );
};

export default BannerAdDisplay;
