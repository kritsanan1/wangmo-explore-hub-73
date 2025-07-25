import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Clock } from "lucide-react";
import { Tables } from "@/integrations/supabase/types";
import {
  getCategoryStyles,
  getAttractionImage,
  formatRating,
  getLocationString
} from "@/lib/attraction-utils";
import AttractionDetailCard from "./AttractionDetailCard";

type AttractionCardProps = {
  attraction: Tables<'attractions'>;
};

const AttractionCard = ({ attraction }: AttractionCardProps) => {
  const imageUrl = getAttractionImage(attraction.images as string[]);
  const categoryStyles = getCategoryStyles(attraction.category);
  const locationString = getLocationString(attraction.location as any);
  const formattedRating = formatRating(attraction.rating || undefined);

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img 
          src={imageUrl} 
          alt={attraction.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {attraction.featured && (
          <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
            Featured
          </Badge>
        )}
        {attraction.rating && (
          <div className="absolute top-2 right-2 bg-background/90 rounded-full px-2 py-1 flex items-center gap-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium">{formattedRating}</span>
          </div>
        )}
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="text-lg line-clamp-1">{attraction.name}</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              {attraction.name_thai}
            </CardDescription>
          </div>
          <Badge 
            variant="secondary" 
            className={`${categoryStyles.bgColor} ${categoryStyles.color}`}
          >
            {categoryStyles.label}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {attraction.description}
        </p>
        
        <div className="flex items-center gap-2 mb-4 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3" />
          <span className="line-clamp-1">{locationString}</span>
        </div>
        
        {attraction.opening_hours && (
          <div className="flex items-center gap-2 mb-4 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>Open today</span>
          </div>
        )}
        
        <AttractionDetailCard
          attraction={attraction}
          trigger={
            <Button className="w-full" variant="outline">
              Learn More
            </Button>
          }
        />
      </CardContent>
    </Card>
  );
};

export default AttractionCard;
