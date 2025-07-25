import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Wifi, Car, Users, Coffee } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import SectionHeader from "./SectionHeader";

type Homestay = {
  id: string;
  name: string;
  name_thai: string;
  description: string;
  images: string[];
  rating: number;
  price_range: string;
  location: {
    address: string;
  };
  features: string[];
  featured: boolean;
};

const HomestaysSection = () => {
  const [homestays, setHomestays] = useState<Homestay[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedHomestays();
  }, []);

  const fetchFeaturedHomestays = async () => {
    try {
      // Note: Since homestays might be stored in restaurants table with type 'homestay'
      // or we might need to create a separate homestays table
      const { data, error } = await supabase
        .from('restaurants')
        .select('*')
        .eq('featured', true)
        .limit(4);

      if (error) throw error;
      
      // Sample data based on Google search results for Wang Sam Mo homestays
      setHomestays([
        {
          id: '1',
          name: 'Bua Daeng Homestay',
          name_thai: 'บัวแดง โฮมสเตย์',
          description: 'Stay at Bua Daeng Homestay, 800 THB/night, with WiFi and garden views, 33 km from Udon Thani.',
          images: ['https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop'],
          rating: 4.7,
          price_range: '800 THB/night',
          location: { address: 'Wang Sam Mo, 33 km from Udon Thani' },
          features: ['WiFi', 'Garden Views', 'Home Cooking'],
          featured: true
        },
        {
          id: '2',
          name: 'Baan Suan Rim Nam Homestay',
          name_thai: 'บ้านสวนริมน้ำ โฮมสเตย์',
          description: 'Relax at Baan Suan Rim Nam, Wang Yai, with rafting and nature. Call 089-6220962.',
          images: ['https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop'],
          rating: 4.6,
          price_range: '750 THB/night',
          location: { address: 'Wang Yai, Wang Sam Mo' },
          features: ['Riverside', 'Rafting', 'Nature Tours'],
          featured: true
        },
        {
          id: '3',
          name: 'Ban Diam Homestay',
          name_thai: 'บ้านเดี่ยม โฮมสเตย์',
          description: 'Experience Ban Diam Homestay in Kumphawapi, modern amenities, ~800 THB/night.',
          images: ['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop'],
          rating: 4.5,
          price_range: '800 THB/night',
          location: { address: 'Kumphawapi, Wang Sam Mo' },
          features: ['Modern Amenities', 'Cultural Experience', 'WiFi'],
          featured: true
        }
      ]);
    } catch (error) {
      console.error('Error fetching homestays:', error);
    } finally {
      setLoading(false);
    }
  };

  const getFeatureIcon = (feature: string) => {
    switch (feature.toLowerCase()) {
      case 'wifi': return <Wifi className="h-3 w-3" />;
      case 'parking': return <Car className="h-3 w-3" />;
      case 'garden view': return <Coffee className="h-3 w-3" />;
      case 'home cooking': 
      case 'cooking classes': 
      case 'breakfast': return <Coffee className="h-3 w-3" />;
      default: return <Users className="h-3 w-3" />;
    }
  };

  if (loading) {
    return (
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/3 mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-64 bg-muted rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Wang Sam Mo Homestays"
          titleThai="โฮมสเตย์วังสามหมอ"
          subtitle="Experience authentic Thai culture with rafting, garden views, and traditional hospitality"
          linkTo="/services"
          linkText="Book a Homestay"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {homestays.map((homestay) => (
            <Card key={homestay.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={homestay.images[0] || '/placeholder.svg'}
                  alt={homestay.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                  <Badge className="bg-white/90 text-foreground">
                    <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                    {homestay.rating}
                  </Badge>
                </div>
                <div className="absolute bottom-3 left-3">
                  <Badge className="bg-primary/90 text-primary-foreground">
                    {homestay.price_range}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-4">
                <h3 className="font-bold text-lg text-foreground mb-1 line-clamp-1">
                  {homestay.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-2 font-medium">
                  {homestay.name_thai}
                </p>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {homestay.description}
                </p>
                <div className="flex items-center text-xs text-muted-foreground mb-3">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span className="line-clamp-1">{homestay.location.address}</span>
                </div>
                
                {/* Features */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {homestay.features.slice(0, 3).map((feature, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {getFeatureIcon(feature)}
                      <span className="ml-1">{feature}</span>
                    </Badge>
                  ))}
                  {homestay.features.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{homestay.features.length - 3} more
                    </Badge>
                  )}
                </div>
                
                <Link to="/restaurants">
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Book Now
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomestaysSection;
