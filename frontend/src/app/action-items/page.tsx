"use client";

import { useState, useMemo } from "react";
import { PortalLayout } from "@/components/layout/PortalLayout";
import { Search, SlidersHorizontal, Upload, CheckCircle2 } from "lucide-react";

// ─── Inline Demo Data ────────────────────────────────────────────────────────

type Status = "not_started" | "in_progress" | "completed" | "overdue" | "blocked";
type Priority = 1 | 2 | 3 | 4;
type Role = "cco" | "compliance_analyst" | "legal" | "it" | "operations";

interface ActionItem {
  id: string;
  title: string;
  assigned_role: Role;
  priority: Priority;
  deadline: string;
  status: Status;
  evidence: boolean;
}

const actionItems: ActionItem[] = [
  { id: "ai-001", title: "Update Privacy Policy Section 4.2 for CCPA Amendments", assigned_role: "legal", priority: 1, deadline: "2026-03-25", status: "in_progress", evidence: false },
  { id: "ai-002", title: "Implement Enhanced Due Diligence Procedures for BSA/AML", assigned_role: "compliance_analyst", priority: 1, deadline: "2026-03-20", status: "overdue", evidence: false },
  { id: "ai-003", title: "Train Lending Staff on New CFPB Disclosure Requirements", assigned_role: "operations", priority: 2, deadline: "2026-04-10", status: "not_started", evidence: false },
  { id: "ai-004", title: "File Updated Market Conduct Procedures with Ohio DOI", assigned_role: "cco", priority: 2, deadline: "2026-03-28", status: "in_progress", evidence: false },
  { id: "ai-005", title: "Update Information Security Program for NYDFS 23 NYCRR 500", assigned_role: "it", priority: 1, deadline: "2026-03-22", status: "overdue", evidence: false },
  { id: "ai-006", title: "Submit Quarterly HMDA Data to CFPB", assigned_role: "compliance_analyst", priority: 2, deadline: "2026-03-31", status: "in_progress", evidence: false },
  { id: "ai-007", title: "Conduct Annual BSA/AML Risk Assessment", assigned_role: "cco", priority: 1, deadline: "2026-04-01", status: "not_started", evidence: false },
  { id: "ai-008", title: "Review and Update SAR Filing Procedures per FinCEN Guidance", assigned_role: "compliance_analyst", priority: 2, deadline: "2026-04-05", status: "in_progress", evidence: false },
  { id: "ai-009", title: "Deploy Multi-Factor Authentication for Customer Portals", assigned_role: "it", priority: 1, deadline: "2026-03-18", status: "overdue", evidence: false },
  { id: "ai-010", title: "Update Consumer Complaint Response Workflow for CFPB Standards", assigned_role: "operations", priority: 3, deadline: "2026-04-15", status: "not_started", evidence: false },
  { id: "ai-011", title: "Complete SOX Section 302 Quarterly Certification", assigned_role: "cco", priority: 2, deadline: "2026-03-31", status: "completed", evidence: true },
  { id: "ai-012", title: "Prepare SEC Climate Disclosure Interim Report", assigned_role: "legal", priority: 2, deadline: "2026-04-20", status: "in_progress", evidence: false },
  { id: "ai-013", title: "Update Vendor Risk Assessment Templates per OCC Bulletin", assigned_role: "operations", priority: 3, deadline: "2026-05-01", status: "not_started", evidence: false },
  { id: "ai-014", title: "File Beneficial Ownership Reports with FinCEN", assigned_role: "compliance_analyst", priority: 2, deadline: "2026-04-01", status: "completed", evidence: true },
  { id: "ai-015", title: "Implement Cybersecurity Incident Reporting Under CIRCIA", assigned_role: "it", priority: 1, deadline: "2026-04-30", status: "in_progress", evidence: false },
  { id: "ai-016", title: "Update Fair Lending Monitoring Program for ECOA Amendments", assigned_role: "compliance_analyst", priority: 3, deadline: "2026-05-15", status: "not_started", evidence: false },
  { id: "ai-017", title: "Review OFAC Sanctions Screening Parameters", assigned_role: "compliance_analyst", priority: 2, deadline: "2026-03-15", status: "completed", evidence: true },
  { id: "ai-018", title: "Conduct Penetration Testing per NYDFS Requirements", assigned_role: "it", priority: 2, deadline: "2026-04-30", status: "blocked", evidence: false },
  { id: "ai-019", title: "Prepare Annual BSA/AML Training Materials", assigned_role: "operations", priority: 4, deadline: "2026-06-30", status: "completed", evidence: true },
  { id: "ai-020", title: "Update CRA Data Collection Procedures for New Census Tracts", assigned_role: "compliance_analyst", priority: 3, deadline: "2026-05-20", status: "completed", evidence: true },
  { id: "ai-021", title: "Draft Board Presentation on Regulatory Change Impact", assigned_role: "cco", priority: 4, deadline: "2026-06-01", status: "completed", evidence: true },
  { id: "ai-022", title: "Remediate Findings from FDIC Safety and Soundness Exam", assigned_role: "cco", priority: 1, deadline: "2026-04-15", status: "in_progress", evidence: false },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const priorityDotColor: Record<Priority, string> = {
  1: "bg-[#E11D48]",
  2: "bg-[#D97706]",
  3: "bg-[#4338CA]",
  4: "bg-[#94A3B8]",
};

const statusPillStyles: Record<Status, string> = {
  not_started: "bg-[#E2E8F0] text-[#334155]",
  in_progress: "bg-[#E0E7FF] text-[#312E81]",
  completed: "bg-[#D1FAE5] text-[#059669]",
  overdue: "bg-[#FFE4E6] text-[#E11D48]",
  blocked: "bg-[#FEF3C7] text-[#D97706]",
};

const roleLabels: Record<Role, string> = {
  cco: "CCO",
  compliance_analyst: "Compliance Analyst",
  legal: "Legal",
  it: "IT",
  operations: "Operations",
};

function deadlineCountdown(deadline: string) {
  const now = new Date("2026-03-23");
  const dl = new Date(deadline);
  const diff = Math.ceil((dl.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  if (diff < 0) return { text: `${Math.abs(diff)}d overdue`, color: "text-[#E11D48] font-bold" };
  if (diff <= 3) return { text: `${diff}d left`, color: "text-[#E11D48]" };
  if (diff <= 7) return { text: `${diff}d left`, color: "text-[#D97706]" };
  return { text: `${diff}d left`, color: "text-[#059669]" };
}

function formatStatus(s: string) {
  return s.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ActionItemsPage() {
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [search, setSearch] = useState("");

  const counts = useMemo(() => {
    const total = actionItems.length;
    const completed = actionItems.filter((i) => i.status === "completed").length;
    const in_progress = actionItems.filter((i) => i.status === "in_progress").length;
    const overdue = actionItems.filter((i) => i.status === "overdue").length;
    const not_started = actionItems.filter((i) => i.status === "not_started").length;
    return { total, completed, in_progress, overdue, not_started };
  }, []);

  const filtered = useMemo(() => {
    const result = actionItems.filter((item) => {
      if (statusFilter !== "All" && item.status !== statusFilter) return false;
      if (priorityFilter !== "All" && item.priority !== Number(priorityFilter)) return false;
      if (search && !item.title.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
    result.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
    return result;
  }, [statusFilter, priorityFilter, search]);

  return (
    <PortalLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-[#0F172A]">Action Items</h1>
          <span className="text-xs font-semibold bg-[#E0E7FF] text-[#312E81] px-2.5 py-1 rounded-full">
            {counts.total}
          </span>
        </div>

        {/* Summary Bar */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center gap-4 flex-wrap">
            {[
              { label: "Total", count: counts.total, style: "bg-[#E2E8F0] text-[#0F172A]" },
              { label: "Completed", count: counts.completed, style: "bg-[#D1FAE5] text-[#059669]" },
              { label: "In Progress", count: counts.in_progress, style: "bg-[#E0E7FF] text-[#312E81]" },
              { label: "Overdue", count: counts.overdue, style: "bg-[#FFE4E6] text-[#E11D48]" },
              { label: "Not Started", count: counts.not_started, style: "bg-[#E2E8F0] text-[#334155]" },
            ].map((s) => (
              <span key={s.label} className={`text-xs font-semibold px-3 py-1.5 rounded-full ${s.style}`}>
                {s.label}: {s.count}
              </span>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center gap-3 flex-wrap">
            <SlidersHorizontal className="w-4 h-4 text-[#94A3B8]" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-sm border border-[#E2E8F0] rounded-lg px-3 py-2 bg-white text-[#334155] focus:outline-none focus:ring-2 focus:ring-[#4338CA]"
            >
              <option value="All">All Statuses</option>
              <option value="not_started">Not Started</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="overdue">Overdue</option>
              <option value="blocked">Blocked</option>
            </select>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="text-sm border border-[#E2E8F0] rounded-lg px-3 py-2 bg-white text-[#334155] focus:outline-none focus:ring-2 focus:ring-[#4338CA]"
            >
              <option value="All">All Priorities</option>
              <option value="1">Priority 1 (Critical)</option>
              <option value="2">Priority 2 (High)</option>
              <option value="3">Priority 3 (Medium)</option>
              <option value="4">Priority 4 (Low)</option>
            </select>
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
              <input
                type="text"
                placeholder="Search action items..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm border border-[#E2E8F0] rounded-lg bg-white text-[#334155] focus:outline-none focus:ring-2 focus:ring-[#4338CA]"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E2E8F0]">
                <th className="text-left px-4 py-3 text-[#94A3B8] font-medium">Priority</th>
                <th className="text-left px-4 py-3 text-[#94A3B8] font-medium">Title</th>
                <th className="text-left px-4 py-3 text-[#94A3B8] font-medium">Assigned Role</th>
                <th className="text-left px-4 py-3 text-[#94A3B8] font-medium">Deadline</th>
                <th className="text-left px-4 py-3 text-[#94A3B8] font-medium">Status</th>
                <th className="text-left px-4 py-3 text-[#94A3B8] font-medium">Evidence</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => {
                const dl = deadlineCountdown(item.deadline);
                const isOverdue = item.status === "overdue";
                return (
                  <tr
                    key={item.id}
                    className={`border-b border-[#F8FAFC] ${isOverdue ? "bg-[#FFE4E6]/20" : ""}`}
                  >
                    <td className="px-4 py-3">
                      <span className={`inline-block w-2.5 h-2.5 rounded-full ${priorityDotColor[item.priority]}`} />
                    </td>
                    <td className="px-4 py-3 text-[#0F172A] max-w-[350px]">{item.title}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs bg-[#E0E7FF] text-[#312E81] px-2 py-0.5 rounded-full whitespace-nowrap">
                        {roleLabels[item.assigned_role]}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-xs text-[#334155]">{item.deadline}</div>
                      <div className={`text-xs ${dl.color}`}>{dl.text}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap ${statusPillStyles[item.status]}`}>
                        {formatStatus(item.status)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {item.evidence ? (
                        <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                      ) : (
                        <button className="p-1 rounded hover:bg-[#E0E7FF] transition-colors" title="Upload evidence">
                          <Upload className="w-4 h-4 text-[#94A3B8]" />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="p-12 text-center text-[#94A3B8]">No action items match the current filters.</div>
          )}
        </div>
      </div>
    </PortalLayout>
  );
}
