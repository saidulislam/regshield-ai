"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import {
  Plus,
  Pencil,
  Trash2,
  ArrowRightLeft,
  UserPlus,
  Eye,
  CheckCircle,
  XCircle,
  Upload,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { AuditAction, ActorType } from "@/types";

interface ActivityEntry {
  id: string;
  description: string;
  actor_name: string;
  actor_type: ActorType;
  action: AuditAction;
  created_at: string;
}

interface RecentActivityProps {
  entries: ActivityEntry[];
  className?: string;
}

const actionIconMap: Record<AuditAction, React.FC<{ className?: string }>> = {
  created: Plus,
  updated: Pencil,
  deleted: Trash2,
  status_changed: ArrowRightLeft,
  assigned: UserPlus,
  reviewed: Eye,
  approved: CheckCircle,
  rejected: XCircle,
  uploaded: Upload,
  verified: ShieldCheck,
};

const actionColorMap: Record<AuditAction, string> = {
  created: "bg-emerald-100 text-emerald-600",
  updated: "bg-blue-100 text-blue-600",
  deleted: "bg-rose-100 text-rose-600",
  status_changed: "bg-amber-100 text-amber-600",
  assigned: "bg-indigo-100 text-indigo-600",
  reviewed: "bg-slate-100 text-slate-600",
  approved: "bg-green-100 text-green-600",
  rejected: "bg-rose-100 text-rose-600",
  uploaded: "bg-blue-100 text-blue-600",
  verified: "bg-emerald-100 text-emerald-600",
};

function formatRelativeTime(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSeconds < 60) return "just now";
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

const RecentActivity: React.FC<RecentActivityProps> = ({
  entries,
  className,
}) => {
  const items = entries.slice(0, 10);

  return (
    <Card
      className={className}
      header={
        <h3 className="text-sm font-semibold text-slate-900">
          Recent Activity
        </h3>
      }
      padding="none"
    >
      <div className="max-h-[400px] overflow-y-auto">
        <ul className="divide-y divide-gray-100">
          {items.map((entry) => {
            const Icon = actionIconMap[entry.action] ?? Pencil;
            const iconColor =
              actionColorMap[entry.action] ?? "bg-slate-100 text-slate-600";

            return (
              <li key={entry.id} className="flex items-start gap-3 px-5 py-3">
                <span
                  className={cn(
                    "mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full",
                    iconColor
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-700 line-clamp-2">
                    {entry.description}
                  </p>
                  <div className="mt-0.5 flex items-center gap-2 text-xs text-slate-400">
                    <span className="font-medium text-slate-500">
                      {entry.actor_name}
                    </span>
                    <span>{formatRelativeTime(entry.created_at)}</span>
                  </div>
                </div>
              </li>
            );
          })}
          {items.length === 0 && (
            <li className="px-5 py-8 text-center text-sm text-slate-400">
              No recent activity
            </li>
          )}
        </ul>
      </div>
    </Card>
  );
};

export { RecentActivity };
