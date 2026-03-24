import React from "react";
import { Badge } from "@/components/ui/Badge";
import { AlertTriangle, ArrowUp, Minus, ArrowDown, Info } from "lucide-react";

type Urgency = "critical" | "high" | "medium" | "low" | "informational";

interface UrgencyBadgeProps {
  urgency: Urgency;
  className?: string;
}

const urgencyConfig: Record<
  Urgency,
  {
    variant: "critical" | "high" | "medium" | "low" | "info";
    label: string;
    icon: React.FC<{ className?: string }>;
  }
> = {
  critical: { variant: "critical", label: "Critical", icon: AlertTriangle },
  high: { variant: "high", label: "High", icon: ArrowUp },
  medium: { variant: "medium", label: "Medium", icon: Minus },
  low: { variant: "low", label: "Low", icon: ArrowDown },
  informational: { variant: "info", label: "Info", icon: Info },
};

const UrgencyBadge: React.FC<UrgencyBadgeProps> = ({ urgency, className }) => {
  const config = urgencyConfig[urgency];
  const Icon = config.icon;

  return (
    <Badge variant={config.variant} className={className}>
      <Icon className="mr-1 h-3 w-3" />
      {config.label}
    </Badge>
  );
};

export { UrgencyBadge };
