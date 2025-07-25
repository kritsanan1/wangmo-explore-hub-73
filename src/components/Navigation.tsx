import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useNavigation } from "@/hooks/use-navigation";
import { NAVIGATION_CONFIG } from "@/constants/navigation";
import { NavigationLogo } from "@/components/common/navigation-logo";
import { NavigationMenu } from "@/components/common/navigation-menu";
import { ContactInfo } from "@/components/common/contact-info";

const Navigation = () => {
  const { isOpen, isActive, toggleMenu, closeMenu, shouldShowMobileMenu } = useNavigation();
  const { items: navItems, contactInfo, logo } = NAVIGATION_CONFIG;

  return (
    <nav className="bg-card shadow-lg border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <NavigationLogo logo={logo} />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavigationMenu 
              items={navItems} 
              isActive={isActive}
              variant="desktop"
            />
          </div>

          {/* Contact Info */}
          <div className="hidden lg:block">
            <ContactInfo 
              contacts={contactInfo}
              variant="horizontal"
            />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              className="p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {shouldShowMobileMenu && (
          <div className="md:hidden py-4 border-t border-border">
            <NavigationMenu 
              items={navItems} 
              isActive={isActive}
              variant="mobile"
              onItemClick={closeMenu}
            />
            <div className="mt-4 pt-4 border-t border-border">
              <ContactInfo 
                contacts={contactInfo}
                variant="vertical"
              />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;