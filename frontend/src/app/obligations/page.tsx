"use client";

import { useState, useMemo } from "react";
import { PortalLayout } from "@/components/layout/PortalLayout";
import { SlidersHorizontal, AlertTriangle } from "lucide-react";

// ─── Inline Demo Data ────────────────────────────────────────────────────────

type Category = "reporting" | "disclosure" | "record_keeping" | "training" | "process" | "technology";
type RiskLevel = "critical" | "high" | "medium" | "low";
type ObligationStatus = "active" | "pending" | "retired";
type Recurrence = "one_time" | "monthly" | "quarterly" | "annually";

interface Obligation {
  id: string;
  title: string;
  regulation_name: string;
  category: Category;
  risk_level: RiskLevel;
  deadline: string;
  recurrence: Recurrence;
  status: ObligationStatus;
  conflict_flag: boolean;
}

const obligations: Obligation[] = [
  { id: "ob-001", title: "Annual BSA/AML Suspicious Activity Report Filing", regulation_name: "Bank Secrecy Act (BSA)", category: "reporting", risk_level: "critical", deadline: "2026-03-31", recurrence: "annually", status: "active", conflict_flag: false },
  { id: "ob-002", title: "Quarterly HMDA Data Submission", regulation_name: "Home Mortgage Disclosure Act (HMDA)", category: "reporting", risk_level: "high", deadline: "2026-03-31", recurrence: "quarterly", status: "active", conflict_flag: false },
  { id: "ob-003", title: "Consumer Complaint Response Documentation", regulation_name: "CFPB Supervision Manual", category: "record_keeping", risk_level: "high", deadline: "2026-04-15", recurrence: "monthly", status: "active", conflict_flag: false },
  { id: "ob-004", title: "Privacy Notice Annual Distribution", regulation_name: "Gramm-Leach-Bliley Act (GLBA)", category: "disclosure", risk_level: "medium", deadline: "2026-06-30", recurrence: "annually", status: "active", conflict_flag: false },
  { id: "ob-005", title: "Information Security Risk Assessment", regulation_name: "NYDFS 23 NYCRR 500", category: "technology", risk_level: "critical", deadline: "2026-04-01", recurrence: "annually", status: "active", conflict_flag: true },
  { id: "ob-006", title: "Cybersecurity Incident Reporting (72-hour window)", regulation_name: "CIRCIA / NYDFS 23 NYCRR 500", category: "reporting", risk_level: "critical", deadline: "2026-03-23", recurrence: "one_time", status: "active", conflict_flag: true },
  { id: "ob-007", title: "Fair Lending Data Analysis and Reporting", regulation_name: "Equal Credit Opportunity Act (ECOA)", category: "reporting", risk_level: "high", deadline: "2026-04-30", recurrence: "quarterly", status: "active", conflict_flag: false },
  { id: "ob-008", title: "CRA Community Development Lending Disclosure", regulation_name: "Community Reinvestment Act (CRA)", category: "disclosure", risk_level: "medium", deadline: "2026-05-15", recurrence: "annually", status: "active", conflict_flag: false },
  { id: "ob-009", title: "SOX Section 302 Officer Certification", regulation_name: "Sarbanes-Oxley Act (SOX)", category: "process", risk_level: "critical", deadline: "2026-03-31", recurrence: "quarterly", status: "active", conflict_flag: false },
  { id: "ob-010", title: "Anti-Money Laundering Staff Training Program", regulation_name: "Bank Secrecy Act (BSA)", category: "training", risk_level: "high", deadline: "2026-06-30", recurrence: "annually", status: "active", conflict_flag: false },
  { id: "ob-011", title: "Customer Identification Program Record Retention", regulation_name: "USA PATRIOT Act Section 326", category: "record_keeping", risk_level: "high", deadline: "2026-04-30", recurrence: "monthly", status: "active", conflict_flag: false },
  { id: "ob-012", title: "Open Banking API Consumer Consent Disclosure", regulation_name: "CFPB Section 1033 Final Rule", category: "disclosure", risk_level: "critical", deadline: "2026-04-15", recurrence: "one_time", status: "pending", conflict_flag: true },
  { id: "ob-013", title: "Third-Party Vendor Due Diligence Process", regulation_name: "OCC Bulletin 2023-17", category: "process", risk_level: "medium", deadline: "2026-05-01", recurrence: "annually", status: "active", conflict_flag: false },
  { id: "ob-014", title: "Regulation E Error Resolution Procedures", regulation_name: "Electronic Fund Transfer Act (Reg E)", category: "process", risk_level: "high", deadline: "2026-04-01", recurrence: "monthly", status: "active", conflict_flag: false },
  { id: "ob-015", title: "Beneficial Ownership Information Filing", regulation_name: "FinCEN Corporate Transparency Act", category: "reporting", risk_level: "medium", deadline: "2026-04-30", recurrence: "one_time", status: "active", conflict_flag: false },
  { id: "ob-016", title: "SEC Climate Risk Disclosure Preparation", regulation_name: "SEC Climate Disclosure Rule", category: "process", risk_level: "high", deadline: "2026-06-30", recurrence: "annually", status: "pending", conflict_flag: false },
  { id: "ob-017", title: "Cybersecurity Awareness Training for All Staff", regulation_name: "NYDFS 23 NYCRR 500", category: "training", risk_level: "medium", deadline: "2026-05-31", recurrence: "annually", status: "active", conflict_flag: false },
  { id: "ob-018", title: "Flood Insurance Notification Record Keeping", regulation_name: "National Flood Insurance Act", category: "record_keeping", risk_level: "low", deadline: "2026-06-30", recurrence: "quarterly", status: "retired", conflict_flag: false },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const categoryColors: Record<Category, string> = {
  reporting: "bg-[#E0E7FF] text-[#312E81]",
  disclosure: "bg-[#D1FAE5] text-[#059669]",
  record_keeping: "bg-[#FEF3C7] text-[#D97706]",
  training: "bg-[#FFE4E6] text-[#E11D48]",
  process: "bg-[#E2E8F0] text-[#334155]",
  technology: "bg-[#DBEAFE] text-[#1D4ED8]",
};

const categoryLabels: Record<Category, string> = {
  reporting: "Reporting",
  disclosure: "Disclosure",
  record_keeping: "Record Keeping",
  training: "Training",
  process: "Process",
  technology: "Technology",
};

const riskDotColor: Record<RiskLevel, string> = {
  critical: "bg-[#E11D48]",
  high: "bg-[#D97706]",
  medium: "bg-[#4338CA]",
  low: "bg-[#94A3B8]",
};

const riskLabels: Record<RiskLevel, string> = {
  critical: "Critical",
  high: "High",
  medium: "Medium",
  low: "Low",
};

const statusPillStyles: Record<ObligationStatus, string> = {
  active: "bg-[#D1FAE5] text-[#059669]",
  pending: "bg-[#FEF3C7] text-[#D97706]",
  retired: "bg-[#E2E8F0] text-[#94A3B8]",
};

const recurrenceLabels: Record<Recurrence, string> = {
  one_time: "One-time",
  monthly: "Monthly",
  quarterly: "Quarterly",
  annually: "Annually",
};

function formatLabel(s: string) {
  return s.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ObligationsPage() {
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [riskFilter, setRiskFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [conflictOnly, setConflictOnly] = useState(false);

  const categoryCounts = useMemo(() => {
    const counts: Record<Category, number> = {
      reporting: 0,
      disclosure: 0,
      record_keeping: 0,
      training: 0,
      process: 0,
      technology: 0,
    };
    obligations.forEach((o) => {
      counts[o.category]++;
    });
    return counts;
  }, []);

  const filtered = useMemo(() => {
    return obligations.filter((item) => {
      if (categoryFilter !== "All" && item.category !== categoryFilter) return false;
      if (riskFilter !== "All" && item.risk_level !== riskFilter) return false;
      if (statusFilter !== "All" && item.status !== statusFilter) return false;
      if (conflictOnly && !item.conflict_flag) return false;
      return true;
    });
  }, [categoryFilter, riskFilter, statusFilter, conflictOnly]);

  return (
    <PortalLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-[#0F172A]">Obligation Registry</h1>
          <span className="text-xs font-semibold bg-[#E0E7FF] text-[#312E81] px-2.5 py-1 rounded-full">
            {obligations.length}
          </span>
        </div>

        {/* Category Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {(Object.keys(categoryCounts) as Category[]).map((cat) => (
            <div key={cat} className="bg-white rounded-lg shadow-md p-4 text-center">
              <span
                className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-2 ${categoryColors[cat]}`}
              >
                {categoryLabels[cat]}
              </span>
              <p className="text-2xl font-bold text-[#0F172A]">{categoryCounts[cat]}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center gap-3 flex-wrap">
            <SlidersHorizontal className="w-4 h-4 text-[#94A3B8]" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="text-sm border border-[#E2E8F0] rounded-lg px-3 py-2 bg-white text-[#334155] focus:outline-none focus:ring-2 focus:ring-[#4338CA]"
            >
              <option value="All">All Categories</option>
              {(Object.keys(categoryLabels) as Category[]).map((cat) => (
                <option key={cat} value={cat}>
                  {categoryLabels[cat]}
                </option>
              ))}
            </select>
            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="text-sm border border-[#E2E8F0] rounded-lg px-3 py-2 bg-white text-[#334155] focus:outline-none focus:ring-2 focus:ring-[#4338CA]"
            >
              <option value="All">All Risk Levels</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-sm border border-[#E2E8F0] rounded-lg px-3 py-2 bg-white text-[#334155] focus:outline-none focus:ring-2 focus:ring-[#4338CA]"
            >
              <option value="All">All Statuses</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="retired">Retired</option>
            </select>
            <label className="flex items-center gap-2 text-sm text-[#334155] cursor-pointer">
              <input
                type="checkbox"
                checked={conflictOnly}
                onChange={(e) => setConflictOnly(e.target.checked)}
                className="w-4 h-4 rounded border-[#E2E8F0] text-[#D97706] focus:ring-[#D97706]"
              />
              <AlertTriangle className="w-3.5 h-3.5 text-[#D97706]" />
              Conflicts only
            </label>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E2E8F0]">
                <th className="text-left px-4 py-3 text-[#94A3B8] font-medium">Title</th>
                <th className="text-left px-4 py-3 text-[#94A3B8] font-medium">Regulation</th>
                <th className="text-left px-4 py-3 text-[#94A3B8] font-medium">Category</th>
                <th className="text-left px-4 py-3 text-[#94A3B8] font-medium">Risk Level</th>
                <th className="text-left px-4 py-3 text-[#94A3B8] font-medium">Deadline</th>
                <th className="text-left px-4 py-3 text-[#94A3B8] font-medium">Recurrence</th>
                <th className="text-left px-4 py-3 text-[#94A3B8] font-medium">Status</th>
                <th className="text-left px-4 py-3 text-[#94A3B8] font-medium w-10">
                  <span className="sr-only">Conflict</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr
                  key={item.id}
                  className={`border-b border-[#F8FAFC] ${item.conflict_flag ? "bg-amber-50" : ""}`}
                >
                  <td className="px-4 py-3 text-[#0F172A] max-w-[280px]">{item.title}</td>
                  <td className="px-4 py-3 text-[#334155] max-w-[200px] text-xs">
                    {item.regulation_name}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap ${categoryColors[item.category]}`}
                    >
                      {categoryLabels[item.category]}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`inline-block w-2 h-2 rounded-full ${riskDotColor[item.risk_level]}`}
                      />
                      <span className="text-xs text-[#334155]">{riskLabels[item.risk_level]}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-[#334155] whitespace-nowrap">
                    {item.deadline}
                  </td>
                  <td className="px-4 py-3 text-xs text-[#334155]">
                    {recurrenceLabels[item.recurrence]}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap ${statusPillStyles[item.status]}`}
                    >
                      {formatLabel(item.status)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {item.conflict_flag && (
                      <AlertTriangle className="w-4 h-4 text-[#D97706]" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="p-12 text-center text-[#94A3B8]">
              No obligations match the current filters.
            </div>
          )}
        </div>
      </div>
    </PortalLayout>
  );
}
