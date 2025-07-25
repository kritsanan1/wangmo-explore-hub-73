import { useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useIsMobile } from './use-mobile';

export function useNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  const toggleMenu = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  const isActive = useCallback((href: string) => {
    return location.pathname === href;
  }, [location.pathname]);

  // Auto-close mobile menu when switching to desktop
  const shouldShowMobileMenu = isMobile && isOpen;

  return {
    isOpen,
    isActive,
    toggleMenu,
    closeMenu,
    shouldShowMobileMenu,
    isMobile,
    currentPath: location.pathname
  };
}