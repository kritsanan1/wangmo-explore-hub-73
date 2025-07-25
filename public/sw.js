const CACHE_NAME = 'wang-sam-mo-v1';
const STATIC_CACHE = 'wang-sam-mo-static-v1';
const DYNAMIC_CACHE = 'wang-sam-mo-dynamic-v1';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/favicon.ico',
  '/robots.txt',
];

// Network-first resources
const NETWORK_FIRST = [
  '/api/',
  '/supabase/',
];

// Cache-first resources
const CACHE_FIRST = [
  '/assets/',
  '/images/',
  '.png',
  '.jpg',
  '.jpeg',
  '.svg',
  '.webp',
  '.css',
  '.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => 
              cacheName !== STATIC_CACHE && 
              cacheName !== DYNAMIC_CACHE
            )
            .map((cacheName) => caches.delete(cacheName))
        );
      })
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension and cross-origin requests
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    return;
  }

  // Network-first strategy for API calls
  if (NETWORK_FIRST.some(pattern => request.url.includes(pattern))) {
    event.respondWith(networkFirst(request));
    return;
  }

  // Cache-first strategy for static assets
  if (CACHE_FIRST.some(pattern => request.url.includes(pattern))) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // Stale-while-revalidate for HTML pages
  if (request.destination === 'document') {
    event.respondWith(staleWhileRevalidate(request));
    return;
  }

  // Default to network first
  event.respondWith(networkFirst(request));
});

async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    return cachedResponse || new Response('Offline content not available', {
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}

async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    return new Response('Resource not available', {
      status: 404,
      statusText: 'Not Found'
    });
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(DYNAMIC_CACHE);
  const cachedResponse = await cache.match(request);
  
  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  });
  
  return cachedResponse || fetchPromise;
}
