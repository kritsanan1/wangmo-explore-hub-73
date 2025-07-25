import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';
import { AttractionFilters, AttractionStats } from '@/types/attractions';
import { useMemo } from 'react';

type DbAttraction = Tables<'attractions'>;

interface UseAttractionsOptions {
  filters?: AttractionFilters;
  enabled?: boolean;
}

export function useAttractions(options: UseAttractionsOptions = {}) {
  const { filters, enabled = true } = options;

  const query = useQuery({
    queryKey: ['attractions', filters],
    queryFn: async (): Promise<DbAttraction[]> => {
      let queryBuilder = supabase
        .from('attractions')
        .select('*');

      if (filters?.category) {
        queryBuilder = queryBuilder.eq('category', filters.category);
      }

      if (filters?.featured !== undefined) {
        queryBuilder = queryBuilder.eq('featured', filters.featured);
      }

      if (filters?.minRating) {
        queryBuilder = queryBuilder.gte('rating', filters.minRating);
      }

      if (filters?.searchQuery) {
        queryBuilder = queryBuilder.or(
          `name.ilike.%${filters.searchQuery}%,description.ilike.%${filters.searchQuery}%,name_thai.ilike.%${filters.searchQuery}%`
        );
      }

      const { data, error } = await queryBuilder
        .order('featured', { ascending: false })
        .order('rating', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    enabled
  });

  const processedData = useMemo(() => {
    const attractions = query.data || [];
    
    const featured = attractions.filter(attraction => attraction.featured);
    const regular = attractions.filter(attraction => !attraction.featured);
    
    const stats: AttractionStats = {
      totalAttractions: attractions.length,
      featuredCount: featured.length,
      averageRating: attractions.reduce((acc, attr) => acc + (attr.rating || 0), 0) / attractions.length || 0,
      categoryCounts: attractions.reduce((acc, attr) => {
        acc[attr.category] = (acc[attr.category] || 0) + 1;
        return acc;
      }, {} as Record<string, number>) as Record<string, number> & Record<DbAttraction['category'], number>
    };

    return {
      all: attractions,
      featured,
      regular,
      stats
    };
  }, [query.data]);

  return {
    ...query,
    ...processedData
  };
}

export function useAttraction(id: string) {
  return useQuery({
    queryKey: ['attraction', id],
    queryFn: async (): Promise<DbAttraction | null> => {
      const { data, error } = await supabase
        .from('attractions')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!id
  });
}