import { useState, useRef, useEffect, memo, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Menu,
  X,
  ShoppingCart,
  ChevronDown,
  Globe,
  Home,
  Camera,
  Utensils,
  MapPin,
  Building,
  Package,
  Briefcase,
  Info,
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigation } from "@/hooks/use-navigation";
import { NavigationLogo } from "@/components/common/navigation-logo";
import { ContactInfo } from "@/components/common/contact-info";
import { NAVIGATION_CONFIG } from "@/constants/navigation";
import { cn } from "@/lib/utils";
import MiniCart from "./cart/MiniCart";

const EnhancedNavigation = () => {
  const { itemCount, toggleCart } = useCart();
  const { language, toggleLanguage, t } = useLanguage();
  const { isOpen, isActive, toggleMenu, closeMenu, shouldShowMobileMenu } = useNavigation();
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);
  const { contactInfo, logo } = NAVIGATION_CONFIG;
  
  const miniCartRef = useRef<HTMLDivElement>(null);

  // Enhanced navigation items with cart and updated structure
  const navItems = [
    { name: t('nav.home'), href: '/', icon: Home },
    { name: t('nav.attractions'), href: '/attractions', icon: Camera },
    { name: t('nav.restaurants'), href: '/restaurants', icon: Utensils },
    { name: t('nav.services'), href: '/services', icon: MapPin },
    { name: t('nav.homestays'), href: '/services', icon: Building },
    { 
      name: t('nav.products'), 
      href: '/services', 
      icon: Package, 
      hasDropdown: true,
      dropdownItems: [
        { name: t('nav.products.pickled'), href: '/services?category=pickled' },
        { name: t('nav.products.handicrafts'), href: '/services?category=handicrafts' },
        { name: t('nav.products.tea'), href: '/services?category=tea' }
      ]
    },
    { name: t('nav.jobs'), href: '/jobs', icon: Briefcase },
    {
      name: t('nav.about'),
      href: '/about',
      icon: Info,
      hasDropdown: true,
      dropdownItems: [
        { name: t('nav.about.history'), href: '/history' },
        { name: t('nav.about.team'), href: '/about' }
      ]
    },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (miniCartRef.current && !miniCartRef.current.contains(event.target as Node)) {
        setIsMiniCartOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCartClick = useCallback(() => {
    setIsMiniCartOpen(!isMiniCartOpen);
  }, [isMiniCartOpen]);

  return (
    <nav className="bg-gradient-to-r from-amber-50 via-red-50 to-green-50 shadow-lg border-b-2 border-amber-200 sticky top-0 z-50 backdrop-blur-sm will-change-transform">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <NavigationLogo logo={logo} />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                {item.hasDropdown ? (
                  <DropdownMenu
                    open={item.name === t('nav.products') ? isProductsOpen : isAboutOpen}
                    onOpenChange={item.name === t('nav.products') ? setIsProductsOpen : setIsAboutOpen}
                  >
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className={cn(
                          "px-3 py-2 text-sm font-medium transition-all duration-300 group hover:bg-amber-100 hover:text-amber-900",
                          isActive(item.href) && "bg-amber-200 text-amber-900"
                        )}
                      >
                        <item.icon className="h-4 w-4 mr-1" />
                        {item.name}
                        <ChevronDown className="h-3 w-3 ml-1 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-48 bg-white border-amber-200 shadow-lg">
                      {item.dropdownItems?.map((dropdownItem) => (
                        <DropdownMenuItem key={dropdownItem.href} asChild>
                          <Link
                            to={dropdownItem.href}
                            className="w-full px-3 py-2 text-sm hover:bg-amber-50 hover:text-amber-900 transition-colors"
                            onClick={() => {
                              if (item.name === t('nav.products')) {
                                setIsProductsOpen(false);
                              } else {
                                setIsAboutOpen(false);
                              }
                            }}
                          >
                            {dropdownItem.name}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    to={item.href}
                    className={cn(
                      "px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 flex items-center group hover:bg-amber-100 hover:text-amber-900 relative",
                      isActive(item.href) 
                        ? "bg-amber-200 text-amber-900 shadow-sm" 
                        : "text-slate-700 hover:shadow-sm"
                    )}
                  >
                    <item.icon className="h-4 w-4 mr-1" />
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-600 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                )}
              </div>
            ))}

            {/* Cart Icon */}
            <div className="relative ml-4" ref={miniCartRef}>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCartClick}
                className="relative p-2 hover:bg-amber-100 hover:text-amber-900 transition-all duration-300"
              >
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs animate-pulse">
                    {itemCount}
                  </Badge>
                )}
              </Button>
              
              {/* Mini Cart */}
              {isMiniCartOpen && (
                <div className="absolute right-0 top-full mt-2 z-50">
                  <MiniCart onClose={() => setIsMiniCartOpen(false)} />
                </div>
              )}
            </div>

            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="ml-2 px-3 py-2 hover:bg-amber-100 hover:text-amber-900 transition-all duration-300"
            >
              <Globe className="h-4 w-4 mr-1" />
              {language.toUpperCase()}
            </Button>
          </div>

          {/* Contact Info */}
          <div className="hidden lg:block">
            <ContactInfo 
              contacts={contactInfo}
              variant="horizontal"
            />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Cart */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCartClick}
                className="relative p-2 hover:bg-amber-100"
              >
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 bg-red-500 text-white text-xs">
                    {itemCount}
                  </Badge>
                )}
              </Button>
            </div>

            {/* Mobile Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="p-2 hover:bg-amber-100"
            >
              <Globe className="h-4 w-4" />
            </Button>

            {/* Hamburger Menu */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              className="p-2 hover:bg-amber-100"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {shouldShowMobileMenu && (
          <div className="md:hidden py-3 border-t border-amber-200 bg-gradient-to-r from-amber-50 to-green-50 animate-in slide-in-from-top-2 duration-200">
            <div className="space-y-2">
              {navItems.map((item) => (
                <div key={item.name}>
                  {item.hasDropdown ? (
                    <div className="space-y-1">
                      <div className="px-3 py-2 text-base font-medium text-slate-700 flex items-center">
                        <item.icon className="h-4 w-4 mr-2" />
                        {item.name}
                      </div>
                      <div className="pl-8 space-y-1">
                        {item.dropdownItems?.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.href}
                            to={dropdownItem.href}
                            onClick={closeMenu}
                            className="block px-3 py-2 text-sm text-slate-600 hover:bg-amber-100 hover:text-amber-900 rounded-md transition-colors"
                          >
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      onClick={closeMenu}
                      className={cn(
                        "block px-3 py-2 rounded-md text-base font-medium transition-colors flex items-center",
                        isActive(item.href)
                          ? "bg-amber-200 text-amber-900"
                          : "text-slate-700 hover:bg-amber-100 hover:text-amber-900"
                      )}
                    >
                      <item.icon className="h-4 w-4 mr-2" />
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t border-amber-200">
              <ContactInfo 
                contacts={contactInfo}
                variant="vertical"
              />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Mini Cart */}
      {isMiniCartOpen && (
        <div
          className="md:hidden fixed inset-0 top-14 sm:top-16 z-40 bg-black/50 backdrop-blur-sm animate-in fade-in-0 duration-200"
          onClick={() => setIsMiniCartOpen(false)}
        >
          <div
            className="bg-white max-w-sm mx-auto mt-4 rounded-lg shadow-lg animate-in slide-in-from-top-4 duration-300"
            onClick={e => e.stopPropagation()}
          >
            <MiniCart onClose={() => setIsMiniCartOpen(false)} />
          </div>
        </div>
      )}
    </nav>
  );
};

export default memo(EnhancedNavigation);
