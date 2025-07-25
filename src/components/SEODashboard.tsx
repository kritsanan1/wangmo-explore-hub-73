import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, Eye, MousePointer, Clock, Smartphone, Search, Gauge } from 'lucide-react';
import { useSEOTracking } from '@/hooks/use-seo-tracking';

export function SEODashboard() {
  const {
    getSEOMetrics,
    runLighthouseAudit,
    getGoogleSearchConsoleData
  } = useSEOTracking();

  const [seoMetrics, setSEOMetrics] = useState(getSEOMetrics());
  const [lighthouseResult, setLighthouseResult] = useState<any>(null);
  const [searchConsoleData, setSearchConsoleData] = useState<any>(null);
  const [isLoadingLighthouse, setIsLoadingLighthouse] = useState(false);
  const [isLoadingSearchConsole, setIsLoadingSearchConsole] = useState(false);

  const runLighthouseTest = async () => {
    setIsLoadingLighthouse(true);
    const result = await runLighthouseAudit();
    setLighthouseResult(result);
    setIsLoadingLighthouse(false);
  };

  const fetchSearchConsoleData = async () => {
    setIsLoadingSearchConsole(true);
    const data = await getGoogleSearchConsoleData();
    setSearchConsoleData(data);
    setIsLoadingSearchConsole(false);
  };

  useEffect(() => {
    // Load saved data
    const savedLighthouse = localStorage.getItem('lighthouseResults');
    const savedSearchConsole = localStorage.getItem('searchConsoleData');
    
    if (savedLighthouse) {
      setLighthouseResult(JSON.parse(savedLighthouse));
    }
    
    if (savedSearchConsole) {
      setSearchConsoleData(JSON.parse(savedSearchConsole));
    }
    
    // Update metrics every 30 seconds
    const interval = setInterval(() => {
      setSEOMetrics(getSEOMetrics());
    }, 30000);
    
    return () => clearInterval(interval);
  }, [getSEOMetrics]);

  const lighthouseData = lighthouseResult ? [
    { name: 'Performance', score: lighthouseResult.performance, color: '#4CAF50' },
    { name: 'Accessibility', score: lighthouseResult.accessibility, color: '#2196F3' },
    { name: 'Best Practices', score: lighthouseResult.bestPractices, color: '#FF9800' },
    { name: 'SEO', score: lighthouseResult.seo, color: '#9C27B0' },
    { name: 'Mobile', score: lighthouseResult.mobileUsability, color: '#F44336' }
  ] : [];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Page Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{seoMetrics.pageViews}</div>
            <p className="text-xs text-muted-foreground">
              Current page visits
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Time on Page</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.floor(seoMetrics.timeOnPage / 1000)}s
            </div>
            <p className="text-xs text-muted-foreground">
              User engagement time
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{seoMetrics.bounceRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              Users leaving quickly
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Load Time</CardTitle>
            <Gauge className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(seoMetrics.loadTime / 1000).toFixed(1)}s
            </div>
            <p className="text-xs text-muted-foreground">
              Average page load
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="lighthouse" className="space-y-4">
        <TabsList>
          <TabsTrigger value="lighthouse">Lighthouse Audit</TabsTrigger>
          <TabsTrigger value="search-console">Search Console</TabsTrigger>
          <TabsTrigger value="mobile">Mobile Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="lighthouse" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gauge className="h-5 w-5" />
                Lighthouse Performance Audit
              </CardTitle>
              <CardDescription>
                Google Lighthouse audit results for performance, accessibility, and SEO
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                onClick={runLighthouseTest} 
                disabled={isLoadingLighthouse}
              >
                {isLoadingLighthouse ? 'Running Audit...' : 'Run Lighthouse Audit'}
              </Button>

              {lighthouseResult && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {lighthouseData.map((metric) => (
                      <div key={metric.name} className="text-center">
                        <div className="text-2xl font-bold" style={{ color: metric.color }}>
                          {metric.score.toFixed(0)}
                        </div>
                        <div className="text-sm text-muted-foreground">{metric.name}</div>
                        <Progress value={metric.score} className="mt-2" />
                      </div>
                    ))}
                  </div>

                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={lighthouseData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Bar dataKey="score" fill="#3B82F6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="search-console" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Google Search Console Data
              </CardTitle>
              <CardDescription>
                Search performance metrics from Google Search Console
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                onClick={fetchSearchConsoleData} 
                disabled={isLoadingSearchConsole}
              >
                {isLoadingSearchConsole ? 'Fetching Data...' : 'Fetch Search Console Data'}
              </Button>

              {searchConsoleData && (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold">{searchConsoleData.impressions.toLocaleString()}</div>
                      <p className="text-xs text-muted-foreground">Impressions</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold">{searchConsoleData.clicks.toLocaleString()}</div>
                      <p className="text-xs text-muted-foreground">Clicks</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold">{searchConsoleData.averagePosition.toFixed(1)}</div>
                      <p className="text-xs text-muted-foreground">Avg. Position</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold">{searchConsoleData.ctr.toFixed(2)}%</div>
                      <p className="text-xs text-muted-foreground">CTR</p>
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mobile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-5 w-5" />
                Mobile Performance
              </CardTitle>
              <CardDescription>
                Mobile-first design and performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Mobile Responsive Design</span>
                  <Badge variant="default">Optimized</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span>Viewport Configuration</span>
                  <Badge variant="default">Configured</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span>Touch Target Size</span>
                  <Badge variant="default">Adequate</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span>Mobile Page Speed</span>
                  <Badge variant={lighthouseResult?.mobileUsability > 90 ? 'default' : 'secondary'}>
                    {lighthouseResult ? `${lighthouseResult.mobileUsability.toFixed(0)}/100` : 'Run Audit'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}