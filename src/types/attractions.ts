import { BaseEntity, LocalizedContent, Location } from './index';

export type AttractionCategory = 
  | 'temple' 
  | 'park' 
  | 'museum' 
  | 'historical' 
  | 'cultural' 
  | 'nature' 
  | 'shopping' 
  | 'entertainment';

export interface Attraction extends BaseEntity, LocalizedContent {
  category: AttractionCategory;
  images?: string[];
  rating?: number;
  featured?: boolean;
  location?: Location;
  opening_hours?: Record<string, string>;
  entrance_fee?: number;
  duration_hours?: number;
  accessibility_features?: string[];
  amenities?: string[];
}

export interface AttractionFilters {
  category?: AttractionCategory;
  featured?: boolean;
  minRating?: number;
  searchQuery?: string;
}

export interface AttractionStats {
  totalAttractions: number;
  featuredCount: number;
  averageRating: number;
  categoryCounts: Record<AttractionCategory, number>;
}