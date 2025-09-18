import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Cell } from 'recharts';
import { Calendar, Clock, TrendingUp, CheckCircle, AlertCircle, Package2 } from "lucide-react";

// Mock delivery data
const deliveryRates = [
  { product: 'Customer Analytics Platform', delivered: 8, planned: 10, rate: 80, velocity: 2.1 },
  { product: 'Mobile Banking App', delivered: 12, planned: 15, rate: 80, velocity: 2.5 },
  { product: 'AI Content Generator', delivered: 5, planned: 8, rate: 62.5, velocity: 1.8 },
];

const velocityTrend = [
  { month: 'Jan', analytics: 1.8, banking: 2.2, ai: 1.5 },
  { month: 'Feb', analytics: 2.0, banking: 2.4, ai: 1.6 },
  { month: 'Mar', analytics: 2.1, banking: 2.5, ai: 1.8 },
  { month: 'Apr', analytics: 2.2, banking: 2.3, ai: 1.7 },
  { month: 'May', analytics: 2.1, banking: 2.5, ai: 1.8 },
  { month: 'Jun', analytics: 2.1, banking: 2.5, ai: 1.8 },
];

const upcomingFeatures = [
  {
    id: '1',
    product: 'Customer Analytics Platform',
    feature: 'Advanced Machine Learning Insights',
    description: 'AI-powered predictive analytics for customer behavior patterns',
    targetDate: '2024-08-15',
    status: 'In Development',
    priority: 'High',
    progress: 65,
    quarter: 'Q3 2024'
  },
  {
    id: '2',
    product: 'Mobile Banking App',
    feature: 'Biometric Authentication 2.0',
    description: 'Enhanced security with face ID and voice recognition',
    targetDate: '2024-07-30',
    status: 'Testing',
    priority: 'Critical',
    progress: 85,
    quarter: 'Q3 2024'
  },
  {
    id: '3',
    product: 'AI Content Generator',
    feature: 'Multi-language Support',
    description: 'Generate content in 15+ languages with cultural adaptation',
    targetDate: '2024-09-20',
    status: 'Design',
    priority: 'Medium',
    progress: 25,
    quarter: 'Q3 2024'
  },
  {
    id: '4',
    product: 'Customer Analytics Platform',
    feature: 'Real-time Dashboard Widgets',
    description: 'Customizable widgets for live data monitoring',
    targetDate: '2024-10-15',
    status: 'Planning',
    priority: 'Medium',
    progress: 10,
    quarter: 'Q4 2024'
  },
  {
    id: '5',
    product: 'Mobile Banking App',
    feature: 'Investment Portfolio Tracker',
    description: 'Integrated investment tracking and portfolio management',
    targetDate: '2024-11-30',
    status: 'Planning',
    priority: 'High',
    progress: 5,
    quarter: 'Q4 2024'
  },
];

const DeliverySchedule = () => {
  const [selectedQuarter, setSelectedQuarter] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState('All');
  const [timelineProduct, setTimelineProduct] = useState('Customer Analytics Platform');

  const filteredFeatures = upcomingFeatures.filter(feature => {
    const quarterMatch = selectedQuarter === 'All' || feature.quarter === selectedQuarter;
    const productMatch = selectedProduct === 'All' || feature.product === selectedProduct;
    return quarterMatch && productMatch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Testing': return 'bg-warning text-warning-foreground';
      case 'In Development': return 'bg-primary text-primary-foreground';
      case 'Design': return 'bg-accent text-accent-foreground';
      case 'Planning': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'destructive';
      case 'High': return 'default';
      case 'Medium': return 'secondary';
      case 'Low': return 'outline';
      default: return 'outline';
    }
  };

  // Prepare timeline chart data
  const timelineData = upcomingFeatures
    .filter(feature => feature.product === timelineProduct)
    .map(feature => {
      const startDate = new Date();
      const endDate = new Date(feature.targetDate);
      const duration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      const daysFromStart = Math.max(0, Math.ceil((startDate.getTime() - new Date('2024-07-01').getTime()) / (1000 * 60 * 60 * 24)));
      
      return {
        name: feature.feature.length > 25 ? feature.feature.substring(0, 25) + '...' : feature.feature,
        fullName: feature.feature,
        start: daysFromStart,
        duration: Math.max(duration, 30),
        progress: feature.progress,
        status: feature.status,
        targetDate: feature.targetDate,
        priority: feature.priority
      };
    });

  const getStatusBarColor = (status: string) => {
    switch (status) {
      case 'Testing': return 'hsl(var(--warning))';
      case 'In Development': return 'hsl(var(--primary))';
      case 'Design': return 'hsl(var(--accent))';
      case 'Planning': return 'hsl(var(--secondary))';
      default: return 'hsl(var(--muted))';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <div className="gradient-hero">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-white">
            <h1 className="text-4xl font-bold mb-4">Delivery Schedule</h1>
            <p className="text-xl text-white/90">
              Track delivery rates, feature roadmaps, and upcoming releases across your product portfolio
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Delivery Rate Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {deliveryRates.map((product, index) => (
            <Card key={index} className="shadow-card border-card-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {product.product}
                </CardTitle>
                <Package2 className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-card-foreground">Delivery Rate</span>
                      <span className="font-semibold text-card-foreground">{product.rate}%</span>
                    </div>
                    <Progress value={product.rate} className="h-2" />
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Delivered: {product.delivered}/{product.planned}</span>
                    <span>Velocity: {product.velocity}/month</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="roadmap" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="roadmap">Feature Roadmap</TabsTrigger>
            <TabsTrigger value="timeline">Timeline Chart</TabsTrigger>
            <TabsTrigger value="metrics">Delivery Metrics</TabsTrigger>
          </TabsList>

          <TabsContent value="roadmap" className="space-y-6">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={selectedQuarter} onValueChange={setSelectedQuarter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by quarter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Quarters</SelectItem>
                  <SelectItem value="Q3 2024">Q3 2024</SelectItem>
                  <SelectItem value="Q4 2024">Q4 2024</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                <SelectTrigger className="w-full sm:w-[250px]">
                  <SelectValue placeholder="Filter by product" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Products</SelectItem>
                  <SelectItem value="Customer Analytics Platform">Customer Analytics Platform</SelectItem>
                  <SelectItem value="Mobile Banking App">Mobile Banking App</SelectItem>
                  <SelectItem value="AI Content Generator">AI Content Generator</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Feature Timeline */}
            <div className="grid gap-4">
              {filteredFeatures.map((feature) => (
                <Card key={feature.id} className="shadow-card border-card-border">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-lg text-card-foreground">{feature.feature}</CardTitle>
                          <Badge variant={getPriorityColor(feature.priority)}>
                            {feature.priority}
                          </Badge>
                        </div>
                        <CardDescription className="text-muted-foreground">
                          {feature.product}
                        </CardDescription>
                        <p className="text-sm text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                      <div className="text-right space-y-2">
                        <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(feature.status)}`}>
                          {feature.status}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {new Date(feature.targetDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium text-card-foreground">{feature.progress}%</span>
                      </div>
                      <Progress value={feature.progress} className="h-2" />
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">{feature.quarter}</span>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {Math.ceil((new Date(feature.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days remaining
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-6">
            {/* Product Filter for Timeline */}
            <div className="flex justify-start">
              <Select value={timelineProduct} onValueChange={setTimelineProduct}>
                <SelectTrigger className="w-[300px] bg-card border-card-border">
                  <SelectValue placeholder="Select product for timeline" />
                </SelectTrigger>
                <SelectContent className="bg-card border-card-border z-50">
                  <SelectItem value="Customer Analytics Platform">Customer Analytics Platform</SelectItem>
                  <SelectItem value="Mobile Banking App">Mobile Banking App</SelectItem>
                  <SelectItem value="AI Content Generator">AI Content Generator</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Card className="shadow-card border-card-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Feature Timeline - {timelineProduct}</CardTitle>
                <CardDescription>Gantt chart showing feature development timeline</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={timelineData}
                      layout="horizontal"
                      margin={{ top: 20, right: 30, left: 150, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis 
                        type="number"
                        domain={[0, 150]}
                        tickFormatter={(value) => {
                          const date = new Date('2024-07-01');
                          date.setDate(date.getDate() + value);
                          return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                        }}
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                      />
                      <YAxis 
                        type="category"
                        dataKey="name"
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        width={140}
                      />
                      <Tooltip 
                        formatter={(value, name, props) => [
                          `${value} days`,
                          `Duration`
                        ]}
                        labelFormatter={(label, payload) => {
                          if (payload && payload[0]) {
                            const data = payload[0].payload;
                            return (
                              <div className="space-y-1">
                                <div className="font-medium">{data.fullName}</div>
                                <div className="text-sm text-muted-foreground">Status: {data.status}</div>
                                <div className="text-sm text-muted-foreground">Priority: {data.priority}</div>
                                <div className="text-sm text-muted-foreground">Target: {new Date(data.targetDate).toLocaleDateString()}</div>
                                <div className="text-sm text-muted-foreground">Progress: {data.progress}%</div>
                              </div>
                            );
                          }
                          return label;
                        }}
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                      <Bar dataKey="duration" radius={4}>
                        {timelineData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={getStatusBarColor(entry.status)} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                {/* Legend */}
                <div className="flex flex-wrap gap-4 mt-4 justify-center">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-primary"></div>
                    <span className="text-xs text-muted-foreground">In Development</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-warning"></div>
                    <span className="text-xs text-muted-foreground">Testing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-accent"></div>
                    <span className="text-xs text-muted-foreground">Design</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-secondary"></div>
                    <span className="text-xs text-muted-foreground">Planning</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="metrics" className="space-y-6">
            {/* Delivery Velocity Chart */}
            <Card className="shadow-card border-card-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Delivery Velocity Trends</CardTitle>
                <CardDescription>Features delivered per month by product</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={velocityTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="month" 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="analytics" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      name="Customer Analytics"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="banking" 
                      stroke="hsl(var(--accent))" 
                      strokeWidth={2}
                      name="Mobile Banking"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="ai" 
                      stroke="hsl(var(--warning))" 
                      strokeWidth={2}
                      name="AI Content Generator"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Delivery Performance */}
            <Card className="shadow-card border-card-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Delivery Performance</CardTitle>
                <CardDescription>Current delivery rates by product</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={deliveryRates}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="product" 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="rate" fill="hsl(var(--primary))" radius={4} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DeliverySchedule;