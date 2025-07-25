// Core application types
export interface BaseEntity {
  id: string;
  created_at?: string;
  updated_at?: string;
}

export interface LocalizedContent {
  name: string;
  name_thai?: string;
  description?: string;
  description_thai?: string;
}

export interface Location {
  address?: string;
  district?: string;
  latitude?: number;
  longitude?: number;
}

export interface Contact {
  phone?: string;
  email?: string;
  website?: string;
}

// UI Component Props
export interface ComponentWithChildren {
  children: React.ReactNode;
}

export interface OptionalClassName {
  className?: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  error?: string;
  success: boolean;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  totalCount: number;
  page: number;
  pageSize: number;
}