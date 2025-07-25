import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, MapPin, Briefcase, DollarSign, Clock } from "lucide-react";

type JobFiltersProps = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedJobType: string;
  setSelectedJobType: (type: string) => void;
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
  selectedEmploymentType: string;
  setSelectedEmploymentType: (type: string) => void;
  salaryRange: string;
  setSalaryRange: (range: string) => void;
  totalResults: number;
};

const JobFilters = ({
  searchTerm,
  setSearchTerm,
  selectedJobType,
  setSelectedJobType,
  selectedLocation,
  setSelectedLocation,
  selectedEmploymentType,
  setSelectedEmploymentType,
  salaryRange,
  setSalaryRange,
  totalResults
}: JobFiltersProps) => {
  const jobTypes = [
    { value: "all", label: "All Job Types" },
    { value: "restaurant", label: "Restaurant Staff" },
    { value: "tour_guide", label: "Tour Guide" },
    { value: "accommodation", label: "Hotel/Homestay" },
    { value: "transport", label: "Transportation" },
    { value: "retail", label: "Retail/Sales" },
    { value: "administrative", label: "Administrative" },
    { value: "other", label: "Other" },
  ];

  const locations = [
    { value: "all", label: "All Locations" },
    { value: "Wang Sam Mo", label: "Wang Sam Mo" },
    { value: "Phasuk", label: "Phasuk" },
    { value: "Nong Kung Thap Ma", label: "Nong Kung Thap Ma" },
    { value: "Kumphawapi", label: "Kumphawapi" },
    { value: "Udon Thani", label: "Udon Thani City" },
  ];

  const employmentTypes = [
    { value: "all", label: "All Types" },
    { value: "full_time", label: "Full Time" },
    { value: "part_time", label: "Part Time" },
    { value: "contract", label: "Contract" },
    { value: "temporary", label: "Temporary" },
  ];

  const salaryRanges = [
    { value: "all", label: "Any Salary" },
    { value: "0-15000", label: "Up to ฿15,000" },
    { value: "15000-25000", label: "฿15,000 - ฿25,000" },
    { value: "25000-35000", label: "฿25,000 - ฿35,000" },
    { value: "35000-50000", label: "฿35,000 - ฿50,000" },
    { value: "50000+", label: "฿50,000+" },
  ];

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedJobType("all");
    setSelectedLocation("all");
    setSelectedEmploymentType("all");
    setSalaryRange("all");
  };

  const hasActiveFilters = searchTerm || selectedJobType !== "all" || selectedLocation !== "all" || 
                          selectedEmploymentType !== "all" || salaryRange !== "all";

  return (
    <div className="bg-card rounded-lg border p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Job Filters
        </h3>
        <Badge variant="secondary" className="flex items-center gap-1">
          <Briefcase className="h-3 w-3" />
          {totalResults} job{totalResults !== 1 ? 's' : ''}
        </Badge>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search jobs by title, company, or keywords..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Filter Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Job Type */}
        <Select value={selectedJobType} onValueChange={setSelectedJobType}>
          <SelectTrigger>
            <SelectValue placeholder="Job Type" />
          </SelectTrigger>
          <SelectContent>
            {jobTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                <span className="flex items-center gap-2">
                  <Briefcase className="h-3 w-3" />
                  {type.label}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Location */}
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

        {/* Employment Type */}
        <Select value={selectedEmploymentType} onValueChange={setSelectedEmploymentType}>
          <SelectTrigger>
            <SelectValue placeholder="Employment Type" />
          </SelectTrigger>
          <SelectContent>
            {employmentTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                <span className="flex items-center gap-2">
                  <Clock className="h-3 w-3" />
                  {type.label}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Salary Range */}
        <Select value={salaryRange} onValueChange={setSalaryRange}>
          <SelectTrigger>
            <SelectValue placeholder="Salary Range" />
          </SelectTrigger>
          <SelectContent>
            {salaryRanges.map((range) => (
              <SelectItem key={range.value} value={range.value}>
                <span className="flex items-center gap-2">
                  <DollarSign className="h-3 w-3" />
                  {range.label}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Clear Filters */}
        <Button 
          variant="outline" 
          onClick={clearFilters}
          disabled={!hasActiveFilters}
          className="w-full"
        >
          Clear Filters
        </Button>
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {searchTerm && (
            <Badge variant="secondary" className="gap-1">
              Search: "{searchTerm}"
              <button onClick={() => setSearchTerm("")} className="ml-1 hover:text-destructive">×</button>
            </Badge>
          )}
          {selectedJobType !== "all" && (
            <Badge variant="secondary" className="gap-1">
              Type: {jobTypes.find(t => t.value === selectedJobType)?.label}
              <button onClick={() => setSelectedJobType("all")} className="ml-1 hover:text-destructive">×</button>
            </Badge>
          )}
          {selectedLocation !== "all" && (
            <Badge variant="secondary" className="gap-1">
              Location: {selectedLocation}
              <button onClick={() => setSelectedLocation("all")} className="ml-1 hover:text-destructive">×</button>
            </Badge>
          )}
          {selectedEmploymentType !== "all" && (
            <Badge variant="secondary" className="gap-1">
              Type: {employmentTypes.find(t => t.value === selectedEmploymentType)?.label}
              <button onClick={() => setSelectedEmploymentType("all")} className="ml-1 hover:text-destructive">×</button>
            </Badge>
          )}
          {salaryRange !== "all" && (
            <Badge variant="secondary" className="gap-1">
              Salary: {salaryRanges.find(r => r.value === salaryRange)?.label}
              <button onClick={() => setSalaryRange("all")} className="ml-1 hover:text-destructive">×</button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};

export default JobFilters;