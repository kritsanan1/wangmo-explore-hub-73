import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, MapPin, Award } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import ServiceFilters from "@/components/services/ServiceFilters";
import ServiceCard, { ServiceType } from "@/components/services/ServiceCard";
import ProductCard, { ProductType } from "@/components/services/ProductCard";
import ServiceBookingDialog from "@/components/services/ServiceBookingDialog";

const Services = () => {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [activeTab, setActiveTab] = useState("services");
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const { addItem } = useCart();
  const { toast } = useToast();

  // Handle URL parameters for category filtering
  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setActiveTab('products');
      setSelectedCategory(category);
    }
  }, [searchParams]);

  // Sample data for services
  const services: ServiceType[] = [
    {
      id: "1",
      name: "Sahamui & Sons Restaurant",
      name_thai: "ร้านสหมุย แอนด์ ซันส์",
      description: "Authentic northern Thai cuisine in the heart of Wang Sam Mo. Famous for som tam and grilled fish.",
      service_type: "restaurant",
      price_range: "100-300 THB",
      images: ["https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop"],
      location: { address: "123 Main Street", district: "Wang Sam Mo" },
      contact_info: { phone: "+66 42 123 456", facebook: "sahamui.restaurant" },
      rating: 4.5,
      featured: true,
      amenities: ["Air Conditioning", "Parking", "WiFi"],
      unique_features: ["Traditional recipes", "Local ingredients", "Family-owned since 1995"]
    },
    {
      id: "2",
      name: "Bua Daeng Homestay",
      name_thai: "บ้านพักบัวแดง",
      description: "Peaceful homestay with traditional Thai architecture. Perfect for experiencing rural life.",
      service_type: "homestay",
      price_per_night: 25,
      images: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop"],
      location: { address: "456 Village Road", district: "Phasuk" },
      contact_info: { phone: "+66 42 987 654", website: "https://buadaeng.com" },
      rating: 4.8,
      featured: true,
      amenities: ["Free WiFi", "Parking", "Garden", "Breakfast included"],
      unique_features: ["Pet-friendly", "Bicycle rental", "Organic garden", "33 km from Udon Thani"]
    },
    {
      id: "3",
      name: "Wang Sam Mo Tour Guide",
      name_thai: "ไกด์ท่องเที่ยววังสามหมอ",
      description: "Local expert guide for cultural tours and temple visits. Fluent in Thai and English.",
      service_type: "tour_guide",
      price_range: "500-1500 THB/day",
      images: ["https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop"],
      location: { district: "Wang Sam Mo" },
      contact_info: { phone: "+66 89 123 4567" },
      rating: 4.9,
      amenities: ["English speaking", "Licensed guide", "Transportation"],
      unique_features: ["Cultural expertise", "Temple access", "Photo assistance"]
    }
  ];

  // Sample data for accommodations
  const accommodations: ServiceType[] = [
    {
      id: "4",
      name: "Ban Diam Homestay",
      name_thai: "บ้านเดียมโฮมสเตย์",
      description: "Traditional wooden house with modern amenities. Experience authentic Isan lifestyle.",
      service_type: "homestay",
      price_per_night: 30,
      images: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop"],
      location: { address: "789 Country Lane", district: "Nong Kung Thap Ma" },
      contact_info: { phone: "+66 42 555 777" },
      rating: 4.6,
      amenities: ["Air Conditioning", "WiFi", "Kitchen", "Laundry"],
      unique_features: ["Wheelchair accessible", "Garden views", "Local cooking classes"]
    },
    {
      id: "5",
      name: "Wang Yai Riverside Resort",
      name_thai: "รีสอร์ทริมน้ำวังใหญ่",
      description: "Comfortable resort near Wang Yai Park with river views and modern facilities.",
      service_type: "accommodation",
      price_per_night: 45,
      images: ["https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop"],
      location: { address: "Near Wang Yai Park", district: "Wang Sam Mo" },
      contact_info: { phone: "+66 42 888 999", website: "https://wangyairesort.com" },
      rating: 4.4,
      amenities: ["Pool", "Restaurant", "WiFi", "Parking"],
      unique_features: ["River views", "Conference room", "Spa services"]
    }
  ];

  // Enhanced Wang Sam Mo products matching homepage data
  const products: ProductType[] = [
    {
      id: "1",
      name: "Wang Sam Mo Pickled Vegetables",
      name_thai: "ผักดองวังสามหมอ",
      description: "Authentic Issan pickled vegetables, made with local ingredients from Wang Sam Mo farms. Perfect for gifting or home cooking. #tourderwang",
      category: "pickled",
      price: 300,
      currency: "THB",
      images: ["https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=300&fit=crop"],
      vendor: "Local cooperative",
      rating: 4.8,
      featured: true,
      in_stock: true,
      ingredients: ["Fresh vegetables", "Local spices", "Traditional fermentation"],
      origin: "Wang Sam Mo Market, Udon Thani",
      details: "500g jar, shelf-stable for 6 months"
    },
    {
      id: "2",
      name: "Issan Handwoven Crafts",
      name_thai: "งานฝีมืออีสาน",
      description: "Unique handwoven crafts by Wang Sam Mo artisans, showcasing Issan culture. Ideal as souvenirs. #ที่นี่วังสามหมอ",
      category: "handicrafts",
      price: 500,
      currency: "THB",
      images: ["https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=300&fit=crop"],
      vendor: "Local artisans",
      rating: 4.6,
      featured: true,
      in_stock: true,
      origin: "Wang Sam Mo Craft Center",
      details: "30x20 cm, made from natural materials"
    },
    {
      id: "3",
      name: "Wang Sam Mo Organic Tea",
      name_thai: "ชาท้องถิ่นวังสามหมอ",
      description: "Organic tea grown in the hills of Wang Sam Mo, offering a refreshing taste of nature. #ทัวร์เดอวัง",
      category: "tea",
      price: 200,
      currency: "THB",
      images: ["https://images.unsplash.com/photo-1517022812141-2362096515c9?w=400&h=300&fit=crop"],
      vendor: "Hill farmers",
      rating: 4.7,
      featured: true,
      in_stock: true,
      origin: "Wang Sam Mo Hills",
      details: "100g pack, caffeine-free, eco-friendly packaging"
    }
  ];

  // Filter functions
  const filterItems = (items: any[], type: string) => {
    return items.filter(item => {
      const matchesSearch = 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.name_thai.includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());

      let matchesCategory = selectedCategory === "all";
      if (type === 'service') {
        matchesCategory = selectedCategory === "all" || item.service_type === selectedCategory;
      } else if (type === 'product') {
        matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
      }

      const location = item.location || {};
      const matchesLocation = selectedLocation === "all" || 
        location?.district === selectedLocation ||
        location?.address?.includes(selectedLocation);

      return matchesSearch && matchesCategory && matchesLocation;
    });
  };

  const filteredServices = filterItems(services, 'service');
  const filteredAccommodations = filterItems(accommodations, 'service');
  const filteredProducts = filterItems(products, 'product');

  const getCurrentResults = () => {
    switch (activeTab) {
      case "accommodations":
        return filteredAccommodations.length;
      case "products":
        return filteredProducts.length;
      default:
        return filteredServices.length;
    }
  };

  const handleBookingClick = (service: ServiceType) => {
    setSelectedService(service);
    setBookingDialogOpen(true);
  };

  const handleAddToCart = (product: ProductType, quantity: number) => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        name_thai: product.name_thai,
        price: product.price,
        image: product.images[0] || '/placeholder.svg',
        category: product.category
      });
    }

    toast({
      title: "Added to cart",
      description: `${quantity}x ${product.name} added to cart`,
    });
  };

  return (
    <Layout>
      <div className="min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Services & Local Products
            </h1>
            <h2 className="text-xl lg:text-2xl text-muted-foreground mb-6">
              บริการและผลิตภัณฑ์ท้องถิ่น
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Discover authentic local services, comfortable accommodations, and unique products 
              from Wang Sam Mo. Support local businesses while experiencing genuine Thai hospitality.
            </p>
          </div>

          {/* Search and Filters */}
          <ServiceFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            totalResults={getCurrentResults()}
          />

          {/* Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8">
            <TabsContent value="services" className="mt-6">
              <div className="space-y-8">
                {/* Featured Services */}
                {filteredServices.filter(s => s.featured).length > 0 && (
                  <section>
                    <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                      <Star className="h-6 w-6 text-primary" />
                      Featured Services
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredServices.filter(s => s.featured).map((service) => (
                        <ServiceCard 
                          key={service.id} 
                          service={service} 
                          onBookingClick={handleBookingClick}
                        />
                      ))}
                    </div>
                  </section>
                )}

                {/* All Services */}
                <section>
                  <h3 className="text-2xl font-semibold mb-6">
                    All Services ({filteredServices.filter(s => !s.featured).length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredServices.filter(s => !s.featured).map((service) => (
                      <ServiceCard 
                        key={service.id} 
                        service={service} 
                        onBookingClick={handleBookingClick}
                      />
                    ))}
                  </div>
                </section>
              </div>
            </TabsContent>

            <TabsContent value="accommodations" className="mt-6">
              <div className="space-y-8">
                <section>
                  <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                    <MapPin className="h-6 w-6 text-primary" />
                    Accommodations & Homestays
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredAccommodations.map((accommodation) => (
                      <ServiceCard 
                        key={accommodation.id} 
                        service={accommodation} 
                        onBookingClick={handleBookingClick}
                      />
                    ))}
                  </div>
                </section>
              </div>
            </TabsContent>

            <TabsContent value="products" className="mt-6">
              <div className="space-y-8">
                {/* Featured Products */}
                {filteredProducts.filter(p => p.featured).length > 0 && (
                  <section>
                    <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                      <Award className="h-6 w-6 text-primary" />
                      Featured Products
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredProducts.filter(p => p.featured).map((product) => (
                        <ProductCard 
                          key={product.id} 
                          product={product} 
                          onAddToCart={handleAddToCart}
                        />
                      ))}
                    </div>
                  </section>
                )}

                {/* All Products */}
                <section>
                  <h3 className="text-2xl font-semibold mb-6">
                    Local Products ({filteredProducts.filter(p => !p.featured).length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.filter(p => !p.featured).map((product) => (
                      <ProductCard 
                        key={product.id} 
                        product={product} 
                        onAddToCart={handleAddToCart}
                      />
                    ))}
                  </div>
                </section>
              </div>
            </TabsContent>
          </Tabs>

          {/* Booking Dialog */}
          <ServiceBookingDialog
            open={bookingDialogOpen}
            onOpenChange={setBookingDialogOpen}
            service={selectedService}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Services;
