import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Star, MessageCircle, ThumbsUp, Flag, User } from "lucide-react";
import { Tables } from "@/integrations/supabase/types";
import { useToast } from "@/hooks/use-toast";

type ReviewsSectionProps = {
  businessId: string;
  businessType: 'restaurant' | 'service';
};

const ReviewsSection = ({ businessId, businessType }: ReviewsSectionProps) => {
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const { data: reviews, isLoading, refetch } = useQuery({
    queryKey: ['reviews', businessId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('entity_id', businessId)
        .eq('entity_type', businessType === 'restaurant' ? 'restaurant' : 'service')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const submitReview = async () => {
    if (!newReview.trim()) {
      toast({
        title: "Error",
        description: "Please write a review before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('reviews')
        .insert({
          entity_id: businessId,
          entity_type: businessType === 'restaurant' ? 'restaurant' : 'service',
          rating: newRating,
          comment: newReview,
        });

      if (error) throw error;

      setNewReview("");
      setNewRating(5);
      refetch();
      
      toast({
        title: "Review submitted!",
        description: "Thank you for your feedback.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (rating: number, interactive = false, onRate?: (rating: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating 
                ? 'fill-yellow-400 text-yellow-400' 
                : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
            onClick={() => interactive && onRate?.(star)}
          />
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-4 bg-muted rounded w-1/3"></div>
        <div className="h-20 bg-muted rounded"></div>
        <div className="h-16 bg-muted rounded"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4 border-t pt-4">
      <h4 className="font-semibold flex items-center gap-2">
        <MessageCircle className="h-4 w-4" />
        Reviews ({reviews?.length || 0})
      </h4>

      {/* Write a Review */}
      <div className="space-y-3 p-3 bg-muted/50 rounded-lg">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Your rating:</span>
          {renderStars(newRating, true, setNewRating)}
        </div>
        <Textarea
          placeholder="Share your experience..."
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          className="min-h-20"
        />
        <Button 
          onClick={submitReview} 
          disabled={isSubmitting}
          size="sm"
          className="w-full"
        >
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </Button>
      </div>

      {/* Reviews List */}
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {reviews?.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No reviews yet. Be the first to review!
          </p>
        ) : (
          reviews?.map((review) => (
            <div key={review.id} className="p-3 border rounded-lg bg-background">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Anonymous User</span>
                  {renderStars(review.rating)}
                </div>
                <span className="text-xs text-muted-foreground">
                  {new Date(review.created_at!).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewsSection;