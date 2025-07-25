import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Home, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

export function HeroCTAButtons() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <Link to="/attractions">
        <Button 
          size="lg" 
          className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 group"
        >
          <MapPin className="mr-2 h-5 w-5" />
          Explore Attractions
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </Link>
      
      <Link to="/restaurants">
        <Button 
          size="lg" 
          variant="outline" 
          className="w-full sm:w-auto bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 hover:border-white/50 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Find Restaurants
        </Button>
      </Link>
      
      <Link to="/jobs">
        <Button 
          size="lg" 
          variant="outline" 
          className="w-full sm:w-auto bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 hover:border-white/50 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Briefcase className="mr-2 h-4 w-4" />
          Job Listings
        </Button>
      </Link>
    </div>
  );
}
