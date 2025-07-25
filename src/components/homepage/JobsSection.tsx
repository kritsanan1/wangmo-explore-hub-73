import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Briefcase, DollarSign, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import SectionHeader from "./SectionHeader";

type Job = {
  id: string;
  title: string;
  title_thai: string;
  company: string;
  company_thai: string;
  description: string;
  salary_range: string;
  job_type: string;
  location: {
    address: string;
  };
  status: string;
  featured: boolean;
  created_at: string;
};

const JobsSection = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedJobs();
  }, []);

  const fetchFeaturedJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('status', 'active')
        .eq('featured', true)
        .limit(3);

      if (error) throw error;
      
      if (data && data.length > 0) {
        // Transform the data to match our type
        const transformedData = data.map((item: any) => ({
          ...item,
          location: typeof item.location === 'string' 
            ? { address: item.location }
            : item.location || { address: 'Wang Sam Mo, Udon Thani' }
        }));
        setJobs(transformedData);
      } else {
        // Sample data based on requested Wang Sam Mo job listings
        setJobs([
          {
            id: '1',
            title: 'Restaurant Staff at Baan Suan Rim Nam',
            title_thai: 'พนักงานร้านอาหารบ้านสวนริมน้ำ',
            company: 'Baan Suan Rim Nam',
            company_thai: 'บ้านสวนริมน้ำ',
            description: 'Join Baan Suan Rim Nam\'s team, 10,000 THB/month. Apply now!',
            salary_range: '10,000 THB/month',
            job_type: 'Full-time',
            location: { address: 'Wang Yai, Wang Sam Mo' },
            status: 'active',
            featured: true,
            created_at: new Date().toISOString()
          },
          {
            id: '2',
            title: 'Tour Guide in Phasuk',
            title_thai: 'ไกด์นำเที่ยวพระสุก',
            company: 'Wang Sam Mo Tourism',
            company_thai: 'การท่องเที่ยววังสามหมอ',
            description: 'Be a tour guide in Wang Sam Mo, share local culture, ~12,000 THB/month.',
            salary_range: '12,000 THB/month',
            job_type: 'Full-time',
            location: { address: 'Phasuk Temple Area, Wang Sam Mo' },
            status: 'active',
            featured: true,
            created_at: new Date().toISOString()
          }
        ]);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const getJobTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'full-time': return 'bg-green-100 text-green-800';
      case 'part-time': return 'bg-blue-100 text-blue-800';
      case 'contract': return 'bg-orange-100 text-orange-800';
      case 'freelance': return 'bg-purple-100 text-purple-800';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  if (loading) {
    return (
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/3 mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-48 bg-muted rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Job Opportunities"
          titleThai="โอกาสการทำงาน"
          subtitle="Join the growing tourism industry in Wang Sam Mo"
          linkTo="/jobs"
          linkText="View All Jobs"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <Card key={job.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-foreground mb-1 line-clamp-1">
                      {job.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2 font-medium">
                      {job.title_thai}
                    </p>
                  </div>
                  <Badge className={getJobTypeColor(job.job_type)}>
                    <Briefcase className="h-3 w-3 mr-1" />
                    {job.job_type}
                  </Badge>
                </div>

                <div className="mb-4">
                  <p className="font-semibold text-foreground">{job.company}</p>
                  <p className="text-sm text-muted-foreground">{job.company_thai}</p>
                </div>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {job.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="line-clamp-1">{job.location.address}</span>
                  </div>
                  <div className="flex items-center text-sm text-foreground font-medium">
                    <DollarSign className="h-4 w-4 mr-2" />
                    <span>{job.salary_range}</span>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-2" />
                    <span>Posted {formatTimeAgo(job.created_at)}</span>
                  </div>
                </div>

                <Link to="/jobs">
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Apply Now
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobsSection;
