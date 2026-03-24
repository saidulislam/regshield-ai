import React from "react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

interface ChangesSummaryCardProps {
  totalActive: number;
  critical: number;
  high: number;
  medium: number;
  low: number;
  latestChangeTitle: string;
  latestChangeDate: string;
  className?: string;
}

const urgencyRows: {
  key: "critical" | "high" | "medium" | "low";
  label: string;
  dot: string;
}[] = [
  { key: "critical", label: "Critical", dot: "bg-rose-500" },
  { key: "high", label: "High", dot: "bg-amber-500" },
  { key: "medium", label: "Medium", dot: "bg-indigo-500" },
  { key: "low", label: "Low", dot: "bg-slate-400" },
];

const ChangesSummaryCard: React.FC<ChangesSummaryCardProps> = ({
  totalActive,
  critical,
  high,
  medium,
  low,
  latestChangeTitle,
  latestChangeDate,
  className,
}) => {
  const counts = { critical, high, medium, low };
  const formattedDate = new Date(latestChangeDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Card
      className={className}
      header={
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-900">
            Regulatory Changes
          </h3>
          <span className="text-2xl font-bold text-[#312E81]">
            {totalActive}
          </span>
        </div>
      }
    >
      <div className="space-y-2">
        {urgencyRows.map((row) => (
          <div key={row.key} className="flex items-center justify-between">
            <span className="inline-flex items-center gap-2 text-sm text-slate-600">
              <span className={cn("h-2 w-2 rounded-full", row.dot)} />
              {row.label}
            </span>
            <span className="text-sm font-medium text-slate-900">
              {counts[row.key]}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 border-t border-gray-100 pt-3">
        <p className="text-xs text-slate-500">Latest Change</p>
        <p className="mt-0.5 text-sm font-medium text-slate-800 line-clamp-1">
          {latestChangeTitle}
        </p>
        <p className="text-xs text-slate-400 mt-0.5">{formattedDate}</p>
      </div>
    </Card>
  );
};

export { ChangesSummaryCard };
