import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Eye, MousePointer } from "lucide-react";
import { cn } from "@/lib/utils";

export type AdType = {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  plan: "basic" | "premium";
  views?: number;
  clicks?: number;
  isActive: boolean;
  expiresAt: string;
  businessName: string;
};

type BannerAdProps = {
  ad: AdType;
  variant: "large" | "medium";
  onAdClick?: (adId: string) => void;
  className?: string;
};

const BannerAd = ({ ad, variant, onAdClick, className }: BannerAdProps) => {
  const isLarge = variant === "large";
  
  const handleClick = () => {
    onAdClick?.(ad.id);
    window.open(ad.link, '_blank');
  };

  return (
    <Card className={cn(
      "relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer",
      isLarge ? "h-24 md:h-28" : "h-64 md:h-72",
      className
    )} onClick={handleClick}>
      {/* Premium Badge */}
      {ad.plan === "premium" && (
        <Badge className="absolute top-2 right-2 z-10 bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0">
          Premium
        </Badge>
      )}

      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={ad.image}
          alt={ad.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
      </div>

      {/* Content */}
      <div className={cn(
        "relative z-10 p-4 h-full flex text-white",
        isLarge ? "items-center" : "flex-col justify-between"
      )}>
        <div className={cn("flex-1", isLarge ? "mr-4" : "mb-4")}>
          <h3 className={cn(
            "font-bold text-white mb-1 line-clamp-1 group-hover:text-yellow-300 transition-colors",
            isLarge ? "text-sm md:text-base" : "text-lg md:text-xl"
          )}>
            {ad.title}
          </h3>
          <p className={cn(
            "text-white/90 line-clamp-2",
            isLarge ? "text-xs md:text-sm" : "text-sm md:text-base"
          )}>
            {ad.description}
          </p>
          <p className={cn(
            "text-yellow-300 font-medium mt-1",
            isLarge ? "text-xs" : "text-sm"
          )}>
            {ad.businessName}
          </p>
        </div>

        <div className={cn(
          "flex items-center gap-2",
          isLarge ? "flex-shrink-0" : "mt-2"
        )}>
          <Button
            size={isLarge ? "sm" : "default"}
            className="bg-primary hover:bg-primary/90 text-primary-foreground border-0 group-hover:bg-yellow-500 transition-colors"
          >
            <ExternalLink className={cn("mr-1", isLarge ? "h-3 w-3" : "h-4 w-4")} />
            Visit Now
          </Button>

          {/* Analytics Display for Premium Ads */}
          {ad.plan === "premium" && (
            <div className="hidden md:flex items-center gap-2 text-xs text-white/70">
              <div className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                <span>{ad.views || 0}</span>
              </div>
              <div className="flex items-center gap-1">
                <MousePointer className="h-3 w-3" />
                <span>{ad.clicks || 0}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default BannerAd;