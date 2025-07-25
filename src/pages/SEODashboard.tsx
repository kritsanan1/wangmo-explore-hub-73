import Layout from "@/components/Layout";
import { SectionHeader } from "@/components/ui/section-header";
import { SEODashboard } from "@/components/SEODashboard";
import { SecurityAudit } from "@/components/SecurityAudit";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SEODashboardPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <SectionHeader
          title="SEO & Security Dashboard"
          titleThai="แดชบอร์ด SEO และความปลอดภัย"
          description="Monitor your website's SEO performance, mobile responsiveness, and security vulnerabilities"
          descriptionThai="ติดตาม SEO เว็บไซต์ การตอบสนองมือถือ และช่องโหว่ด้านความปลอดภัย"
          centered
        />

        <Tabs defaultValue="seo" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="seo">SEO Analytics</TabsTrigger>
            <TabsTrigger value="security">Security Audit</TabsTrigger>
          </TabsList>

          <TabsContent value="seo">
            <SEODashboard />
          </TabsContent>

          <TabsContent value="security">
            <SecurityAudit />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default SEODashboardPage;