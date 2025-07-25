import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { SEOProvider } from "@/components/SEOProvider";
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
            <SEOProvider>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/attractions" element={<Attractions />} />
                  <Route path="/restaurants" element={<Restaurants />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/jobs" element={<Jobs />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/ad-dashboard" element={<AdDashboard />} />
                  <Route path="/seo-dashboard" element={<SEODashboardPage />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </SEOProvider>
          </CartProvider>
        </LanguageProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
