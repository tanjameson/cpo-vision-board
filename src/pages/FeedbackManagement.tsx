import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, Search, Filter, User, Calendar, ThumbsUp, ThumbsDown, TrendingUp } from "lucide-react";
import { Product } from "@/components/ProductCard";

// Mock feedback data
const allFeedback = [
  {
    id: "1",
    productId: "1",
    productName: "Customer Analytics Platform",
    feedback: "Amazing insights and very intuitive interface! The dashboard has completely transformed how we analyze customer data.",
    date: "2024-12-01",
    sentiment: "positive" as const,
    category: "ui/ux",
    userId: "user123"
  },
  {
    id: "2",
    productId: "1", 
    productName: "Customer Analytics Platform",
    feedback: "Would love to see more customization options for the dashboard widgets. Current templates are good but limited.",
    date: "2024-11-28",
    sentiment: "neutral" as const,
    category: "feature_request",
    userId: "user456"
  },
  {
    id: "3",
    productId: "2",
    productName: "Mobile Banking App", 
    feedback: "Love the UI/UX design! It's clean, modern and very easy to navigate. Best banking app I've used.",
    date: "2024-12-02",
    sentiment: "positive" as const,
    category: "ui/ux",
    userId: "user789"
  },
  {
    id: "4",
    productId: "2",
    productName: "Mobile Banking App",
    feedback: "Fast and reliable transactions. No issues with performance even during peak hours.",
    date: "2024-11-30",
    sentiment: "positive" as const, 
    category: "performance",
    userId: "user101"
  },
  {
    id: "5",
    productId: "3",
    productName: "AI Content Generator",
    feedback: "Still needs refinement in content accuracy. Sometimes generates off-brand content that requires heavy editing.",
    date: "2024-11-25",
    sentiment: "negative" as const,
    category: "quality",
    userId: "user202"
  },
  {
    id: "6",
    productId: "3",
    productName: "AI Content Generator", 
    feedback: "Good concept overall, but could use better integration with our existing content management system.",
    date: "2024-11-22",
    sentiment: "neutral" as const,
    category: "integration",
    userId: "user303"
  }
];

const FeedbackManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("all");
  const [selectedSentiment, setSelectedSentiment] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredFeedback = allFeedback.filter(item => {
    const matchesSearch = item.feedback.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.productName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProduct = selectedProduct === "all" || item.productId === selectedProduct;
    const matchesSentiment = selectedSentiment === "all" || item.sentiment === selectedSentiment;
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    
    return matchesSearch && matchesProduct && matchesSentiment && matchesCategory;
  });

  const getSentimentBadge = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return { variant: 'default' as const, color: 'text-success', icon: ThumbsUp };
      case 'negative': return { variant: 'destructive' as const, color: 'text-destructive', icon: ThumbsDown };
      case 'neutral': return { variant: 'secondary' as const, color: 'text-warning', icon: TrendingUp };
      default: return { variant: 'outline' as const, color: 'text-muted-foreground', icon: MessageSquare };
    }
  };

  const getCategoryBadge = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      'ui/ux': 'UI/UX',
      'feature_request': 'Feature Request',
      'performance': 'Performance', 
      'quality': 'Quality',
      'integration': 'Integration'
    };
    return categoryMap[category] || category;
  };

  const sentimentStats = {
    positive: allFeedback.filter(f => f.sentiment === 'positive').length,
    negative: allFeedback.filter(f => f.sentiment === 'negative').length,
    neutral: allFeedback.filter(f => f.sentiment === 'neutral').length
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <div className="gradient-hero">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-white">
            <h1 className="text-4xl font-bold mb-4">Feedback Management</h1>
            <p className="text-xl text-white/90">
              Analyze and manage all user feedback across your product portfolio
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-card border-card-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Feedback
              </CardTitle>
              <MessageSquare className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">{allFeedback.length}</div>
              <p className="text-xs text-muted-foreground">
                All time responses
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card border-card-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Positive Feedback
              </CardTitle>
              <ThumbsUp className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{sentimentStats.positive}</div>
              <p className="text-xs text-success">
                {Math.round((sentimentStats.positive / allFeedback.length) * 100)}% of total
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card border-card-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Needs Attention
              </CardTitle>
              <ThumbsDown className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{sentimentStats.negative}</div>
              <p className="text-xs text-destructive">
                Critical feedback items
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card border-card-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Neutral Feedback
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">{sentimentStats.neutral}</div>
              <p className="text-xs text-muted-foreground">
                Suggestions & improvements
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="shadow-card border-card-border mb-6">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              <CardTitle className="text-lg">Filter Feedback</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search feedback..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                <SelectTrigger>
                  <SelectValue placeholder="All Products" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Products</SelectItem>
                  <SelectItem value="1">Customer Analytics Platform</SelectItem>
                  <SelectItem value="2">Mobile Banking App</SelectItem>
                  <SelectItem value="3">AI Content Generator</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedSentiment} onValueChange={setSelectedSentiment}>
                <SelectTrigger>
                  <SelectValue placeholder="All Sentiments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sentiments</SelectItem>
                  <SelectItem value="positive">Positive</SelectItem>
                  <SelectItem value="neutral">Neutral</SelectItem>
                  <SelectItem value="negative">Negative</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="ui/ux">UI/UX</SelectItem>
                  <SelectItem value="feature_request">Feature Request</SelectItem>
                  <SelectItem value="performance">Performance</SelectItem>
                  <SelectItem value="quality">Quality</SelectItem>
                  <SelectItem value="integration">Integration</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Feedback List */}
        <Card className="shadow-card border-card-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">
              Feedback Items ({filteredFeedback.length})
            </CardTitle>
            <CardDescription>
              Recent user feedback across all products
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredFeedback.length > 0 ? (
                filteredFeedback.map((item) => {
                  const sentimentBadge = getSentimentBadge(item.sentiment);
                  const SentimentIcon = sentimentBadge.icon;
                  
                  return (
                    <div key={item.id} className="border border-card-border rounded-lg p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="text-xs">
                              {item.productName}
                            </Badge>
                            <Badge variant={sentimentBadge.variant} className="text-xs">
                              <SentimentIcon className="h-3 w-3 mr-1" />
                              {item.sentiment}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {getCategoryBadge(item.category)}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground leading-relaxed">
                            "{item.feedback}"
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          <span>{item.userId}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(item.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8">
                  <MessageSquare className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
                  <p className="text-muted-foreground">No feedback found matching your filters</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FeedbackManagement;