"use client";

import { PortalLayout } from "@/components/layout/PortalLayout";
import {
  Activity,
  AlertTriangle,
  Calendar,
  FileText,
  ListChecks,
  ShieldCheck,
  TrendingUp,
  User,
  Zap,
} from "lucide-react";

// ─── Inline Demo Data ────────────────────────────────────────────────────────

const stats = {
  activeChanges: 8,
  pendingActionItems: 12,
  overdueItems: 3,
  complianceScore: 72,
};

const recentChanges = [
  {
    id: "rc-001",
    title: "CFPB Final Rule on Open Banking (Section 1033)",
    jurisdiction: "Federal",
    domain: "Consumer Protection",
    date: "2026-03-21",
    impactScore: 92,
    urgency: "critical" as const,
  },
  {
    id: "rc-002",
    title: "SEC Climate Disclosure Rule Amendment",
    jurisdiction: "Federal",
    domain: "Securities",
    date: "2026-03-19",
    impactScore: 85,
    urgency: "high" as const,
  },
  {
    id: "rc-003",
    title: "NYDFS Cybersecurity Regulation Update (23 NYCRR 500)",
    jurisdiction: "New York",
    domain: "Cybersecurity",
    date: "2026-03-18",
    impactScore: 78,
    urgency: "high" as const,
  },
  {
    id: "rc-004",
    title: "FinCEN Beneficial Ownership Information Reporting Guidance",
    jurisdiction: "Federal",
    domain: "AML/BSA",
    date: "2026-03-15",
    impactScore: 62,
    urgency: "medium" as const,
  },
  {
    id: "rc-005",
    title: "OCC Third-Party Risk Management Bulletin Update",
    jurisdiction: "Federal",
    domain: "Risk Management",
    date: "2026-03-12",
    impactScore: 45,
    urgency: "low" as const,
  },
];

const actionItems = [
  {
    id: "ai-001",
    title: "Update data sharing consent flows per Section 1033",
    priority: "critical" as const,
    deadline: "2026-03-25",
    status: "in_progress" as const,
  },
  {
    id: "ai-002",
    title: "Conduct climate risk materiality assessment",
    priority: "high" as const,
    deadline: "2026-03-28",
    status: "pending" as const,
  },
  {
    id: "ai-003",
    title: "Update incident response plan for NYDFS 500.17",
    priority: "high" as const,
    deadline: "2026-03-20",
    status: "overdue" as const,
  },
  {
    id: "ai-004",
    title: "File beneficial ownership reports for new entities",
    priority: "medium" as const,
    deadline: "2026-04-01",
    status: "pending" as const,
  },
  {
    id: "ai-005",
    title: "Review third-party vendor risk assessments",
    priority: "medium" as const,
    deadline: "2026-04-05",
    status: "in_progress" as const,
  },
];

const upcomingDeadlines = [
  { id: "dl-001", title: "Section 1033 Implementation Phase 1", deadline: "2026-03-25", riskLevel: "critical" as const },
  { id: "dl-002", title: "Climate Disclosure Interim Report", deadline: "2026-03-28", riskLevel: "high" as const },
  { id: "dl-003", title: "NYDFS 500 Annual Certification", deadline: "2026-04-01", riskLevel: "high" as const },
  { id: "dl-004", title: "BSA/AML Training Completion", deadline: "2026-04-10", riskLevel: "medium" as const },
  { id: "dl-005", title: "Vendor Risk Quarterly Review", deadline: "2026-04-15", riskLevel: "low" as const },
];

const recentActivity = [
  { id: "ra-001", description: "AI completed impact assessment for CFPB Section 1033 rule", actor: "RegShield AI", actorType: "ai" as const, action: "created", timestamp: "2026-03-23T09:45:00Z" },
  { id: "ra-002", description: "Sarah Chen approved action plan for SEC Climate Disclosure", actor: "Sarah Chen", actorType: "user" as const, action: "approved", timestamp: "2026-03-23T09:12:00Z" },
  { id: "ra-003", description: "New regulatory change ingested: FinCEN BOI Guidance", actor: "RegShield AI", actorType: "ai" as const, action: "created", timestamp: "2026-03-23T08:30:00Z" },
  { id: "ra-004", description: "Mark Johnson uploaded evidence for vendor risk assessment", actor: "Mark Johnson", actorType: "user" as const, action: "uploaded", timestamp: "2026-03-22T16:45:00Z" },
  { id: "ra-005", description: "Obligation status changed to compliant: SOX Section 302", actor: "RegShield AI", actorType: "ai" as const, action: "status_changed", timestamp: "2026-03-22T15:20:00Z" },
  { id: "ra-006", description: "Lisa Park assigned to NYDFS incident response update", actor: "Sarah Chen", actorType: "user" as const, action: "assigned", timestamp: "2026-03-22T14:10:00Z" },
  { id: "ra-007", description: "Action item marked overdue: NYDFS 500.17 response plan", actor: "RegShield AI", actorType: "system" as const, action: "status_changed", timestamp: "2026-03-22T12:00:00Z" },
  { id: "ra-008", description: "Monthly compliance report generated for February 2026", actor: "RegShield AI", actorType: "ai" as const, action: "created", timestamp: "2026-03-22T06:00:00Z" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const urgencyBorderColor: Record<string, string> = {
  critical: "border-l-[#E11D48]",
  high: "border-l-amber-500",
  medium: "border-l-[#312E81]",
  low: "border-l-slate-400",
};

const priorityDotColor: Record<string, string> = {
  critical: "bg-[#E11D48]",
  high: "bg-[#D97706]",
  medium: "bg-[#4338CA]",
  low: "bg-[#94A3B8]",
};

const statusPillStyles: Record<string, string> = {
  pending: "bg-[#E2E8F0] text-[#334155]",
  in_progress: "bg-[#E0E7FF] text-[#312E81]",
  completed: "bg-[#D1FAE5] text-[#059669]",
  overdue: "bg-[#FFE4E6] text-[#E11D48]",
  blocked: "bg-[#FEF3C7] text-[#D97706]",
};

function impactScoreColor(score: number) {
  if (score >= 80) return "bg-[#E11D48]";
  if (score >= 60) return "bg-[#D97706]";
  if (score >= 40) return "bg-[#4338CA]";
  return "bg-[#059669]";
}

function deadlineCountdown(deadline: string) {
  const now = new Date("2026-03-23");
  const dl = new Date(deadline);
  const diff = Math.ceil((dl.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  if (diff < 0) return { text: `${Math.abs(diff)}d overdue`, color: "text-[#E11D48] font-bold" };
  if (diff <= 3) return { text: `${diff}d left`, color: "text-[#E11D48]" };
  if (diff <= 7) return { text: `${diff}d left`, color: "text-[#D97706]" };
  return { text: `${diff}d left`, color: "text-[#059669]" };
}

function formatTimestamp(ts: string) {
  const date = new Date(ts);
  const now = new Date("2026-03-23T10:00:00Z");
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}

function scoreGrade(score: number) {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}

function scoreColor(score: number) {
  if (score >= 80) return "#059669";
  if (score >= 60) return "#D97706";
  return "#E11D48";
}

function activityIcon(actorType: string) {
  if (actorType === "ai") return <Zap className="w-4 h-4 text-[#4338CA]" />;
  if (actorType === "system") return <Activity className="w-4 h-4 text-[#94A3B8]" />;
  return <User className="w-4 h-4 text-[#059669]" />;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const score = stats.complianceScore;
  const circumference = 2 * Math.PI * 70;
  const offset = circumference - (score / 100) * circumference;
  const color = scoreColor(score);

  return (
    <PortalLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Dashboard</h1>
          <p className="text-[#94A3B8] mt-1">Heartland Financial Group</p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Active Changes", value: stats.activeChanges, icon: FileText, iconBg: "bg-[#E0E7FF]", iconColor: "text-[#312E81]" },
            { label: "Pending Action Items", value: stats.pendingActionItems, icon: ListChecks, iconBg: "bg-[#FEF3C7]", iconColor: "text-[#D97706]" },
            { label: "Overdue Items", value: stats.overdueItems, icon: AlertTriangle, iconBg: "bg-[#FFE4E6]", iconColor: "text-[#E11D48]" },
            { label: "Compliance Score", value: stats.complianceScore, icon: ShieldCheck, iconBg: "bg-[#D1FAE5]", iconColor: "text-[#059669]", suffix: "%" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-lg shadow-md p-5 flex items-center gap-4">
              <div className={`${stat.iconBg} rounded-lg p-3`}>
                <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
              </div>
              <div>
                <p className="text-sm text-[#94A3B8]">{stat.label}</p>
                <p className="text-2xl font-bold text-[#0F172A]">
                  {stat.value}{stat.suffix || ""}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Grid: Gauge + Recent Changes */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Compliance Score Gauge */}
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center">
            <h2 className="text-lg font-semibold text-[#0F172A] mb-4">Compliance Score</h2>
            <div className="relative">
              <svg width="180" height="180" viewBox="0 0 180 180">
                <circle
                  cx="90"
                  cy="90"
                  r="70"
                  fill="none"
                  stroke="#E2E8F0"
                  strokeWidth="12"
                />
                <circle
                  cx="90"
                  cy="90"
                  r="70"
                  fill="none"
                  stroke={color}
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  transform="rotate(-90 90 90)"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold" style={{ color }}>{score}</span>
                <span className="text-lg font-semibold text-[#94A3B8]">Grade: {scoreGrade(score)}</span>
              </div>
            </div>
            <p className="text-sm text-[#94A3B8] mt-3">
              <TrendingUp className="w-4 h-4 inline mr-1 text-[#059669]" />
              +3 from last month
            </p>
          </div>

          {/* Recent Changes */}
          <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-2">
            <h2 className="text-lg font-semibold text-[#0F172A] mb-4">Recent Changes</h2>
            <div className="space-y-3">
              {recentChanges.map((change) => (
                <div
                  key={change.id}
                  className={`border-l-4 ${urgencyBorderColor[change.urgency]} rounded-r-lg bg-[#F8FAFC] p-4`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <h3 className="font-medium text-[#0F172A] text-sm truncate">{change.title}</h3>
                      <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                        <span className="text-xs bg-[#E0E7FF] text-[#312E81] px-2 py-0.5 rounded-full">{change.jurisdiction}</span>
                        <span className="text-xs text-[#94A3B8]">{change.domain}</span>
                        <span className="text-xs text-[#94A3B8]">{change.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="w-20">
                        <div className="flex items-center justify-between text-xs mb-0.5">
                          <span className="text-[#94A3B8]">Impact</span>
                          <span className="font-medium text-[#0F172A]">{change.impactScore}</span>
                        </div>
                        <div className="w-full bg-[#E2E8F0] rounded-full h-1.5">
                          <div
                            className={`h-1.5 rounded-full ${impactScoreColor(change.impactScore)}`}
                            style={{ width: `${change.impactScore}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Items + Deadlines */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Action Items Overview */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-[#0F172A] mb-4">Action Items Overview</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#E2E8F0]">
                    <th className="text-left pb-2 text-[#94A3B8] font-medium">Priority</th>
                    <th className="text-left pb-2 text-[#94A3B8] font-medium">Title</th>
                    <th className="text-left pb-2 text-[#94A3B8] font-medium">Deadline</th>
                    <th className="text-left pb-2 text-[#94A3B8] font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {actionItems.map((item) => {
                    const dl = deadlineCountdown(item.deadline);
                    return (
                      <tr key={item.id} className="border-b border-[#F8FAFC]">
                        <td className="py-2.5">
                          <span className={`inline-block w-2.5 h-2.5 rounded-full ${priorityDotColor[item.priority]}`} />
                        </td>
                        <td className="py-2.5 text-[#0F172A] max-w-[200px] truncate">{item.title}</td>
                        <td className={`py-2.5 ${dl.color} text-xs whitespace-nowrap`}>{dl.text}</td>
                        <td className="py-2.5">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${statusPillStyles[item.status]}`}>
                            {item.status.replace("_", " ")}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Upcoming Deadlines */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-[#0F172A] mb-4">Upcoming Deadlines</h2>
            <div className="space-y-4">
              {upcomingDeadlines.map((dl, idx) => {
                const countdown = deadlineCountdown(dl.deadline);
                const riskColors: Record<string, string> = {
                  critical: "bg-[#E11D48]",
                  high: "bg-[#D97706]",
                  medium: "bg-[#4338CA]",
                  low: "bg-[#94A3B8]",
                };
                return (
                  <div key={dl.id} className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full ${riskColors[dl.riskLevel]}`} />
                      {idx < upcomingDeadlines.length - 1 && (
                        <div className="w-0.5 h-8 bg-[#E2E8F0] mt-1" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#0F172A] truncate">{dl.title}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Calendar className="w-3 h-3 text-[#94A3B8]" />
                        <span className="text-xs text-[#94A3B8]">{dl.deadline}</span>
                        <span className={`text-xs ${countdown.color}`}>{countdown.text}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-[#0F172A] mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {recentActivity.map((entry) => (
              <div key={entry.id} className="flex items-start gap-3 py-2 border-b border-[#F8FAFC] last:border-0">
                <div className="mt-0.5 p-1.5 rounded-full bg-[#F8FAFC]">
                  {activityIcon(entry.actorType)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#0F172A]">{entry.description}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-[#94A3B8]">{entry.actor}</span>
                    <span className="text-xs text-[#94A3B8]">&middot;</span>
                    <span className="text-xs text-[#94A3B8]">{formatTimestamp(entry.timestamp)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
