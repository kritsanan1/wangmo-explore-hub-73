import { ContactInfo as ContactInfoType } from "@/types/navigation";
import { cn } from "@/lib/utils";

interface ContactInfoProps {
  contacts: ContactInfoType[];
  variant?: 'horizontal' | 'vertical';
  className?: string;
}

export function ContactInfo({ contacts, variant = 'horizontal', className }: ContactInfoProps) {
  const containerClass = variant === 'horizontal' 
    ? "flex items-center space-x-4" 
    : "space-y-2";

  return (
    <div className={cn(
      containerClass,
      "text-sm text-muted-foreground",
      className
    )}>
      {contacts.map((contact, index) => {
        const Component = contact.href ? 'a' : 'div';
        const props = contact.href 
          ? { href: contact.href, target: contact.type === 'phone' ? undefined : '_blank', rel: 'noopener noreferrer' }
          : {};

        return (
          <Component
            key={index}
            {...props}
            className={cn(
              "flex items-center space-x-1 transition-colors",
              contact.href && "hover:text-foreground cursor-pointer"
            )}
          >
            <contact.icon className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">{contact.value}</span>
          </Component>
        );
      })}
    </div>
  );
}