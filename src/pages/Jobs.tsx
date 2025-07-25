import Layout from "@/components/Layout";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Briefcase, Users } from "lucide-react";
import { PageTitle, SectionTitle, SubsectionTitle } from "@/components/seo/SEOHeading";
import Breadcrumb from "@/components/seo/Breadcrumb";
import JobFilters from "@/components/jobs/JobFilters";
import JobCard from "@/components/jobs/JobCard";
import JobApplicationDialog from "@/components/jobs/JobApplicationDialog";
import JobPostingForm from "@/components/jobs/JobPostingForm";

// Mock job type since we don't have the Supabase table yet
type MockJob = {
  id: string;
  title: string;
  company_name: string;
  description: string;
  job_type: string;
  employment_type: string;
  location: string;
  salary: any;
  status: string;
  created_at: string;
  application_deadline?: string;
  experience_required?: string;
  requirements?: string[];
  benefits?: string[];
  contact_email?: string;
  contact_phone?: string;
};

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJobType, setSelectedJobType] = useState<string>("all");
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [selectedEmploymentType, setSelectedEmploymentType] = useState<string>("all");
  const [salaryRange, setSalaryRange] = useState<string>("all");
  const [activeTab, setActiveTab] = useState("jobs");
  const [selectedJob, setSelectedJob] = useState<MockJob | null>(null);
  const [applicationDialogOpen, setApplicationDialogOpen] = useState(false);
  const [jobFormOpen, setJobFormOpen] = useState(false);

  // Mock data for demonstration
  const mockJobs: MockJob[] = [
    {
      id: "1",
      title: "Restaurant Server",
      company_name: "Sahamui & Sons Restaurant",
      description: "We are looking for a friendly and experienced server to join our team. You will be responsible for taking orders, serving food, and ensuring customer satisfaction in our traditional Thai restaurant.",
      job_type: "restaurant",
      employment_type: "full_time",
      location: "Wang Sam Mo",
      salary: { min: 18000, max: 22000, currency: "THB", period: "month" },
      status: "active",
      created_at: "2024-01-20T00:00:00Z",
      experience_required: "junior",
      requirements: ["Fluent in Thai and basic English", "Previous restaurant experience preferred", "Good communication skills"],
      benefits: ["Health insurance", "Meals provided", "Staff discounts"]
    },
    {
      id: "2", 
      title: "Tour Guide",
      company_name: "Wang Sam Mo Tours",
      description: "Join our team as a local tour guide! Guide visitors through Wang Yai Park and surrounding attractions. Share the rich history and culture of our beautiful region with tourists from around the world.",
      job_type: "tour_guide",
      employment_type: "part_time",
      location: "Wang Sam Mo",
      salary: { min: 300, max: 500, currency: "THB", period: "day" },
      status: "active", 
      created_at: "2024-01-18T00:00:00Z",
      experience_required: "entry",
      requirements: ["Fluent in English and Thai", "Knowledge of local history", "Friendly personality"],
      benefits: ["Flexible schedule", "Tips allowed", "Training provided"]
    },
    {
      id: "3",
      title: "Homestay Host Assistant", 
      company_name: "Phasuk Village Homestay",
      description: "Help manage our traditional homestay experience. Assist with guest check-ins, coordinate activities, and ensure visitors have an authentic experience of rural Thai life.",
      job_type: "accommodation",
      employment_type: "full_time",
      location: "Phasuk",
      salary: { min: 16000, max: 20000, currency: "THB", period: "month" },
      status: "active",
      created_at: "2024-01-15T00:00:00Z",
      application_deadline: "2024-02-15T00:00:00Z",
      experience_required: "entry",
      requirements: ["Basic English communication", "Experience with hospitality preferred", "Cultural sensitivity"],
      benefits: ["Accommodation provided", "Meals included", "Cultural exchange opportunities"]
    }
  ];

  // Filter jobs based on search criteria
  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesJobType = selectedJobType === "all" || job.job_type === selectedJobType;
    const matchesLocation = selectedLocation === "all" || job.location === selectedLocation;
    const matchesEmploymentType = selectedEmploymentType === "all" || job.employment_type === selectedEmploymentType;
    
    const matchesSalary = salaryRange === "all" || (() => {
      if (!job.salary || typeof job.salary !== 'object') return true;
      const salary = job.salary;
      const monthlySalary = salary.period === 'month' ? salary.min : 
                           salary.period === 'day' ? salary.min * 30 : salary.min;
      
      switch (salaryRange) {
        case "0-15000": return monthlySalary <= 15000;
        case "15000-25000": return monthlySalary >= 15000 && monthlySalary <= 25000;
        case "25000-35000": return monthlySalary >= 25000 && monthlySalary <= 35000;
        case "35000-50000": return monthlySalary >= 35000 && monthlySalary <= 50000;
        case "50000+": return monthlySalary >= 50000;
        default: return true;
      }
    })();

    return matchesSearch && matchesJobType && matchesLocation && matchesEmploymentType && matchesSalary;
  });

  const handleApplyClick = (job: MockJob) => {
    setSelectedJob(job);
    setApplicationDialogOpen(true);
  };

  return (
    <Layout>
      <div className="min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb />

          {/* Hero Section with SEO-optimized headings */}
          <div className="text-center mb-12">
            <PageTitle keywords={['Wang Sam Mo jobs', 'Udon Thani employment', 'tourism jobs', 'วังสามหมอ งาน']}>
              Wang Sam Mo Job Opportunities | Tourism Employment #วังสามหมอ
            </PageTitle>
            <SectionTitle className="text-xl lg:text-2xl text-muted-foreground mb-6 font-normal">
              โอกาสในการทำงานวังสามหมอ • Tourism & Hospitality Careers
            </SectionTitle>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Discover career opportunities in Wang Sam Mo's growing tourism and hospitality sector.
              From restaurant positions to tour guide roles, find your perfect job in our authentic Thai community.
              <strong>Wang Sam Mo jobs, Udon Thani employment opportunities.</strong>
            </p>
          </div>

          {/* Tab Navigation */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="jobs" className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  Find Jobs
                </TabsTrigger>
                <TabsTrigger value="employer" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  For Employers
                </TabsTrigger>
              </TabsList>

              {activeTab === "employer" && (
                <Dialog open={jobFormOpen} onOpenChange={setJobFormOpen}>
                  <DialogTrigger asChild>
                    <Button className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Post a Job
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Post New Job</DialogTitle>
                      <DialogDescription>
                        Fill in the details for your new job posting.
                      </DialogDescription>
                    </DialogHeader>
                    <JobPostingForm 
                      onSuccess={() => setJobFormOpen(false)}
                    />
                  </DialogContent>
                </Dialog>
              )}
            </div>

            <TabsContent value="jobs" className="space-y-8">
              {/* Search and Filters */}
              <JobFilters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedJobType={selectedJobType}
                setSelectedJobType={setSelectedJobType}
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
                selectedEmploymentType={selectedEmploymentType}
                setSelectedEmploymentType={setSelectedEmploymentType}
                salaryRange={salaryRange}
                setSalaryRange={setSalaryRange}
                totalResults={filteredJobs.length}
              />

              {/* Job Listings */}
              <div className="space-y-6">
                {filteredJobs.length === 0 ? (
                  <div className="text-center py-12">
                    <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <SubsectionTitle className="text-lg font-semibold mb-2">No jobs found</SubsectionTitle>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your search criteria to see more results.
                    </p>
                    <Button variant="outline" onClick={() => {
                      setSearchTerm("");
                      setSelectedJobType("all");
                      setSelectedLocation("all");
                      setSelectedEmploymentType("all");
                      setSalaryRange("all");
                    }}>
                      Clear All Filters
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-6">
                    {filteredJobs.map((job) => (
                      <JobCard 
                        key={job.id} 
                        job={job as any} 
                        onApplyClick={handleApplyClick}
                      />
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="employer" className="space-y-8">
              <div className="text-center py-12">
                <Users className="h-16 w-16 mx-auto text-primary mb-6" />
                <SectionTitle keywords={['Wang Sam Mo hiring', 'local talent', 'employer services']}>Hire Wang Sam Mo Local Talent</SectionTitle>
                <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                  Post your job openings and connect with qualified candidates in Wang Sam Mo. 
                  Our job board helps local businesses find the right people for restaurant, tourism, 
                  and service positions.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  <div className="bg-card p-6 rounded-lg border">
                    <SubsectionTitle className="font-semibold mb-2 text-base">Easy Job Posting</SubsectionTitle>
                    <p className="text-sm text-muted-foreground">
                      Create detailed job listings with requirements, benefits, and salary information.
                    </p>
                  </div>
                  <div className="bg-card p-6 rounded-lg border">
                    <SubsectionTitle className="font-semibold mb-2 text-base">Wang Sam Mo Local Reach</SubsectionTitle>
                    <p className="text-sm text-muted-foreground">
                      Connect with candidates who know the area and understand local culture.
                    </p>
                  </div>
                  <div className="bg-card p-6 rounded-lg border">
                    <SubsectionTitle className="font-semibold mb-2 text-base">Manage Applications</SubsectionTitle>
                    <p className="text-sm text-muted-foreground">
                      Review resumes and communicate directly with interested candidates.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Job Application Dialog */}
          <JobApplicationDialog
            open={applicationDialogOpen}
            onOpenChange={setApplicationDialogOpen}
            job={selectedJob as any}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Jobs;
