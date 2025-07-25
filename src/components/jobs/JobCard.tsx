import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Building, DollarSign, Clock, Calendar, Users } from "lucide-react";
import { Tables } from "@/integrations/supabase/types";

type JobCardProps = {
  job: any;
  onApplyClick: (job: any) => void;
};

const JobCard = ({ job, onApplyClick }: JobCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const getJobTypeColor = (jobType: string) => {
    const colors = {
      restaurant: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
      tour_guide: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      accommodation: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      transport: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      retail: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      administrative: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
      other: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
    };
    return colors[jobType as keyof typeof colors] || colors.other;
  };

  const getEmploymentTypeColor = (type: string) => {
    const colors = {
      full_time: "bg-primary/10 text-primary",
      part_time: "bg-secondary/10 text-secondary-foreground",
      contract: "bg-accent/10 text-accent-foreground",
      temporary: "bg-muted text-muted-foreground",
    };
    return colors[type as keyof typeof colors] || colors.temporary;
  };

  const formatSalary = (salary: any) => {
    if (!salary) return "Negotiable";
    if (typeof salary === 'string') return salary;
    if (typeof salary === 'object') {
      const { min, max, currency = 'THB', period = 'month' } = salary;
      if (min && max) {
        return `${min.toLocaleString()}-${max.toLocaleString()} ${currency}/${period}`;
      }
      if (min) return `From ${min.toLocaleString()} ${currency}/${period}`;
      if (max) return `Up to ${max.toLocaleString()} ${currency}/${period}`;
    }
    return "Negotiable";
  };

  const isJobActive = () => {
    if (!job.application_deadline) return job.status === 'active';
    return new Date(job.application_deadline) > new Date() && job.status === 'active';
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <CardTitle className="text-lg group-hover:text-primary transition-colors">
              {job.title}
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground mt-1">
              {job.company_name}
            </CardDescription>
          </div>
          <div className="flex flex-col gap-2">
            <Badge variant="secondary" className={getJobTypeColor(job.job_type)}>
              {job.job_type.replace('_', ' ')}
            </Badge>
            {job.employment_type && (
              <Badge variant="outline" className={getEmploymentTypeColor(job.employment_type)}>
                {job.employment_type.replace('_', ' ')}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Key Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">{job.location}</span>
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground">
            <DollarSign className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">{formatSalary(job.salary)}</span>
          </div>

          {job.experience_required && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{job.experience_required} experience</span>
            </div>
          )}

          {job.application_deadline && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">
                Deadline: {new Date(job.application_deadline).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="space-y-2">
          <p className={`text-sm text-muted-foreground ${!isExpanded ? 'line-clamp-2' : ''}`}>
            {job.description}
          </p>
          {job.description.length > 150 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-auto p-0 text-primary hover:text-primary/80"
            >
              {isExpanded ? 'Show less' : 'Read more'}
            </Button>
          )}
        </div>

        {/* Requirements */}
        {job.requirements && job.requirements.length > 0 && isExpanded && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Requirements:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              {job.requirements.slice(0, 3).map((req, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  <span>{req}</span>
                </li>
              ))}
              {job.requirements.length > 3 && (
                <li className="text-xs text-muted-foreground italic">
                  +{job.requirements.length - 3} more requirements
                </li>
              )}
            </ul>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>Posted {new Date(job.created_at!).toLocaleDateString()}</span>
          </div>
          
          <Button 
            onClick={() => onApplyClick(job)}
            disabled={!isJobActive()}
            className="px-6"
          >
            {!isJobActive() ? 'Expired' : 'Apply Now'}
          </Button>
        </div>

        {/* Status indicator */}
        {!isJobActive() && (
          <div className="flex items-center justify-center py-2">
            <Badge variant="destructive" className="text-xs">
              Application Closed
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default JobCard;