import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ThumbsUp, ThumbsDown, MessageSquare, User, Calendar, Clock, Eye } from "lucide-react";
import { toast } from "sonner";

export interface Product {
  id: string;
  name: string;
  description: string;
  pmName: string;
  launchDate: string;
  upvotes: number;
  downvotes: number;
  feedback: string[];
  status: "Active" | "Beta" | "Planned" | "Sunset";
  deliverySchedule?: {
    nextRelease: string;
    features: string[];
    estimatedDate: string;
  };
}

interface ProductCardProps {
  product: Product;
  onVote: (id: string, type: 'upvote' | 'downvote') => void;
  onFeedback: (id: string, feedback: string) => void;
  onUpdateDelivery?: (id: string, schedule: { nextRelease: string; features: string[]; estimatedDate: string }) => void;
}

export const ProductCard = ({ product, onVote, onFeedback }: ProductCardProps) => {
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");

  const handleFeedbackSubmit = () => {
    if (feedbackText.trim()) {
      onFeedback(product.id, feedbackText);
      setFeedbackText("");
      setShowFeedback(false);
      toast.success("Feedback submitted successfully!");
    }
  };

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
    <Card className="shadow-card hover:shadow-elevated transition-[var(--transition-smooth)] border-card-border">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-semibold text-card-foreground">{product.name}</CardTitle>
            <CardDescription className="mt-2 text-muted-foreground">
              {product.description}
            </CardDescription>
          </div>
          <Badge variant={getStatusVariant(product.status)}>
            {product.status}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="h-4 w-4" />
            <span>PM: {product.pmName}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Launched: {product.launchDate}</span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-muted-foreground">Satisfaction: </span>
            <span className={`font-semibold ${satisfaction >= 70 ? 'text-success' : satisfaction >= 40 ? 'text-warning' : 'text-destructive'}`}>
              {satisfaction}%
            </span>
          </div>
        </div>
        
        {showFeedback && (
          <div className="mt-4 space-y-2">
            <Textarea
              placeholder="Share your feedback about this product..."
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              className="min-h-[100px]"
            />
            <div className="flex gap-2">
              <Button onClick={handleFeedbackSubmit} size="sm">
                Submit Feedback
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowFeedback(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onVote(product.id, 'upvote')}
          className="flex items-center gap-2"
        >
          <ThumbsUp className="h-4 w-4" />
          {product.upvotes}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onVote(product.id, 'downvote')}
          className="flex items-center gap-2"
        >
          <ThumbsDown className="h-4 w-4" />
          {product.downvotes}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFeedback(!showFeedback)}
          className="flex items-center gap-2 ml-auto"
        >
          <MessageSquare className="h-4 w-4" />
          Feedback ({product.feedback.length})
        </Button>
      </CardFooter>
    </Card>
  );
};