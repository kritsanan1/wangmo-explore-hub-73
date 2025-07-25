import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Clock, Phone, Share2, Calendar } from "lucide-react";
import { BusinessType } from "@/pages/Restaurants";
import { Tables } from "@/integrations/supabase/types";
import BusinessCard from "./BusinessCard";
import BookingDialog from "./BookingDialog";

type BusinessGridProps = {
  businesses: BusinessType[];
  isLoading: boolean;
};

const BusinessGrid = ({ businesses, isLoading }: BusinessGridProps) => {
  const [selectedBusiness, setSelectedBusiness] = useState<BusinessType | null>(null);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);

  const featuredBusinesses = businesses.filter(b => b.featured);
  const regularBusinesses = businesses.filter(b => !b.featured);

  const handleBookingClick = (business: BusinessType) => {
    setSelectedBusiness(business);
    setBookingDialogOpen(true);
  };

  if (isLoading) {
    return (
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
    );
  }

  if (businesses.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <h3 className="text-lg font-semibold mb-2">No businesses found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search criteria or clearing filters to see more results.
          </p>
          <Button variant="outline">Clear All Filters</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Featured Businesses */}
      {featuredBusinesses.length > 0 && (
        <section>
          <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Star className="h-6 w-6 text-primary" />
            Featured Businesses
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredBusinesses.map((business) => (
              <BusinessCard 
                key={business.id} 
                business={business} 
                onBookingClick={handleBookingClick}
              />
            ))}
          </div>
        </section>
      )}

      {/* All Businesses */}
      <section>
        <h3 className="text-2xl font-semibold mb-6">
          All Businesses ({regularBusinesses.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularBusinesses.map((business) => (
            <BusinessCard 
              key={business.id} 
              business={business} 
              onBookingClick={handleBookingClick}
            />
          ))}
        </div>
      </section>

      {/* Booking Dialog */}
      <BookingDialog
        open={bookingDialogOpen}
        onOpenChange={setBookingDialogOpen}
        business={selectedBusiness}
      />
    </div>
  );
};

export default BusinessGrid;