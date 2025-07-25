import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
  structuredData?: object;
}

interface SEOProviderProps {
  children: React.ReactNode;
  defaultSEO?: SEOData;
}

const defaultPageSEO: Record<string, SEOData> = {
  '/': {
    title: 'Wang Sam Mo Explorer Hub - Discover Udon Thani\'s Hidden Gem',
    description: 'Experience authentic beauty of Wang Sam Mo, Udon Thani. Discover ancient temples, local cuisine, attractions, restaurants, and services in this cultural adventure destination.',
    keywords: 'Wang Sam Mo, Udon Thani, Thailand tourism, temples, local cuisine, attractions, restaurants, cultural sites, travel guide',
    ogImage: '/og-image.jpg'
  },
  '/attractions': {
    title: 'Attractions in Wang Sam Mo - Temples & Cultural Sites | Wang Sam Mo Explorer',
    description: 'Explore ancient temples, cultural sites, and natural attractions in Wang Sam Mo, Udon Thani. Discover hidden gems and must-visit places.',
    keywords: 'Wang Sam Mo attractions, temples, cultural sites, Udon Thani tourism, ancient temples, Phasuk Temple',
    ogImage: '/attractions-og.jpg'
  },
  '/restaurants': {
    title: 'Local Restaurants & Cuisine in Wang Sam Mo | Authentic Thai Food',
    description: 'Discover authentic Thai cuisine and local restaurants in Wang Sam Mo. Experience traditional flavors and hidden culinary gems.',
    keywords: 'Wang Sam Mo restaurants, Thai cuisine, local food, authentic Thai food, Udon Thani restaurants',
    ogImage: '/restaurants-og.jpg'
  },
  '/services': {
    title: 'Local Services in Wang Sam Mo | Business Directory & Products',
    description: 'Find local services, businesses, and products in Wang Sam Mo, Udon Thani. Your comprehensive guide to local commerce.',
    keywords: 'Wang Sam Mo services, local business, Udon Thani services, local products, business directory',
    ogImage: '/services-og.jpg'
  },
  '/jobs': {
    title: 'Jobs & Employment in Wang Sam Mo | Local Career Opportunities',
    description: 'Discover job opportunities and career prospects in Wang Sam Mo, Udon Thani. Connect with local employers and find your next role.',
    keywords: 'Wang Sam Mo jobs, Udon Thani employment, local jobs, career opportunities, job listings',
    ogImage: '/jobs-og.jpg'
  },
  '/about': {
    title: 'About Wang Sam Mo Explorer Hub | Your Guide to Udon Thani\'s Hidden Gem',
    description: 'Learn about Wang Sam Mo Explorer Hub, your comprehensive guide to discovering the authentic beauty and culture of Wang Sam Mo, Udon Thani.',
    keywords: 'about Wang Sam Mo, Udon Thani guide, cultural heritage, local community, tourism information',
    ogImage: '/about-og.jpg'
  }
};

export function SEOProvider({ children, defaultSEO }: SEOProviderProps) {
  const location = useLocation();

  useEffect(() => {
    const currentPageSEO = defaultPageSEO[location.pathname] || defaultSEO || defaultPageSEO['/'];
    
    // Update title
    document.title = currentPageSEO.title;
    
    // Update meta description
    updateMetaTag('description', currentPageSEO.description);
    
    // Update keywords
    if (currentPageSEO.keywords) {
      updateMetaTag('keywords', currentPageSEO.keywords);
    }
    
    // Update Open Graph tags
    updateMetaProperty('og:title', currentPageSEO.title);
    updateMetaProperty('og:description', currentPageSEO.description);
    updateMetaProperty('og:url', `https://wang-sam-mo-explorer.com${location.pathname}`);
    
    if (currentPageSEO.ogImage) {
      updateMetaProperty('og:image', `https://wang-sam-mo-explorer.com${currentPageSEO.ogImage}`);
    }
    
    // Update Twitter tags
    updateMetaProperty('twitter:title', currentPageSEO.title);
    updateMetaProperty('twitter:description', currentPageSEO.description);
    
    if (currentPageSEO.ogImage) {
      updateMetaProperty('twitter:image', `https://wang-sam-mo-explorer.com${currentPageSEO.ogImage}`);
    }
    
    // Update canonical URL
    updateCanonicalUrl(`https://wang-sam-mo-explorer.com${location.pathname}`);
    
    // Add structured data if provided
    if (currentPageSEO.structuredData) {
      addStructuredData(currentPageSEO.structuredData);
    }
    
  }, [location.pathname, defaultSEO]);

  return <>{children}</>;
}

function updateMetaTag(name: string, content: string) {
  let element = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
  if (!element) {
    element = document.createElement('meta');
    element.name = name;
    document.head.appendChild(element);
  }
  element.content = content;
}

function updateMetaProperty(property: string, content: string) {
  let element = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute('property', property);
    document.head.appendChild(element);
  }
  element.content = content;
}

function updateCanonicalUrl(url: string) {
  let element = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  if (!element) {
    element = document.createElement('link');
    element.rel = 'canonical';
    document.head.appendChild(element);
  }
  element.href = url;
}

function addStructuredData(data: object) {
  // Remove existing structured data
  const existing = document.querySelector('script[type="application/ld+json"][data-dynamic]');
  if (existing) {
    existing.remove();
  }
  
  // Add new structured data
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-dynamic', 'true');
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}