"use client";

import { useState, useMemo } from "react";
import { PortalLayout } from "@/components/layout/PortalLayout";
import { Search, SlidersHorizontal, ArrowUpDown, ExternalLink } from "lucide-react";
import Link from "next/link";

// ─── Inline Demo Data ────────────────────────────────────────────────────────

const changes = [
  {
    id: "chg-001",
    title: "CFPB Final Rule on Open Banking (Section 1033)",
    change_type: "final_rule",
    jurisdiction: "Federal",
    domain: "Consumer Protection",
    published_date: "2026-03-21",
    effective_date: "2026-06-01",
    urgency: "critical" as const,
    impact_score: 92,
    summary: "Establishes data sharing rights for consumers under Section 1033 of the Dodd-Frank Act. Requires financial institutions to make consumer data available through standardized APIs to authorized third parties.",
    pipeline_status: "assessed" as const,
    regulatory_body: "CFPB",
  },
  {
    id: "chg-002",
    title: "SEC Climate Disclosure Rule Amendment",
    change_type: "amendment",
    jurisdiction: "Federal",
    domain: "Securities",
    published_date: "2026-03-19",
    effective_date: "2026-09-01",
    urgency: "high" as const,
    impact_score: 85,
    summary: "Amends climate-related disclosure requirements for registrants. Expands Scope 1 and Scope 2 greenhouse gas emissions reporting and adds transition plan disclosures for large accelerated filers.",
    pipeline_status: "assessed" as const,
    regulatory_body: "SEC",
  },
  {
    id: "chg-003",
    title: "NYDFS Cybersecurity Regulation Update (23 NYCRR 500)",
    change_type: "amendment",
    jurisdiction: "New York",
    domain: "Cybersecurity",
    published_date: "2026-03-18",
    effective_date: "2026-07-01",
    urgency: "high" as const,
    impact_score: 78,
    summary: "Updates cybersecurity requirements for financial services companies. Adds multi-factor authentication mandates, enhanced incident reporting timelines, and penetration testing frequency requirements.",
    pipeline_status: "published" as const,
    regulatory_body: "NYDFS",
  },
  {
    id: "chg-004",
    title: "FinCEN Beneficial Ownership Information Reporting Guidance",
    change_type: "guidance",
    jurisdiction: "Federal",
    domain: "AML/BSA",
    published_date: "2026-03-15",
    effective_date: "2026-05-01",
    urgency: "medium" as const,
    impact_score: 62,
    summary: "Provides updated guidance on beneficial ownership information reporting requirements under the Corporate Transparency Act, including exemptions and reporting procedures for financial institutions.",
    pipeline_status: "assessed" as const,
    regulatory_body: "FinCEN",
  },
  {
    id: "chg-005",
    title: "OCC Third-Party Risk Management Bulletin Update",
    change_type: "guidance",
    jurisdiction: "Federal",
    domain: "Risk Management",
    published_date: "2026-03-12",
    effective_date: null,
    urgency: "low" as const,
    impact_score: 45,
    summary: "Updates interagency guidance on managing risks associated with third-party relationships, including fintech partnerships and cloud service providers.",
    pipeline_status: "published" as const,
    regulatory_body: "OCC",
  },
  {
    id: "chg-006",
    title: "FDIC Deposit Insurance Assessment Rate Adjustment",
    change_type: "final_rule",
    jurisdiction: "Federal",
    domain: "Banking",
    published_date: "2026-03-10",
    effective_date: "2026-07-01",
    urgency: "medium" as const,
    impact_score: 58,
    summary: "Adjusts deposit insurance assessment rates for insured depository institutions to restore the Deposit Insurance Fund reserve ratio following recent bank failures.",
    pipeline_status: "classified" as const,
    regulatory_body: "FDIC",
  },
  {
    id: "chg-007",
    title: "Federal Reserve Regulation II Debit Card Interchange Fee Cap",
    change_type: "proposed_rule",
    jurisdiction: "Federal",
    domain: "Payments",
    published_date: "2026-03-08",
    effective_date: null,
    urgency: "high" as const,
    impact_score: 74,
    summary: "Proposed reduction in the maximum permissible interchange fee for debit card transactions under Regulation II, with updated fraud adjustment calculations.",
    pipeline_status: "assessed" as const,
    regulatory_body: "Federal Reserve",
  },
  {
    id: "chg-008",
    title: "California Privacy Rights Act (CPRA) Enforcement Update",
    change_type: "enforcement_action",
    jurisdiction: "California",
    domain: "Data Privacy",
    published_date: "2026-03-06",
    effective_date: "2026-03-06",
    urgency: "critical" as const,
    impact_score: 88,
    summary: "CPPA announces enforcement sweep targeting financial institutions for opt-out request handling deficiencies and dark pattern violations in consumer consent flows.",
    pipeline_status: "published" as const,
    regulatory_body: "CPPA",
  },
  {
    id: "chg-009",
    title: "OFAC Sanctions List Update — Russia-related Designations",
    change_type: "new_regulation",
    jurisdiction: "Federal",
    domain: "Sanctions",
    published_date: "2026-03-05",
    effective_date: "2026-03-05",
    urgency: "critical" as const,
    impact_score: 90,
    summary: "Adds 47 entities and 12 individuals to the SDN list related to Russian financial institutions and intermediaries, requiring immediate screening updates.",
    pipeline_status: "published" as const,
    regulatory_body: "OFAC",
  },
  {
    id: "chg-010",
    title: "NCUA Risk-Based Capital Rule Revision",
    change_type: "amendment",
    jurisdiction: "Federal",
    domain: "Capital Requirements",
    published_date: "2026-03-03",
    effective_date: "2026-10-01",
    urgency: "medium" as const,
    impact_score: 52,
    summary: "Revises risk-based capital requirements for federally insured credit unions with assets exceeding $500 million, including updated risk weight categories.",
    pipeline_status: "matched" as const,
    regulatory_body: "NCUA",
  },
  {
    id: "chg-011",
    title: "CFPB Proposed Rule on Earned Wage Access",
    change_type: "proposed_rule",
    jurisdiction: "Federal",
    domain: "Consumer Protection",
    published_date: "2026-03-01",
    effective_date: null,
    urgency: "medium" as const,
    impact_score: 55,
    summary: "Proposes regulatory framework for earned wage access products, establishing disclosure requirements and fee limitations for providers.",
    pipeline_status: "ingested" as const,
    regulatory_body: "CFPB",
  },
  {
    id: "chg-012",
    title: "Texas Department of Banking Digital Asset Custody Guidelines",
    change_type: "guidance",
    jurisdiction: "Texas",
    domain: "Digital Assets",
    published_date: "2026-02-28",
    effective_date: "2026-04-15",
    urgency: "low" as const,
    impact_score: 35,
    summary: "Issues guidance on custody of digital assets by state-chartered banks, including cold storage requirements and segregation of customer assets.",
    pipeline_status: "classified" as const,
    regulatory_body: "TDB",
  },
];

const urgencyOptions = ["All", "critical", "high", "medium", "low"];
const domainOptions = ["All", ...Array.from(new Set(changes.map((c) => c.domain)))];
const jurisdictionOptions = ["All", ...Array.from(new Set(changes.map((c) => c.jurisdiction)))];
const pipelineOptions = ["All", "ingested", "classified", "matched", "assessed", "published", "archived"];
const sortOptions = [
  { label: "Newest First", value: "date" },
  { label: "Impact Score", value: "impact" },
  { label: "Urgency", value: "urgency" },
];

const urgencyOrder: Record<string, number> = { critical: 0, high: 1, medium: 2, low: 3 };
const urgencyBorderColor: Record<string, string> = {
  critical: "border-l-[#E11D48]",
  high: "border-l-amber-500",
  medium: "border-l-[#312E81]",
  low: "border-l-slate-400",
};
const changeTypeBadge: Record<string, string> = {
  final_rule: "bg-[#D1FAE5] text-[#059669]",
  amendment: "bg-[#E0E7FF] text-[#4338CA]",
  proposed_rule: "bg-[#FEF3C7] text-[#D97706]",
  guidance: "bg-[#E2E8F0] text-[#334155]",
  enforcement_action: "bg-[#FFE4E6] text-[#E11D48]",
  new_regulation: "bg-[#D1FAE5] text-[#059669]",
  repeal: "bg-[#FFE4E6] text-[#E11D48]",
};
const pipelineStatusBadge: Record<string, string> = {
  ingested: "bg-[#E2E8F0] text-[#334155]",
  classified: "bg-[#E0E7FF] text-[#312E81]",
  matched: "bg-[#FEF3C7] text-[#D97706]",
  assessed: "bg-[#D1FAE5] text-[#059669]",
  published: "bg-[#D1FAE5] text-[#059669]",
  archived: "bg-[#E2E8F0] text-[#94A3B8]",
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

export default function ChangesPage() {
  const [urgencyFilter, setUrgencyFilter] = useState("All");
  const [domainFilter, setDomainFilter] = useState("All");
  const [jurisdictionFilter, setJurisdictionFilter] = useState("All");
  const [pipelineFilter, setPipelineFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("date");

  const filtered = useMemo(() => {
    const result = changes.filter((c) => {
      if (urgencyFilter !== "All" && c.urgency !== urgencyFilter) return false;
      if (domainFilter !== "All" && c.domain !== domainFilter) return false;
      if (jurisdictionFilter !== "All" && c.jurisdiction !== jurisdictionFilter) return false;
      if (pipelineFilter !== "All" && c.pipeline_status !== pipelineFilter) return false;
      if (search && !c.title.toLowerCase().includes(search.toLowerCase()) && !c.summary.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
    result.sort((a, b) => {
      if (sortBy === "impact") return b.impact_score - a.impact_score;
      if (sortBy === "urgency") return urgencyOrder[a.urgency] - urgencyOrder[b.urgency];
      return new Date(b.published_date).getTime() - new Date(a.published_date).getTime();
    });
    return result;
  }, [urgencyFilter, domainFilter, jurisdictionFilter, pipelineFilter, search, sortBy]);

  return (
    <PortalLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#0F172A]">Regulatory Changes</h1>
            <p className="text-[#94A3B8] mt-1">{filtered.length} changes found</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex flex-wrap items-center gap-3">
            <SlidersHorizontal className="w-4 h-4 text-[#94A3B8]" />
            <select
              value={urgencyFilter}
              onChange={(e) => setUrgencyFilter(e.target.value)}
              className="text-sm border border-[#E2E8F0] rounded-lg px-3 py-2 bg-white text-[#334155] focus:outline-none focus:ring-2 focus:ring-[#4338CA]"
            >
              {urgencyOptions.map((o) => (
                <option key={o} value={o}>{o === "All" ? "All Urgencies" : formatType(o)}</option>
              ))}
            </select>
            <select
              value={domainFilter}
              onChange={(e) => setDomainFilter(e.target.value)}
              className="text-sm border border-[#E2E8F0] rounded-lg px-3 py-2 bg-white text-[#334155] focus:outline-none focus:ring-2 focus:ring-[#4338CA]"
            >
              {domainOptions.map((o) => (
                <option key={o} value={o}>{o === "All" ? "All Domains" : o}</option>
              ))}
            </select>
            <select
              value={jurisdictionFilter}
              onChange={(e) => setJurisdictionFilter(e.target.value)}
              className="text-sm border border-[#E2E8F0] rounded-lg px-3 py-2 bg-white text-[#334155] focus:outline-none focus:ring-2 focus:ring-[#4338CA]"
            >
              {jurisdictionOptions.map((o) => (
                <option key={o} value={o}>{o === "All" ? "All Jurisdictions" : o}</option>
              ))}
            </select>
            <select
              value={pipelineFilter}
              onChange={(e) => setPipelineFilter(e.target.value)}
              className="text-sm border border-[#E2E8F0] rounded-lg px-3 py-2 bg-white text-[#334155] focus:outline-none focus:ring-2 focus:ring-[#4338CA]"
            >
              {pipelineOptions.map((o) => (
                <option key={o} value={o}>{o === "All" ? "All Statuses" : formatType(o)}</option>
              ))}
            </select>
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
              <input
                type="text"
                placeholder="Search changes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm border border-[#E2E8F0] rounded-lg bg-white text-[#334155] focus:outline-none focus:ring-2 focus:ring-[#4338CA]"
              />
            </div>
            <div className="flex items-center gap-1">
              <ArrowUpDown className="w-4 h-4 text-[#94A3B8]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border border-[#E2E8F0] rounded-lg px-3 py-2 bg-white text-[#334155] focus:outline-none focus:ring-2 focus:ring-[#4338CA]"
              >
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Change Cards */}
        <div className="space-y-4">
          {filtered.map((change) => (
            <div
              key={change.id}
              className={`bg-white rounded-lg shadow-md border-l-4 ${urgencyBorderColor[change.urgency]} p-5`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="font-semibold text-[#0F172A]">{change.title}</h3>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${changeTypeBadge[change.change_type]}`}>
                      {formatType(change.change_type)}
                    </span>
                    <span className="text-xs bg-[#E0E7FF] text-[#312E81] px-2 py-0.5 rounded-full">{change.jurisdiction}</span>
                    <span className="text-xs bg-[#F8FAFC] text-[#334155] px-2 py-0.5 rounded-full border border-[#E2E8F0]">{change.domain}</span>
                    <span className="text-xs text-[#94A3B8]">{change.published_date}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${pipelineStatusBadge[change.pipeline_status]}`}>
                      {formatType(change.pipeline_status)}
                    </span>
                  </div>
                  <p className="text-sm text-[#334155] line-clamp-2">{change.summary}</p>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <div className="w-24">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-[#94A3B8]">Impact</span>
                      <span className="font-semibold text-[#0F172A]">{change.impact_score}</span>
                    </div>
                    <div className="w-full bg-[#E2E8F0] rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${impactBarColor(change.impact_score)}`}
                        style={{ width: `${change.impact_score}%` }}
                      />
                    </div>
                  </div>
                  <Link
                    href={`/changes/${change.id}`}
                    className="text-xs text-[#4338CA] hover:text-[#312E81] font-medium flex items-center gap-1 mt-1"
                  >
                    View Details <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-[#94A3B8]">No changes match the current filters.</p>
            </div>
          )}
        </div>
      </div>
    </PortalLayout>
  );
}
