import { Home, MapPin, Phone, Mail, Utensils, Briefcase, Info, Camera } from 'lucide-react';
import { NavigationConfig } from '@/types/navigation';

export const NAVIGATION_CONFIG: NavigationConfig = {
  logo: {
    src: "/lovable-uploads/c199a2ae-1f19-475e-ab37-9bd5411d4f01.png",
    alt: "Tour Der Wang Logo",
    title: "Tour Der Wang",
    subtitle: "ที่นี่ วังสามหมอ"
  },
  items: [
    { 
      name: "Home", 
      href: "/", 
      thai: "หน้าแรก",
      icon: Home,
      description: "Welcome to Wang Sam Mo"
    },
    { 
      name: "Attractions", 
      href: "/attractions", 
      thai: "สถานที่ท่องเที่ยว",
      icon: Camera,
      description: "Discover local attractions"
    },
    { 
      name: "Restaurants", 
      href: "/restaurants", 
      thai: "ร้านอาหาร",
      icon: Utensils,
      description: "Local dining experiences"
    },
    { 
      name: "Services", 
      href: "/services", 
      thai: "บริการ",
      icon: MapPin,
      description: "Local services and business"
    },
    { 
      name: "Jobs", 
      href: "/jobs", 
      thai: "หางาน",
      icon: Briefcase,
      description: "Employment opportunities"
    },
    { 
      name: "About", 
      href: "/about", 
      thai: "เกี่ยวกับเรา",
      icon: Info,
      description: "Learn about Wang Sam Mo"
    },
  ],
  contactInfo: [
    {
      type: 'location',
      icon: MapPin,
      label: 'Location',
      value: 'Wang Sam Mo, Udon Thani',
      href: 'https://maps.google.com/?q=Wang+Sam+Mo+Udon+Thani'
    },
    {
      type: 'phone',
      icon: Phone,
      label: 'Phone',
      value: '+66 XX XXX XXXX',
      href: 'tel:+66XXXXXXXX'
    },
    {
      type: 'email',
      icon: Mail,
      label: 'Email',
      value: 'info@wangsammo.com',
      href: 'mailto:info@wangsammo.com'
    }
  ]
};

export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1280
} as const;