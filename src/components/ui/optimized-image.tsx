import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  lazy?: boolean;
  quality?: number;
  placeholder?: string;
  keywords?: string[];
  location?: string;
}

const OptimizedImage = ({
  src,
  alt,
  className,
  width,
  height,
  lazy = true,
  quality = 80,
  placeholder = '/placeholder.svg',
  keywords = [],
  location = 'Wang Sam Mo, Udon Thani'
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(!lazy);
  const [imageSrc, setImageSrc] = useState(lazy ? placeholder : src);
  const imgRef = useRef<HTMLImageElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [lazy, isInView]);

  // Load actual image when in view
  useEffect(() => {
    if (!isInView || imageSrc === src) return;

    const img = new Image();
    img.onload = () => {
      setImageSrc(src);
      setIsLoaded(true);
    };
    img.src = src;
  }, [isInView, src, imageSrc]);

  // Generate optimized image URL with WebP support
  const getOptimizedSrc = (originalSrc: string) => {
    if (originalSrc.includes('unsplash.com')) {
      const params = new URLSearchParams();
      if (width) params.set('w', width.toString());
      if (height) params.set('h', height.toString());
      params.set('q', quality.toString());
      params.set('fm', 'webp');
      params.set('fit', 'crop');
      
      return `${originalSrc}&${params.toString()}`;
    }
    return originalSrc;
  };

  // Enhanced alt text with location and keywords for SEO
  const enhancedAlt = `${alt}${location ? ` in ${location}` : ''}${keywords.length ? ` - ${keywords.slice(0, 3).join(', ')}` : ''}`;

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <img
        ref={imgRef}
        src={getOptimizedSrc(imageSrc)}
        alt={enhancedAlt}
        title={alt}
        width={width}
        height={height}
        className={cn(
          "transition-all duration-300 ease-in-out",
          isLoaded ? "opacity-100 scale-100" : "opacity-70 scale-105",
          className
        )}
        loading={lazy ? "lazy" : "eager"}
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        data-keywords={keywords.join(',')}
        data-location={location}
      />
      
      {/* Loading placeholder overlay */}
      {!isLoaded && lazy && (
        <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-green-100 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-amber-300 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
