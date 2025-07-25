import { ComponentWithChildren, OptionalClassName } from "@/types";
import { cn } from "@/lib/utils";

interface SectionHeaderProps extends OptionalClassName {
  title: string;
  titleThai?: string;
  description?: string;
  descriptionThai?: string;
  centered?: boolean;
  children?: React.ReactNode;
}

export function SectionHeader({
  title,
  titleThai,
  description,
  descriptionThai,
  centered = false,
  className,
  children
}: SectionHeaderProps) {
  return (
    <div className={cn(
      "mb-12",
      centered && "text-center",
      className
    )}>
      <div className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            {title}
          </h2>
          {titleThai && (
            <h3 className="text-xl lg:text-2xl text-muted-foreground">
              {titleThai}
            </h3>
          )}
        </div>
        
        {(description || descriptionThai) && (
          <div className="space-y-2">
            {description && (
              <p className={cn(
                "text-lg text-muted-foreground leading-relaxed",
                centered ? "max-w-3xl mx-auto" : "max-w-4xl"
              )}>
                {description}
              </p>
            )}
            {descriptionThai && (
              <p className={cn(
                "text-base text-muted-foreground/80 leading-relaxed",
                centered ? "max-w-3xl mx-auto" : "max-w-4xl"
              )}>
                {descriptionThai}
              </p>
            )}
          </div>
        )}
      </div>
      
      {children && (
        <div className="mt-6">
          {children}
        </div>
      )}
    </div>
  );
}