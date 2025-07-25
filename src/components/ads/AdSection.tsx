import { useState, useEffect } from "react";
import BannerAd, { AdType } from "./BannerAd";
import BannerAdDisplay from "./BannerAdDisplay";
import { cn } from "@/lib/utils";

// Sample ad data for Wang Sam Mo businesses
const sampleAds: AdType[] = [
  {
    id: "1",
    title: "Stay at Bua Daeng Homestay - 800 THB/night",
    description: "Experience authentic Thai culture in our traditional homestay with garden views and local cuisine.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=400&fit=crop",
    link: "/restaurants",
    plan: "premium",
    views: 1247,
    clicks: 89,
    isActive: true,
    expiresAt: "2024-12-31",
    businessName: "Bua Daeng Homestay"
  },
  {
    id: "2", 
    title: "Sahamui & Sons - Authentic Issan Cuisine",
    description: "Taste the best traditional northeastern Thai dishes made with fresh local ingredients.",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=800&h=400&fit=crop",
    link: "/restaurants",
    plan: "premium",
    views: 892,
    clicks: 67,
    isActive: true,
    expiresAt: "2024-12-31",
    businessName: "Sahamui & Sons Restaurant"
  },
  {
    id: "3",
    title: "Local Pickled Vegetables - 300 THB/set",
    description: "Handmade traditional pickled vegetables using secret family recipes passed down for generations.",
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&h=400&fit=crop",
    link: "/services",
    plan: "basic",
    views: 456,
    clicks: 23,
    isActive: true,
    expiresAt: "2024-12-31",
    businessName: "Wang Sam Mo Market"
  },
  {
    id: "4",
    title: "Ban Diam Homestay - Cultural Experience",
    description: "Immerse yourself in local traditions with our family-run homestay offering cooking classes.",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=400&fit=crop",
    link: "/restaurants", 
    plan: "basic",
    views: 234,
    clicks: 12,
    isActive: true,
    expiresAt: "2024-12-31",
    businessName: "Ban Diam Homestay"
  }
];

type AdSectionProps = {
  className?: string;
};

const AdSection = ({ className }: AdSectionProps) => {
  const [currentLargeAdIndex, setCurrentLargeAdIndex] = useState(0);
  const [currentMediumAdIndex, setCurrentMediumAdIndex] = useState(0);

  const premiumAds = sampleAds.filter(ad => ad.plan === "premium" && ad.isActive);
  const basicAds = sampleAds.filter(ad => ad.plan === "basic" && ad.isActive);

  // Rotate large banner ads (premium) every 5 seconds
  useEffect(() => {
    if (premiumAds.length > 1) {
      const interval = setInterval(() => {
        setCurrentLargeAdIndex((prev) => (prev + 1) % premiumAds.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [premiumAds.length]);

  // Rotate medium banner ads (basic) every 7 seconds
  useEffect(() => {
    if (basicAds.length > 1) {
      const interval = setInterval(() => {
        setCurrentMediumAdIndex((prev) => (prev + 1) % basicAds.length);
      }, 7000);
      return () => clearInterval(interval);
    }
  }, [basicAds.length]);

  const handleAdClick = (adId: string) => {
    // Track ad clicks - in a real app this would send to analytics
    console.log(`Ad clicked: ${adId}`);
  };

  if (sampleAds.length === 0) return null;

  return (
    <section className={cn("py-8 bg-gradient-to-br from-background to-muted/30", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Discover Local Businesses
          </h2>
          <p className="text-muted-foreground">
            ค้นพบธุรกิจท้องถิ่นในวังสามหมอ - Support Local Wang Sam Mo Businesses
          </p>
        </div>

        {/* Large Banner Ad (Premium/Enterprise) */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Featured Sponsors</h3>
          </div>
          <BannerAdDisplay
            placement="homepage_banner"
            size="large"
            className="w-full"
          />
        </div>

        {/* Medium Banner Ads Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Local Marketplace</h3>
          </div>

          {/* Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <BannerAdDisplay
              placement="homepage_sidebar"
              size="medium"
            />
            <div className="hidden md:block">
              <BannerAdDisplay
                placement="homepage_sidebar"
                size="medium"
              />
            </div>
            <div className="hidden lg:block">
              <BannerAdDisplay
                placement="homepage_sidebar"
                size="medium"
              />
            </div>
          </div>
        </div>

        {/* Call to Action for Businesses */}
        <div className="mt-12 text-center bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-6">
          <h3 className="text-xl font-bold text-foreground mb-2">
            Promote Your Business Here
          </h3>
          <p className="text-muted-foreground mb-4">
            Starting from 500 THB/month - Reach thousands of visitors to Wang Sam Mo
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/ad-dashboard"
              className="inline-flex items-center justify-center px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium"
            >
              Create Your Ad
            </a>
            <a
              href="#pricing"
              className="inline-flex items-center justify-center px-6 py-2 border border-primary text-primary rounded-md hover:bg-primary/10 transition-colors font-medium"
            >
              View Pricing
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdSection;
