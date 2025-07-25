import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Clock, Phone, Share2, Calendar, ExternalLink } from "lucide-react";
import { BusinessType } from "@/pages/Restaurants";
import { Tables } from "@/integrations/supabase/types";
import { useToast } from "@/hooks/use-toast";
import ReviewsSection from "./ReviewsSection";

type BusinessCardProps = {
  business: BusinessType;
  onBookingClick: (business: BusinessType) => void;
};

const BusinessCard = ({ business, onBookingClick }: BusinessCardProps) => {
  const [showReviews, setShowReviews] = useState(false);
  const { toast } = useToast();

  const defaultImage = "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop";
  const imageUrl = business.images?.[0] || defaultImage;

  const location = business.location as { address?: string; district?: string };
  const contactInfo = business.contact_info as { phone?: string; website?: string; facebook?: string };

  const getCategoryColor = (business: BusinessType) => {
    if (business.type === 'restaurant') {
      const restaurant = business as Tables<'restaurants'>;
      const colors = {
        thai: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
        northern_thai: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
        international: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
        street_food: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
        cafe: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
        bar: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
      };
      return colors[restaurant.cuisine_type as keyof typeof colors] || "bg-gray-100 text-gray-800";
    } else {
      const service = business as Tables<'services'>;
      const colors = {
        accommodation: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
        transport: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
        tour_guide: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
        rental: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
        spa: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
        shopping: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
      };
      return colors[service.service_type as keyof typeof colors] || "bg-gray-100 text-gray-800";
    }
  };

  const getBusinessType = (business: BusinessType) => {
    if (business.type === 'restaurant') {
      const restaurant = business as Tables<'restaurants'>;
      return restaurant.cuisine_type.replace('_', ' ');
    } else {
      const service = business as Tables<'services'>;
      return service.service_type.replace('_', ' ');
    }
  };

  const shareOnFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Check out ${business.name} in Wang Sam Mo!`);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, '_blank');
  };

  const shareOnTwitter = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Check out ${business.name} in Wang Sam Mo! ${business.description.substring(0, 100)}...`);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied!",
      description: "Business link has been copied to your clipboard.",
    });
  };

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="relative">
        <img 
          src={imageUrl} 
          alt={business.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {business.featured && (
          <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
            Featured
          </Badge>
        )}
        {business.rating && (
          <div className="absolute top-2 right-2 bg-background/90 rounded-full px-2 py-1 flex items-center gap-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium">{business.rating.toFixed(1)}</span>
          </div>
        )}
        
        {/* Share buttons overlay */}
        <div className="absolute bottom-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="sm"
            variant="secondary"
            className="h-8 w-8 p-0"
            onClick={shareOnFacebook}
          >
            <ExternalLink className="h-3 w-3" />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="h-8 w-8 p-0"
            onClick={copyToClipboard}
          >
            <Share2 className="h-3 w-3" />
          </Button>
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="text-lg line-clamp-1">{business.name}</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              {business.name_thai}
            </CardDescription>
          </div>
          <Badge variant="secondary" className={getCategoryColor(business)}>
            {getBusinessType(business)}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0 space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {business.description}
        </p>
        
        <div className="space-y-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="h-3 w-3 flex-shrink-0" />
            <span className="line-clamp-1">
              {location?.address || location?.district || 'Wang Sam Mo, Udon Thani'}
            </span>
          </div>
          
          {contactInfo?.phone && (
            <div className="flex items-center gap-2">
              <Phone className="h-3 w-3 flex-shrink-0" />
              <span>{contactInfo.phone}</span>
            </div>
          )}
          
          {((business.type === 'restaurant' && (business as Tables<'restaurants'>).opening_hours) || 
            (business.type === 'service' && 'opening_hours' in business)) && (
            <div className="flex items-center gap-2">
              <Clock className="h-3 w-3 flex-shrink-0" />
              <span>Open today</span>
            </div>
          )}
        </div>

        {/* Price Range (for restaurants) */}
        {business.type === 'restaurant' && (business as Tables<'restaurants'>).price_range && (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Price:</span>
            <Badge variant="outline">
              {(business as Tables<'restaurants'>).price_range}
            </Badge>
          </div>
        )}

        {/* Features (for restaurants) */}
        {business.type === 'restaurant' && (business as Tables<'restaurants'>).features && (
          <div className="flex flex-wrap gap-1">
            {(business as Tables<'restaurants'>).features!.slice(0, 3).map((feature, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {feature}
              </Badge>
            ))}
          </div>
        )}
        
        <div className="flex gap-2">
          <Button 
            className="flex-1" 
            variant="default"
            onClick={() => onBookingClick(business)}
          >
            <Calendar className="h-4 w-4 mr-2" />
            {business.type === 'restaurant' ? 'Reserve' : 'Book Service'}
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowReviews(!showReviews)}
          >
            <Star className="h-4 w-4 mr-1" />
            Reviews
          </Button>
        </div>

        {/* Reviews Section */}
        {showReviews && (
          <ReviewsSection businessId={business.id} businessType={business.type} />
        )}
      </CardContent>
    </Card>
  );
};

export default BusinessCard;