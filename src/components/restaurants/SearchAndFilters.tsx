import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, MapPin } from "lucide-react";

type SearchAndFiltersProps = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
  totalResults: number;
};

const SearchAndFilters = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedLocation,
  setSelectedLocation,
  totalResults
}: SearchAndFiltersProps) => {
  const categories = [
    { value: "all", label: "All Categories" },
    { value: "restaurants", label: "Restaurants" },
    { value: "thai", label: "Thai Cuisine" },
    { value: "northern_thai", label: "Northern Thai" },
    { value: "international", label: "International" },
    { value: "street_food", label: "Street Food" },
    { value: "cafe", label: "Cafes" },
    { value: "services", label: "Services" },
    { value: "accommodation", label: "Homestays" },
    { value: "tour_guide", label: "Tour Guides" },
    { value: "transport", label: "Transport" },
    { value: "rental", label: "Rentals" },
  ];

  const locations = [
    { value: "all", label: "All Locations" },
    { value: "Wang Sam Mo", label: "Wang Sam Mo" },
    { value: "Phasuk", label: "Phasuk" },
    { value: "Nong Kung Thap Ma", label: "Nong Kung Thap Ma" },
    { value: "Kumphawapi", label: "Kumphawapi" },
  ];

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedLocation("all");
  };

  return (
    <div className="bg-card rounded-lg border p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Search & Filter
        </h3>
        <Badge variant="secondary">
          {totalResults} result{totalResults !== 1 ? 's' : ''}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search businesses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Category Filter */}
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Location Filter */}
        <Select value={selectedLocation} onValueChange={setSelectedLocation}>
          <SelectTrigger>
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            {locations.map((location) => (
              <SelectItem key={location.value} value={location.value}>
                <span className="flex items-center gap-2">
                  <MapPin className="h-3 w-3" />
                  {location.label}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Clear Filters */}
        <Button 
          variant="outline" 
          onClick={clearFilters}
          className="w-full"
        >
          Clear Filters
        </Button>
      </div>

      {/* Active Filters */}
      {(searchTerm || selectedCategory !== "all" || selectedLocation !== "all") && (
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {searchTerm && (
            <Badge variant="secondary" className="gap-1">
              Search: "{searchTerm}"
              <button onClick={() => setSearchTerm("")} className="ml-1 hover:text-destructive">×</button>
            </Badge>
          )}
          {selectedCategory !== "all" && (
            <Badge variant="secondary" className="gap-1">
              Category: {categories.find(c => c.value === selectedCategory)?.label}
              <button onClick={() => setSelectedCategory("all")} className="ml-1 hover:text-destructive">×</button>
            </Badge>
          )}
          {selectedLocation !== "all" && (
            <Badge variant="secondary" className="gap-1">
              Location: {selectedLocation}
              <button onClick={() => setSelectedLocation("all")} className="ml-1 hover:text-destructive">×</button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchAndFilters;