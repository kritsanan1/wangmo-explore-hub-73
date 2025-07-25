import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import FeaturedAttractions from "@/components/FeaturedAttractions";
import AdSection from "@/components/ads/AdSection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <AdSection />
      <FeaturedAttractions />
    </Layout>
  );
};

export default Index;
