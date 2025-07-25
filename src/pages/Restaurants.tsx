import Layout from "@/components/Layout";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SearchAndFilters from "@/components/restaurants/SearchAndFilters";
import BusinessGrid from "@/components/restaurants/BusinessGrid";
import BusinessMap from "@/components/restaurants/BusinessMap";
import { Tables } from "@/integrations/supabase/types";

export type BusinessType = (Tables<'restaurants'> & { type: 'restaurant' }) | (Tables<'services'> & { type: 'service' });

const Restaurants = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [activeTab, setActiveTab] = useState("grid");

  // Fetch restaurants
  const { data: restaurants, isLoading: loadingRestaurants } = useQuery({
    queryKey: ['restaurants'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('restaurants')
        .select('*')
        .order('featured', { ascending: false })
        .order('rating', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  // Fetch services
  const { data: services, isLoading: loadingServices } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('featured', { ascending: false })
        .order('rating', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const isLoading = loadingRestaurants || loadingServices;

  // Combine and filter data
  const allBusinesses: BusinessType[] = [
    ...(restaurants || []).map(r => ({ ...r, type: 'restaurant' as const })),
    ...(services || []).map(s => ({ ...s, type: 'service' as const }))
  ];

  const filteredBusinesses = allBusinesses.filter(business => {
    const matchesSearch = 
      business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      business.name_thai.includes(searchTerm) ||
      business.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === "all" || 
      (business.type === 'restaurant' && (selectedCategory === "restaurants" || selectedCategory === (business as Tables<'restaurants'> & { type: 'restaurant' }).cuisine_type)) ||
      (business.type === 'service' && (selectedCategory === "services" || selectedCategory === (business as Tables<'services'> & { type: 'service' }).service_type));

    const location = business.location as { district?: string; address?: string };
    const matchesLocation = selectedLocation === "all" || 
      location?.district === selectedLocation ||
      location?.address?.includes(selectedLocation);

    return matchesSearch && matchesCategory && matchesLocation;
  });

  return (
    <Layout>
      <div className="min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Restaurants & Services
            </h1>
            <h2 className="text-xl lg:text-2xl text-muted-foreground mb-6">
              ร้านอาหารและบริการ
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Discover authentic local businesses in Wang Sam Mo. From traditional restaurants 
              to homestays and tour services, find everything you need for your visit.
            </p>
          </div>

          {/* Search and Filters */}
          <SearchAndFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            totalResults={filteredBusinesses.length}
          />

          {/* Tabs for different views */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
              <TabsTrigger value="grid">Grid View</TabsTrigger>
              <TabsTrigger value="map">Map View</TabsTrigger>
            </TabsList>

            <TabsContent value="grid" className="mt-8">
              <BusinessGrid 
                businesses={filteredBusinesses}
                isLoading={isLoading}
              />
            </TabsContent>

            <TabsContent value="map" className="mt-8">
              <BusinessMap businesses={filteredBusinesses} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Restaurants;