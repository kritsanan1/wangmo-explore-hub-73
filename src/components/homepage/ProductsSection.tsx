import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, ShoppingBag, Package } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import SectionHeader from "./SectionHeader";

type Product = {
  id: string;
  name: string;
  name_thai: string;
  description: string;
  images: string[];
  rating: number;
  price_range: string;
  service_type: string;
  location: {
    address: string;
  };
  featured: boolean;
};

const ProductsSection = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      // Note: Products might be stored in services table with type 'product'
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('featured', true)
        .limit(4);

      if (error) throw error;
      
      // For now, use sample data to demonstrate the functionality
      setProducts([
        {
          id: '1',
          name: 'Traditional Pickled Vegetables',
          name_thai: 'ผักดองแบบดั้งเดิม',
          description: 'Handmade traditional pickled vegetables using secret family recipes passed down for generations.',
          images: ['https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&h=400&fit=crop'],
          rating: 4.8,
          price_range: '300 THB/set',
          service_type: 'Local Food',
          location: { address: 'Wang Sam Mo Market, Udon Thani' },
          featured: true
        },
        {
          id: '2',
          name: 'Issan Handicrafts',
          name_thai: 'งานฝีมืออีสาน',
          description: 'Beautiful handwoven textiles and traditional crafts made by local artisans.',
          images: ['https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=800&h=400&fit=crop'],
          rating: 4.6,
          price_range: '500-2000 THB',
          service_type: 'Handicrafts',
          location: { address: 'Wang Sam Mo Craft Center' },
          featured: true
        },
        {
          id: '3',
          name: 'Local Honey & Herbs',
          name_thai: 'น้ำผึ้งและสมุนไพรท้องถิ่น',
          description: 'Pure local honey and medicinal herbs sourced directly from Wang Sam Mo farmers.',
          images: ['https://images.unsplash.com/photo-1517022812141-2362096515c9?w=800&h=400&fit=crop'],
          rating: 4.7,
          price_range: '250-800 THB',
          service_type: 'Natural Products',
          location: { address: 'Wang Sam Mo Organic Farm' },
          featured: true
        },
        {
          id: '4',
          name: 'Silk Scarves & Fabrics',
          name_thai: 'ผ้าไหมและผ้าทอ',
          description: 'Exquisite silk products showcasing traditional Issan weaving techniques.',
          images: ['https://images.unsplash.com/photo-1540479859555-17af45c78602?w=800&h=400&fit=crop'],
          rating: 4.9,
          price_range: '800-3000 THB',
          service_type: 'Textiles',
          location: { address: 'Wang Sam Mo Weaving Village' },
          featured: true
        }
      ]);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const getProductTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'local food': return 'bg-green-100 text-green-800';
      case 'handicrafts': return 'bg-orange-100 text-orange-800';
      case 'natural products': return 'bg-emerald-100 text-emerald-800';
      case 'textiles': return 'bg-purple-100 text-purple-800';
      default: return 'bg-secondary text-secondary-foreground';
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
          title="Local Products"
          titleThai="ผลิตภัณฑ์ท้องถิ่น"
          subtitle="Discover authentic handmade products and local specialties"
          linkTo="/services"
          linkText="Shop All Products"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={product.images[0] || '/placeholder.svg'}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                  <Badge className="bg-white/90 text-foreground">
                    <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                    {product.rating}
                  </Badge>
                </div>
                <div className="absolute top-3 left-3">
                  <Badge className={getProductTypeColor(product.service_type)}>
                    <Package className="h-3 w-3 mr-1" />
                    {product.service_type}
                  </Badge>
                </div>
                <div className="absolute bottom-3 left-3">
                  <Badge className="bg-primary/90 text-primary-foreground">
                    {product.price_range}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-4">
                <h3 className="font-bold text-lg text-foreground mb-1 line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-2 font-medium">
                  {product.name_thai}
                </p>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center text-xs text-muted-foreground mb-4">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span className="line-clamp-1">{product.location.address}</span>
                </div>
                <Link to="/services">
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Shop Now
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

export default ProductsSection;