import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductCard, Product } from "@/components/ProductCard";
import { AddProductForm } from "@/components/AddProductForm";
import { Navigation } from "@/components/Navigation";
import { Plus, Search } from "lucide-react";
import heroImage from "@/assets/hero-banner.jpg";

// Mock data for initial products
const initialProducts: Product[] = [
  {
    id: "1",
    name: "Customer Analytics Platform",
    description: "Advanced analytics platform providing real-time insights into customer behavior and product usage patterns.",
    pmName: "Sarah Johnson",
    launchDate: "2024-01-15",
    upvotes: 24,
    downvotes: 3,
    feedback: ["Great insights dashboard", "Would love mobile app"],
    status: "Active",
    deliverySchedule: {
      nextRelease: "v2.1.0",
      features: ["Mobile app", "Advanced filtering", "Real-time alerts"],
      estimatedDate: "2024-04-15"
    }
  },
  {
    id: "2", 
    name: "Mobile Banking App",
    description: "Next-generation mobile banking application with AI-powered financial insights and seamless user experience.",
    pmName: "Michael Chen",
    launchDate: "2024-03-22",
    upvotes: 18,
    downvotes: 2,
    feedback: ["Love the UI/UX", "Fast and reliable"],
    status: "Active",
    deliverySchedule: {
      nextRelease: "v1.5.0",
      features: ["Biometric login", "Investment tracking", "Bill pay automation"],
      estimatedDate: "2024-05-01"
    }
  },
  {
    id: "3",
    name: "AI Content Generator",
    description: "Machine learning powered content generation tool for marketing teams to create engaging content at scale.",
    pmName: "Emily Rodriguez",
    launchDate: "2024-06-10",
    upvotes: 12,
    downvotes: 5,
    feedback: ["Still needs refinement", "Good concept"],
    status: "Beta"
  }
];

const Products = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.pmName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleVote = (id: string, type: 'upvote' | 'downvote') => {
    setProducts(prev => prev.map(product => 
      product.id === id 
        ? { 
            ...product, 
            [type === 'upvote' ? 'upvotes' : 'downvotes']: product[type === 'upvote' ? 'upvotes' : 'downvotes'] + 1 
          }
        : product
    ));
  };

  const handleFeedback = (id: string, feedback: string) => {
    setProducts(prev => prev.map(product =>
      product.id === id
        ? { ...product, feedback: [...product.feedback, feedback] }
        : product
    ));
  };

  const handleDeliveryUpdate = (id: string, schedule: { nextRelease: string; features: string[]; estimatedDate: string }) => {
    setProducts(prev => prev.map(product =>
      product.id === id
        ? { ...product, deliverySchedule: schedule }
        : product
    ));
  };

  const handleAddProduct = (newProduct: Omit<Product, 'id' | 'upvotes' | 'downvotes' | 'feedback'>) => {
    const product: Product = {
      ...newProduct,
      id: Date.now().toString(),
      upvotes: 0,
      downvotes: 0,
      feedback: []
    };
    setProducts(prev => [product, ...prev]);
    setShowAddForm(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative">
        <div 
          className="h-64 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 gradient-hero opacity-90"></div>
          <div className="relative max-w-7xl mx-auto px-6 h-full flex items-center">
            <div className="text-white">
              <h1 className="text-4xl font-bold mb-4">Product Portfolio</h1>
              <p className="text-xl text-white/90">
                Manage and track all products under your leadership
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Controls Section */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products, PMs, or descriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Button 
            onClick={() => setShowAddForm(true)}
            className="gradient-primary shadow-primary"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Product
          </Button>
        </div>

        {/* Add Product Form */}
        {showAddForm && (
          <div className="mb-8">
            <AddProductForm
              onAddProduct={handleAddProduct}
              onCancel={() => setShowAddForm(false)}
            />
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onVote={handleVote}
              onFeedback={handleFeedback}
              onUpdateDelivery={handleDeliveryUpdate}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground text-lg">
              No products found matching your search.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;