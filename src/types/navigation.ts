import { LucideIcon } from 'lucide-react';

export interface NavigationItem {
  name: string;
  href: string;
  thai: string;
  icon?: LucideIcon;
  description?: string;
  external?: boolean;
}

export interface ContactInfo {
  type: 'location' | 'phone' | 'email';
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
}

export interface NavigationConfig {
  items: NavigationItem[];
  contactInfo: ContactInfo[];
  logo: {
    src: string;
    alt: string;
    title: string;
    subtitle: string;
  };
}