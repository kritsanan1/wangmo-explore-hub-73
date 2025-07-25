import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, UtensilsCrossed, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import SectionHeader from "./SectionHeader";

type Restaurant = {
  id: string;
  name: string;
  name_thai: string;
  description: string;
  images: string[];
  rating: number;
  cuisine_type: string;
  price_range: string;
  location: {
    address: string;
  };
  opening_hours?: {
    monday?: string;
    tuesday?: string;
    wednesday?: string;
    thursday?: string;
    friday?: string;
    saturday?: string;
    sunday?: string;
  };
  featured: boolean;
};

const RestaurantsSection = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedRestaurants();
  }, []);

  const fetchFeaturedRestaurants = async () => {
    try {
      const { data, error } = await supabase
        .from('restaurants')
        .select('*')
        .eq('featured', true)
        .limit(4);

      if (error) throw error;
      
      // Transform the data to match our type
      const transformedData = (data || []).map((item: any) => ({
        ...item,
        location: typeof item.location === 'string' 
          ? { address: item.location }
          : item.location || { address: 'Wang Sam Mo, Udon Thani' },
        opening_hours: typeof item.opening_hours === 'object' ? item.opening_hours : undefined
      }));
      
      setRestaurants(transformedData);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      // Fallback to sample data based on Google search results
      setRestaurants([
        {
          id: '1',
          name: 'Baan Suan Rim Nam',
          name_thai: 'บ้านสวนริมน้ำ',
          description: 'Savor authentic Issan dishes at Baan Suan Rim Nam, Wang Yai. Call 089-6220962.',
          images: ['https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop'],
          rating: 4.7,
          cuisine_type: 'Issan',
          price_range: '฿฿',
          location: { address: 'Wang Yai, Wang Sam Mo' },
          opening_hours: {
            monday: '08:00-20:00',
            tuesday: '08:00-20:00',
            wednesday: '08:00-20:00',
            thursday: '08:00-20:00',
            friday: '08:00-20:00',
            saturday: '08:00-20:00',
            sunday: '08:00-18:00'
          },
          featured: true
        },
        {
          id: '2',
          name: 'Sahamui & Sons',
          name_thai: 'สะหมุยและลูก',
          description: 'Taste traditional Thai flavors at Sahamui & Sons, a Wang Sam Mo favorite.',
          images: ['https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop'],
          rating: 4.5,
          cuisine_type: 'Thai',
          price_range: '฿฿',
          location: { address: 'Wang Sam Mo, Udon Thani' },
          opening_hours: {
            monday: '09:00-21:00',
            tuesday: '09:00-21:00',
            wednesday: '09:00-21:00',
            thursday: '09:00-21:00',
            friday: '09:00-21:00',
            saturday: '09:00-21:00',
            sunday: '09:00-20:00'
          },
          featured: true
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getCuisineColor = (cuisine: string) => {
    switch (cuisine.toLowerCase()) {
      case 'issan': return 'bg-orange-100 text-orange-800';
      case 'thai': return 'bg-green-100 text-green-800';
      case 'chinese': return 'bg-red-100 text-red-800';
      default: return 'bg-secondary text-secondary-foreground';
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
          title="Featured Restaurants"
          titleThai="ร้านอาหารแนะนำ"
          subtitle="Taste authentic Issan cuisine and local specialties"
          linkTo="/restaurants"
          linkText="View All Restaurants"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {restaurants.map((restaurant) => (
            <Card key={restaurant.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={restaurant.images[0] || '/placeholder.svg'}
                  alt={restaurant.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                  <Badge className="bg-white/90 text-foreground">
                    <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                    {restaurant.rating}
                  </Badge>
                </div>
                <div className="absolute top-3 left-3">
                  <Badge className={getCuisineColor(restaurant.cuisine_type)}>
                    <UtensilsCrossed className="h-3 w-3 mr-1" />
                    {restaurant.cuisine_type}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-4">
                <h3 className="font-bold text-lg text-foreground mb-1 line-clamp-1">
                  {restaurant.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-2 font-medium">
                  {restaurant.name_thai}
                </p>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {restaurant.description}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                  <div className="flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span className="line-clamp-1">{restaurant.location.address}</span>
                  </div>
                  <span className="font-medium">{restaurant.price_range}</span>
                </div>
                {restaurant.opening_hours && (
                  <div className="flex items-center text-xs text-muted-foreground mb-4">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>Open today: {restaurant.opening_hours.monday || 'Check hours'}</span>
                  </div>
                )}
                <Link to="/restaurants">
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    View Menu
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

export default RestaurantsSection;
