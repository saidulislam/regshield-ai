"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { PortalLayout } from "@/components/layout/PortalLayout";
import {
  ArrowLeft,
  Calendar,
  ExternalLink,
  Building2,
  Clock,
  AlertTriangle,
} from "lucide-react";

// ─── Inline Demo Data ────────────────────────────────────────────────────────

const changesData: Record<string, {
  id: string;
  title: string;
  change_type: string;
  jurisdiction: string;
  domain: string;
  published_date: string;
  effective_date: string | null;
  urgency: string;
  impact_score: number;
  summary: string;
  regulatory_body: string;
  source_url: string;
  impact_assessment: {
    summary: string;
    affected_business_units: string[];
    risk_level: string;
    estimated_effort_hours: number;
    implementation_deadline: string | null;
    enforcement_timeline: string | null;
  };
  obligations: {
    id: string;
    title: string;
    type: string;
    category: string;
    deadline: string | null;
    risk_level: string;
    conflict_flag: boolean;
  }[];
  action_plan: {
    executive_summary: string;
    items: {
      id: string;
      priority: string;
      title: string;
      assigned_role: string;
      deadline: string | null;
      status: string;
      evidence_required: string;
    }[];
  };
}> = {
  "chg-001": {
    id: "chg-001",
    title: "CFPB Final Rule on Open Banking (Section 1033)",
    change_type: "final_rule",
    jurisdiction: "Federal",
    domain: "Consumer Protection",
    published_date: "2026-03-21",
    effective_date: "2026-06-01",
    urgency: "critical",
    impact_score: 92,
    summary: "Establishes data sharing rights for consumers under Section 1033 of the Dodd-Frank Act. Requires financial institutions to make consumer data available through standardized APIs to authorized third parties. This rule significantly impacts how banks handle consumer data portability, requiring new technical infrastructure and compliance processes.",
    regulatory_body: "Consumer Financial Protection Bureau (CFPB)",
    source_url: "https://www.consumerfinance.gov/rules-policy/final-rules/section-1033",
    impact_assessment: {
      summary: "This rule requires Heartland Financial Group to implement standardized APIs for consumer data sharing within 90 days. Major impact on IT infrastructure, data governance, and third-party risk management. Estimated budget impact of $250K-$400K for initial implementation. Requires new vendor agreements with API gateway providers and updates to consumer consent workflows.",
      affected_business_units: ["Digital Banking", "IT Infrastructure", "Compliance", "Legal", "Customer Service", "Third-Party Risk Management"],
      risk_level: "critical",
      estimated_effort_hours: 480,
      implementation_deadline: "2026-06-01",
      enforcement_timeline: "Enforcement begins 2026-09-01 with initial examination cycle. Penalties up to $50,000 per day for non-compliance.",
    },
    obligations: [
      { id: "ob-001", title: "Implement standardized consumer data API endpoints", type: "operational", category: "technology", deadline: "2026-06-01", risk_level: "critical", conflict_flag: false },
      { id: "ob-002", title: "Update consumer consent and authorization workflows", type: "disclosure", category: "consumer_protection", deadline: "2026-06-01", risk_level: "high", conflict_flag: false },
      { id: "ob-003", title: "Establish third-party developer portal and credentialing", type: "operational", category: "technology", deadline: "2026-05-15", risk_level: "high", conflict_flag: false },
      { id: "ob-004", title: "File data sharing compliance attestation with CFPB", type: "reporting", category: "consumer_protection", deadline: "2026-07-01", risk_level: "medium", conflict_flag: false },
      { id: "ob-005", title: "Maintain API uptime and response time SLA records", type: "record_keeping", category: "technology", deadline: null, risk_level: "medium", conflict_flag: true },
      { id: "ob-006", title: "Train customer service staff on data sharing rights", type: "training", category: "consumer_protection", deadline: "2026-05-15", risk_level: "low", conflict_flag: false },
    ],
    action_plan: {
      executive_summary: "This action plan addresses the CFPB Section 1033 requirements through a phased approach: (1) Technical API infrastructure build-out, (2) Consent and authorization workflow updates, (3) Third-party credentialing system, and (4) Staff training and compliance attestation. Total estimated effort: 480 hours across 6 workstreams.",
      items: [
        { id: "ap-001", priority: "critical", title: "Procure and deploy API gateway for consumer data endpoints", assigned_role: "VP of Engineering", deadline: "2026-04-15", status: "in_progress", evidence_required: "Vendor contract, deployment documentation" },
        { id: "ap-002", priority: "critical", title: "Design and implement FDX-compliant API schemas", assigned_role: "Lead Developer", deadline: "2026-05-01", status: "in_progress", evidence_required: "API specification docs, test results" },
        { id: "ap-003", priority: "high", title: "Update consumer consent flow in digital banking platform", assigned_role: "Product Manager", deadline: "2026-05-15", status: "pending", evidence_required: "Updated UI mockups, user testing report" },
        { id: "ap-004", priority: "high", title: "Establish third-party developer credentialing process", assigned_role: "Third-Party Risk Manager", deadline: "2026-05-15", status: "pending", evidence_required: "Credentialing policy document, application portal" },
        { id: "ap-005", priority: "medium", title: "Develop monitoring dashboard for API performance SLAs", assigned_role: "DevOps Engineer", deadline: "2026-05-20", status: "pending", evidence_required: "Dashboard screenshots, alert configurations" },
        { id: "ap-006", priority: "medium", title: "Create customer service training materials on data rights", assigned_role: "Training Coordinator", deadline: "2026-05-10", status: "pending", evidence_required: "Training materials, completion certificates" },
        { id: "ap-007", priority: "low", title: "Prepare and submit compliance attestation to CFPB", assigned_role: "Chief Compliance Officer", deadline: "2026-07-01", status: "pending", evidence_required: "Signed attestation, supporting evidence package" },
      ],
    },
  },
  "chg-002": {
    id: "chg-002",
    title: "SEC Climate Disclosure Rule Amendment",
    change_type: "amendment",
    jurisdiction: "Federal",
    domain: "Securities",
    published_date: "2026-03-19",
    effective_date: "2026-09-01",
    urgency: "high",
    impact_score: 85,
    summary: "Amends climate-related disclosure requirements for registrants. Expands Scope 1 and Scope 2 greenhouse gas emissions reporting and adds transition plan disclosures for large accelerated filers. Heartland Financial Group must assess materiality of climate-related risks and establish reporting capabilities.",
    regulatory_body: "Securities and Exchange Commission (SEC)",
    source_url: "https://www.sec.gov/rules/final/2026/climate-disclosure-amendment",
    impact_assessment: {
      summary: "Requires establishing GHG emissions measurement and reporting processes. Heartland must assess material climate risks to its loan portfolio, particularly in agricultural and real estate sectors. Medium-term impact on investor relations and annual reporting. Estimated implementation cost of $80K-$150K.",
      affected_business_units: ["Investor Relations", "Finance", "Risk Management", "Legal", "Lending"],
      risk_level: "high",
      estimated_effort_hours: 240,
      implementation_deadline: "2026-09-01",
      enforcement_timeline: "First reporting period begins Q4 2026. SEC examination expected Q1 2027.",
    },
    obligations: [
      { id: "ob-011", title: "Establish GHG emissions data collection process", type: "reporting", category: "environmental", deadline: "2026-08-01", risk_level: "high", conflict_flag: false },
      { id: "ob-012", title: "Conduct climate risk materiality assessment", type: "governance", category: "environmental", deadline: "2026-07-15", risk_level: "high", conflict_flag: false },
      { id: "ob-013", title: "Update annual report to include climate disclosures", type: "disclosure", category: "financial", deadline: "2026-12-31", risk_level: "medium", conflict_flag: false },
      { id: "ob-014", title: "Board oversight of climate risk governance", type: "governance", category: "environmental", deadline: "2026-09-01", risk_level: "medium", conflict_flag: true },
    ],
    action_plan: {
      executive_summary: "Phased approach to SEC climate disclosure compliance: (1) Establish emissions measurement baseline, (2) Conduct materiality assessment, (3) Update reporting templates, (4) Board governance updates. Timeline allows 5 months for implementation.",
      items: [
        { id: "ap-011", priority: "high", title: "Engage climate risk consultant for materiality assessment", assigned_role: "Chief Risk Officer", deadline: "2026-04-15", status: "in_progress", evidence_required: "Consultant engagement letter, assessment report" },
        { id: "ap-012", priority: "high", title: "Implement GHG emissions tracking methodology", assigned_role: "VP of Operations", deadline: "2026-06-01", status: "pending", evidence_required: "Methodology document, data collection templates" },
        { id: "ap-013", priority: "medium", title: "Update 10-K reporting templates for climate disclosures", assigned_role: "Controller", deadline: "2026-08-01", status: "pending", evidence_required: "Updated templates, legal review sign-off" },
        { id: "ap-014", priority: "medium", title: "Present climate governance framework to Board", assigned_role: "General Counsel", deadline: "2026-07-01", status: "pending", evidence_required: "Board presentation, meeting minutes" },
      ],
    },
  },
};

// Default fallback
const defaultChange = changesData["chg-001"];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const urgencyBadge: Record<string, string> = {
  critical: "bg-[#FFE4E6] text-[#E11D48]",
  high: "bg-[#FEF3C7] text-[#D97706]",
  medium: "bg-[#E0E7FF] text-[#312E81]",
  low: "bg-[#E2E8F0] text-[#334155]",
};

const changeTypeBadge: Record<string, string> = {
  final_rule: "bg-[#D1FAE5] text-[#059669]",
  amendment: "bg-[#E0E7FF] text-[#4338CA]",
  proposed_rule: "bg-[#FEF3C7] text-[#D97706]",
  guidance: "bg-[#E2E8F0] text-[#334155]",
  enforcement_action: "bg-[#FFE4E6] text-[#E11D48]",
  new_regulation: "bg-[#D1FAE5] text-[#059669]",
};

const riskColors: Record<string, { dot: string; text: string }> = {
  critical: { dot: "bg-[#E11D48]", text: "text-[#E11D48]" },
  high: { dot: "bg-[#D97706]", text: "text-[#D97706]" },
  medium: { dot: "bg-[#4338CA]", text: "text-[#4338CA]" },
  low: { dot: "bg-[#94A3B8]", text: "text-[#94A3B8]" },
  negligible: { dot: "bg-[#E2E8F0]", text: "text-[#94A3B8]" },
};

const priorityDotColor: Record<string, string> = {
  critical: "bg-[#E11D48]",
  high: "bg-[#D97706]",
  medium: "bg-[#4338CA]",
  low: "bg-[#94A3B8]",
};

const statusPill: Record<string, string> = {
  pending: "bg-[#E2E8F0] text-[#334155]",
  in_progress: "bg-[#E0E7FF] text-[#312E81]",
  completed: "bg-[#D1FAE5] text-[#059669]",
  overdue: "bg-[#FFE4E6] text-[#E11D48]",
  blocked: "bg-[#FEF3C7] text-[#D97706]",
};

function impactBarColor(score: number) {
  if (score >= 80) return "bg-[#E11D48]";
  if (score >= 60) return "bg-[#D97706]";
  if (score >= 40) return "bg-[#4338CA]";
  return "bg-[#059669]";
}

function formatType(t: string) {
  return t.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ChangeDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const change = changesData[id] || defaultChange;
  const [activeTab, setActiveTab] = useState<"impact" | "obligations" | "action_plan">("impact");

  const tabs = [
    { key: "impact" as const, label: "Impact Assessment" },
    { key: "obligations" as const, label: "Obligations" },
    { key: "action_plan" as const, label: "Action Plan" },
  ];

  return (
    <PortalLayout>
      <div className="space-y-6">
        {/* Back Link */}
        <Link href="/changes" className="inline-flex items-center gap-1.5 text-sm text-[#4338CA] hover:text-[#312E81] font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Changes
        </Link>

        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-xl font-bold text-[#0F172A] mb-2">{change.title}</h1>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${urgencyBadge[change.urgency]}`}>
                  {formatType(change.urgency)}
                </span>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${changeTypeBadge[change.change_type]}`}>
                  {formatType(change.change_type)}
                </span>
                <span className="text-xs bg-[#E0E7FF] text-[#312E81] px-2.5 py-1 rounded-full">{change.jurisdiction}</span>
                <span className="text-xs bg-[#F8FAFC] text-[#334155] px-2.5 py-1 rounded-full border border-[#E2E8F0]">{change.domain}</span>
              </div>
            </div>
          </div>

          {/* Metadata Row */}
          <div className="flex items-center gap-6 flex-wrap mt-4 pt-4 border-t border-[#E2E8F0]">
            <div className="flex items-center gap-1.5 text-sm text-[#334155]">
              <Calendar className="w-4 h-4 text-[#94A3B8]" />
              <span className="text-[#94A3B8]">Published:</span> {change.published_date}
            </div>
            {change.effective_date && (
              <div className="flex items-center gap-1.5 text-sm text-[#334155]">
                <Clock className="w-4 h-4 text-[#94A3B8]" />
                <span className="text-[#94A3B8]">Effective:</span> {change.effective_date}
              </div>
            )}
            <div className="flex items-center gap-1.5 text-sm text-[#334155]">
              <Building2 className="w-4 h-4 text-[#94A3B8]" />
              {change.regulatory_body}
            </div>
            <a
              href={change.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-[#4338CA] hover:text-[#312E81]"
            >
              <ExternalLink className="w-4 h-4" /> Source
            </a>
          </div>

          {/* Impact Score Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-[#334155]">Impact Score</span>
              <span className="text-lg font-bold text-[#0F172A]">{change.impact_score}/100</span>
            </div>
            <div className="w-full bg-[#E2E8F0] rounded-full h-3">
              <div
                className={`h-3 rounded-full ${impactBarColor(change.impact_score)} transition-all`}
                style={{ width: `${change.impact_score}%` }}
              />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="border-b border-[#E2E8F0] px-6">
            <div className="flex gap-6">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.key
                      ? "border-[#312E81] text-[#312E81]"
                      : "border-transparent text-[#94A3B8] hover:text-[#334155]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {/* Impact Assessment Tab */}
            {activeTab === "impact" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-[#0F172A] mb-2">Summary</h3>
                  <p className="text-sm text-[#334155] leading-relaxed">{change.impact_assessment.summary}</p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-[#0F172A] mb-2">Affected Business Units</h3>
                  <div className="flex flex-wrap gap-2">
                    {change.impact_assessment.affected_business_units.map((unit) => (
                      <span key={unit} className="text-xs bg-[#E0E7FF] text-[#312E81] px-3 py-1 rounded-full">
                        {unit}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
                    <p className="text-xs text-[#94A3B8] mb-1">Risk Level</p>
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${riskColors[change.impact_assessment.risk_level]?.dot}`} />
                      <span className={`text-sm font-semibold ${riskColors[change.impact_assessment.risk_level]?.text}`}>
                        {formatType(change.impact_assessment.risk_level)}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
                    <p className="text-xs text-[#94A3B8] mb-1">Estimated Effort</p>
                    <p className="text-sm font-semibold text-[#0F172A]">{change.impact_assessment.estimated_effort_hours} hours</p>
                  </div>
                  <div className="p-4 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
                    <p className="text-xs text-[#94A3B8] mb-1">Implementation Deadline</p>
                    <p className="text-sm font-semibold text-[#0F172A]">{change.impact_assessment.implementation_deadline || "N/A"}</p>
                  </div>
                  <div className="p-4 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
                    <p className="text-xs text-[#94A3B8] mb-1">Enforcement Timeline</p>
                    <p className="text-sm font-semibold text-[#0F172A] text-xs leading-relaxed">{change.impact_assessment.enforcement_timeline || "N/A"}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Obligations Tab */}
            {activeTab === "obligations" && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#E2E8F0]">
                      <th className="text-left pb-3 text-[#94A3B8] font-medium">Title</th>
                      <th className="text-left pb-3 text-[#94A3B8] font-medium">Type</th>
                      <th className="text-left pb-3 text-[#94A3B8] font-medium">Category</th>
                      <th className="text-left pb-3 text-[#94A3B8] font-medium">Deadline</th>
                      <th className="text-left pb-3 text-[#94A3B8] font-medium">Risk Level</th>
                      <th className="text-left pb-3 text-[#94A3B8] font-medium">Conflict</th>
                    </tr>
                  </thead>
                  <tbody>
                    {change.obligations.map((ob) => (
                      <tr key={ob.id} className={`border-b border-[#F8FAFC] ${ob.conflict_flag ? "bg-amber-50" : ""}`}>
                        <td className="py-3 text-[#0F172A] max-w-[250px]">{ob.title}</td>
                        <td className="py-3">
                          <span className="text-xs bg-[#E0E7FF] text-[#312E81] px-2 py-0.5 rounded-full">{formatType(ob.type)}</span>
                        </td>
                        <td className="py-3">
                          <span className="text-xs bg-[#F8FAFC] text-[#334155] px-2 py-0.5 rounded-full border border-[#E2E8F0]">{formatType(ob.category)}</span>
                        </td>
                        <td className="py-3 text-[#334155]">{ob.deadline || "Ongoing"}</td>
                        <td className="py-3">
                          <div className="flex items-center gap-1.5">
                            <span className={`w-2 h-2 rounded-full ${riskColors[ob.risk_level]?.dot}`} />
                            <span className={`text-xs ${riskColors[ob.risk_level]?.text}`}>{formatType(ob.risk_level)}</span>
                          </div>
                        </td>
                        <td className="py-3">
                          {ob.conflict_flag && <AlertTriangle className="w-4 h-4 text-[#D97706]" />}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Action Plan Tab */}
            {activeTab === "action_plan" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-[#0F172A] mb-2">Executive Summary</h3>
                  <p className="text-sm text-[#334155] leading-relaxed">{change.action_plan.executive_summary}</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#E2E8F0]">
                        <th className="text-left pb-3 text-[#94A3B8] font-medium">Priority</th>
                        <th className="text-left pb-3 text-[#94A3B8] font-medium">Title</th>
                        <th className="text-left pb-3 text-[#94A3B8] font-medium">Assigned Role</th>
                        <th className="text-left pb-3 text-[#94A3B8] font-medium">Deadline</th>
                        <th className="text-left pb-3 text-[#94A3B8] font-medium">Status</th>
                        <th className="text-left pb-3 text-[#94A3B8] font-medium">Evidence Required</th>
                      </tr>
                    </thead>
                    <tbody>
                      {change.action_plan.items.map((item) => (
                        <tr key={item.id} className="border-b border-[#F8FAFC]">
                          <td className="py-3">
                            <span className={`inline-block w-2.5 h-2.5 rounded-full ${priorityDotColor[item.priority]}`} />
                          </td>
                          <td className="py-3 text-[#0F172A] max-w-[250px]">{item.title}</td>
                          <td className="py-3">
                            <span className="text-xs bg-[#E0E7FF] text-[#312E81] px-2 py-0.5 rounded-full">{item.assigned_role}</span>
                          </td>
                          <td className="py-3 text-[#334155]">{item.deadline || "TBD"}</td>
                          <td className="py-3">
                            <span className={`text-xs px-2 py-0.5 rounded-full ${statusPill[item.status] || statusPill.pending}`}>
                              {formatType(item.status)}
                            </span>
                          </td>
                          <td className="py-3 text-xs text-[#94A3B8] max-w-[200px]">{item.evidence_required}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
