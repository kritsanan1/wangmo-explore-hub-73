import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface EnhancedSEOData {
  title: string;
  description: string;
  keywords: string;
  ogImage?: string;
  canonicalUrl?: string;
  structuredData?: object[];
  alternateUrls?: { hreflang: string; href: string }[];
  pageType: 'website' | 'article' | 'product' | 'local_business' | 'tourist_destination';
}

interface EnhancedSEOProviderProps {
  children: React.ReactNode;
  pageData?: Partial<EnhancedSEOData>;
}

const enhancedPageSEO: Record<string, EnhancedSEOData> = {
  '/': {
    title: 'Wang Sam Mo Explorer Hub | Visit Udon Thani Hidden Gem #วังสามหมอ',
    description: 'Discover Wang Sam Mo, Udon Thani authentic tourism destination. Explore temples, local cuisine, homestays & products. #วังสา��หมอ #tourderwang #ที่นี่วังสามหมอ',
    keywords: 'Wang Sam Mo, วังสามหมอ, Udon Thani tourism, Thailand travel, local products, homestays, temples, authentic Thai experience, #tourderwang, #ที่นี่วังสามหมอ',
    pageType: 'tourist_destination',
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "TouristDestination",
        "name": "Wang Sam Mo",
        "description": "Authentic tourism destination in Udon Thani featuring temples, local cuisine, and cultural experiences",
        "url": "https://wang-sam-mo-explorer.com",
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 17.4138,
          "longitude": 102.7875
        },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Wang Sam Mo",
          "addressRegion": "Udon Thani",
          "addressCountry": "TH"
        }
      }
    ]
  },
  '/wang-sam-mo-attractions': {
    title: 'Wang Sam Mo Attractions | Temples & Cultural Sites Udon Thani #วังสามหมอ',
    description: 'Explore Wang Sam Mo attractions: ancient temples, Wang Yai Park, cultural sites. Complete guide to Udon Thani hidden gems. #วังสามหมอ #tourderwang',
    keywords: 'Wang Sam Mo attractions, Phasuk Temple, Wang Yai Park, Udon Thani temples, cultural sites, ancient temples, #วังสามหมอ attractions',
    pageType: 'article',
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "TouristAttraction",
        "name": "Wang Sam Mo Attractions",
        "description": "Ancient temples, cultural sites and natural attractions in Wang Sam Mo, Udon Thani",
        "url": "https://wang-sam-mo-explorer.com/wang-sam-mo-attractions"
      }
    ]
  },
  '/wang-sam-mo-restaurants': {
    title: 'Wang Sam Mo Restaurants | Authentic Thai Cuisine Udon Thani #วังสามหมอ',
    description: 'Discover authentic Wang Sam Mo restaurants and Issan cuisine. Local dining, traditional Thai food, hidden culinary gems. #วังสามหมอ #tourderwang',
    keywords: 'Wang Sam Mo restaurants, Issan cuisine, authentic Thai food, local dining, Udon Thani restaurants, traditional Thai cuisine, #วังสามหมอ food',
    pageType: 'local_business',
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "Restaurant",
        "name": "Wang Sam Mo Restaurants",
        "description": "Authentic Issan cuisine and local dining experiences in Wang Sam Mo",
        "servesCuisine": "Thai",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Wang Sam Mo",
          "addressRegion": "Udon Thani", 
          "addressCountry": "TH"
        }
      }
    ]
  },
  '/wang-sam-mo-local-products': {
    title: 'Wang Sam Mo Local Products | Pickled Vegetables, Handicrafts, Tea #วังสามหมอ',
    description: 'Shop authentic Wang Sam Mo local products: pickled vegetables (300 THB), Issan handicrafts (500 THB), organic tea (200 THB). #วังสามหมอ #tourderwang',
    keywords: 'Wang Sam Mo products, pickled vegetables, Issan handicrafts, organic tea, local products, #วังสามหมอ shopping, traditional crafts',
    pageType: 'product',
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "Wang Sam Mo Local Products",
        "description": "Authentic local products from Wang Sam Mo including pickled vegetables, handicrafts, and organic tea",
        "brand": {
          "@type": "Brand",
          "name": "Wang Sam Mo"
        },
        "offers": {
          "@type": "AggregateOffer",
          "priceCurrency": "THB",
          "lowPrice": "200",
          "highPrice": "500"
        }
      }
    ]
  },
  '/wang-sam-mo-homestays': {
    title: 'Wang Sam Mo Homestays | Authentic Thai Accommodation 800 THB/night #วังสามหมอ',
    description: 'Stay in authentic Wang Sam Mo homestays. Bua Daeng, Baan Suan Rim Nam homestays from 800 THB/night. Authentic Thai experience. #วังสามหมอ #tourderwang',
    keywords: 'Wang Sam Mo homestays, authentic accommodation, Bua Daeng homestay, traditional Thai stay, Udon Thani homestays, #วังสามหมอ accommodation',
    pageType: 'local_business',
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "LodgingBusiness",
        "name": "Wang Sam Mo Homestays",
        "description": "Authentic Thai homestay experiences in Wang Sam Mo",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Wang Sam Mo",
          "addressRegion": "Udon Thani",
          "addressCountry": "TH"
        },
        "priceRange": "800-1000 THB"
      }
    ]
  },
  '/wang-sam-mo-jobs': {
    title: 'Wang Sam Mo Jobs | Tourism & Restaurant Employment Opportunities #วังสามหมอ',
    description: 'Find jobs in Wang Sam Mo: restaurant staff, tour guides, homestay positions. Local employment opportunities in Udon Thani tourism sector. #วังสามหมอ jobs',
    keywords: 'Wang Sam Mo jobs, Udon Thani employment, tourism jobs, restaurant jobs, tour guide jobs, local employment, #วังสามหมอ careers',
    pageType: 'website',
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "JobPosting",
        "title": "Tourism and Hospitality Jobs in Wang Sam Mo",
        "description": "Various employment opportunities in Wang Sam Mo tourism and hospitality sector",
        "hiringOrganization": {
          "@type": "Organization",
          "name": "Wang Sam Mo Businesses"
        },
        "jobLocation": {
          "@type": "Place",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Wang Sam Mo",
            "addressRegion": "Udon Thani",
            "addressCountry": "TH"
          }
        }
      }
    ]
  },
  '/about-wang-sam-mo': {
    title: 'About Wang Sam Mo | Udon Thani Hidden Cultural Gem #วังสามหมอ',
    description: 'Learn about Wang Sam Mo, Udon Thani authentic cultural destination. Rich heritage, local community, traditional lifestyle. #วังสามหมอ #tourderwang',
    keywords: 'about Wang Sam Mo, Udon Thani culture, cultural heritage, local community, traditional lifestyle, #วังสามหมอ history',
    pageType: 'article',
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "name": "About Wang Sam Mo",
        "description": "Information about Wang Sam Mo cultural destination and community",
        "url": "https://wang-sam-mo-explorer.com/about-wang-sam-mo"
      }
    ]
  }
};

export function EnhancedSEOProvider({ children, pageData }: EnhancedSEOProviderProps) {
  const location = useLocation();

  useEffect(() => {
    const currentPageSEO = enhancedPageSEO[location.pathname] || enhancedPageSEO['/'];
    const seoData = { ...currentPageSEO, ...pageData };
    
    // Update title
    document.title = seoData.title;
    
    // Update meta tags
    updateMetaTag('description', seoData.description);
    updateMetaTag('keywords', seoData.keywords);
    updateMetaTag('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    
    // Update Open Graph tags
    updateMetaProperty('og:title', seoData.title);
    updateMetaProperty('og:description', seoData.description);
    updateMetaProperty('og:type', seoData.pageType === 'website' ? 'website' : 'article');
    updateMetaProperty('og:url', `https://wang-sam-mo-explorer.com${location.pathname}`);
    updateMetaProperty('og:site_name', 'Wang Sam Mo Explorer Hub');
    updateMetaProperty('og:locale', 'en_US');
    updateMetaProperty('og:locale:alternate', 'th_TH');
    
    // Update Twitter Card tags
    updateMetaProperty('twitter:card', 'summary_large_image');
    updateMetaProperty('twitter:title', seoData.title);
    updateMetaProperty('twitter:description', seoData.description);
    updateMetaProperty('twitter:site', '@WangSamMoHub');
    
    // Update canonical URL
    updateCanonicalUrl(`https://wang-sam-mo-explorer.com${location.pathname}`);
    
    // Add hreflang tags
    updateHreflangTags(location.pathname);
    
    // Add structured data
    if (seoData.structuredData) {
      addStructuredData(seoData.structuredData);
    }
    
    // Add breadcrumb structured data
    addBreadcrumbStructuredData(location.pathname);
    
  }, [location.pathname, pageData]);

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

function updateHreflangTags(pathname: string) {
  // Remove existing hreflang tags
  document.querySelectorAll('link[hreflang]').forEach(el => el.remove());
  
  // Add new hreflang tags
  const hreflangs = [
    { hreflang: 'en', href: `https://wang-sam-mo-explorer.com${pathname}` },
    { hreflang: 'th', href: `https://wang-sam-mo-explorer.com/th${pathname}` },
    { hreflang: 'x-default', href: `https://wang-sam-mo-explorer.com${pathname}` }
  ];
  
  hreflangs.forEach(({ hreflang, href }) => {
    const link = document.createElement('link');
    link.rel = 'alternate';
    link.hreflang = hreflang;
    link.href = href;
    document.head.appendChild(link);
  });
}

function addStructuredData(dataArray: object[]) {
  // Remove existing dynamic structured data
  document.querySelectorAll('script[type="application/ld+json"][data-dynamic]').forEach(el => el.remove());
  
  // Add new structured data
  dataArray.forEach((data, index) => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-dynamic', 'true');
    script.setAttribute('data-index', index.toString());
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  });
}

function addBreadcrumbStructuredData(pathname: string) {
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://wang-sam-mo-explorer.com/"
      }
    ]
  };

  // Add current page to breadcrumb
  if (pathname !== '/') {
    const pageTitle = enhancedPageSEO[pathname]?.title || 'Page';
    breadcrumbStructuredData.itemListElement.push({
      "@type": "ListItem",
      "position": 2,
      "name": pageTitle.split('|')[0].trim(),
      "item": `https://wang-sam-mo-explorer.com${pathname}`
    });
  }

  // Remove existing breadcrumb structured data
  document.querySelectorAll('script[type="application/ld+json"][data-breadcrumb]').forEach(el => el.remove());
  
  // Add breadcrumb structured data
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-breadcrumb', 'true');
  script.textContent = JSON.stringify(breadcrumbStructuredData);
  document.head.appendChild(script);
}
