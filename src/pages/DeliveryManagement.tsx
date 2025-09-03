import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Calendar, Package, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

type DeliveryStatus = "planned" | "in_progress" | "testing" | "released";
type DeliveryPriority = "low" | "medium" | "high";

interface DeliveryItem {
  id: string;
  productId: string;
  productName: string;
  version: string;
  features: string[];
  estimatedDate: string;
  status: DeliveryStatus;
  priority: DeliveryPriority;
  description?: string;
}

interface FormData {
  productId: string;
  productName: string;
  version: string;
  features: string;
  estimatedDate: string;
  status: DeliveryStatus;
  priority: DeliveryPriority;
  description: string;
}

// Mock delivery schedule data
const initialDeliveries: DeliveryItem[] = [
  {
    id: "1",
    productId: "1",
    productName: "Customer Analytics Platform",
    version: "v2.1.0",
    features: ["Mobile app", "Advanced filtering", "Real-time alerts"],
    estimatedDate: "2024-04-15",
    status: "in_progress",
    priority: "high",
    description: "Major release focusing on mobile experience and enhanced analytics capabilities"
  },
  {
    id: "2", 
    productId: "2",
    productName: "Mobile Banking App",
    version: "v1.5.0",
    features: ["Biometric login", "Investment tracking", "Bill pay automation"],
    estimatedDate: "2024-05-01",
    status: "planned",
    priority: "medium",
    description: "Security and financial planning enhancements"
  },
  {
    id: "3",
    productId: "1",
    productName: "Customer Analytics Platform", 
    version: "v2.2.0",
    features: ["API integrations", "Custom dashboards", "Team collaboration"],
    estimatedDate: "2024-06-30",
    status: "planned",
    priority: "medium",
    description: "Enterprise features for team collaboration and third-party integrations"
  }
];

const DeliveryManagement = () => {
  const [deliveries, setDeliveries] = useState<DeliveryItem[]>(initialDeliveries);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingDelivery, setEditingDelivery] = useState<DeliveryItem | null>(null);
  const [formData, setFormData] = useState<FormData>({
    productId: "",
    productName: "",
    version: "",
    features: "",
    estimatedDate: "",
    status: "planned",
    priority: "medium",
    description: ""
  });

  const resetForm = () => {
    setFormData({
      productId: "",
      productName: "",
      version: "",
      features: "",
      estimatedDate: "",
      status: "planned",
      priority: "medium", 
      description: ""
    });
  };

  const handleAddDelivery = () => {
    if (!formData.productName || !formData.version || !formData.features || !formData.estimatedDate) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newDelivery: DeliveryItem = {
      id: Date.now().toString(),
      productId: formData.productId || Date.now().toString(),
      productName: formData.productName,
      version: formData.version,
      features: formData.features.split(",").map(f => f.trim()).filter(f => f),
      estimatedDate: formData.estimatedDate,
      status: formData.status,
      priority: formData.priority,
      description: formData.description
    };

    setDeliveries(prev => [...prev, newDelivery]);
    setShowAddDialog(false);
    resetForm();
    toast.success("Delivery schedule added successfully!");
  };

  const handleEditDelivery = () => {
    if (!editingDelivery) return;

    const updatedDelivery: DeliveryItem = {
      ...editingDelivery,
      productName: formData.productName,
      version: formData.version,
      features: formData.features.split(",").map(f => f.trim()).filter(f => f),
      estimatedDate: formData.estimatedDate,
      status: formData.status,
      priority: formData.priority,
      description: formData.description
    };

    setDeliveries(prev => prev.map(d => d.id === editingDelivery.id ? updatedDelivery : d));
    setEditingDelivery(null);
    resetForm();
    toast.success("Delivery schedule updated successfully!");
  };

  const startEdit = (delivery: DeliveryItem) => {
    setEditingDelivery(delivery);
    setFormData({
      productId: delivery.productId,
      productName: delivery.productName,
      version: delivery.version,
      features: delivery.features.join(", "),
      estimatedDate: delivery.estimatedDate,
      status: delivery.status,
      priority: delivery.priority,
      description: delivery.description || ""
    });
  };

  const handleDelete = (id: string) => {
    setDeliveries(prev => prev.filter(d => d.id !== id));
    toast.success("Delivery schedule deleted");
  };

  const getStatusBadge = (status: DeliveryStatus) => {
    switch (status) {
      case 'planned': return { variant: 'outline' as const, label: 'Planned' };
      case 'in_progress': return { variant: 'secondary' as const, label: 'In Progress' };
      case 'testing': return { variant: 'default' as const, label: 'Testing' };
      case 'released': return { variant: 'default' as const, label: 'Released' };
      default: return { variant: 'outline' as const, label: status };
    }
  };

  const getPriorityBadge = (priority: DeliveryPriority) => {
    switch (priority) {
      case 'high': return { variant: 'destructive' as const, label: 'High' };
      case 'medium': return { variant: 'secondary' as const, label: 'Medium' };
      case 'low': return { variant: 'outline' as const, label: 'Low' };
      default: return { variant: 'outline' as const, label: priority };
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <div className="gradient-hero">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-white">
            <h1 className="text-4xl font-bold mb-4">Delivery Management</h1>
            <p className="text-xl text-white/90">
              Plan and track feature delivery schedules across all products
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Action Bar */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Delivery Schedule</h2>
            <p className="text-muted-foreground">Manage upcoming releases and features</p>
          </div>
          
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button className="gradient-primary shadow-primary">
                <Plus className="h-4 w-4 mr-2" />
                Add Delivery Schedule
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Delivery Schedule</DialogTitle>
                <DialogDescription>
                  Create a new delivery schedule for upcoming product features
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Product Name *</label>
                    <Input
                      placeholder="Enter product name"
                      value={formData.productName}
                      onChange={(e) => setFormData(prev => ({...prev, productName: e.target.value}))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Version *</label>
                    <Input
                      placeholder="e.g., v2.1.0"
                      value={formData.version}
                      onChange={(e) => setFormData(prev => ({...prev, version: e.target.value}))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Features *</label>
                  <Textarea
                    placeholder="Feature 1, Feature 2, Feature 3..."
                    value={formData.features}
                    onChange={(e) => setFormData(prev => ({...prev, features: e.target.value}))}
                    className="min-h-[80px]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Estimated Date *</label>
                    <Input
                      type="date"
                      value={formData.estimatedDate}
                      onChange={(e) => setFormData(prev => ({...prev, estimatedDate: e.target.value}))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Priority</label>
                    <Select value={formData.priority} onValueChange={(value) => setFormData(prev => ({...prev, priority: value as DeliveryPriority}))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({...prev, status: value as DeliveryStatus}))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="planned">Planned</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="testing">Testing</SelectItem>
                      <SelectItem value="released">Released</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    placeholder="Brief description of this release..."
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
                    className="min-h-[60px]"
                  />
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddDelivery}>
                  Add Schedule
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Delivery Items */}
        <div className="grid gap-6">
          {deliveries.map((delivery) => {
            const statusBadge = getStatusBadge(delivery.status);
            const priorityBadge = getPriorityBadge(delivery.priority);
            
            return (
              <Card key={delivery.id} className="shadow-card border-card-border">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-lg">{delivery.productName}</CardTitle>
                        <Badge variant="outline" className="text-xs">
                          {delivery.version}
                        </Badge>
                        <Badge variant={statusBadge.variant}>
                          {statusBadge.label}
                        </Badge>
                        <Badge variant={priorityBadge.variant}>
                          {priorityBadge.label} Priority
                        </Badge>
                      </div>
                      {delivery.description && (
                        <CardDescription>{delivery.description}</CardDescription>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        variant="outline" 
                        size="sm"
                        onClick={() => startEdit(delivery)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm" 
                        onClick={() => handleDelete(delivery.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Target Date: {new Date(delivery.estimatedDate).toLocaleDateString()}</span>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <Package className="h-4 w-4" />
                        Features ({delivery.features.length})
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {delivery.features.map((feature, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {deliveries.length === 0 && (
          <Card className="shadow-card border-card-border">
            <CardContent className="text-center py-12">
              <Package className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
              <p className="text-muted-foreground">No delivery schedules created yet</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => setShowAddDialog(true)}
              >
                Create Your First Schedule
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Edit Dialog */}
      {editingDelivery && (
        <Dialog open={!!editingDelivery} onOpenChange={() => setEditingDelivery(null)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Edit Delivery Schedule</DialogTitle>
              <DialogDescription>
                Update the delivery schedule details
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Product Name *</label>
                  <Input
                    placeholder="Enter product name"
                    value={formData.productName}
                    onChange={(e) => setFormData(prev => ({...prev, productName: e.target.value}))}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Version *</label>
                  <Input
                    placeholder="e.g., v2.1.0"
                    value={formData.version}
                    onChange={(e) => setFormData(prev => ({...prev, version: e.target.value}))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Features *</label>
                <Textarea
                  placeholder="Feature 1, Feature 2, Feature 3..."
                  value={formData.features}
                  onChange={(e) => setFormData(prev => ({...prev, features: e.target.value}))}
                  className="min-h-[80px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Estimated Date *</label>
                  <Input
                    type="date"
                    value={formData.estimatedDate}
                    onChange={(e) => setFormData(prev => ({...prev, estimatedDate: e.target.value}))}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Priority</label>
                  <Select value={formData.priority} onValueChange={(value) => setFormData(prev => ({...prev, priority: value as DeliveryPriority}))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({...prev, status: value as DeliveryStatus}))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="planned">Planned</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="testing">Testing</SelectItem>
                    <SelectItem value="released">Released</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  placeholder="Brief description of this release..."
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
                  className="min-h-[60px]"
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setEditingDelivery(null)}>
                Cancel
              </Button>
              <Button onClick={handleEditDelivery}>
                Update Schedule
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default DeliveryManagement;