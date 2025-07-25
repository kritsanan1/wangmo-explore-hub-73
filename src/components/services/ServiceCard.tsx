import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Clock, Phone, Share2, ExternalLink, Wifi, Car, AirVent } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export type ServiceType = {
  id: string;
  name: string;
  name_thai: string;
  description: string;
  service_type: string;
  price_range?: string;
  price_per_night?: number;
  images?: string[];
  location: { address?: string; district?: string };
  contact_info: { phone?: string; website?: string; facebook?: string };
  rating?: number;
  featured?: boolean;
  amenities?: string[];
  unique_features?: string[];
};

type ServiceCardProps = {
  service: ServiceType;
  onBookingClick: (service: ServiceType) => void;
  showBooking?: boolean;
};

const ServiceCard = ({ service, onBookingClick, showBooking = true }: ServiceCardProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const { toast } = useToast();

  const defaultImage = "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop";
  const imageUrl = service.images?.[0] || defaultImage;

  const getCategoryColor = (serviceType: string) => {
    const colors = {
      accommodation: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      homestay: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      transport: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
      tour_guide: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      rental: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      restaurant: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    };
    return colors[serviceType as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getAmenityIcon = (amenity: string) => {
    const icons = {
      wifi: <Wifi className="h-3 w-3" />,
      parking: <Car className="h-3 w-3" />,
      air_conditioning: <AirVent className="h-3 w-3" />,
    };
    return icons[amenity.toLowerCase().replace(' ', '_') as keyof typeof icons] || null;
  };

  const shareService = () => {
    const url = window.location.href;
    const text = `Check out ${service.name} in Wang Sam Mo!`;
    
    if (navigator.share) {
      navigator.share({ title: service.name, text, url });
    } else {
      navigator.clipboard.writeText(url);
      toast({
        title: "Link copied!",
        description: "Service link has been copied to your clipboard.",
      });
    }
  };

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="relative">
        <img 
          src={imageUrl} 
          alt={service.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {service.featured && (
          <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
            Featured
          </Badge>
        )}
        {service.rating && (
          <div className="absolute top-2 right-2 bg-background/90 rounded-full px-2 py-1 flex items-center gap-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium">{service.rating.toFixed(1)}</span>
          </div>
        )}
        
        <div className="absolute bottom-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="sm"
            variant="secondary"
            className="h-8 w-8 p-0"
            onClick={shareService}
          >
            <Share2 className="h-3 w-3" />
          </Button>
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="text-lg line-clamp-1">{service.name}</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              {service.name_thai}
            </CardDescription>
          </div>
          <Badge variant="secondary" className={getCategoryColor(service.service_type)}>
            {service.service_type.replace('_', ' ')}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0 space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {service.description}
        </p>
        
        <div className="space-y-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="h-3 w-3 flex-shrink-0" />
            <span className="line-clamp-1">
              {service.location?.address || service.location?.district || 'Wang Sam Mo, Udon Thani'}
            </span>
          </div>
          
          {service.contact_info?.phone && (
            <div className="flex items-center gap-2">
              <Phone className="h-3 w-3 flex-shrink-0" />
              <span>{service.contact_info.phone}</span>
            </div>
          )}
        </div>

        {/* Price */}
        {(service.price_range || service.price_per_night) && (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Price:</span>
            <Badge variant="outline">
              {service.price_per_night ? `$${service.price_per_night}/night` : service.price_range}
            </Badge>
          </div>
        )}

        {/* Amenities */}
        {service.amenities && service.amenities.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {service.amenities.slice(0, 3).map((amenity, index) => (
              <Badge key={index} variant="outline" className="text-xs flex items-center gap-1">
                {getAmenityIcon(amenity)}
                {amenity}
              </Badge>
            ))}
            {service.amenities.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{service.amenities.length - 3} more
              </Badge>
            )}
          </div>
        )}

        {/* Unique Features */}
        {service.unique_features && service.unique_features.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {service.unique_features.slice(0, 2).map((feature, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {feature}
              </Badge>
            ))}
          </div>
        )}
        
        <div className="flex gap-2">
          {showBooking && (
            <Button 
              className="flex-1" 
              variant="default"
              onClick={() => onBookingClick(service)}
            >
              {service.service_type === 'accommodation' || service.service_type === 'homestay' 
                ? 'Book Stay' 
                : 'Book Service'}
            </Button>
          )}
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? 'Less' : 'More'} Details
          </Button>
        </div>

        {/* Expanded Details */}
        {showDetails && (
          <div className="pt-4 border-t space-y-2 text-sm">
            {service.unique_features && service.unique_features.length > 0 && (
              <div>
                <span className="font-medium">Special Features:</span>
                <ul className="list-disc list-inside text-muted-foreground ml-2">
                  {service.unique_features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
            {service.contact_info?.website && (
              <div className="flex items-center gap-2">
                <ExternalLink className="h-3 w-3" />
                <a 
                  href={service.contact_info.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Visit Website
                </a>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ServiceCard;