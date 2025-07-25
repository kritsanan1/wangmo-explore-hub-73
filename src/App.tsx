import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { EnhancedSEOProvider } from "@/components/seo/EnhancedSEOProvider";
import { SEO_URLS, URL_REDIRECTS } from "@/constants/seo-urls";
import { CartProvider } from "@/contexts/CartContext";
import { LanguageProvider } from "@/contexts/LanguageContext";

// Lazy load components for better performance
const Index = lazy(() => import("./pages/Index"));
const Attractions = lazy(() => import("./pages/Attractions"));
const Restaurants = lazy(() => import("./pages/Restaurants"));
const Services = lazy(() => import("./pages/Services"));
const Jobs = lazy(() => import("./pages/Jobs"));
const About = lazy(() => import("./pages/About"));
const Cart = lazy(() => import("./pages/Cart"));
const AdDashboard = lazy(() => import("./pages/AdDashboard"));
const SEODashboardPage = lazy(() => import("./pages/SEODashboard"));
const History = lazy(() => import("./pages/History"));
const PhotoAlbum = lazy(() => import("./pages/PhotoAlbum"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Loading component for lazy routes
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-green-50">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
      <p className="text-amber-800 font-medium">Loading...</p>
    </div>
  </div>
);

// Optimize QueryClient with better defaults
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 10, // 10 minutes
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <LanguageProvider>
          <CartProvider>
            <EnhancedSEOProvider>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  {/* Primary SEO-optimized routes */}
                  <Route path={SEO_URLS.home} element={<Index />} />
                  <Route path={SEO_URLS.attractions} element={<Attractions />} />
                  <Route path={SEO_URLS.restaurants} element={<Restaurants />} />
                  <Route path={SEO_URLS.services} element={<Services />} />
                  <Route path={SEO_URLS.jobs} element={<Jobs />} />
                  <Route path={SEO_URLS.about} element={<About />} />
                  <Route path={SEO_URLS.cart} element={<Cart />} />

                  {/* Legacy URL redirects for SEO */}
                  <Route path="/attractions" element={<Attractions />} />
                  <Route path="/restaurants" element={<Restaurants />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/jobs" element={<Jobs />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/cart" element={<Cart />} />

                  {/* Content routes */}
                  <Route path="/history" element={<History />} />
                  <Route path="/photo-album" element={<PhotoAlbum />} />

                  {/* Admin routes */}
                  <Route path="/ad-dashboard" element={<AdDashboard />} />
                  <Route path="/seo-dashboard" element={<SEODashboardPage />} />

                  {/* Product category routes */}
                  <Route path={SEO_URLS.pickledVegetables} element={<Services />} />
                  <Route path={SEO_URLS.handicrafts} element={<Services />} />
                  <Route path={SEO_URLS.organicTea} element={<Services />} />

                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </EnhancedSEOProvider>
          </CartProvider>
        </LanguageProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
