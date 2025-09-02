import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { TrendingUp, Users, ThumbsUp, MessageSquare } from "lucide-react";

// Mock analytics data
const satisfactionData = [
  { name: 'Customer Analytics Platform', satisfaction: 89, upvotes: 24, downvotes: 3, feedback: 12 },
  { name: 'Mobile Banking App', satisfaction: 90, upvotes: 18, downvotes: 2, feedback: 8 },
  { name: 'AI Content Generator', satisfaction: 71, upvotes: 12, downvotes: 5, feedback: 15 },
];

const trendData = [
  { month: 'Jan', satisfaction: 75 },
  { month: 'Feb', satisfaction: 78 },
  { month: 'Mar', satisfaction: 82 },
  { month: 'Apr', satisfaction: 85 },
  { month: 'May', satisfaction: 87 },
  { month: 'Jun', satisfaction: 84 },
];

const statusData = [
  { name: 'Active', value: 2, color: 'hsl(var(--success))' },
  { name: 'Beta', value: 1, color: 'hsl(var(--warning))' },
  { name: 'Planned', value: 0, color: 'hsl(var(--muted))' },
  { name: 'Sunset', value: 0, color: 'hsl(var(--destructive))' },
];

const Analytics = () => {
  const overallSatisfaction = Math.round(
    satisfactionData.reduce((acc, product) => acc + product.satisfaction, 0) / satisfactionData.length
  );

  const totalUpvotes = satisfactionData.reduce((acc, product) => acc + product.upvotes, 0);
  const totalFeedback = satisfactionData.reduce((acc, product) => acc + product.feedback, 0);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <div className="gradient-hero">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-white">
            <h1 className="text-4xl font-bold mb-4">Analytics Dashboard</h1>
            <p className="text-xl text-white/90">
              Track product performance and user satisfaction metrics
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-card border-card-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Overall Satisfaction
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">{overallSatisfaction}%</div>
              <p className="text-xs text-success">
                +5% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card border-card-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Products
              </CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">{satisfactionData.length}</div>
              <p className="text-xs text-muted-foreground">
                Active portfolio
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card border-card-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Upvotes
              </CardTitle>
              <ThumbsUp className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">{totalUpvotes}</div>
              <p className="text-xs text-accent">
                +12 this week
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card border-card-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Feedback Received
              </CardTitle>
              <MessageSquare className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">{totalFeedback}</div>
              <p className="text-xs text-muted-foreground">
                Total responses
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Product Satisfaction Chart */}
          <Card className="shadow-card border-card-border">
            <CardHeader>
              <CardTitle className="text-card-foreground">Product Satisfaction Scores</CardTitle>
              <CardDescription>User satisfaction by product</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={satisfactionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="name" 
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
                  <Bar dataKey="satisfaction" fill="hsl(var(--primary))" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Product Status Distribution */}
          <Card className="shadow-card border-card-border">
            <CardHeader>
              <CardTitle className="text-card-foreground">Product Status Distribution</CardTitle>
              <CardDescription>Current status of all products</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Satisfaction Trend */}
        <Card className="shadow-card border-card-border mb-8">
          <CardHeader>
            <CardTitle className="text-card-foreground">Satisfaction Trend</CardTitle>
            <CardDescription>Overall satisfaction over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
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
                  dataKey="satisfaction" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Product Details Table */}
        <Card className="shadow-card border-card-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">Product Performance Summary</CardTitle>
            <CardDescription>Detailed metrics for each product</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {satisfactionData.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-card-border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-semibold text-card-foreground">{product.name}</h4>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span>Satisfaction: {product.satisfaction}%</span>
                      <span>Upvotes: {product.upvotes}</span>
                      <span>Feedback: {product.feedback}</span>
                    </div>
                  </div>
                  <Badge 
                    variant={product.satisfaction >= 80 ? 'default' : product.satisfaction >= 60 ? 'secondary' : 'destructive'}
                  >
                    {product.satisfaction >= 80 ? 'Excellent' : product.satisfaction >= 60 ? 'Good' : 'Needs Attention'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;