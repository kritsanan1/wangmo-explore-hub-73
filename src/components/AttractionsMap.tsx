import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation, Search } from "lucide-react";
import { Tables } from "@/integrations/supabase/types";

type AttractionsMapProps = {
  attractions: Tables<'attractions'>[];
};

const AttractionsMap = ({ attractions }: AttractionsMapProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAttraction, setSelectedAttraction] = useState<Tables<'attractions'> | null>(null);

  const filteredAttractions = attractions.filter(attraction =>
    attraction.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    attraction.name_thai.includes(searchTerm)
  );

  const handleDirections = (attraction: Tables<'attractions'>) => {
    const location = attraction.location as { lat?: number; lng?: number; address?: string };
    if (location.lat && location.lng) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`;
      window.open(url, '_blank');
    } else if (location.address) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(location.address)}`;
      window.open(url, '_blank');
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Interactive Map</h2>
        <h3 className="text-xl text-muted-foreground mb-6">แผนที่แบบโต้ตอบ</h3>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          Explore Wang Sam Mo attractions on our interactive map. Find directions, 
          contact information, and plan your visit with ease.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attractions List */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Search Attractions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                placeholder="Search attractions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4"
              />
            </CardContent>
          </Card>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredAttractions.map((attraction) => (
              <Card 
                key={attraction.id} 
                className={`cursor-pointer transition-colors ${
                  selectedAttraction?.id === attraction.id ? 'ring-2 ring-primary' : 'hover:bg-muted/50'
                }`}
                onClick={() => setSelectedAttraction(attraction)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{attraction.name}</h4>
                      <p className="text-xs text-muted-foreground">{attraction.name_thai}</p>
                      <Badge variant="secondary" className="mt-1 text-xs">
                        {attraction.category.replace('_', ' ')}
                      </Badge>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDirections(attraction);
                      }}
                    >
                      <Navigation className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Map Area */}
        <div className="lg:col-span-2">
          <Card className="h-96 lg:h-[500px]">
            <CardContent className="p-0 h-full">
              <div className="w-full h-full bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
                {/* Placeholder Map */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900">
                  <div className="absolute inset-0 opacity-20">
                    <div className="w-full h-full bg-[radial-gradient(circle_at_30%_20%,_theme(colors.green.500/0.3)_0%,_transparent_50%)]"></div>
                    <div className="w-full h-full bg-[radial-gradient(circle_at_70%_80%,_theme(colors.blue.500/0.3)_0%,_transparent_50%)]"></div>
                  </div>
                </div>
                
                <div className="text-center p-8 relative z-10">
                  <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Interactive Map Coming Soon</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    We're working on integrating Google Maps to show all attraction locations.
                  </p>
                  <Button variant="outline">
                    View in Google Maps
                  </Button>
                </div>

                {/* Attraction Markers Simulation */}
                {filteredAttractions.slice(0, 5).map((attraction, index) => (
                  <div
                    key={attraction.id}
                    className={`absolute w-6 h-6 bg-primary rounded-full border-2 border-background shadow-lg cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${
                      selectedAttraction?.id === attraction.id ? 'scale-125 z-20' : 'z-10'
                    }`}
                    style={{
                      left: `${20 + (index * 15)}%`,
                      top: `${30 + (index * 10)}%`,
                    }}
                    onClick={() => setSelectedAttraction(attraction)}
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      <MapPin className="h-3 w-3 text-primary-foreground" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Selected Attraction Details */}
          {selectedAttraction && (
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{selectedAttraction.name}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDirections(selectedAttraction)}
                  >
                    <Navigation className="h-4 w-4 mr-2" />
                    Get Directions
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">{selectedAttraction.name_thai}</p>
                <p className="text-sm mb-4">{selectedAttraction.description}</p>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {(selectedAttraction.location as any)?.address || 'Wang Sam Mo, Udon Thani'}
                  </span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <div className="bg-muted p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Need Help with Directions?</h3>
        <p className="text-muted-foreground text-sm">
          For the best navigation experience, we recommend using Google Maps or asking locals for directions. 
          Most attractions are well-known landmarks in the community.
        </p>
      </div>
    </div>
  );
};

export default AttractionsMap;