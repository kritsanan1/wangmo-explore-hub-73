import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, MapPin, DollarSign, Clock, Calendar, Users, Plus, X } from "lucide-react";
import { Tables } from "@/integrations/supabase/types";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type JobPostingFormProps = {
  onSuccess: () => void;
  editingJob?: any | null;
};

const JobPostingForm = ({ onSuccess, editingJob }: JobPostingFormProps) => {
  const [formData, setFormData] = useState({
    title: editingJob?.title || "",
    company_name: editingJob?.company_name || "",
    description: editingJob?.description || "",
    job_type: editingJob?.job_type || "",
    employment_type: editingJob?.employment_type || "full_time",
    location: editingJob?.location || "",
    experience_required: editingJob?.experience_required || "",
    salary_min: editingJob?.salary ? (typeof editingJob.salary === 'object' ? (editingJob.salary as any).min : '') : "",
    salary_max: editingJob?.salary ? (typeof editingJob.salary === 'object' ? (editingJob.salary as any).max : '') : "",
    salary_currency: editingJob?.salary ? (typeof editingJob.salary === 'object' ? (editingJob.salary as any).currency : 'THB') : "THB",
    salary_period: editingJob?.salary ? (typeof editingJob.salary === 'object' ? (editingJob.salary as any).period : 'month') : "month",
    application_deadline: editingJob?.application_deadline ? new Date(editingJob.application_deadline).toISOString().split('T')[0] : "",
    requirements: editingJob?.requirements || [],
    benefits: editingJob?.benefits || [],
    contact_email: editingJob?.contact_email || "",
    contact_phone: editingJob?.contact_phone || "",
  });
  const [newRequirement, setNewRequirement] = useState("");
  const [newBenefit, setNewBenefit] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const jobTypes = [
    { value: "restaurant", label: "Restaurant Staff" },
    { value: "tour_guide", label: "Tour Guide" },
    { value: "accommodation", label: "Hotel/Homestay" },
    { value: "transport", label: "Transportation" },
    { value: "retail", label: "Retail/Sales" },
    { value: "administrative", label: "Administrative" },
    { value: "other", label: "Other" },
  ];

  const employmentTypes = [
    { value: "full_time", label: "Full Time" },
    { value: "part_time", label: "Part Time" },
    { value: "contract", label: "Contract" },
    { value: "temporary", label: "Temporary" },
  ];

  const experienceLevels = [
    { value: "entry", label: "Entry Level" },
    { value: "junior", label: "Junior (1-3 years)" },
    { value: "mid", label: "Mid-level (3-5 years)" },
    { value: "senior", label: "Senior (5+ years)" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.company_name || !formData.description || !formData.job_type) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const salary = formData.salary_min || formData.salary_max ? {
        min: formData.salary_min ? parseInt(formData.salary_min) : undefined,
        max: formData.salary_max ? parseInt(formData.salary_max) : undefined,
        currency: formData.salary_currency,
        period: formData.salary_period,
      } : null;

      const jobData = {
        title: formData.title,
        company_name: formData.company_name,
        description: formData.description,
        job_type: formData.job_type,
        employment_type: formData.employment_type,
        location: formData.location,
        experience_required: formData.experience_required,
        salary,
        application_deadline: formData.application_deadline || null,
        requirements: formData.requirements,
        benefits: formData.benefits,
        contact_email: formData.contact_email,
        contact_phone: formData.contact_phone,
        status: 'active' as const,
      };

      if (editingJob) {
        const { error } = await supabase
          .from('jobs')
          .update(jobData)
          .eq('id', editingJob.id);
        
        if (error) throw error;
        
        toast({
          title: "Job updated!",
          description: "Your job posting has been updated successfully.",
        });
      } else {
        // Mock job posting for now
        console.log('New job posted:', jobData);
        
        toast({
          title: "Job posted!",
          description: "Your job posting would be live (demo mode).",
        });
      }

      onSuccess();
    } catch (error) {
      console.error('Job posting error:', error);
      toast({
        title: "Error",
        description: "Failed to save job posting. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addRequirement = () => {
    if (newRequirement.trim()) {
      setFormData(prev => ({
        ...prev,
        requirements: [...prev.requirements, newRequirement.trim()]
      }));
      setNewRequirement("");
    }
  };

  const removeRequirement = (index: number) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index)
    }));
  };

  const addBenefit = () => {
    if (newBenefit.trim()) {
      setFormData(prev => ({
        ...prev,
        benefits: [...prev.benefits, newBenefit.trim()]
      }));
      setNewBenefit("");
    }
  };

  const removeBenefit = (index: number) => {
    setFormData(prev => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index)
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Basic Information
          </CardTitle>
          <CardDescription>Essential details about the job position</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Job Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="e.g., Restaurant Server, Tour Guide"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="company_name">Company Name *</Label>
              <Input
                id="company_name"
                value={formData.company_name}
                onChange={(e) => handleInputChange('company_name', e.target.value)}
                placeholder="Your business name"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Job Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe the role, responsibilities, and what you're looking for..."
              className="min-h-32"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="job_type">Job Category *</Label>
              <Select value={formData.job_type} onValueChange={(value) => handleInputChange('job_type', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select job category" />
                </SelectTrigger>
                <SelectContent>
                  {jobTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="employment_type">Employment Type</Label>
              <Select value={formData.employment_type} onValueChange={(value) => handleInputChange('employment_type', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select employment type" />
                </SelectTrigger>
                <SelectContent>
                  {employmentTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Location & Experience */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Location & Experience
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Work Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="e.g., Wang Sam Mo, Phasuk"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience_required">Experience Level</Label>
              <Select value={formData.experience_required} onValueChange={(value) => handleInputChange('experience_required', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  {experienceLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Salary Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Salary Information
          </CardTitle>
          <CardDescription>Optional but recommended to attract candidates</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="salary_min">Min Salary</Label>
              <Input
                id="salary_min"
                type="number"
                value={formData.salary_min}
                onChange={(e) => handleInputChange('salary_min', e.target.value)}
                placeholder="15000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="salary_max">Max Salary</Label>
              <Input
                id="salary_max"
                type="number"
                value={formData.salary_max}
                onChange={(e) => handleInputChange('salary_max', e.target.value)}
                placeholder="25000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="salary_currency">Currency</Label>
              <Select value={formData.salary_currency} onValueChange={(value) => handleInputChange('salary_currency', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="THB">THB (฿)</SelectItem>
                  <SelectItem value="USD">USD ($)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="salary_period">Period</Label>
              <Select value={formData.salary_period} onValueChange={(value) => handleInputChange('salary_period', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hour">Per Hour</SelectItem>
                  <SelectItem value="day">Per Day</SelectItem>
                  <SelectItem value="month">Per Month</SelectItem>
                  <SelectItem value="year">Per Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Requirements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Requirements
          </CardTitle>
          <CardDescription>What skills and qualifications are needed?</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newRequirement}
              onChange={(e) => setNewRequirement(e.target.value)}
              placeholder="Add a requirement (e.g., Fluent in English and Thai)"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addRequirement())}
            />
            <Button type="button" onClick={addRequirement} size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          {formData.requirements.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.requirements.map((req, index) => (
                <Badge key={index} variant="secondary" className="gap-1">
                  {req}
                  <button
                    type="button"
                    onClick={() => removeRequirement(index)}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Benefits */}
      <Card>
        <CardHeader>
          <CardTitle>Benefits & Perks</CardTitle>
          <CardDescription>What benefits do you offer?</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newBenefit}
              onChange={(e) => setNewBenefit(e.target.value)}
              placeholder="Add a benefit (e.g., Health insurance, Flexible hours)"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addBenefit())}
            />
            <Button type="button" onClick={addBenefit} size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          {formData.benefits.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.benefits.map((benefit, index) => (
                <Badge key={index} variant="secondary" className="gap-1">
                  {benefit}
                  <button
                    type="button"
                    onClick={() => removeBenefit(index)}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Contact & Deadline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Contact & Application Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contact_email">Contact Email</Label>
              <Input
                id="contact_email"
                type="email"
                value={formData.contact_email}
                onChange={(e) => handleInputChange('contact_email', e.target.value)}
                placeholder="hiring@yourcompany.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact_phone">Contact Phone</Label>
              <Input
                id="contact_phone"
                value={formData.contact_phone}
                onChange={(e) => handleInputChange('contact_phone', e.target.value)}
                placeholder="+66 XX XXX XXXX"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="application_deadline">Application Deadline (Optional)</Label>
            <Input
              id="application_deadline"
              type="date"
              value={formData.application_deadline}
              onChange={(e) => handleInputChange('application_deadline', e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onSuccess}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="flex-1"
        >
          {isSubmitting ? "Saving..." : (editingJob ? "Update Job" : "Post Job")}
        </Button>
      </div>
    </form>
  );
};

export default JobPostingForm;