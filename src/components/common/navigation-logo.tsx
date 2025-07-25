import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavigationLogoProps {
  logo: {
    src: string;
    alt: string;
    title: string;
    subtitle: string;
  };
  className?: string;
  showText?: boolean;
}

export function NavigationLogo({ logo, className, showText = true }: NavigationLogoProps) {
  return (
    <Link 
      to="/" 
      className={cn("flex items-center space-x-3 transition-opacity hover:opacity-80", className)}
    >
      <img 
        src={logo.src} 
        alt={logo.alt} 
        className="h-10 w-auto"
      />
      {showText && (
        <div className="hidden sm:block">
          <h1 className="text-xl font-bold text-primary">{logo.title}</h1>
          <p className="text-xs text-muted-foreground">{logo.subtitle}</p>
        </div>
      )}
    </Link>
  );
}