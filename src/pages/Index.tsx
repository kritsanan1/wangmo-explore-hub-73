import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import AdSection from "@/components/ads/AdSection";
import BannerAdDisplay from "@/components/ads/BannerAdDisplay";
import AttractionsSection from "@/components/homepage/AttractionsSection";
import RestaurantsSection from "@/components/homepage/RestaurantsSection";
import ServicesSection from "@/components/homepage/ServicesSection";
import HomestaysSection from "@/components/homepage/HomestaysSection";
import ProductsSection from "@/components/homepage/ProductsSection";
import JobsSection from "@/components/homepage/JobsSection";
import HistorySection from "@/components/homepage/HistorySection";
import PhotoAlbumSection from "@/components/homepage/PhotoAlbumSection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />

      {/* Premium/Enterprise Ad Banner - Above Attractions */}
      <AdSection />

      {/* Main Content Sections */}
      <AttractionsSection />
      <RestaurantsSection />
      <ServicesSection />

      {/* Large Banner Ad above Homestays Section */}
      <div className="py-6 bg-gradient-to-br from-amber-50/50 to-green-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4">
            <p className="text-xs text-muted-foreground">Sponsored Content</p>
          </div>
          <div className="flex justify-center">
            <div className="w-full max-w-4xl bg-gradient-to-r from-amber-100 to-green-100 rounded-lg p-6 text-center border-2 border-amber-200">
              <h3 className="text-2xl font-bold text-amber-800 mb-2">Bua Daeng Homestay</h3>
              <p className="text-amber-700 mb-4">Stay with us in Wang Sam Mo! Garden views, WiFi, breakfast included.</p>
              <div className="text-3xl font-bold text-green-600 mb-4">800 THB/night</div>
              <p className="text-sm text-amber-600">Call 089-6220962 • #tourderwang</p>
            </div>
          </div>
        </div>
      </div>

      <HomestaysSection />

      {/* Medium Banner Ad between Homestays and Products */}
      <div className="py-6 bg-gradient-to-br from-secondary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4">
            <p className="text-xs text-muted-foreground">Advertisement</p>
          </div>
          <div className="flex justify-center">
            <div className="bg-gradient-to-r from-green-100 to-amber-100 rounded-lg p-4 text-center border border-green-200 max-w-sm">
              <h4 className="text-lg font-bold text-green-800 mb-2">Wang Sam Mo Pickled Vegetables</h4>
              <p className="text-green-700 text-sm mb-3">Authentic Issan taste, perfect for gifts!</p>
              <div className="text-xl font-bold text-amber-600">300 THB</div>
            </div>
          </div>
        </div>
      </div>

      <ProductsSection />
      <JobsSection />
    </Layout>
  );
};

export default Index;
