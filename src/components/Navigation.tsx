import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { BarChart3, Package, Home, Calendar, MessageSquare, Truck } from "lucide-react";

export const Navigation = () => {
  const location = useLocation();

  const navItems = [
    {
      to: "/",
      icon: Home,
      label: "Overview",
    },
    {
      to: "/products",
      icon: Package,
      label: "Products",
    },
    {
      to: "/delivery",
      icon: Truck,
      label: "Delivery Schedule",
    },
    {
      to: "/delivery-management",
      icon: Calendar,
      label: "Delivery Management",
    },
    {
      to: "/feedback",
      icon: MessageSquare,
      label: "Feedback",
    },
    {
      to: "/analytics",
      icon: BarChart3,
      label: "Analytics",
    },
  ];

  return (
    <nav className="bg-surface border-b border-card-border shadow-card">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient-hero rounded-lg flex items-center justify-center">
                <Package className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-card-foreground">
                ProductHub
              </span>
            </Link>
          </div>

          <div className="flex space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.to;
              
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-[var(--transition-smooth)]",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-primary"
                      : "text-muted-foreground hover:text-card-foreground hover:bg-secondary"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="text-sm text-muted-foreground">
            BPTO Dashboard
          </div>
        </div>
      </div>
    </nav>
  );
};