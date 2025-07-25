import { AttractionCategory } from '@/types/attractions';

export const ATTRACTION_CATEGORIES: Record<AttractionCategory, {
  label: string;
  labelThai: string;
  description: string;
  color: string;
  bgColor: string;
}> = {
  temple: {
    label: 'Temple',
    labelThai: 'วัด',
    description: 'Buddhist temples and religious sites',
    color: 'text-orange-800 dark:text-orange-200',
    bgColor: 'bg-orange-100 dark:bg-orange-900'
  },
  park: {
    label: 'Park',
    labelThai: 'สวนสาธารณะ',
    description: 'Parks and recreational areas',
    color: 'text-green-800 dark:text-green-200',
    bgColor: 'bg-green-100 dark:bg-green-900'
  },
  museum: {
    label: 'Museum',
    labelThai: 'พิพิธภัณฑ์',
    description: 'Museums and educational centers',
    color: 'text-blue-800 dark:text-blue-200',
    bgColor: 'bg-blue-100 dark:bg-blue-900'
  },
  historical: {
    label: 'Historical',
    labelThai: 'ประวัติศาสตร์',
    description: 'Historical sites and monuments',
    color: 'text-purple-800 dark:text-purple-200',
    bgColor: 'bg-purple-100 dark:bg-purple-900'
  },
  cultural: {
    label: 'Cultural',
    labelThai: 'วัฒนธรรม',
    description: 'Cultural centers and traditional sites',
    color: 'text-pink-800 dark:text-pink-200',
    bgColor: 'bg-pink-100 dark:bg-pink-900'
  },
  nature: {
    label: 'Nature',
    labelThai: 'ธรรมชาติ',
    description: 'Natural attractions and outdoor activities',
    color: 'text-emerald-800 dark:text-emerald-200',
    bgColor: 'bg-emerald-100 dark:bg-emerald-900'
  },
  shopping: {
    label: 'Shopping',
    labelThai: 'ช้อปปิ้ง',
    description: 'Markets and shopping areas',
    color: 'text-yellow-800 dark:text-yellow-200',
    bgColor: 'bg-yellow-100 dark:bg-yellow-900'
  },
  entertainment: {
    label: 'Entertainment',
    labelThai: 'บันเทิง',
    description: 'Entertainment venues and activities',
    color: 'text-red-800 dark:text-red-200',
    bgColor: 'bg-red-100 dark:bg-red-900'
  }
};

export const DEFAULT_IMAGES = {
  attraction: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop',
  restaurant: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop',
  service: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=400&h=300&fit=crop'
} as const;

export const HERO_STATS = [
  {
    value: '20+',
    label: 'Tourist Attractions',
    labelThai: 'สถานที่ท่องเที่ยว',
    colorClass: 'text-primary'
  },
  {
    value: '50+',
    label: 'Local Restaurants',
    labelThai: 'ร้านอาหารท้องถิ่น',
    colorClass: 'text-secondary'
  },
  {
    value: '100+',
    label: 'Job Opportunities',
    labelThai: 'โอกาสในการทำงาน',
    colorClass: 'text-accent'
  }
] as const;