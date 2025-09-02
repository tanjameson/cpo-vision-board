import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from "./ProductCard";
import { toast } from "sonner";

interface AddProductFormProps {
  onAddProduct: (product: Omit<Product, 'id' | 'upvotes' | 'downvotes' | 'feedback'>) => void;
  onCancel: () => void;
}

export const AddProductForm = ({ onAddProduct, onCancel }: AddProductFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    pmName: "",
    launchDate: "",
    status: "Planned" as Product['status']
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || !formData.pmName || !formData.launchDate) {
      toast.error("Please fill in all required fields");
      return;
    }

    onAddProduct(formData);
    toast.success("Product added successfully!");
    setFormData({
      name: "",
      description: "",
      pmName: "",
      launchDate: "",
      status: "Planned"
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="shadow-card border-card-border">
      <CardHeader>
        <CardTitle className="text-card-foreground">Add New Product</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Product Name *</Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Enter product name"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Describe the product and its key features"
              className="min-h-[100px]"
              required
            />
          </div>

          <div>
            <Label htmlFor="pmName">Product Manager *</Label>
            <Input
              id="pmName"
              type="text"
              value={formData.pmName}
              onChange={(e) => handleChange('pmName', e.target.value)}
              placeholder="Enter PM name"
              required
            />
          </div>

          <div>
            <Label htmlFor="launchDate">Launch Date *</Label>
            <Input
              id="launchDate"
              type="date"
              value={formData.launchDate}
              onChange={(e) => handleChange('launchDate', e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => handleChange('status', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Planned">Planned</SelectItem>
                <SelectItem value="Beta">Beta</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Sunset">Sunset</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="gradient-primary">
              Add Product
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};