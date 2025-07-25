import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SEOProvider } from "@/components/SEOProvider";
import Index from "./pages/Index";
import Attractions from "./pages/Attractions";
import Restaurants from "./pages/Restaurants";
import Services from "./pages/Services";
import Jobs from "./pages/Jobs";
import About from "./pages/About";
import AdDashboard from "./pages/AdDashboard";
import SEODashboardPage from "./pages/SEODashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SEOProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/attractions" element={<Attractions />} />
            <Route path="/restaurants" element={<Restaurants />} />
            <Route path="/services" element={<Services />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/about" element={<About />} />
            <Route path="/ad-dashboard" element={<AdDashboard />} />
            <Route path="/seo-dashboard" element={<SEODashboardPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </SEOProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
