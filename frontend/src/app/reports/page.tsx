"use client";

import { PortalLayout } from "@/components/layout/PortalLayout";
import { FileText, Download, Calendar, CheckCircle2, Clock, CalendarClock } from "lucide-react";

const reports = [
  {
    id: "rpt-001",
    title: "Monthly Compliance Report — February 2026",
    date: "2026-03-01",
    description: "Comprehensive monthly summary covering 6 regulatory changes, 14 action items completed, and compliance score trend analysis for Heartland Financial Group.",
    type: "monthly",
    status: "generated",
  },
  {
    id: "rpt-002",
    title: "Monthly Compliance Report — January 2026",
    date: "2026-02-01",
    description: "Monthly regulatory compliance overview including 4 new regulations tracked, 9 obligations met, and gap analysis for AML/BSA requirements.",
    type: "monthly",
    status: "generated",
  },
  {
    id: "rpt-003",
    title: "Monthly Compliance Report — March 2026",
    date: "2026-03-23",
    description: "Current month report covering open regulatory changes, pending action items, and risk exposure summary. Report will be finalized at month end.",
    type: "monthly",
    status: "pending",
  },
  {
    id: "rpt-004",
    title: "Q1 2026 Quarterly Compliance Review",
    date: "2026-04-01",
    description: "Quarterly deep-dive review of regulatory landscape changes, compliance posture evolution, obligation fulfillment rates, and strategic recommendations.",
    type: "quarterly",
    status: "scheduled",
  },
  {
    id: "rpt-005",
    title: "Regulatory Baseline Assessment — Heartland Financial Group",
    date: "2026-01-15",
    description: "Initial baseline assessment establishing Heartland Financial Group's regulatory profile, jurisdiction mapping, existing obligation inventory, and gap analysis.",
    type: "annual",
    status: "generated",
  },
];

const typeBadge: Record<string, string> = {
  monthly: "bg-[#E0E7FF] text-[#312E81]",
  quarterly: "bg-[#FEF3C7] text-[#D97706]",
  annual: "bg-[#D1FAE5] text-[#059669]",
};

const statusConfig: Record<string, { icon: React.ElementType; label: string; className: string }> = {
  generated: { icon: CheckCircle2, label: "Generated", className: "text-[#059669]" },
  pending: { icon: Clock, label: "Pending", className: "text-[#D97706]" },
  scheduled: { icon: CalendarClock, label: "Scheduled", className: "text-[#94A3B8]" },
};

export default function ReportsPage() {
  return (
    <PortalLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Reports</h1>
          <p className="text-[#94A3B8] mt-1">Generated compliance reports and assessments</p>
        </div>

        {/* Report Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {reports.map((report) => {
            const st = statusConfig[report.status];
            const StatusIcon = st.icon;
            return (
              <div key={report.id} className="bg-white rounded-lg shadow-md p-6 flex flex-col">
                <div className="flex items-start gap-3 mb-4">
                  <div className="p-2.5 bg-[#E0E7FF] rounded-lg shrink-0">
                    <FileText className="w-5 h-5 text-[#312E81]" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-[#0F172A] text-sm leading-tight">{report.title}</h3>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeBadge[report.type]}`}>
                        {report.type.charAt(0).toUpperCase() + report.type.slice(1)}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-[#94A3B8]">
                        <Calendar className="w-3 h-3" />
                        {report.date}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-[#334155] flex-1 mb-4">{report.description}</p>
                <div className="flex items-center justify-between pt-3 border-t border-[#E2E8F0]">
                  <span className={`flex items-center gap-1 text-xs font-medium ${st.className}`}>
                    <StatusIcon className="w-3.5 h-3.5" />
                    {st.label}
                  </span>
                  <button
                    disabled
                    className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${
                      report.status === "generated"
                        ? "bg-[#312E81] text-white opacity-60 cursor-not-allowed"
                        : "bg-[#E2E8F0] text-[#94A3B8] cursor-not-allowed"
                    }`}
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download PDF
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PortalLayout>
  );
}
