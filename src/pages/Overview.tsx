import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { BarChart3, Package, Plus, TrendingUp, Users, Eye } from "lucide-react";
import heroImage from "@/assets/hero-banner.jpg";

const Overview = () => {
  const stats = [
    {
      title: "Total Products",
      value: "3",
      change: "+1 this month",
      changeType: "positive" as const,
      icon: Package
    },
    {
      title: "Average Satisfaction",
      value: "83%",
      change: "+5% from last month",
      changeType: "positive" as const,
      icon: TrendingUp
    },
    {
      title: "Total User Engagement", 
      value: "89",
      change: "Upvotes & feedback",
      changeType: "neutral" as const,
      icon: Users
    }
  ];

  const recentProducts = [
    { name: "Customer Analytics Platform", satisfaction: 89, status: "Active" },
    { name: "Mobile Banking App", satisfaction: 90, status: "Active" },
    { name: "AI Content Generator", satisfaction: 71, status: "Beta" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative">
        <div 
          className="h-96 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 gradient-hero opacity-95"></div>
          <div className="relative max-w-7xl mx-auto px-6 h-full flex items-center">
            <div className="text-white max-w-3xl">
              <h1 className="text-5xl font-bold mb-6">
                Welcome to ProductHub
              </h1>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Your comprehensive dashboard for managing product portfolios, tracking user satisfaction, 
                and making data-driven decisions as Chief Product Officer.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/products">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-elevated">
                    <Package className="mr-2 h-5 w-5" />
                    View Product Portfolio
                  </Button>
                </Link>
                <Link to="/analytics">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    <BarChart3 className="mr-2 h-5 w-5" />
                    Analytics Dashboard
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="shadow-card border-card-border hover:shadow-elevated transition-[var(--transition-smooth)]">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <Icon className="h-5 w-5 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-card-foreground mb-1">
                    {stat.value}
                  </div>
                  <p className={`text-sm ${
                    stat.changeType === 'positive' 
                      ? 'text-success' 
                      : 'text-muted-foreground'
                  }`}>
                    {stat.change}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card className="shadow-card border-card-border">
            <CardHeader>
              <CardTitle className="text-card-foreground">Quick Actions</CardTitle>
              <CardDescription>Manage your product portfolio efficiently</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link to="/products" className="block">
                <Button variant="outline" className="w-full justify-start h-auto p-4">
                  <Plus className="mr-3 h-5 w-5" />
                  <div className="text-left">
                    <div className="font-semibold">Add New Product</div>
                    <div className="text-sm text-muted-foreground">Register a new product in your portfolio</div>
                  </div>
                </Button>
              </Link>
              
              <Link to="/analytics" className="block">
                <Button variant="outline" className="w-full justify-start h-auto p-4">
                  <BarChart3 className="mr-3 h-5 w-5" />
                  <div className="text-left">
                    <div className="font-semibold">View Analytics</div>
                    <div className="text-sm text-muted-foreground">Track satisfaction and performance metrics</div>
                  </div>
                </Button>
              </Link>
              
              <Link to="/products" className="block">
                <Button variant="outline" className="w-full justify-start h-auto p-4">
                  <Eye className="mr-3 h-5 w-5" />
                  <div className="text-left">
                    <div className="font-semibold">Browse Products</div>
                    <div className="text-sm text-muted-foreground">View all products and their feedback</div>
                  </div>
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Recent Products */}
          <Card className="shadow-card border-card-border">
            <CardHeader>
              <CardTitle className="text-card-foreground">Product Overview</CardTitle>
              <CardDescription>Quick view of your current products</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-card-border">
                    <div>
                      <div className="font-medium text-card-foreground">{product.name}</div>
                      <div className="text-sm text-muted-foreground">Status: {product.status}</div>
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-semibold ${
                        product.satisfaction >= 80 ? 'text-success' : 
                        product.satisfaction >= 60 ? 'text-warning' : 'text-destructive'
                      }`}>
                        {product.satisfaction}%
                      </div>
                      <div className="text-xs text-muted-foreground">satisfaction</div>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/products" className="block mt-4">
                <Button variant="outline" className="w-full">
                  View All Products
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-card-foreground mb-4">
            Everything You Need as CPO
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            ProductHub provides comprehensive tools to manage your product portfolio, 
            track user satisfaction, and make informed strategic decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-primary">
              <Package className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-card-foreground mb-2">Product Management</h3>
            <p className="text-muted-foreground">
              Centralized hub for all your products with detailed information, status tracking, and team coordination.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-primary">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-card-foreground mb-2">User Feedback</h3>
            <p className="text-muted-foreground">
              Collect and analyze user feedback with upvote/downvote systems and detailed comment tracking.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-primary">
              <BarChart3 className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-card-foreground mb-2">Analytics & Insights</h3>
            <p className="text-muted-foreground">
              Comprehensive analytics dashboard with satisfaction trends, performance metrics, and actionable insights.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;