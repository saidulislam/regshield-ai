import React from "react";
import { cn } from "@/lib/utils";

interface RiskIndicatorProps {
  risk_level: "critical" | "high" | "medium" | "low";
  className?: string;
}

const riskConfig: Record<
  string,
  { dot: string; text: string; label: string }
> = {
  critical: {
    dot: "bg-rose-500",
    text: "text-rose-700",
    label: "Critical",
  },
  high: {
    dot: "bg-amber-500",
    text: "text-amber-700",
    label: "High",
  },
  medium: {
    dot: "bg-indigo-500",
    text: "text-indigo-700",
    label: "Medium",
  },
  low: {
    dot: "bg-slate-400",
    text: "text-slate-600",
    label: "Low",
  },
};

const RiskIndicator: React.FC<RiskIndicatorProps> = ({
  risk_level,
  className,
}) => {
  const config = riskConfig[risk_level];

  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <span className={cn("h-2 w-2 rounded-full", config.dot)} />
      <span className={cn("text-sm font-medium", config.text)}>
        {config.label}
      </span>
    </span>
  );
};

export { RiskIndicator };
