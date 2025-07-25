import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation, Search, Phone, ExternalLink } from "lucide-react";
import { BusinessType } from "@/pages/Restaurants";

type BusinessMapProps = {
  businesses: BusinessType[];
};

const BusinessMap = ({ businesses }: BusinessMapProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBusiness, setSelectedBusiness] = useState<BusinessType | null>(null);

  const filteredBusinesses = businesses.filter(business =>
    business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    business.name_thai.includes(searchTerm)
  );

  const handleDirections = (business: BusinessType) => {
    const location = business.location as { lat?: number; lng?: number; address?: string };
    if (location.lat && location.lng) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`;
      window.open(url, '_blank');
    } else if (location.address) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(location.address)}`;
      window.open(url, '_blank');
    }
  };

  const handleCall = (business: BusinessType) => {
    const contactInfo = business.contact_info as { phone?: string };
    if (contactInfo?.phone) {
      window.open(`tel:${contactInfo.phone}`, '_self');
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Business Locations</h2>
        <h3 className="text-xl text-muted-foreground mb-6">ที่ตั้งร้านค้าและบริการ</h3>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          Find businesses near you and get directions. Contact them directly or 
          navigate to their location with ease.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Business List */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Search Businesses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                placeholder="Search businesses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4"
              />
              <p className="text-sm text-muted-foreground">
                Found {filteredBusinesses.length} business{filteredBusinesses.length !== 1 ? 'es' : ''}
              </p>
            </CardContent>
          </Card>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredBusinesses.map((business) => {
              const contactInfo = business.contact_info as { phone?: string };
              const location = business.location as { address?: string; district?: string };
              
              return (
                <Card 
                  key={business.id} 
                  className={`cursor-pointer transition-colors ${
                    selectedBusiness?.id === business.id ? 'ring-2 ring-primary' : 'hover:bg-muted/50'
                  }`}
                  onClick={() => setSelectedBusiness(business)}
                >
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">{business.name}</h4>
                          <p className="text-xs text-muted-foreground">{business.name_thai}</p>
                          <Badge variant="secondary" className="mt-1 text-xs">
                            {business.type === 'restaurant' ? 'Restaurant' : 'Service'}
                          </Badge>
                        </div>
                        {business.featured && (
                          <Badge className="text-xs">Featured</Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3 flex-shrink-0" />
                        <span className="line-clamp-1">
                          {location?.address || location?.district || 'Wang Sam Mo, Udon Thani'}
                        </span>
                      </div>

                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 px-2 text-xs flex-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDirections(business);
                          }}
                        >
                          <Navigation className="h-3 w-3 mr-1" />
                          Directions
                        </Button>
                        {contactInfo?.phone && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 px-2 text-xs"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCall(business);
                            }}
                          >
                            <Phone className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Map Area */}
        <div className="lg:col-span-2">
          <Card className="h-96 lg:h-[500px]">
            <CardContent className="p-0 h-full">
              <div className="w-full h-full bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
                {/* Placeholder Map Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-blue-50 to-blue-100 dark:from-green-900 dark:via-blue-950 dark:to-blue-900">
                  <div className="absolute inset-0 opacity-30">
                    <div className="w-full h-full bg-[radial-gradient(circle_at_25%_25%,_theme(colors.green.500/0.4)_0%,_transparent_50%)]"></div>
                    <div className="w-full h-full bg-[radial-gradient(circle_at_75%_75%,_theme(colors.blue.500/0.4)_0%,_transparent_50%)]"></div>
                  </div>
                </div>
                
                <div className="text-center p-8 relative z-10">
                  <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Interactive Map Coming Soon</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    We're working on integrating Google Maps to show all business locations with 
                    real-time navigation and detailed information.
                  </p>
                  <div className="flex gap-2 justify-center">
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View in Google Maps
                    </Button>
                  </div>
                </div>

                {/* Business Markers Simulation */}
                {filteredBusinesses.slice(0, 8).map((business, index) => (
                  <div
                    key={business.id}
                    className={`absolute w-6 h-6 bg-primary rounded-full border-2 border-background shadow-lg cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${
                      selectedBusiness?.id === business.id ? 'scale-125 z-20 bg-primary-foreground border-primary' : 'z-10 hover:scale-110'
                    }`}
                    style={{
                      left: `${20 + (index % 4) * 20}%`,
                      top: `${25 + Math.floor(index / 4) * 25}%`,
                    }}
                    onClick={() => setSelectedBusiness(business)}
                    title={business.name}
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      <MapPin className={`h-3 w-3 ${
                        selectedBusiness?.id === business.id ? 'text-primary' : 'text-primary-foreground'
                      }`} />
                    </div>
                    
                    {/* Business type indicator */}
                    <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border border-background ${
                      business.type === 'restaurant' ? 'bg-orange-500' : 'bg-blue-500'
                    }`} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Selected Business Details */}
          {selectedBusiness && (
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div>
                    <span>{selectedBusiness.name}</span>
                    <p className="text-sm font-normal text-muted-foreground">{selectedBusiness.name_thai}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDirections(selectedBusiness)}
                    >
                      <Navigation className="h-4 w-4 mr-2" />
                      Get Directions
                    </Button>
                    {(selectedBusiness.contact_info as { phone?: string })?.phone && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCall(selectedBusiness)}
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Call
                      </Button>
                    )}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">{selectedBusiness.description}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>
                    {((selectedBusiness.location as any)?.address || (selectedBusiness.location as any)?.district || 'Wang Sam Mo, Udon Thani')}
                  </span>
                </div>
                {selectedBusiness.rating && (
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm font-medium">Rating:</span>
                    <div className="flex items-center gap-1">
                      <span className="text-sm">{selectedBusiness.rating.toFixed(1)}</span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span key={star} className={`text-xs ${star <= selectedBusiness.rating! ? 'text-yellow-400' : 'text-gray-300'}`}>
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <div className="bg-muted p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Map Legend</h3>
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-primary rounded-full border-2 border-background relative">
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-orange-500 rounded-full border border-background"></div>
            </div>
            <span>Restaurants</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-primary rounded-full border-2 border-background relative">
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-blue-500 rounded-full border border-background"></div>
            </div>
            <span>Services</span>
          </div>
        </div>
        <p className="text-muted-foreground text-sm mt-2">
          Click on any marker to see business details and get directions. For the best navigation experience, use the "Get Directions" button to open in Google Maps.
        </p>
      </div>
    </div>
  );
};

export default BusinessMap;