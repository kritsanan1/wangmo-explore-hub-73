import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MapPin,
  Star,
  Clock,
  Phone,
  Mail,
  Globe,
  Calendar,
  Navigation,
  Camera,
  Users,
  Car,
  Wifi,
  CreditCard,
  Info,
  Share2,
  Heart,
} from "lucide-react";
import { Tables } from "@/integrations/supabase/types";
import {
  getCategoryStyles,
  getAttractionImage,
  formatRating,
  getLocationString,
} from "@/lib/attraction-utils";

type AttractionDetailCardProps = {
  attraction: Tables<"attractions">;
  trigger?: React.ReactNode;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const AttractionDetailCard = ({
  attraction,
  trigger,
  isOpen,
  onOpenChange,
}: AttractionDetailCardProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const imageUrl = getAttractionImage(attraction.images as string[]);
  const categoryStyles = getCategoryStyles(attraction.category);
  const locationString = getLocationString(attraction.location as any);
  const formattedRating = formatRating(attraction.rating || undefined);

  const images = attraction.images || [imageUrl];
  const contactInfo = attraction.contact_info as any;
  const openingHours = attraction.opening_hours as any;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: attraction.name,
          text: attraction.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const defaultTrigger = (
    <Button variant="outline" className="w-full">
      Learn More
    </Button>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <ScrollArea className="h-full">
          <div className="relative">
            {/* Hero Image Section */}
            <div className="relative h-64 md:h-80">
              <img
                src={images[selectedImageIndex]}
                alt={attraction.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              
              {/* Image Navigation */}
              {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === selectedImageIndex ? "bg-white" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="absolute top-4 right-4 flex gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-white/90 text-black hover:bg-white"
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-white/90 text-black hover:bg-white"
                  onClick={handleShare}
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>

              {/* Featured Badge */}
              {attraction.featured && (
                <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                  Featured
                </Badge>
              )}
            </div>

            {/* Content Section */}
            <div className="p-6">
              <DialogHeader className="mb-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <DialogTitle className="text-2xl md:text-3xl mb-2">
                      {attraction.name}
                    </DialogTitle>
                    <DialogDescription className="text-lg text-muted-foreground">
                      {attraction.name_thai}
                    </DialogDescription>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge
                      variant="secondary"
                      className={`${categoryStyles.bgColor} ${categoryStyles.color}`}
                    >
                      {categoryStyles.label}
                    </Badge>
                    {attraction.rating && (
                      <div className="flex items-center gap-1 bg-primary/10 rounded-full px-3 py-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{formattedRating}</span>
                      </div>
                    )}
                  </div>
                </div>
              </DialogHeader>

              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="location">Location</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-6 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">About</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {attraction.description}
                    </p>
                    {attraction.description_thai && (
                      <p className="text-muted-foreground leading-relaxed mt-3 text-sm">
                        {attraction.description_thai}
                      </p>
                    )}
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold flex items-center gap-2">
                        <Info className="h-4 w-4" />
                        Quick Info
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{locationString}</span>
                        </div>
                        {attraction.price_range && (
                          <div className="flex items-center gap-2">
                            <CreditCard className="h-4 w-4 text-muted-foreground" />
                            <span>{attraction.price_range}</span>
                          </div>
                        )}
                        {openingHours && (
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>Open today</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {contactInfo && (
                      <div className="space-y-4">
                        <h4 className="font-semibold">Contact Information</h4>
                        <div className="space-y-2 text-sm">
                          {contactInfo.phone && (
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-muted-foreground" />
                              <a href={`tel:${contactInfo.phone}`} className="hover:underline">
                                {contactInfo.phone}
                              </a>
                            </div>
                          )}
                          {contactInfo.email && (
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                              <a href={`mailto:${contactInfo.email}`} className="hover:underline">
                                {contactInfo.email}
                              </a>
                            </div>
                          )}
                          {contactInfo.website && (
                            <div className="flex items-center gap-2">
                              <Globe className="h-4 w-4 text-muted-foreground" />
                              <a
                                href={contactInfo.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline"
                              >
                                Visit Website
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="details" className="mt-6 space-y-6">
                  {openingHours && (
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Opening Hours
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                        {Object.entries(openingHours).map(([day, hours]) => (
                          <div key={day} className="flex justify-between">
                            <span className="capitalize">{day}:</span>
                            <span className="text-muted-foreground">{hours as string}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <Separator />

                  <div>
                    <h4 className="font-semibold mb-3">Amenities & Features</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Car className="h-4 w-4 text-muted-foreground" />
                        <span>Parking Available</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Wifi className="h-4 w-4 text-muted-foreground" />
                        <span>Free WiFi</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>Family Friendly</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Camera className="h-4 w-4 text-muted-foreground" />
                        <span>Photography Allowed</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="location" className="mt-6 space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Navigation className="h-4 w-4" />
                      Location & Directions
                    </h4>
                    <Card>
                      <CardContent className="p-4">
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                            <div>
                              <p className="font-medium">{attraction.name}</p>
                              <p className="text-sm text-muted-foreground">{locationString}</p>
                            </div>
                          </div>
                          <div className="h-48 bg-muted rounded-lg flex items-center justify-center">
                            <p className="text-muted-foreground">Map placeholder</p>
                          </div>
                          <Button className="w-full" variant="outline">
                            <Navigation className="h-4 w-4 mr-2" />
                            Get Directions
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="reviews" className="mt-6 space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">Reviews & Ratings</h4>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-center py-8">
                          <Star className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                          <p className="text-muted-foreground">
                            No reviews yet. Be the first to review this attraction!
                          </p>
                          <Button variant="outline" className="mt-4">
                            Write a Review
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-8 pt-6 border-t">
                <Button className="flex-1">
                  <Calendar className="h-4 w-4 mr-2" />
                  Plan Visit
                </Button>
                <Button variant="outline" className="flex-1">
                  <Navigation className="h-4 w-4 mr-2" />
                  Directions
                </Button>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default AttractionDetailCard;
