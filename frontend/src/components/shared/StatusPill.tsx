import React from "react";
import { cn } from "@/lib/utils";

interface StatusPillProps {
  status: string;
  className?: string;
}

const statusColorMap: Record<string, string> = {
  not_started: "bg-slate-100 text-slate-600",
  in_progress: "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700",
  overdue: "bg-rose-100 text-rose-700",
  blocked: "bg-amber-100 text-amber-700",
  delivered: "bg-indigo-100 text-indigo-700",
  draft: "bg-slate-100 text-slate-600",
  reviewed: "bg-emerald-100 text-emerald-700",
  pending: "bg-slate-100 text-slate-600",
  cancelled: "bg-gray-100 text-gray-500",
};

function formatStatusLabel(status: string): string {
  return status
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const StatusPill: React.FC<StatusPillProps> = ({ status, className }) => {
  const colorClasses = statusColorMap[status] ?? "bg-slate-100 text-slate-600";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap",
        colorClasses,
        className
      )}
    >
      {formatStatusLabel(status)}
    </span>
  );
};

export { StatusPill };
