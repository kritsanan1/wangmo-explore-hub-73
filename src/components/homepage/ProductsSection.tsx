import { useEffect, useState, memo, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, ShoppingBag, Package, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useCart } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import OptimizedImage from "@/components/ui/optimized-image";
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
  price?: number; // Add price for cart functionality
};

const ProductsSection = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addItem, itemCount } = useCart();
  const { t } = useLanguage();
  const { toast } = useToast();

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
      
      // Sample data based on requested Wang Sam Mo products with pricing
      setProducts([
        {
          id: '1',
          name: 'Pickled Vegetables',
          name_thai: 'ผักดองวังสามหมอ',
          description: 'Buy authentic Wang Sam Mo pickled vegetables, 300 THB/set. #วังสามหมอ',
          images: ['https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=300&fit=crop'],
          rating: 4.8,
          price_range: '300 THB/set',
          service_type: 'Local Food',
          location: { address: 'Wang Sam Mo Market, Udon Thani' },
          featured: true,
          price: 300 // Add actual price for cart
        },
        {
          id: '2',
          name: 'Issan Handicrafts',
          name_thai: 'งานฝีมืออีสาน',
          description: 'Shop unique Issan handicrafts, perfect souvenirs, ~500 THB.',
          images: ['https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=300&fit=crop'],
          rating: 4.6,
          price_range: '500 THB',
          service_type: 'Handicrafts',
          location: { address: 'Wang Sam Mo Craft Center' },
          featured: true,
          price: 500 // Add actual price for cart
        },
        {
          id: '3',
          name: 'Local Tea',
          name_thai: 'ชาท้องถิ่นวังสามหมอ',
          description: 'Taste Wang Sam Mo\'s organic tea, grown in the hills, 200 THB/pack.',
          images: ['https://images.unsplash.com/photo-1517022812141-2362096515c9?w=400&h=300&fit=crop'],
          rating: 4.7,
          price_range: '200 THB/pack',
          service_type: 'Natural Products',
          location: { address: 'Wang Sam Mo Hills' },
          featured: true,
          price: 200 // Add actual price for cart
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

  // Memoized add to cart function
  const handleAddToCart = useCallback((product: Product) => {
    if (product.price) {
      addItem({
        id: product.id,
        name: product.name,
        name_thai: product.name_thai,
        price: product.price,
        image: product.images[0] || '/placeholder.svg',
        category: product.service_type
      });

      toast({
        title: t('cart.added'),
        description: `${product.name} added to cart`,
      });
    }
  }, [addItem, toast, t]);

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
          title="Wang Sam Mo Local Products"
          titleThai="ผลิตภัณฑ์ท้องถิ่นวังสามหมอ"
          subtitle="Authentic pickled vegetables, Issan handicrafts, and organic tea from the hills #วังสามหมอ"
          linkTo="/services"
          linkText="Shop Now"
        />

        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <OptimizedImage
                    src={product.images[0] || '/placeholder.svg'}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    width={400}
                    height={300}
                    lazy={true}
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
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      onClick={() => handleAddToCart(product)}
                      className="bg-amber-600 hover:bg-amber-700 text-white"
                      size="sm"
                    >
                      <Plus className="mr-1 h-4 w-4" />
                      {t('products.add')}
                    </Button>
                    <Link to="/services">
                      <Button variant="outline" size="sm" className="w-full">
                        <ShoppingBag className="mr-1 h-4 w-4" />
                        View
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* View Cart Button */}
          <div className="text-center">
            <Link to="/cart">
              <Button
                size="lg"
                className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3"
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                {t('cart.view')} ({itemCount} items)
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(ProductsSection);
