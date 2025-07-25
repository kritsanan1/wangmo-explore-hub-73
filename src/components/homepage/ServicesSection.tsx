import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Briefcase, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import SectionHeader from "./SectionHeader";

type Service = {
  id: string;
  name: string;
  name_thai: string;
  description: string;
  images: string[];
  rating: number;
  service_type: string;
  price_range: string;
  location: {
    address: string;
  };
  contact_info?: {
    phone?: string;
    email?: string;
  };
  featured: boolean;
};

const ServicesSection = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedServices();
  }, []);

  const fetchFeaturedServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
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
        contact_info: typeof item.contact_info === 'object' ? item.contact_info : undefined
      }));
      
      setServices(transformedData);
    } catch (error) {
      console.error('Error fetching services:', error);
      // Fallback to sample data based on requested services
      setServices([
        {
          id: '1',
          name: 'Local Tour Guide',
          name_thai: 'ไกด์ท้องถิ่น',
          description: 'Explore Wang Sam Mo with expert guides. Book a cultural tour today.',
          images: ['https://images.unsplash.com/photo-1607013251379-e6eecfffe234?w=400&h=300&fit=crop'],
          rating: 4.8,
          service_type: 'Tour Guide',
          price_range: '800-1200 THB/day',
          location: { address: 'Wang Sam Mo, Udon Thani' },
          contact_info: { phone: '+66 87 123 4567' },
          featured: true
        },
        {
          id: '2',
          name: 'Tuk-Tuk Rental',
          name_thai: 'บริการเช่าตุ๊กตุ๊ก',
          description: 'Rent a tuk-tuk (~300 THB/day) for a fun way to discover Wang Sam Mo.',
          images: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'],
          rating: 4.5,
          service_type: 'Transportation',
          price_range: '300 THB/day',
          location: { address: 'Wang Sam Mo Market' },
          contact_info: { phone: '+66 89 765 4321' },
          featured: true
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getServiceTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'tour guide': return 'bg-blue-100 text-blue-800';
      case 'transportation': return 'bg-green-100 text-green-800';
      case 'wellness': return 'bg-purple-100 text-purple-800';
      case 'accommodation': return 'bg-orange-100 text-orange-800';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  if (loading) {
    return (
      <section className="py-12 bg-gradient-to-br from-secondary/10 to-accent/20">
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
    <section className="py-12 bg-gradient-to-br from-secondary/10 to-accent/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Wang Sam Mo Services"
          titleThai="บริการวังสามหมอ"
          subtitle="Expert local guides and convenient transportation to explore Udon Thani's cultural heart"
          linkTo="/services"
          linkText="See All Services"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <Card key={service.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.images[0] || '/placeholder.svg'}
                  alt={service.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                  <Badge className="bg-white/90 text-foreground">
                    <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                    {service.rating}
                  </Badge>
                </div>
                <div className="absolute top-3 left-3">
                  <Badge className={getServiceTypeColor(service.service_type)}>
                    <Briefcase className="h-3 w-3 mr-1" />
                    {service.service_type}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-4">
                <h3 className="font-bold text-lg text-foreground mb-1 line-clamp-1">
                  {service.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-2 font-medium">
                  {service.name_thai}
                </p>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {service.description}
                </p>
                <div className="flex items-center text-xs text-muted-foreground mb-2">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span className="line-clamp-1">{service.location.address}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                  <span className="font-medium text-primary">{service.price_range}</span>
                  {service.contact_info?.phone && (
                    <div className="flex items-center">
                      <Phone className="h-3 w-3 mr-1" />
                      <span>Available</span>
                    </div>
                  )}
                </div>
                <Link to="/services">
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

export default ServicesSection;
