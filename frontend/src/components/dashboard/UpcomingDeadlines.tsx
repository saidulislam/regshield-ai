"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { DateCountdown } from "@/components/shared/DateCountdown";
import { StatusPill } from "@/components/shared/StatusPill";
import { cn } from "@/lib/utils";

interface DeadlineItem {
  id: string;
  title: string;
  deadline: string;
  priority: "critical" | "high" | "medium" | "low";
  status: string;
}

interface UpcomingDeadlinesProps {
  deadlines: DeadlineItem[];
  className?: string;
}

const priorityDot: Record<string, string> = {
  critical: "bg-rose-500",
  high: "bg-amber-500",
  medium: "bg-indigo-500",
  low: "bg-slate-400",
};

const UpcomingDeadlines: React.FC<UpcomingDeadlinesProps> = ({
  deadlines,
  className,
}) => {
  const sorted = [...deadlines]
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
    .slice(0, 5);

  return (
    <Card
      className={className}
      header={
        <h3 className="text-sm font-semibold text-slate-900">
          Upcoming Deadlines
        </h3>
      }
      padding="none"
    >
      <ul className="divide-y divide-gray-100">
        {sorted.map((item) => (
          <li key={item.id} className="flex items-start gap-3 px-5 py-3">
            <span
              className={cn(
                "mt-1.5 h-2 w-2 flex-shrink-0 rounded-full",
                priorityDot[item.priority]
              )}
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-800 truncate">
                {item.title}
              </p>
              <div className="mt-1 flex items-center gap-2 flex-wrap">
                <span className="text-xs text-slate-500">
                  {new Date(item.deadline).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
                <DateCountdown deadline={item.deadline} />
              </div>
            </div>
            <StatusPill status={item.status} />
          </li>
        ))}
        {sorted.length === 0 && (
          <li className="px-5 py-8 text-center text-sm text-slate-400">
            No upcoming deadlines
          </li>
        )}
      </ul>
    </Card>
  );
};

export { UpcomingDeadlines };
