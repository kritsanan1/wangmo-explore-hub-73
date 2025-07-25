import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

type Language = 'en' | 'th';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.attractions': 'Attractions',
    'nav.restaurants': 'Restaurants',
    'nav.services': 'Services',
    'nav.homestays': 'Homestays',
    'nav.products': 'Local Products',
    'nav.jobs': 'Jobs',
    'nav.about': 'About',
    'nav.cart': 'Cart',
    
    // Products dropdown
    'nav.products.pickled': 'Pickled Vegetables',
    'nav.products.handicrafts': 'Handicrafts',
    'nav.products.tea': 'Local Tea',
    
    // Cart
    'cart.title': 'Shopping Cart',
    'cart.empty': 'Your cart is empty',
    'cart.total': 'Total',
    'cart.subtotal': 'Subtotal',
    'cart.checkout': 'Checkout',
    'cart.continue': 'Continue Shopping',
    'cart.remove': 'Remove',
    'cart.quantity': 'Quantity',
    'cart.added': 'Added to cart',
    'cart.view': 'View Cart',
    'cart.proceed': 'Proceed to Cart',
    
    // Products
    'products.pickled.name': 'Pickled Vegetables',
    'products.handicrafts.name': 'Issan Handicrafts',
    'products.tea.name': 'Local Tea',
    'products.add': 'Add to Cart',
    
    // General
    'currency': 'THB',
    'back': 'Back',
    'close': 'Close',
    'loading': 'Loading...',
  },
  th: {
    // Navigation
    'nav.home': 'หน้าแร��',
    'nav.attractions': 'สถานที่ท่องเที่ยว',
    'nav.restaurants': 'ร้านอาหาร',
    'nav.services': 'บริการ',
    'nav.homestays': 'โฮมสเตย์',
    'nav.products': 'ผลิตภัณฑ์ท้องถิ่น',
    'nav.jobs': 'หางาน',
    'nav.about': 'เกี่ยวกับเรา',
    'nav.cart': 'ตะกร้า',
    
    // Products dropdown
    'nav.products.pickled': 'ผักดอง',
    'nav.products.handicrafts': 'งานฝีมือ',
    'nav.products.tea': 'ชาท้องถิ่น',
    
    // Cart
    'cart.title': 'ตะกร้าสินค้า',
    'cart.empty': 'ตะกร้าของคุณว่างเปล่า',
    'cart.total': 'รวมทั้งหมด',
    'cart.subtotal': 'รวมย่อย',
    'cart.checkout': 'ชำระเงิน',
    'cart.continue': 'เลือกซื้อต่อ',
    'cart.remove': 'ลบ',
    'cart.quantity': 'จำนวน',
    'cart.added': 'เพิ่มในตะกร้าแล้ว',
    'cart.view': 'ดูตะกร้า',
    'cart.proceed': 'ไปยังตะกร้า',
    
    // Products
    'products.pickled.name': 'ผักดองวังสามหมอ',
    'products.handicrafts.name': 'งานฝีมืออีสาน',
    'products.tea.name': 'ชาท้องถิ่น',
    'products.add': 'เพิ่มในตะกร้า',
    
    // General
    'currency': 'บาท',
    'back': 'ย้อนกลับ',
    'close': 'ปิด',
    'loading': 'กำลังโหลด...',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('wangsammo-language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'th')) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Memoized functions for better performance
  const toggleLanguage = useCallback(() => {
    const newLanguage = language === 'en' ? 'th' : 'en';
    setLanguage(newLanguage);
    localStorage.setItem('wangsammo-language', newLanguage);
  }, [language]);

  const t = useCallback((key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  }, [language]);

  // Memoized context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    language,
    toggleLanguage,
    t
  }), [language, toggleLanguage, t]);

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
