import { useEffect, useState, memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Camera } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import OptimizedImage from "@/components/ui/optimized-image";
import SectionHeader from "./SectionHeader";

type Attraction = {
  id: string;
  name: string;
  name_thai: string;
  description: string;
  images: string[];
  rating: number;
  location: {
    address: string;
    coordinates: { lat: number; lng: number };
  };
  featured: boolean;
};

const AttractionsSection = () => {
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedAttractions();
  }, []);

  const fetchFeaturedAttractions = async () => {
    try {
      const { data, error } = await supabase
        .from('attractions')
        .select('*')
        .eq('featured', true)
        .limit(4);

      if (error) throw error;
      
      // Transform the data to match our type
      const transformedData = (data || []).map((item: any) => ({
        ...item,
        location: typeof item.location === 'string' 
          ? { address: item.location, coordinates: { lat: 0, lng: 0 } }
          : item.location || { address: 'Wang Sam Mo, Udon Thani', coordinates: { lat: 17.4, lng: 102.8 } }
      }));
      
      setAttractions(transformedData);
    } catch (error) {
      console.error('Error fetching attractions:', error);
      // Fallback to sample data based on Google search results
      setAttractions([
        {
          id: '1',
          name: 'Wang Yai Park',
          name_thai: 'สวนวังใหญ่',
          description: 'Enjoy rafting at Wang Yai Park, Nong Kung Thap Ma. A serene escape amidst mountains and clear waters.',
          images: ['https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop'],
          rating: 4.7,
          location: { address: 'Nong Kung Thap Ma, Wang Sam Mo', coordinates: { lat: 17.4, lng: 102.8 } },
          featured: true
        },
        {
          id: '2',
          name: 'Phasuk Temple',
          name_thai: 'วัดผาสุก',
          description: 'Visit Phasuk Temple, a cultural gem in Wang Sam Mo, steeped in local history.',
          images: ['https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=400&h=300&fit=crop'],
          rating: 4.5,
          location: { address: 'Wang Sam Mo, Udon Thani', coordinates: { lat: 17.4, lng: 102.8 } },
          featured: true
        },
        {
          id: '3',
          name: 'Tham Sumontana Cave',
          name_thai: 'ถ้ำสุมนตาน',
          description: 'Explore the mystical Tham Sumontana Cave, a sacred meditation site on Phu Phan Mountains.',
          images: ['https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=400&h=300&fit=crop'],
          rating: 4.3,
          location: { address: 'Phu Phan Mountains, Wang Sam Mo', coordinates: { lat: 17.4, lng: 102.8 } },
          featured: true
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-12 bg-gradient-to-br from-accent/20 to-secondary/10">
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
    <section className="py-12 bg-gradient-to-br from-accent/20 to-secondary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Explore Wang Sam Mo Attractions"
          titleThai="สำรวจส���านที่ท่องเที่ยววังสามหมอ"
          subtitle="Discover rafting adventures, ancient temples, and mystical caves in Udon Thani's cultural heart #วังสามหมอ"
          linkTo="/attractions"
          linkText="See All Attractions"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {attractions.map((attraction) => (
            <Card key={attraction.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <OptimizedImage
                  src={attraction.images[0] || '/placeholder.svg'}
                  alt={attraction.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  width={400}
                  height={300}
                  lazy={true}
                />
                <div className="absolute top-3 right-3">
                  <Badge className="bg-white/90 text-foreground">
                    <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                    {attraction.rating}
                  </Badge>
                </div>
                <div className="absolute bottom-3 left-3">
                  <Badge variant="secondary" className="bg-primary/90 text-primary-foreground">
                    <Camera className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-4">
                <h3 className="font-bold text-lg text-foreground mb-1 line-clamp-1">
                  {attraction.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-2 font-medium">
                  {attraction.name_thai}
                </p>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {attraction.description}
                </p>
                <div className="flex items-center text-xs text-muted-foreground mb-4">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span className="line-clamp-1">{attraction.location.address}</span>
                </div>
                <Link to="/attractions">
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Explore More
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

export default memo(AttractionsSection);
