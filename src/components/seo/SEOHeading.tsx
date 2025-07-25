import { createElement, memo } from 'react';
import { cn } from '@/lib/utils';

interface SEOHeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
  id?: string;
  keywords?: string[];
}

const headingStyles = {
  1: 'text-4xl lg:text-5xl font-bold text-foreground mb-4',
  2: 'text-3xl lg:text-4xl font-bold text-foreground mb-4',
  3: 'text-2xl lg:text-3xl font-semibold text-foreground mb-3',
  4: 'text-xl lg:text-2xl font-semibold text-foreground mb-3',
  5: 'text-lg lg:text-xl font-medium text-foreground mb-2',
  6: 'text-base lg:text-lg font-medium text-foreground mb-2',
};

const SEOHeading = memo(({ level, children, className, id, keywords }: SEOHeadingProps) => {
  const tag = `h${level}` as keyof JSX.IntrinsicElements;
  const defaultStyles = headingStyles[level];
  
  // Generate ID from children text if not provided
  const headingId = id || (typeof children === 'string' 
    ? children.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-')
    : undefined);

  // Add keyword data attribute for SEO tracking
  const dataKeywords = keywords?.join(',');

  return createElement(
    tag,
    {
      id: headingId,
      className: cn(defaultStyles, className),
      'data-keywords': dataKeywords,
      'data-seo-heading': level.toString(),
    },
    children
  );
});

SEOHeading.displayName = 'SEOHeading';

export default SEOHeading;

// Convenience components for common heading patterns
export const PageTitle = memo(({ children, className, keywords }: Omit<SEOHeadingProps, 'level'>) => (
  <SEOHeading 
    level={1} 
    className={className} 
    keywords={keywords || ['Wang Sam Mo', 'วังสามหมอ', 'Udon Thani']}
  >
    {children}
  </SEOHeading>
));

export const SectionTitle = memo(({ children, className, keywords }: Omit<SEOHeadingProps, 'level'>) => (
  <SEOHeading level={2} className={className} keywords={keywords}>
    {children}
  </SEOHeading>
));

export const SubsectionTitle = memo(({ children, className, keywords }: Omit<SEOHeadingProps, 'level'>) => (
  <SEOHeading level={3} className={className} keywords={keywords}>
    {children}
  </SEOHeading>
));

PageTitle.displayName = 'PageTitle';
SectionTitle.displayName = 'SectionTitle';
SubsectionTitle.displayName = 'SubsectionTitle';
