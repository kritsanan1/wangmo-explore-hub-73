import { AttractionCategory } from '@/types/attractions';
import { ATTRACTION_CATEGORIES, DEFAULT_IMAGES } from '@/constants/categories';

export function getCategoryStyles(category: AttractionCategory) {
  const categoryConfig = ATTRACTION_CATEGORIES[category];
  if (!categoryConfig) {
    return {
      color: 'text-gray-800 dark:text-gray-200',
      bgColor: 'bg-gray-100 dark:bg-gray-900',
      label: category,
      labelThai: category
    };
  }

  return {
    color: categoryConfig.color,
    bgColor: categoryConfig.bgColor,
    label: categoryConfig.label,
    labelThai: categoryConfig.labelThai,
    description: categoryConfig.description
  };
}

export function getAttractionImage(images?: string[], category?: AttractionCategory): string {
  if (images && images.length > 0) {
    return images[0];
  }
  return DEFAULT_IMAGES.attraction;
}

export function formatDuration(hours?: number): string {
  if (!hours) return 'Duration not specified';
  
  if (hours < 1) {
    return `${Math.round(hours * 60)} minutes`;
  } else if (hours === 1) {
    return '1 hour';
  } else if (hours < 24) {
    return `${hours} hours`;
  } else {
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;
    return remainingHours > 0 
      ? `${days} day${days > 1 ? 's' : ''} ${remainingHours} hour${remainingHours > 1 ? 's' : ''}`
      : `${days} day${days > 1 ? 's' : ''}`;
  }
}

export function formatRating(rating?: number): string {
  if (!rating) return 'No rating';
  return rating.toFixed(1);
}

export function getLocationString(location?: { address?: string; district?: string }): string {
  if (!location) return 'Wang Sam Mo, Udon Thani';
  
  const parts = [
    location.address,
    location.district,
    'Udon Thani'
  ].filter(Boolean);
  
  return parts.join(', ');
}

export function generateAttractionSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}