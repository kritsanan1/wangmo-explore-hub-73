// SEO-optimized URL structure for Wang Sam Mo tourism
export const SEO_URLS = {
  // Primary pages with Thai keywords
  home: '/',
  attractions: '/wang-sam-mo-attractions', // สถานที่ท่องเที่ยว
  restaurants: '/wang-sam-mo-restaurants', // ร้านอาหาร  
  services: '/wang-sam-mo-services', // บริการ
  homestays: '/wang-sam-mo-homestays', // โฮมสเตย์
  localProducts: '/wang-sam-mo-local-products', // ผลิตภัณฑ์ท้องถิ่น
  jobs: '/wang-sam-mo-jobs', // งาน
  about: '/about-wang-sam-mo', // เกี่ยวกับ
  cart: '/shopping-cart',

  // Product categories with Thai keywords
  pickledVegetables: '/local-products/pickled-vegetables-wang-sam-mo',
  handicrafts: '/local-products/issan-handicrafts-wang-sam-mo', 
  organicTea: '/local-products/organic-tea-wang-sam-mo',

  // Attraction categories
  temples: '/wang-sam-mo-temples',
  naturalAttractions: '/wang-sam-mo-nature',
  culturalSites: '/wang-sam-mo-culture',

  // Restaurant categories
  localCuisine: '/wang-sam-mo-local-cuisine',
  traditionalFood: '/wang-sam-mo-traditional-food',

  // Service categories
  tourGuides: '/wang-sam-mo-tour-guides',
  transportation: '/wang-sam-mo-transportation',
  accommodation: '/wang-sam-mo-accommodation',
} as const;

// URL mapping for backward compatibility
export const URL_REDIRECTS = {
  '/attractions': SEO_URLS.attractions,
  '/restaurants': SEO_URLS.restaurants,
  '/services': SEO_URLS.services,
  '/jobs': SEO_URLS.jobs,
  '/about': SEO_URLS.about,
  '/cart': SEO_URLS.cart,
} as const;

// Breadcrumb structure for SEO
export const BREADCRUMB_CONFIG = {
  [SEO_URLS.home]: [
    { label: 'Home', url: SEO_URLS.home }
  ],
  [SEO_URLS.attractions]: [
    { label: 'Home', url: SEO_URLS.home },
    { label: 'Wang Sam Mo Attractions', url: SEO_URLS.attractions }
  ],
  [SEO_URLS.restaurants]: [
    { label: 'Home', url: SEO_URLS.home },
    { label: 'Wang Sam Mo Restaurants', url: SEO_URLS.restaurants }
  ],
  [SEO_URLS.services]: [
    { label: 'Home', url: SEO_URLS.home },
    { label: 'Wang Sam Mo Services', url: SEO_URLS.services }
  ],
  [SEO_URLS.localProducts]: [
    { label: 'Home', url: SEO_URLS.home },
    { label: 'Local Products', url: SEO_URLS.localProducts }
  ],
  [SEO_URLS.pickledVegetables]: [
    { label: 'Home', url: SEO_URLS.home },
    { label: 'Local Products', url: SEO_URLS.localProducts },
    { label: 'Pickled Vegetables', url: SEO_URLS.pickledVegetables }
  ],
  [SEO_URLS.jobs]: [
    { label: 'Home', url: SEO_URLS.home },
    { label: 'Wang Sam Mo Jobs', url: SEO_URLS.jobs }
  ],
  [SEO_URLS.about]: [
    { label: 'Home', url: SEO_URLS.home },
    { label: 'About Wang Sam Mo', url: SEO_URLS.about }
  ],
} as const;
