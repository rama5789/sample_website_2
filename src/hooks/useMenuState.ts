import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export const useMenuState = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

  const location = useLocation();
  const megaMenuButtonRef = useRef<HTMLButtonElement>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMegaMenuOpen(false);
  }, [location]);

  // Prevent body scroll when any menu is open
  useEffect(() => {
    if (isMobileMenuOpen || isMegaMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen, isMegaMenuOpen]);

  // Handle clicks outside of mega menu to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMegaMenuOpen &&
        megaMenuRef.current &&
        !megaMenuRef.current.contains(event.target as Node) &&
        megaMenuButtonRef.current &&
        !megaMenuButtonRef.current.contains(event.target as Node)
      ) {
        setIsMegaMenuOpen(false);
      }
    };

    if (isMegaMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isMegaMenuOpen]);

  return {
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    isMegaMenuOpen,
    setIsMegaMenuOpen,
    megaMenuButtonRef,
    megaMenuRef,
  };
};
