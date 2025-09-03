import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, User, Calendar, Clock, MessageSquare, ThumbsUp, ThumbsDown } from "lucide-react";
import { Product } from "@/components/ProductCard";

// This would typically come from your data source
const mockProducts: Product[] = [
  {
    id: "1",
    name: "AI-Powered Analytics Dashboard",
    description: "Advanced analytics platform with machine learning insights for business intelligence and real-time data visualization.",
    pmName: "Sarah Chen",
    launchDate: "2024-01-15",
    upvotes: 124,
    downvotes: 8,
    feedback: [
      "Amazing insights and very intuitive interface!",
      "The ML predictions have been spot-on for our quarterly forecasts.",
      "Would love to see more customization options for the dashboard widgets.",
      "Great product overall, but the loading times could be improved.",
      "The export functionality is exactly what we needed."
    ],
    status: "Active" as const,
    deliverySchedule: {
      nextRelease: "v2.1.0",
      features: ["Custom widgets", "Advanced filtering", "Mobile app"],
      estimatedDate: "2024-03-15"
    }
  },
  {
    id: "2", 
    name: "Customer Feedback Portal",
    description: "Comprehensive customer feedback collection and analysis system with sentiment analysis and automated reporting.",
    pmName: "Marcus Rodriguez",
    launchDate: "2023-11-22",
    upvotes: 89,
    downvotes: 12,
    feedback: [
      "The sentiment analysis is incredibly accurate.",
      "Easy to integrate with our existing systems.",
      "Could use better filtering options for feedback categories.",
      "The automated reports save us hours every week!"
    ],
    status: "Active" as const,
    deliverySchedule: {
      nextRelease: "v1.3.0",
      features: ["Advanced filters", "Custom reports", "API improvements"],
      estimatedDate: "2024-02-28"
    }
  },
  {
    id: "3",
    name: "Smart Inventory Management",
    description: "Intelligent inventory tracking system with predictive restocking and automated supplier integration.",
    pmName: "Jennifer Liu",
    launchDate: "2024-02-10",
    upvotes: 67,
    downvotes: 5,
    feedback: [
      "The predictive restocking has reduced our stockouts by 40%.",
      "Integration with our suppliers was seamless.",
      "Would like to see more detailed analytics on inventory turnover."
    ],
    status: "Beta" as const
  }
];

export const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    // In a real app, you'd fetch the product data here
    const foundProduct = mockProducts.find(p => p.id === id);
    setProduct(foundProduct || null);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
            <Link to="/products">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Products
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const getStatusVariant = (status: Product['status']) => {
    switch (status) {
      case 'Active': return 'default';
      case 'Beta': return 'secondary';
      case 'Planned': return 'outline';
      case 'Sunset': return 'destructive';
      default: return 'default';
    }
  };

  const satisfaction = product.upvotes + product.downvotes > 0 
    ? Math.round((product.upvotes / (product.upvotes + product.downvotes)) * 100) 
    : 0;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-6 py-8">
        <div className="mb-6">
          <Link to="/products">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Products
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Product Info */}
          <div className="lg:col-span-2">
            <Card className="shadow-card border-card-border">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl font-bold text-card-foreground mb-2">
                      {product.name}
                    </CardTitle>
                    <CardDescription className="text-base text-muted-foreground">
                      {product.description}
                    </CardDescription>
                  </div>
                  <Badge variant={getStatusVariant(product.status)} className="text-sm">
                    {product.status}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>Product Manager: {product.pmName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Launch Date: {product.launchDate}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <ThumbsUp className="h-4 w-4 text-success" />
                    <span>{product.upvotes} upvotes</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <ThumbsDown className="h-4 w-4 text-destructive" />
                    <span>{product.downvotes} downvotes</span>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center gap-4 text-sm mb-2">
                    <span className="text-muted-foreground">User Satisfaction:</span>
                    <span className={`font-bold text-lg ${satisfaction >= 70 ? 'text-success' : satisfaction >= 40 ? 'text-warning' : 'text-destructive'}`}>
                      {satisfaction}%
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        satisfaction >= 70 ? 'bg-success' : 
                        satisfaction >= 40 ? 'bg-warning' : 'bg-destructive'
                      }`}
                      style={{ width: `${satisfaction}%` }}
                    />
                  </div>
                </div>

                {product.deliverySchedule && (
                  <div className="bg-muted/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="font-semibold">Upcoming Release</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div>
                        <strong>Version:</strong> {product.deliverySchedule.nextRelease}
                      </div>
                      <div>
                        <strong>Estimated Date:</strong> {product.deliverySchedule.estimatedDate}
                      </div>
                      <div>
                        <strong>Features:</strong>
                        <ul className="list-disc list-inside ml-2 mt-1">
                          {product.deliverySchedule.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Feedback Section */}
          <div className="lg:col-span-1">
            <Card className="shadow-card border-card-border">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  <CardTitle className="text-lg">User Feedback</CardTitle>
                  <Badge variant="secondary" className="ml-auto">
                    {product.feedback.length}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                {product.feedback.length > 0 ? (
                  <div className="space-y-4">
                    {product.feedback.map((feedback, index) => (
                      <div key={index} className="border-l-2 border-primary/20 pl-3">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          "{feedback}"
                        </p>
                        <div className="text-xs text-muted-foreground/70 mt-1">
                          User feedback #{index + 1}
                        </div>
                        {index < product.feedback.length - 1 && (
                          <Separator className="mt-3" />
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <MessageSquare className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
                    <p className="text-muted-foreground">No feedback yet</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;