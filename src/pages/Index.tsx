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

const Index = () => {
  return (
    <Layout>
      <HeroSection />

      {/* Premium/Enterprise Ad Banner - Above Attractions */}
      <AdSection />

      {/* Main Content Sections */}
      <AttractionsSection />

      {/* Medium Banner Ad between Restaurants and Services */}
      <div className="py-6 bg-gradient-to-br from-secondary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4">
            <p className="text-xs text-muted-foreground">Advertisement</p>
          </div>
          <div className="flex justify-center">
            <BannerAdDisplay
              placement="category_page"
              size="medium"
              className="max-w-md"
            />
          </div>
        </div>
      </div>

      <RestaurantsSection />
      <ServicesSection />
      <HomestaysSection />
      <ProductsSection />
      <JobsSection />
    </Layout>
  );
};

export default Index;
