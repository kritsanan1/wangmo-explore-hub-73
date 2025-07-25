import { cn } from "@/lib/utils";
import { Card, CardContent } from "./card";

interface LoadingSkeletonProps {
  className?: string;
  count?: number;
  variant?: 'card' | 'list' | 'text';
}

export function LoadingSkeleton({ 
  className, 
  count = 1, 
  variant = 'card' 
}: LoadingSkeletonProps) {
  if (variant === 'card') {
    return (
      <>
        {Array.from({ length: count }, (_, i) => (
          <Card key={i} className={cn("animate-pulse", className)}>
            <div className="h-48 bg-muted rounded-t-lg"></div>
            <CardContent className="p-4 space-y-3">
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-3 bg-muted rounded w-3/4"></div>
              <div className="h-8 bg-muted rounded"></div>
            </CardContent>
          </Card>
        ))}
      </>
    );
  }

  if (variant === 'list') {
    return (
      <>
        {Array.from({ length: count }, (_, i) => (
          <div key={i} className={cn("animate-pulse flex space-x-4 p-4", className)}>
            <div className="h-12 w-12 bg-muted rounded"></div>
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-3 bg-muted rounded w-3/4"></div>
            </div>
          </div>
        ))}
      </>
    );
  }

  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className={cn("animate-pulse", className)}>
          <div className="h-4 bg-muted rounded"></div>
        </div>
      ))}
    </>
  );
}