import { Link } from "react-router-dom";
import { NavigationItem } from "@/types/navigation";
import { cn } from "@/lib/utils";

interface NavigationMenuProps {
  items: NavigationItem[];
  isActive: (href: string) => boolean;
  variant?: 'desktop' | 'mobile';
  onItemClick?: () => void;
}

export function NavigationMenu({ 
  items, 
  isActive, 
  variant = 'desktop',
  onItemClick 
}: NavigationMenuProps) {
  if (variant === 'mobile') {
    return (
      <div className="space-y-2">
        {items.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            onClick={onItemClick}
            className={cn(
              "block px-3 py-2 rounded-md text-base font-medium transition-colors",
              isActive(item.href)
                ? "bg-primary text-primary-foreground"
                : "text-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <div className="flex items-center space-x-2">
              {item.icon && <item.icon className="h-4 w-4" />}
              <div>
                <div>{item.name}</div>
                <div className="text-xs text-muted-foreground">{item.thai}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-1">
      {items.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={cn(
            "px-3 py-2 rounded-md text-sm font-medium transition-colors group",
            isActive(item.href)
              ? "bg-primary text-primary-foreground"
              : "text-foreground hover:bg-accent hover:text-accent-foreground"
          )}
        >
          <div className="flex items-center space-x-1">
            {item.icon && <item.icon className="h-4 w-4" />}
            <span>{item.name}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}