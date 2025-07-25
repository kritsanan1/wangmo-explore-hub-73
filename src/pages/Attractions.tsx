import Layout from "@/components/Layout";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Calendar, Star, Clock } from "lucide-react";
import AttractionCard from "@/components/AttractionCard";
import CulturalHighlights from "@/components/CulturalHighlights";
import AttractionsMap from "@/components/AttractionsMap";
import EventsCalendar from "@/components/EventsCalendar";

const Attractions = () => {
  const { data: attractions, isLoading } = useQuery({
    queryKey: ['attractions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('attractions')
        .select('*')
        .order('featured', { ascending: false })
        .order('rating', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const featuredAttractions = attractions?.filter(attraction => attraction.featured) || [];
  const regularAttractions = attractions?.filter(attraction => !attraction.featured) || [];

  return (
    <Layout>
      <div className="min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Attractions & Culture
            </h1>
            <h2 className="text-xl lg:text-2xl text-muted-foreground mb-6">
              สถานที่ท่องเที่ยวและวัฒนธรรม
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Explore the rich cultural heritage and natural beauty of Wang Sam Mo. 
              From ancient temples to scenic parks, discover the authentic charm of Udon Thani.
            </p>
          </div>

          <Tabs defaultValue="attractions" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="attractions">Attractions</TabsTrigger>
              <TabsTrigger value="culture">Culture</TabsTrigger>
              <TabsTrigger value="map">Map</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
            </TabsList>

            <TabsContent value="attractions" className="mt-8">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Card key={i} className="animate-pulse">
                      <div className="h-48 bg-muted rounded-t-lg"></div>
                      <CardContent className="p-4">
                        <div className="h-4 bg-muted rounded mb-2"></div>
                        <div className="h-3 bg-muted rounded mb-4"></div>
                        <div className="h-8 bg-muted rounded"></div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="space-y-12">
                  {/* Featured Attractions */}
                  {featuredAttractions.length > 0 && (
                    <section>
                      <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                        <Star className="h-6 w-6 text-primary" />
                        Featured Attractions
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredAttractions.map((attraction) => (
                          <AttractionCard key={attraction.id} attraction={attraction} />
                        ))}
                      </div>
                    </section>
                  )}

                  {/* All Attractions */}
                  <section>
                    <h3 className="text-2xl font-semibold mb-6">All Attractions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {regularAttractions.map((attraction) => (
                        <AttractionCard key={attraction.id} attraction={attraction} />
                      ))}
                    </div>
                  </section>

                  {attractions?.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground text-lg">
                        No attractions found. Check back soon for updates!
                      </p>
                    </div>
                  )}
                </div>
              )}
            </TabsContent>

            <TabsContent value="culture" className="mt-8">
              <CulturalHighlights />
            </TabsContent>

            <TabsContent value="map" className="mt-8">
              <AttractionsMap attractions={attractions || []} />
            </TabsContent>

            <TabsContent value="events" className="mt-8">
              <EventsCalendar />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Attractions;