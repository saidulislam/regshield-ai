import React from "react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

interface ActionItemsOverviewProps {
  total: number;
  completed: number;
  inProgress: number;
  overdue: number;
  className?: string;
}

const ActionItemsOverview: React.FC<ActionItemsOverviewProps> = ({
  total,
  completed,
  inProgress,
  overdue,
  className,
}) => {
  const completionPercent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <Card
      className={className}
      header={
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-900">Action Items</h3>
          <span className="text-2xl font-bold text-[#312E81]">{total}</span>
        </div>
      }
    >
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-600">Completed</span>
          <span className="font-medium text-emerald-700">{completed}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-600">In Progress</span>
          <span className="font-medium text-blue-700">{inProgress}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className={cn("text-slate-600", overdue > 0 && "text-rose-600 font-medium")}>
            Overdue
          </span>
          <span
            className={cn(
              "font-medium",
              overdue > 0 ? "text-rose-600" : "text-slate-700"
            )}
          >
            {overdue}
          </span>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-slate-500">Completion</span>
          <span className="text-xs font-medium text-slate-700">
            {completionPercent}%
          </span>
        </div>
        <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
          <div
            className="h-full rounded-full bg-[#059669] transition-all duration-500"
            style={{ width: `${completionPercent}%` }}
          />
        </div>
      </div>
    </Card>
  );
};

export { ActionItemsOverview };
