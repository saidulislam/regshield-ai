"use client";

import React, { useMemo } from "react";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";

interface DateCountdownProps {
  deadline: string;
  className?: string;
}

const DateCountdown: React.FC<DateCountdownProps> = ({
  deadline,
  className,
}) => {
  const { label, colorClass } = useMemo(() => {
    const now = new Date();
    const target = new Date(deadline);
    const diffMs = target.getTime() - now.getTime();
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return {
        label: `${Math.abs(diffDays)} day${Math.abs(diffDays) !== 1 ? "s" : ""} overdue`,
        colorClass: "text-rose-600",
      };
    }

    if (diffDays === 0) {
      return {
        label: "Due today",
        colorClass: "text-rose-600",
      };
    }

    let color: string;
    if (diffDays < 3) {
      color = "text-rose-600";
    } else if (diffDays <= 7) {
      color = "text-amber-600";
    } else {
      color = "text-green-600";
    }

    return {
      label: `${diffDays} day${diffDays !== 1 ? "s" : ""} remaining`,
      colorClass: color,
    };
  }, [deadline]);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-sm font-medium",
        colorClass,
        className
      )}
    >
      <Clock className="h-3.5 w-3.5" />
      {label}
    </span>
  );
};

export { DateCountdown };
