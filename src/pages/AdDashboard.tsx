import Layout from "@/components/Layout";
import AdvertisingDashboard from "@/components/pricing/AdvertisingDashboard";

const AdDashboard = () => {
  return (
    <Layout>
      <div className="min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AdvertisingDashboard />
        </div>
      </div>
    </Layout>
  );
};

export default AdDashboard;
