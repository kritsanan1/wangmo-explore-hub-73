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
      <RestaurantsSection />
      <ServicesSection />
      <HomestaysSection />
      <ProductsSection />
      <JobsSection />
    </Layout>
  );
};

export default Index;
