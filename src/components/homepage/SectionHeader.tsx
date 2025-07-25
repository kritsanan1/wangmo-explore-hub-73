import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  titleThai?: string;
  linkTo: string;
  linkText?: string;
  className?: string;
};

const SectionHeader = ({ 
  title, 
  subtitle, 
  titleThai, 
  linkTo, 
  linkText = "See All",
  className = ""
}: SectionHeaderProps) => {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-center justify-between mb-8 ${className}`}>
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          {title}
        </h2>
        {titleThai && (
          <p className="text-lg text-muted-foreground font-medium mb-1">
            {titleThai}
          </p>
        )}
        {subtitle && (
          <p className="text-muted-foreground">
            {subtitle}
          </p>
        )}
      </div>
      <Link to={linkTo}>
        <Button variant="outline" className="mt-4 sm:mt-0">
          {linkText}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
};

export default SectionHeader;