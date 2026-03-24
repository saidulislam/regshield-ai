"use client";

import { useState, useMemo } from "react";
import { PortalLayout } from "@/components/layout/PortalLayout";
import { SlidersHorizontal, Download, ChevronLeft, ChevronRight } from "lucide-react";

// ─── Inline Demo Data ────────────────────────────────────────────────────────

type EntityType = "regulatory_change" | "action_item" | "obligation" | "report" | "assessment";
type AuditAction = "created" | "updated" | "status_changed" | "reviewed" | "delivered";
type ActorType = "system" | "ai_pipeline" | "human_expert" | "client_user";

interface AuditEntry {
  id: string;
  timestamp: string;
  entity_type: EntityType;
  entity_id: string;
  action: AuditAction;
  actor_name: string;
  actor_type: ActorType;
  description: string;
}

const auditEntries: AuditEntry[] = [
  { id: "at-001", timestamp: "2026-03-23T08:15:00Z", entity_type: "regulatory_change", entity_id: "RC-2026-0847", action: "created", actor_name: "RegShield AI Pipeline", actor_type: "ai_pipeline", description: "AI Pipeline classified regulatory change RC-2026-0847 as high-impact for BSA/AML compliance" },
  { id: "at-002", timestamp: "2026-03-23T07:42:00Z", entity_type: "assessment", entity_id: "IA-2026-0312", action: "reviewed", actor_name: "Sarah Chen", actor_type: "human_expert", description: "Human expert reviewed impact assessment for CFPB Section 1033 Open Banking Rule" },
  { id: "at-003", timestamp: "2026-03-23T07:10:00Z", entity_type: "action_item", entity_id: "AI-2026-0155", action: "status_changed", actor_name: "Mark Johnson", actor_type: "client_user", description: "Client user updated action item status to in_progress for NYDFS cybersecurity remediation" },
  { id: "at-004", timestamp: "2026-03-23T06:00:00Z", entity_type: "report", entity_id: "RPT-2026-0089", action: "created", actor_name: "RegShield System", actor_type: "system", description: "System generated monthly compliance report for March 2026" },
  { id: "at-005", timestamp: "2026-03-23T05:30:00Z", entity_type: "obligation", entity_id: "OB-2026-0421", action: "created", actor_name: "RegShield AI Pipeline", actor_type: "ai_pipeline", description: "AI Pipeline processed obligation mapping for Ohio Privacy Act disclosure requirements" },
  { id: "at-006", timestamp: "2026-03-22T17:45:00Z", entity_type: "action_item", entity_id: "AI-2026-0148", action: "status_changed", actor_name: "RegShield System", actor_type: "system", description: "System flagged action item as overdue: NYDFS 500.17 incident response plan update" },
  { id: "at-007", timestamp: "2026-03-22T16:30:00Z", entity_type: "assessment", entity_id: "IA-2026-0310", action: "delivered", actor_name: "RegShield System", actor_type: "system", description: "Delivered SEC Climate Disclosure impact assessment to client portal" },
  { id: "at-008", timestamp: "2026-03-22T15:20:00Z", entity_type: "obligation", entity_id: "OB-2026-0398", action: "status_changed", actor_name: "RegShield AI Pipeline", actor_type: "ai_pipeline", description: "AI Pipeline updated obligation status to active for SOX Section 302 quarterly certification" },
  { id: "at-009", timestamp: "2026-03-22T14:05:00Z", entity_type: "regulatory_change", entity_id: "RC-2026-0845", action: "reviewed", actor_name: "Lisa Park", actor_type: "human_expert", description: "Human expert reviewed and validated FinCEN Beneficial Ownership reporting guidance classification" },
  { id: "at-010", timestamp: "2026-03-22T12:30:00Z", entity_type: "action_item", entity_id: "AI-2026-0152", action: "created", actor_name: "RegShield AI Pipeline", actor_type: "ai_pipeline", description: "AI Pipeline generated action item: Update Enhanced Due Diligence procedures for BSA/AML" },
  { id: "at-011", timestamp: "2026-03-22T11:15:00Z", entity_type: "report", entity_id: "RPT-2026-0088", action: "delivered", actor_name: "RegShield System", actor_type: "system", description: "Delivered weekly regulatory digest report to all subscribed client users" },
  { id: "at-012", timestamp: "2026-03-22T10:00:00Z", entity_type: "regulatory_change", entity_id: "RC-2026-0844", action: "created", actor_name: "RegShield AI Pipeline", actor_type: "ai_pipeline", description: "AI Pipeline ingested new regulatory change: OCC Third-Party Risk Management Bulletin update" },
  { id: "at-013", timestamp: "2026-03-22T09:20:00Z", entity_type: "action_item", entity_id: "AI-2026-0150", action: "updated", actor_name: "David Kim", actor_type: "client_user", description: "Client user added evidence attachment to OFAC sanctions screening update action item" },
  { id: "at-014", timestamp: "2026-03-21T18:45:00Z", entity_type: "obligation", entity_id: "OB-2026-0415", action: "reviewed", actor_name: "James Rodriguez", actor_type: "human_expert", description: "Human expert reviewed HMDA quarterly data submission obligation for accuracy" },
  { id: "at-015", timestamp: "2026-03-21T16:30:00Z", entity_type: "assessment", entity_id: "IA-2026-0308", action: "created", actor_name: "RegShield AI Pipeline", actor_type: "ai_pipeline", description: "AI Pipeline completed gap analysis for CCPA Amendment privacy policy requirements" },
  { id: "at-016", timestamp: "2026-03-21T14:00:00Z", entity_type: "action_item", entity_id: "AI-2026-0147", action: "status_changed", actor_name: "Sarah Chen", actor_type: "client_user", description: "Client user marked SOX Section 302 certification action item as completed" },
  { id: "at-017", timestamp: "2026-03-21T12:15:00Z", entity_type: "regulatory_change", entity_id: "RC-2026-0842", action: "updated", actor_name: "RegShield AI Pipeline", actor_type: "ai_pipeline", description: "AI Pipeline updated impact score for NYDFS Cybersecurity Regulation from 72 to 78" },
  { id: "at-018", timestamp: "2026-03-21T10:40:00Z", entity_type: "obligation", entity_id: "OB-2026-0410", action: "created", actor_name: "RegShield AI Pipeline", actor_type: "ai_pipeline", description: "AI Pipeline mapped new obligation: Cybersecurity Incident Reporting under CIRCIA 72-hour window" },
  { id: "at-019", timestamp: "2026-03-21T09:00:00Z", entity_type: "report", entity_id: "RPT-2026-0087", action: "created", actor_name: "RegShield System", actor_type: "system", description: "System generated risk exposure summary for Q1 2026 regulatory changes" },
  { id: "at-020", timestamp: "2026-03-20T17:30:00Z", entity_type: "action_item", entity_id: "AI-2026-0145", action: "updated", actor_name: "Lisa Park", actor_type: "human_expert", description: "Human expert updated priority from medium to high for MFA deployment audit action item" },
  { id: "at-021", timestamp: "2026-03-20T15:00:00Z", entity_type: "assessment", entity_id: "IA-2026-0305", action: "delivered", actor_name: "RegShield System", actor_type: "system", description: "Delivered Fair Lending ECOA impact assessment with recommended action items to client" },
  { id: "at-022", timestamp: "2026-03-20T13:15:00Z", entity_type: "regulatory_change", entity_id: "RC-2026-0840", action: "created", actor_name: "RegShield AI Pipeline", actor_type: "ai_pipeline", description: "AI Pipeline detected new proposed rule: FDIC Deposit Insurance Assessment methodology update" },
  { id: "at-023", timestamp: "2026-03-20T11:00:00Z", entity_type: "obligation", entity_id: "OB-2026-0405", action: "updated", actor_name: "James Rodriguez", actor_type: "human_expert", description: "Human expert updated CRA Community Development disclosure deadline to May 15, 2026" },
  { id: "at-024", timestamp: "2026-03-19T16:45:00Z", entity_type: "action_item", entity_id: "AI-2026-0142", action: "created", actor_name: "RegShield AI Pipeline", actor_type: "ai_pipeline", description: "AI Pipeline generated action item: Prepare SEC Climate Disclosure interim report" },
  { id: "at-025", timestamp: "2026-03-19T14:20:00Z", entity_type: "report", entity_id: "RPT-2026-0086", action: "reviewed", actor_name: "Sarah Chen", actor_type: "human_expert", description: "Human expert reviewed and approved February 2026 monthly compliance report" },
  { id: "at-026", timestamp: "2026-03-19T11:30:00Z", entity_type: "regulatory_change", entity_id: "RC-2026-0838", action: "reviewed", actor_name: "David Kim", actor_type: "client_user", description: "Client user acknowledged and accepted impact assessment for FinCEN BOI Reporting Guidance" },
  { id: "at-027", timestamp: "2026-03-18T17:00:00Z", entity_type: "obligation", entity_id: "OB-2026-0400", action: "status_changed", actor_name: "RegShield AI Pipeline", actor_type: "ai_pipeline", description: "AI Pipeline retired flood insurance notification obligation following regulation amendment" },
  { id: "at-028", timestamp: "2026-03-18T14:30:00Z", entity_type: "assessment", entity_id: "IA-2026-0300", action: "created", actor_name: "RegShield AI Pipeline", actor_type: "ai_pipeline", description: "AI Pipeline initiated impact assessment for Community Reinvestment Act modernization proposal" },
  { id: "at-029", timestamp: "2026-03-17T16:00:00Z", entity_type: "action_item", entity_id: "AI-2026-0140", action: "status_changed", actor_name: "Mark Johnson", actor_type: "client_user", description: "Client user updated OFAC sanctions screening action item status to completed with evidence" },
  { id: "at-030", timestamp: "2026-03-17T10:15:00Z", entity_type: "regulatory_change", entity_id: "RC-2026-0835", action: "created", actor_name: "RegShield AI Pipeline", actor_type: "ai_pipeline", description: "AI Pipeline ingested new regulatory change: Federal Reserve stress testing methodology update for 2026" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const entityTypeColors: Record<EntityType, string> = {
  regulatory_change: "bg-[#E0E7FF] text-[#312E81]",
  action_item: "bg-[#FEF3C7] text-[#D97706]",
  obligation: "bg-[#D1FAE5] text-[#059669]",
  report: "bg-[#E2E8F0] text-[#334155]",
  assessment: "bg-[#FFE4E6] text-[#E11D48]",
};

const entityTypeLabels: Record<EntityType, string> = {
  regulatory_change: "Reg Change",
  action_item: "Action Item",
  obligation: "Obligation",
  report: "Report",
  assessment: "Assessment",
};

const actionColors: Record<AuditAction, string> = {
  created: "bg-[#D1FAE5] text-[#059669]",
  updated: "bg-[#E0E7FF] text-[#312E81]",
  status_changed: "bg-[#FEF3C7] text-[#D97706]",
  reviewed: "bg-[#EDE9FE] text-[#6D28D9]",
  delivered: "bg-[#D1FAE5] text-[#047857]",
};

const actionLabels: Record<AuditAction, string> = {
  created: "Created",
  updated: "Updated",
  status_changed: "Status Changed",
  reviewed: "Reviewed",
  delivered: "Delivered",
};

const actorTypeBadge: Record<ActorType, { label: string; style: string }> = {
  system: { label: "System", style: "bg-[#E2E8F0] text-[#334155]" },
  ai_pipeline: { label: "AI", style: "bg-[#E0E7FF] text-[#312E81]" },
  human_expert: { label: "Expert", style: "bg-[#D1FAE5] text-[#059669]" },
  client_user: { label: "Client", style: "bg-[#FEF3C7] text-[#D97706]" },
};

function relativeTime(timestamp: string): string {
  const now = new Date("2026-03-23T10:00:00Z");
  const ts = new Date(timestamp);
  const diffMs = now.getTime() - ts.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return "just now";
  if (diffMin < 60) return `${diffMin} min ago`;
  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
}

const PAGE_SIZE = 25;
const TOTAL_ENTRIES = 47;

// ─── Component ────────────────────────────────────────────────────────────────

export default function AuditTrailPage() {
  const [entityFilter, setEntityFilter] = useState("All");
  const [actionFilter, setActionFilter] = useState("All");
  const [actorFilter, setActorFilter] = useState("All");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return auditEntries.filter((entry) => {
      if (entityFilter !== "All" && entry.entity_type !== entityFilter) return false;
      if (actionFilter !== "All" && entry.action !== actionFilter) return false;
      if (actorFilter !== "All" && entry.actor_type !== actorFilter) return false;
      return true;
    });
  }, [entityFilter, actionFilter, actorFilter]);

  const paged = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const showStart = (page - 1) * PAGE_SIZE + 1;
  const showEnd = Math.min(page * PAGE_SIZE, filtered.length);

  return (
    <PortalLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#0F172A]">Audit Trail</h1>
            <p className="text-[#94A3B8] mt-1">Complete activity log across all entities</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              disabled
              title="Demo mode"
              className="flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg bg-[#E2E8F0] text-[#94A3B8] cursor-not-allowed"
            >
              <Download className="w-3.5 h-3.5" />
              Export CSV
            </button>
            <button
              disabled
              title="Demo mode"
              className="flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg bg-[#E2E8F0] text-[#94A3B8] cursor-not-allowed"
            >
              <Download className="w-3.5 h-3.5" />
              Export PDF
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center gap-3 flex-wrap">
            <SlidersHorizontal className="w-4 h-4 text-[#94A3B8]" />
            <select
              value={entityFilter}
              onChange={(e) => {
                setEntityFilter(e.target.value);
                setPage(1);
              }}
              className="text-sm border border-[#E2E8F0] rounded-lg px-3 py-2 bg-white text-[#334155] focus:outline-none focus:ring-2 focus:ring-[#4338CA]"
            >
              <option value="All">All Entity Types</option>
              <option value="regulatory_change">Regulatory Change</option>
              <option value="action_item">Action Item</option>
              <option value="obligation">Obligation</option>
              <option value="report">Report</option>
              <option value="assessment">Assessment</option>
            </select>
            <select
              value={actionFilter}
              onChange={(e) => {
                setActionFilter(e.target.value);
                setPage(1);
              }}
              className="text-sm border border-[#E2E8F0] rounded-lg px-3 py-2 bg-white text-[#334155] focus:outline-none focus:ring-2 focus:ring-[#4338CA]"
            >
              <option value="All">All Actions</option>
              <option value="created">Created</option>
              <option value="updated">Updated</option>
              <option value="status_changed">Status Changed</option>
              <option value="reviewed">Reviewed</option>
              <option value="delivered">Delivered</option>
            </select>
            <div className="flex items-center gap-2 text-sm text-[#334155] bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-3 py-2">
              <span className="text-[#94A3B8]">Date range:</span>
              <span>Mar 17 &ndash; Mar 23, 2026</span>
            </div>
            <select
              value={actorFilter}
              onChange={(e) => {
                setActorFilter(e.target.value);
                setPage(1);
              }}
              className="text-sm border border-[#E2E8F0] rounded-lg px-3 py-2 bg-white text-[#334155] focus:outline-none focus:ring-2 focus:ring-[#4338CA]"
            >
              <option value="All">All Actor Types</option>
              <option value="system">System</option>
              <option value="ai_pipeline">AI Pipeline</option>
              <option value="human_expert">Human Expert</option>
              <option value="client_user">Client User</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E2E8F0]">
                <th className="text-left px-4 py-3 text-[#94A3B8] font-medium whitespace-nowrap">
                  Timestamp
                </th>
                <th className="text-left px-4 py-3 text-[#94A3B8] font-medium">Entity Type</th>
                <th className="text-left px-4 py-3 text-[#94A3B8] font-medium">Entity ID</th>
                <th className="text-left px-4 py-3 text-[#94A3B8] font-medium">Action</th>
                <th className="text-left px-4 py-3 text-[#94A3B8] font-medium">Actor</th>
                <th className="text-left px-4 py-3 text-[#94A3B8] font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              {paged.map((entry) => {
                const badge = actorTypeBadge[entry.actor_type];
                return (
                  <tr key={entry.id} className="border-b border-[#F8FAFC]">
                    <td className="px-4 py-3 text-xs text-[#334155] whitespace-nowrap">
                      {relativeTime(entry.timestamp)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap ${entityTypeColors[entry.entity_type]}`}
                      >
                        {entityTypeLabels[entry.entity_type]}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-[#94A3B8] font-mono">
                      {entry.entity_id.slice(0, 8)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap ${actionColors[entry.action]}`}
                      >
                        {actionLabels[entry.action]}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs text-[#0F172A]">{entry.actor_name}</span>
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded-full ${badge.style}`}
                        >
                          {badge.label}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-[#334155] max-w-[400px]">
                      {entry.description}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {paged.length === 0 && (
            <div className="p-12 text-center text-[#94A3B8]">
              No audit entries match the current filters.
            </div>
          )}
        </div>

        {/* Pagination */}
        {filtered.length > 0 && (
          <div className="flex items-center justify-between">
            <p className="text-sm text-[#94A3B8]">
              Showing {showStart}-{showEnd} of {TOTAL_ENTRIES} entries
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 rounded-lg border border-[#E2E8F0] text-[#334155] hover:bg-[#F8FAFC] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-sm text-[#334155] px-2">
                Page {page} of {Math.max(totalPages, 1)}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className="p-2 rounded-lg border border-[#E2E8F0] text-[#334155] hover:bg-[#F8FAFC] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </PortalLayout>
  );
}
