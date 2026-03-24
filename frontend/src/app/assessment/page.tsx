"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Shield,
  AlertTriangle,
  CheckCircle2,
  Building2,
  Users,
  Globe,
  Clock,
  Search,
  Zap,
  FileWarning,
  Mail,
  Briefcase,
  Building,
  TrendingDown,
  AlertOctagon,
  BookOpen,
  Scale,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type SingleSelectAnswer = string;
type MultiSelectAnswer = string[];
type Answer = SingleSelectAnswer | MultiSelectAnswer;

interface Question {
  id: string;
  step: number;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  type: "single" | "multi";
  options: { value: string; label: string; description?: string }[];
}

interface LeadInfo {
  email: string;
  title: string;
  company: string;
}

interface RiskArea {
  area: string;
  description: string;
  severity: "critical" | "high" | "medium";
  icon: React.ElementType;
}

interface RegulationMatch {
  name: string;
  year: string;
  relevance: string;
}

/* ------------------------------------------------------------------ */
/*  Questions Data                                                     */
/* ------------------------------------------------------------------ */

const questions: Question[] = [
  {
    id: "industry",
    step: 1,
    title: "What industry does your company operate in?",
    subtitle: "This helps us identify the specific regulatory frameworks that apply to you.",
    icon: Building2,
    type: "single",
    options: [
      { value: "financial_services", label: "Financial Services", description: "Banks, credit unions, wealth management" },
      { value: "insurance", label: "Insurance", description: "P&C, life, health, specialty lines" },
      { value: "fintech", label: "Fintech", description: "Payments, lending, neo-banking" },
      { value: "healthcare", label: "Healthcare", description: "Providers, payers, health tech" },
      { value: "saas_technology", label: "SaaS / Technology", description: "Software platforms, data companies" },
      { value: "other", label: "Other Regulated Industry", description: "Energy, telecom, etc." },
    ],
  },
  {
    id: "company_size",
    step: 2,
    title: "What is your company's annual revenue?",
    subtitle: "Company size affects regulatory complexity and resource requirements.",
    icon: Building,
    type: "single",
    options: [
      { value: "under_10m", label: "Under $10M" },
      { value: "10m_50m", label: "$10M - $50M" },
      { value: "50m_100m", label: "$50M - $100M" },
      { value: "100m_500m", label: "$100M - $500M" },
      { value: "over_500m", label: "Over $500M" },
    ],
  },
  {
    id: "jurisdictions",
    step: 3,
    title: "How many jurisdictions do you operate in?",
    subtitle: "Multi-jurisdiction operations exponentially increase regulatory complexity.",
    icon: Globe,
    type: "single",
    options: [
      { value: "single_state", label: "Single state + federal", description: "One state of operation" },
      { value: "2_5", label: "2-5 states", description: "Regional presence" },
      { value: "6_15", label: "6-15 states", description: "Multi-regional presence" },
      { value: "16_plus", label: "16+ states", description: "Nationwide operations" },
      { value: "international", label: "International + US", description: "Cross-border compliance" },
    ],
  },
  {
    id: "team_size",
    step: 4,
    title: "How large is your compliance team?",
    subtitle: "Team capacity determines your ability to absorb regulatory changes.",
    icon: Users,
    type: "single",
    options: [
      { value: "solo", label: "Solo compliance officer", description: "One person wears all the hats" },
      { value: "2_3", label: "2-3 people", description: "Small dedicated team" },
      { value: "4_10", label: "4-10 people", description: "Established compliance function" },
      { value: "10_plus", label: "10+ people", description: "Full compliance department" },
    ],
  },
  {
    id: "tracking_method",
    step: 5,
    title: "How do you currently track regulatory changes?",
    subtitle: "Your tracking method is a key indicator of change readiness.",
    icon: Search,
    type: "single",
    options: [
      { value: "manual", label: "Manual monitoring", description: "Google alerts, reading agency websites, newsletters" },
      { value: "platform", label: "Regulatory platform", description: "Compliance.ai, Ascent, CUBE, or similar" },
      { value: "law_firm", label: "Law firm alerts", description: "Relying on outside counsel bulletins" },
      { value: "no_tracking", label: "No systematic tracking", description: "We hear about changes reactively" },
    ],
  },
  {
    id: "implementation_speed",
    step: 6,
    title: "How long does it typically take to implement a regulatory change?",
    subtitle: "Implementation speed reveals process maturity and organizational agility.",
    icon: Clock,
    type: "single",
    options: [
      { value: "under_30", label: "Under 30 days", description: "Rapid response capability" },
      { value: "1_3_months", label: "1-3 months", description: "Standard implementation cycle" },
      { value: "3_6_months", label: "3-6 months", description: "Extended timeline" },
      { value: "6_12_months", label: "6-12 months", description: "Slow implementation" },
      { value: "over_12_months", label: "Over 12 months", description: "Significant delays" },
      { value: "not_sure", label: "Not sure", description: "We don't track this metric" },
    ],
  },
  {
    id: "concerns_2026",
    step: 7,
    title: "Which 2026 regulatory changes concern you most?",
    subtitle: "Select all that apply. This helps us identify your awareness of upcoming changes.",
    icon: FileWarning,
    type: "multi",
    options: [
      { value: "dora", label: "DORA (Digital Operational Resilience Act)" },
      { value: "eu_ai_act", label: "EU AI Act" },
      { value: "nis2", label: "NIS2 Directive" },
      { value: "state_privacy", label: "State privacy laws (20+ new in 2026)" },
      { value: "hipaa_updates", label: "HIPAA Security Rule updates" },
      { value: "state_insurance", label: "State insurance regulations" },
      { value: "federal_banking", label: "Federal banking changes" },
      { value: "not_sure", label: "Not sure what is coming" },
    ],
  },
  {
    id: "past_incidents",
    step: 8,
    title: "Have you experienced any of the following in the past 24 months?",
    subtitle: "Select all that apply. Past incidents indicate areas of vulnerability.",
    icon: AlertTriangle,
    type: "multi",
    options: [
      { value: "regulatory_fine", label: "Regulatory fine or penalty" },
      { value: "failed_audit", label: "Failed audit or examination" },
      { value: "missed_deadline", label: "Missed regulatory deadline" },
      { value: "emergency_remediation", label: "Emergency remediation project" },
      { value: "none", label: "None of the above" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Scoring Algorithm                                                  */
/* ------------------------------------------------------------------ */

function calculateScore(answers: Record<string, Answer>): number {
  let score = 100;

  // Jurisdiction risk
  const jurisdictionPenalties: Record<string, number> = {
    single_state: 0,
    "2_5": -5,
    "6_15": -15,
    "16_plus": -25,
    international: -30,
  };
  const jurisdiction = answers.jurisdictions as string;
  score += jurisdictionPenalties[jurisdiction] ?? 0;

  // Team capacity: solo + multi-state, or 2-3 + 16+ states
  const team = answers.team_size as string;
  if (team === "solo" && jurisdiction !== "single_state") {
    score -= 20;
  } else if (team === "2_3" && (jurisdiction === "16_plus" || jurisdiction === "international")) {
    score -= 15;
  }

  // Tracking method
  const trackingPenalties: Record<string, number> = {
    manual: -20,
    no_tracking: -30,
    law_firm: -10,
    platform: -5,
  };
  const tracking = answers.tracking_method as string;
  score += trackingPenalties[tracking] ?? 0;

  // Implementation speed
  const speedPenalties: Record<string, number> = {
    under_30: 0,
    "1_3_months": -5,
    "3_6_months": -10,
    "6_12_months": -20,
    over_12_months: -25,
    not_sure: -30,
  };
  const speed = answers.implementation_speed as string;
  score += speedPenalties[speed] ?? 0;

  // Past incidents: each non-"none" = -10
  const incidents = answers.past_incidents as string[];
  if (incidents && !incidents.includes("none")) {
    score -= incidents.length * 10;
  }

  // Concerns: 4+ concerns AND manual/no tracking = -15
  const concerns = answers.concerns_2026 as string[];
  if (
    concerns &&
    concerns.length >= 4 &&
    (tracking === "manual" || tracking === "no_tracking")
  ) {
    score -= 15;
  }

  return Math.max(0, Math.min(100, score));
}

function getGrade(score: number): { letter: string; color: string; bgColor: string; message: string } {
  if (score >= 90) return { letter: "A", color: "text-[#059669]", bgColor: "bg-[#D1FAE5]", message: "Strong regulatory change readiness. Focus on maintaining your posture." };
  if (score >= 70) return { letter: "B", color: "text-[#4338CA]", bgColor: "bg-[#E0E7FF]", message: "Good foundation, but gaps exist. The 2026 wave will test your current approach." };
  if (score >= 50) return { letter: "C", color: "text-[#D97706]", bgColor: "bg-[#FEF3C7]", message: "Significant gaps. Manual processes will not scale for 2026." };
  if (score >= 30) return { letter: "D", color: "text-[#E11D48]", bgColor: "bg-[#FFE4E6]", message: "High risk. Your current approach leaves you exposed to penalties and audit failures." };
  return { letter: "F", color: "text-[#E11D48]", bgColor: "bg-[#FFE4E6]", message: "Critical risk. Immediate action needed. Your organization is unprepared." };
}

/* ------------------------------------------------------------------ */
/*  Risk Area Analysis                                                 */
/* ------------------------------------------------------------------ */

function identifyRiskAreas(answers: Record<string, Answer>): RiskArea[] {
  const risks: RiskArea[] = [];

  const tracking = answers.tracking_method as string;
  const team = answers.team_size as string;
  const jurisdiction = answers.jurisdictions as string;
  const speed = answers.implementation_speed as string;
  const incidents = answers.past_incidents as string[];
  const concerns = answers.concerns_2026 as string[];

  // Tracking risk
  if (tracking === "no_tracking") {
    risks.push({
      area: "Regulatory Monitoring",
      description: "You have no systematic tracking in place. With 50,000+ regulatory sources publishing changes daily, reactive discovery means missed deadlines and surprise enforcement actions.",
      severity: "critical",
      icon: Search,
    });
  } else if (tracking === "manual") {
    risks.push({
      area: "Manual Change Tracking",
      description: "Manual monitoring cannot keep pace with the volume of 2026 changes. State privacy laws alone will generate 20+ new compliance requirements this year.",
      severity: "high",
      icon: Search,
    });
  }

  // Team capacity risk
  if (team === "solo" && jurisdiction !== "single_state") {
    risks.push({
      area: "Team Capacity",
      description: "A solo compliance officer managing multi-jurisdiction operations is unsustainable. The 2026 regulatory wave will overwhelm your capacity.",
      severity: "critical",
      icon: Users,
    });
  } else if (team === "2_3" && (jurisdiction === "16_plus" || jurisdiction === "international")) {
    risks.push({
      area: "Team Capacity Gap",
      description: "Your team of 2-3 people is under-resourced for the number of jurisdictions you operate in. Each new state adds 5-15 additional regulatory requirements.",
      severity: "high",
      icon: Users,
    });
  }

  // Implementation speed risk
  if (speed === "not_sure" || speed === "over_12_months" || speed === "6_12_months") {
    risks.push({
      area: "Implementation Velocity",
      description: "Slow implementation cycles mean regulatory gaps persist for months. Multiple 2026 regulations have tight compliance windows of 6-12 months after finalization.",
      severity: speed === "not_sure" ? "critical" : "high",
      icon: Clock,
    });
  } else if (speed === "3_6_months") {
    risks.push({
      area: "Implementation Timeline",
      description: "A 3-6 month implementation cycle may not keep pace with overlapping 2026 deadlines. Consider streamlining your change management process.",
      severity: "medium",
      icon: Clock,
    });
  }

  // Incident history risk
  if (incidents && !incidents.includes("none") && incidents.length >= 2) {
    risks.push({
      area: "Recurring Compliance Incidents",
      description: "Multiple incidents in the past 24 months indicate systemic process gaps. Without intervention, the increased 2026 regulatory burden will likely cause additional failures.",
      severity: "high",
      icon: AlertTriangle,
    });
  } else if (incidents && incidents.includes("regulatory_fine")) {
    risks.push({
      area: "Enforcement Exposure",
      description: "A recent regulatory fine puts you under increased scrutiny. Regulators track enforcement history and may impose harsher penalties for repeat issues.",
      severity: "high",
      icon: AlertOctagon,
    });
  }

  // Awareness risk
  if (concerns && concerns.includes("not_sure")) {
    risks.push({
      area: "Regulatory Awareness",
      description: "Uncertainty about upcoming 2026 regulations suggests a gap in your monitoring capabilities. Several major regulations have imminent compliance deadlines.",
      severity: "high",
      icon: BookOpen,
    });
  }

  // Jurisdiction complexity
  if (jurisdiction === "international" || jurisdiction === "16_plus") {
    const hasAdequateTeam = team === "4_10" || team === "10_plus";
    if (!hasAdequateTeam) {
      risks.push({
        area: "Jurisdiction Complexity",
        description: "Operating in many jurisdictions creates exponential compliance complexity. Conflicting requirements between state and federal (or international) regulations require specialized expertise.",
        severity: "high",
        icon: Globe,
      });
    }
  }

  // Sort by severity and return top 3
  const severityOrder: Record<string, number> = { critical: 0, high: 1, medium: 2 };
  risks.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);
  return risks.slice(0, 3);
}

/* ------------------------------------------------------------------ */
/*  2026 Regulation Matching                                           */
/* ------------------------------------------------------------------ */

function getRelevantRegulations(answers: Record<string, Answer>): RegulationMatch[] {
  const industry = answers.industry as string;
  const jurisdiction = answers.jurisdictions as string;
  const concerns = answers.concerns_2026 as string[];
  const regs: RegulationMatch[] = [];

  // Industry-specific regulations
  if (industry === "financial_services" || industry === "fintech") {
    regs.push({
      name: "DORA (Digital Operational Resilience Act)",
      year: "2025-2026",
      relevance: "Mandates ICT risk management, incident reporting, and third-party risk oversight for financial entities. Full enforcement begins January 2025 with ongoing supervisory expectations through 2026.",
    });
    regs.push({
      name: "Federal Banking Regulatory Changes",
      year: "2026",
      relevance: "OCC, FDIC, and CFPB are finalizing multiple rules on open banking (Section 1033), CRA modernization, and digital asset supervision.",
    });
  }

  if (industry === "insurance") {
    regs.push({
      name: "NAIC Model Law Updates",
      year: "2026",
      relevance: "Multiple model laws on AI/ML in underwriting, privacy protections, and cybersecurity requirements are being adopted by state DOIs throughout 2026.",
    });
    regs.push({
      name: "State Insurance Data Privacy",
      year: "2026",
      relevance: "Over 15 states are updating insurance-specific data handling requirements, with new breach notification timelines and consumer rights provisions.",
    });
  }

  if (industry === "healthcare") {
    regs.push({
      name: "HIPAA Security Rule Update",
      year: "2026",
      relevance: "The most significant HIPAA update in a decade. New requirements for encryption, MFA, network segmentation, and 72-hour incident reporting.",
    });
    regs.push({
      name: "State Health Privacy Laws",
      year: "2026",
      relevance: "Washington My Health My Data Act clones are spreading. At least 8 states will have health-specific privacy laws by mid-2026.",
    });
  }

  if (industry === "saas_technology" || industry === "fintech") {
    regs.push({
      name: "EU AI Act",
      year: "2025-2026",
      relevance: "Tiered risk classification for AI systems with mandatory conformity assessments. High-risk AI systems must comply by August 2026.",
    });
  }

  // Jurisdiction-based regulations
  if (jurisdiction === "international" || concerns?.includes("dora") || concerns?.includes("eu_ai_act") || concerns?.includes("nis2")) {
    if (!regs.find(r => r.name.includes("EU AI Act")) && (concerns?.includes("eu_ai_act") || industry === "saas_technology")) {
      regs.push({
        name: "EU AI Act",
        year: "2025-2026",
        relevance: "Comprehensive AI regulation with extraterritorial reach. Affects any company deploying AI systems that impact EU residents.",
      });
    }
    if (concerns?.includes("nis2")) {
      regs.push({
        name: "NIS2 Directive",
        year: "2025-2026",
        relevance: "Expanded cybersecurity obligations for essential and important entities. Includes supply chain security, incident reporting within 24 hours, and management accountability.",
      });
    }
  }

  // State privacy laws affect everyone with multi-state operations
  if (jurisdiction !== "single_state") {
    regs.push({
      name: "State Comprehensive Privacy Laws",
      year: "2026",
      relevance: "20+ states will have active privacy laws by end of 2026. Each has unique consent requirements, consumer rights, and enforcement mechanisms. Multi-state compliance requires careful harmonization.",
    });
  }

  // Always include if not sure about concerns
  if (concerns?.includes("not_sure")) {
    regs.push({
      name: "Cross-Sector Cybersecurity Requirements",
      year: "2026",
      relevance: "Federal and state regulators are converging on stricter cybersecurity standards across all regulated industries. Incident reporting windows are shrinking to 24-72 hours.",
    });
  }

  // Deduplicate by name and return top 4
  const seen = new Set<string>();
  const unique = regs.filter(r => {
    if (seen.has(r.name)) return false;
    seen.add(r.name);
    return true;
  });
  return unique.slice(0, 4);
}

/* ------------------------------------------------------------------ */
/*  Estimated Risk Exposure                                            */
/* ------------------------------------------------------------------ */

function estimateRiskExposure(
  answers: Record<string, Answer>,
  score: number
): { low: string; high: string; factors: string[] } {
  const size = answers.company_size as string;
  const incidents = answers.past_incidents as string[];
  const jurisdiction = answers.jurisdictions as string;

  // Base exposure by company size
  const baseLow: Record<string, number> = {
    under_10m: 50_000,
    "10m_50m": 150_000,
    "50m_100m": 500_000,
    "100m_500m": 1_500_000,
    over_500m: 5_000_000,
  };
  const baseHigh: Record<string, number> = {
    under_10m: 250_000,
    "10m_50m": 750_000,
    "50m_100m": 2_000_000,
    "100m_500m": 7_500_000,
    over_500m: 25_000_000,
  };

  let low = baseLow[size] ?? 150_000;
  let high = baseHigh[size] ?? 750_000;

  // Score multiplier: lower score = higher exposure
  const multiplier = score < 30 ? 2.0 : score < 50 ? 1.5 : score < 70 ? 1.2 : 1.0;
  low = Math.round(low * multiplier);
  high = Math.round(high * multiplier);

  const factors: string[] = [];
  if (incidents && !incidents.includes("none") && incidents.length > 0) {
    factors.push("Prior enforcement history increases penalty exposure by 50-200%");
  }
  if (jurisdiction === "international") {
    factors.push("International operations expose you to GDPR fines (up to 4% of global revenue)");
  }
  if (jurisdiction === "16_plus" || jurisdiction === "international") {
    factors.push("Multi-state operations multiply potential enforcement actions across jurisdictions");
  }
  if (score < 50) {
    factors.push("Low readiness score correlates with higher probability of audit findings");
  }

  const fmt = (n: number) => {
    if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
    return `$${(n / 1_000).toFixed(0)}K`;
  };

  return { low: fmt(low), high: fmt(high), factors };
}

/* ------------------------------------------------------------------ */
/*  Animation Variants                                                 */
/* ------------------------------------------------------------------ */

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.35, ease: "easeOut" as const },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
    transition: { duration: 0.25, ease: "easeIn" as const },
  }),
};

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

/* ------------------------------------------------------------------ */
/*  Sub-Components                                                     */
/* ------------------------------------------------------------------ */

function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = (current / total) * 100;
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-white/80">
          Question {current} of {total}
        </span>
        <span className="text-sm font-medium text-white/80">{Math.round(pct)}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-white/20 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-[#34D399]"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

function OptionCard({
  label,
  description,
  selected,
  onClick,
  multiSelect,
}: {
  label: string;
  description?: string;
  selected: boolean;
  onClick: () => void;
  multiSelect?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`group w-full text-left rounded-xl border-2 p-4 sm:p-5 transition-all duration-200 ${
        selected
          ? "border-[#312E81] bg-[#E0E7FF] shadow-md"
          : "border-[#E2E8F0] bg-white hover:border-[#94A3B8] hover:shadow-sm"
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-${
            multiSelect ? "md" : "full"
          } border-2 transition-colors ${
            selected
              ? "border-[#312E81] bg-[#312E81]"
              : "border-[#94A3B8] bg-white group-hover:border-[#4338CA]"
          }`}
        >
          {selected && (
            <motion.svg
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="h-3 w-3 text-white"
              viewBox="0 0 12 12"
              fill="none"
            >
              <path
                d="M2 6L5 9L10 3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <span
            className={`text-sm sm:text-base font-medium ${
              selected ? "text-[#312E81]" : "text-[#0F172A]"
            }`}
          >
            {label}
          </span>
          {description && (
            <p className="mt-0.5 text-xs sm:text-sm text-[#94A3B8]">{description}</p>
          )}
        </div>
      </div>
    </button>
  );
}

function ScoreGauge({ score, grade }: { score: number; grade: ReturnType<typeof getGrade> }) {
  const circumference = 2 * Math.PI * 88;
  const offset = circumference - (score / 100) * circumference;

  const gaugeColor =
    score >= 90
      ? "#059669"
      : score >= 70
      ? "#4338CA"
      : score >= 50
      ? "#D97706"
      : "#E11D48";

  return (
    <div className="relative flex items-center justify-center">
      <svg width="200" height="200" viewBox="0 0 200 200">
        <circle
          cx="100"
          cy="100"
          r="88"
          fill="none"
          stroke="#E2E8F0"
          strokeWidth="10"
        />
        <motion.circle
          cx="100"
          cy="100"
          r="88"
          fill="none"
          stroke={gaugeColor}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
          transform="rotate(-90 100 100)"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="text-5xl font-bold text-[#0F172A]"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          {score}
        </motion.span>
        <motion.span
          className={`mt-1 text-lg font-bold ${grade.color}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
        >
          Grade: {grade.letter}
        </motion.span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function AssessmentPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [direction, setDirection] = useState(1);
  const [showResults, setShowResults] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadInfo, setLeadInfo] = useState<LeadInfo>({ email: "", title: "", company: "" });
  const [leadErrors, setLeadErrors] = useState<Partial<LeadInfo>>({});

  const totalSteps = questions.length;
  const currentQuestion = questions[currentStep - 1];

  const handleSingleSelect = useCallback(
    (questionId: string, value: string) => {
      setAnswers((prev) => ({ ...prev, [questionId]: value }));
    },
    []
  );

  const handleMultiSelect = useCallback(
    (questionId: string, value: string) => {
      setAnswers((prev) => {
        const current = (prev[questionId] as string[]) || [];
        // "None" logic for past_incidents
        if (value === "none") {
          return { ...prev, [questionId]: ["none"] };
        }
        const filtered = current.filter((v) => v !== "none");
        if (filtered.includes(value)) {
          return { ...prev, [questionId]: filtered.filter((v) => v !== value) };
        }
        return { ...prev, [questionId]: [...filtered, value] };
      });
    },
    []
  );

  const canProceed = useCallback(() => {
    const answer = answers[currentQuestion?.id];
    if (!answer) return false;
    if (Array.isArray(answer)) return answer.length > 0;
    return true;
  }, [answers, currentQuestion]);

  const handleNext = useCallback(() => {
    if (!canProceed()) return;
    setDirection(1);
    if (currentStep === totalSteps) {
      setShowLeadForm(true);
    } else {
      setCurrentStep((s) => s + 1);
    }
  }, [canProceed, currentStep, totalSteps]);

  const handleBack = useCallback(() => {
    if (showLeadForm) {
      setShowLeadForm(false);
      return;
    }
    if (currentStep > 1) {
      setDirection(-1);
      setCurrentStep((s) => s - 1);
    }
  }, [currentStep, showLeadForm]);

  const validateLead = useCallback((): boolean => {
    const errors: Partial<LeadInfo> = {};
    if (!leadInfo.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(leadInfo.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!leadInfo.title.trim()) errors.title = "Please enter your job title";
    if (!leadInfo.company.trim()) errors.company = "Please enter your company name";
    setLeadErrors(errors);
    return Object.keys(errors).length === 0;
  }, [leadInfo]);

  const handleSubmit = useCallback(() => {
    if (!validateLead()) return;

    // Fire analytics event
    if (typeof window !== "undefined") {
      const w = window as unknown as Record<string, unknown>;
      if (w.umami) {
        (
          w.umami as {
            track: (event: string, data: Record<string, unknown>) => void;
          }
        ).track("assessment-completed", {
          score: calculateScore(answers),
          industry: answers.industry as unknown,
          company_size: answers.company_size as unknown,
        });
      }
    }

    setShowResults(true);
  }, [validateLead, answers]);

  // Results computed values
  const score = calculateScore(answers);
  const grade = getGrade(score);
  const riskAreas = identifyRiskAreas(answers);
  const regulations = getRelevantRegulations(answers);
  const exposure = estimateRiskExposure(answers, score);

  /* ---------------------------------------------------------------- */
  /*  Results Screen                                                   */
  /* ---------------------------------------------------------------- */

  if (showResults) {
    return (
      <main className="min-h-screen bg-[#F8FAFC]">
        {/* Header */}
        <div className="bg-gradient-to-br from-[#312E81] via-[#312E81] to-[#4338CA] text-white">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40" />
          <div className="relative mx-auto max-w-4xl px-6 py-12 text-center">
            <Link
              href="/"
              className="mb-6 inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
            >
              <ArrowLeft size={16} /> Back to RegShield AI
            </Link>
            <h1 className="text-3xl font-bold sm:text-4xl">
              Your Regulatory Change Readiness Report
            </h1>
            <p className="mt-3 text-lg text-white/80">
              Prepared for {leadInfo.company} — {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
        </div>

        {/* Results Body */}
        <div className="relative mx-auto max-w-4xl px-6 -mt-4 pb-20">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="space-y-8">
            {/* Score Card */}
            <motion.div
              variants={fadeIn}
              className="rounded-2xl bg-white border border-[#E2E8F0] shadow-lg p-8 sm:p-10"
            >
              <div className="flex flex-col items-center gap-8 sm:flex-row sm:gap-12">
                <ScoreGauge score={score} grade={grade} />
                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-2xl font-bold text-[#0F172A]">
                    Readiness Score: {score}/100
                  </h2>
                  <div className={`mt-2 inline-flex items-center gap-2 rounded-full px-4 py-1.5 ${grade.bgColor}`}>
                    <span className={`text-sm font-semibold ${grade.color}`}>
                      Grade {grade.letter}
                    </span>
                  </div>
                  <p className="mt-4 text-[#334155] leading-relaxed">{grade.message}</p>
                </div>
              </div>
            </motion.div>

            {/* Risk Areas */}
            <motion.div variants={fadeIn} className="rounded-2xl bg-white border border-[#E2E8F0] shadow-lg p-8 sm:p-10">
              <h3 className="flex items-center gap-3 text-xl font-bold text-[#0F172A]">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FFE4E6]">
                  <AlertTriangle size={20} className="text-[#E11D48]" />
                </div>
                Key Risk Areas
              </h3>
              <div className="mt-6 space-y-5">
                {riskAreas.map((risk, i) => (
                  <motion.div
                    key={risk.area}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.15 }}
                    className="flex items-start gap-4 rounded-xl border border-[#E2E8F0] p-5"
                  >
                    <div
                      className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${
                        risk.severity === "critical"
                          ? "bg-[#FFE4E6]"
                          : risk.severity === "high"
                          ? "bg-[#FEF3C7]"
                          : "bg-[#E0E7FF]"
                      }`}
                    >
                      <risk.icon
                        size={20}
                        className={
                          risk.severity === "critical"
                            ? "text-[#E11D48]"
                            : risk.severity === "high"
                            ? "text-[#D97706]"
                            : "text-[#4338CA]"
                        }
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h4 className="font-semibold text-[#0F172A]">{risk.area}</h4>
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            risk.severity === "critical"
                              ? "bg-[#FFE4E6] text-[#E11D48]"
                              : risk.severity === "high"
                              ? "bg-[#FEF3C7] text-[#D97706]"
                              : "bg-[#E0E7FF] text-[#4338CA]"
                          }`}
                        >
                          {risk.severity.charAt(0).toUpperCase() + risk.severity.slice(1)}
                        </span>
                      </div>
                      <p className="mt-1.5 text-sm text-[#334155] leading-relaxed">
                        {risk.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
                {riskAreas.length === 0 && (
                  <div className="flex items-center gap-3 rounded-xl border border-[#D1FAE5] bg-[#F0FDF4] p-5">
                    <CheckCircle2 size={20} className="text-[#059669]" />
                    <p className="text-sm text-[#334155]">
                      No critical risk areas identified. Your organization shows strong readiness fundamentals.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* 2026 Regulations */}
            <motion.div variants={fadeIn} className="rounded-2xl bg-white border border-[#E2E8F0] shadow-lg p-8 sm:p-10">
              <h3 className="flex items-center gap-3 text-xl font-bold text-[#0F172A]">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E0E7FF]">
                  <Scale size={20} className="text-[#4338CA]" />
                </div>
                2026 Regulations Affecting You
              </h3>
              <div className="mt-6 space-y-4">
                {regulations.map((reg, i) => (
                  <motion.div
                    key={reg.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + i * 0.12 }}
                    className="rounded-xl border border-[#E2E8F0] p-5"
                  >
                    <div className="flex items-center gap-3 flex-wrap">
                      <h4 className="font-semibold text-[#0F172A]">{reg.name}</h4>
                      <span className="rounded-full bg-[#F8FAFC] border border-[#E2E8F0] px-2.5 py-0.5 text-xs font-medium text-[#334155]">
                        {reg.year}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-[#334155] leading-relaxed">{reg.relevance}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Estimated Risk Exposure */}
            <motion.div variants={fadeIn} className="rounded-2xl bg-white border border-[#E2E8F0] shadow-lg p-8 sm:p-10">
              <h3 className="flex items-center gap-3 text-xl font-bold text-[#0F172A]">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FEF3C7]">
                  <TrendingDown size={20} className="text-[#D97706]" />
                </div>
                Estimated Risk Exposure
              </h3>
              <div className="mt-6 rounded-xl bg-gradient-to-r from-[#FEF3C7] to-[#FFE4E6] p-6">
                <p className="text-sm font-medium text-[#334155]">
                  Based on your industry, size, and readiness score:
                </p>
                <p className="mt-3 text-3xl font-bold text-[#0F172A]">
                  {exposure.low} — {exposure.high}
                </p>
                <p className="mt-1 text-sm text-[#334155]">
                  Estimated annual risk exposure from regulatory penalties, remediation costs, and audit failures.
                </p>
              </div>
              {exposure.factors.length > 0 && (
                <ul className="mt-5 space-y-3">
                  {exposure.factors.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <AlertTriangle size={16} className="mt-0.5 flex-shrink-0 text-[#D97706]" />
                      <span className="text-sm text-[#334155]">{f}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>

            {/* CTA */}
            <motion.div
              variants={fadeIn}
              className="rounded-2xl bg-gradient-to-br from-[#312E81] to-[#4338CA] p-8 sm:p-10 text-center"
            >
              <Shield size={40} className="mx-auto text-[#34D399]" />
              <h3 className="mt-4 text-2xl font-bold text-white">
                {score >= 70
                  ? "Maintain Your Strong Position with RegShield AI"
                  : score >= 50
                  ? "Close Your Gaps Before the 2026 Wave Hits"
                  : "Get Protected Before It Is Too Late"}
              </h3>
              <p className="mx-auto mt-3 max-w-xl text-white/80 leading-relaxed">
                {score >= 70
                  ? "You have a solid foundation. RegShield AI keeps you ahead of changes at a fraction of enterprise platform costs — so your team can focus on strategy, not monitoring."
                  : score >= 50
                  ? "Your gaps are manageable today, but 2026 will strain your current approach. RegShield AI automates monitoring and delivers ready-to-implement action plans."
                  : "Your organization faces significant regulatory risk. RegShield AI provides immediate coverage — monitoring 50,000+ sources and delivering expert-reviewed action plans within 72 hours."}
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <a
                  href="https://cal.com/regshield/demo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#059669] px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-[#047857] transition-all duration-200 hover:shadow-xl"
                  data-umami-event="cta-click"
                  data-umami-event-product="regshield-ai"
                  data-umami-event-location="assessment-results"
                >
                  Book a Demo <ArrowRight size={18} />
                </a>
                <Link
                  href="/#pricing"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm hover:bg-white/20 transition-all duration-200"
                  data-umami-event="cta-click"
                  data-umami-event-product="regshield-ai"
                  data-umami-event-location="assessment-pricing"
                >
                  View Pricing
                </Link>
              </div>
              <p className="mt-6 text-xs text-white/50">
                No credit card required. 30-day money-back guarantee.
              </p>
            </motion.div>
          </motion.div>

          {/* Disclaimer */}
          <p className="mt-8 text-center text-xs text-[#94A3B8]">
            This assessment provides a general indication of regulatory change readiness based on self-reported data. It does not constitute legal or compliance advice. Actual risk exposure may vary.
          </p>
        </div>
      </main>
    );
  }

  /* ---------------------------------------------------------------- */
  /*  Lead Capture Form                                                */
  /* ---------------------------------------------------------------- */

  if (showLeadForm) {
    return (
      <main className="min-h-screen bg-[#F8FAFC]">
        {/* Header */}
        <div className="bg-gradient-to-br from-[#312E81] via-[#312E81] to-[#4338CA] text-white">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40" />
          <div className="relative mx-auto max-w-3xl px-6 py-10 text-center">
            <h1 className="text-2xl font-bold sm:text-3xl">Almost There!</h1>
            <p className="mt-2 text-white/80">
              Enter your details to see your personalized Regulatory Change Readiness Report.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="relative mx-auto max-w-lg px-6 -mt-4 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl bg-white border border-[#E2E8F0] shadow-lg p-8"
          >
            <div className="space-y-5">
              {/* Email */}
              <div>
                <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-[#0F172A]">
                  <Mail size={16} className="text-[#94A3B8]" /> Work Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  value={leadInfo.email}
                  onChange={(e) => {
                    setLeadInfo((p) => ({ ...p, email: e.target.value }));
                    setLeadErrors((p) => ({ ...p, email: undefined }));
                  }}
                  className={`mt-1.5 w-full rounded-lg border-2 px-4 py-3 text-sm text-[#0F172A] placeholder-[#94A3B8] outline-none transition-colors ${
                    leadErrors.email ? "border-[#E11D48]" : "border-[#E2E8F0] focus:border-[#4338CA]"
                  }`}
                />
                {leadErrors.email && (
                  <p className="mt-1 text-xs text-[#E11D48]">{leadErrors.email}</p>
                )}
              </div>

              {/* Job Title */}
              <div>
                <label htmlFor="title" className="flex items-center gap-2 text-sm font-medium text-[#0F172A]">
                  <Briefcase size={16} className="text-[#94A3B8]" /> Job Title
                </label>
                <input
                  id="title"
                  type="text"
                  placeholder="e.g. Chief Compliance Officer"
                  value={leadInfo.title}
                  onChange={(e) => {
                    setLeadInfo((p) => ({ ...p, title: e.target.value }));
                    setLeadErrors((p) => ({ ...p, title: undefined }));
                  }}
                  className={`mt-1.5 w-full rounded-lg border-2 px-4 py-3 text-sm text-[#0F172A] placeholder-[#94A3B8] outline-none transition-colors ${
                    leadErrors.title ? "border-[#E11D48]" : "border-[#E2E8F0] focus:border-[#4338CA]"
                  }`}
                />
                {leadErrors.title && (
                  <p className="mt-1 text-xs text-[#E11D48]">{leadErrors.title}</p>
                )}
              </div>

              {/* Company */}
              <div>
                <label htmlFor="company" className="flex items-center gap-2 text-sm font-medium text-[#0F172A]">
                  <Building2 size={16} className="text-[#94A3B8]" /> Company Name
                </label>
                <input
                  id="company"
                  type="text"
                  placeholder="Your company name"
                  value={leadInfo.company}
                  onChange={(e) => {
                    setLeadInfo((p) => ({ ...p, company: e.target.value }));
                    setLeadErrors((p) => ({ ...p, company: undefined }));
                  }}
                  className={`mt-1.5 w-full rounded-lg border-2 px-4 py-3 text-sm text-[#0F172A] placeholder-[#94A3B8] outline-none transition-colors ${
                    leadErrors.company ? "border-[#E11D48]" : "border-[#E2E8F0] focus:border-[#4338CA]"
                  }`}
                />
                {leadErrors.company && (
                  <p className="mt-1 text-xs text-[#E11D48]">{leadErrors.company}</p>
                )}
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-lg bg-[#059669] px-6 py-3.5 text-base font-semibold text-white shadow-md hover:bg-[#047857] transition-all duration-200 hover:shadow-lg"
              data-umami-event="assessment-lead-submit"
              data-umami-event-product="regshield-ai"
            >
              See My Results <ArrowRight size={18} />
            </button>

            <button
              onClick={handleBack}
              className="mt-4 flex w-full items-center justify-center gap-2 text-sm text-[#94A3B8] hover:text-[#334155] transition-colors"
            >
              <ArrowLeft size={14} /> Back to questions
            </button>

            <p className="mt-6 text-center text-xs text-[#94A3B8] leading-relaxed">
              We will send your detailed report to this email. No spam — just your results and relevant regulatory intelligence. Unsubscribe anytime.
            </p>
          </motion.div>
        </div>
      </main>
    );
  }

  /* ---------------------------------------------------------------- */
  /*  Question Screens                                                 */
  /* ---------------------------------------------------------------- */

  const currentAnswer = answers[currentQuestion.id];

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      {/* Header with Progress */}
      <div className="bg-gradient-to-br from-[#312E81] via-[#312E81] to-[#4338CA] text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <Link href="/" className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#059669] text-xs font-bold text-white">
                RS
              </div>
              <span className="hidden sm:inline font-medium">RegShield AI</span>
            </Link>
            <span className="text-sm text-white/60">
              ~ 3 min assessment
            </span>
          </div>
          <ProgressBar current={currentStep} total={totalSteps} />
        </div>
      </div>

      {/* Question Area */}
      <div className="relative mx-auto max-w-2xl px-6 -mt-2 pb-20">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="rounded-2xl bg-white border border-[#E2E8F0] shadow-lg p-6 sm:p-8"
          >
            {/* Question Header */}
            <div className="flex items-start gap-4 mb-6">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[#E0E7FF]">
                <currentQuestion.icon size={24} className="text-[#4338CA]" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] leading-snug">
                  {currentQuestion.title}
                </h2>
                <p className="mt-1 text-sm text-[#94A3B8]">{currentQuestion.subtitle}</p>
              </div>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option) => {
                const isSelected =
                  currentQuestion.type === "single"
                    ? currentAnswer === option.value
                    : Array.isArray(currentAnswer) && currentAnswer.includes(option.value);

                return (
                  <OptionCard
                    key={option.value}
                    label={option.label}
                    description={option.description}
                    selected={isSelected}
                    multiSelect={currentQuestion.type === "multi"}
                    onClick={() =>
                      currentQuestion.type === "single"
                        ? handleSingleSelect(currentQuestion.id, option.value)
                        : handleMultiSelect(currentQuestion.id, option.value)
                    }
                  />
                );
              })}
            </div>

            {currentQuestion.type === "multi" && (
              <p className="mt-3 text-xs text-[#94A3B8]">Select all that apply</p>
            )}

            {/* Navigation */}
            <div className="mt-8 flex items-center justify-between">
              {currentStep > 1 ? (
                <button
                  onClick={handleBack}
                  className="flex items-center gap-1.5 text-sm font-medium text-[#94A3B8] hover:text-[#334155] transition-colors"
                >
                  <ArrowLeft size={16} /> Back
                </button>
              ) : (
                <Link
                  href="/"
                  className="flex items-center gap-1.5 text-sm font-medium text-[#94A3B8] hover:text-[#334155] transition-colors"
                >
                  <ArrowLeft size={16} /> Home
                </Link>
              )}

              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className={`flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-white transition-all duration-200 ${
                  canProceed()
                    ? "bg-[#059669] hover:bg-[#047857] shadow-md hover:shadow-lg"
                    : "bg-[#94A3B8] cursor-not-allowed"
                }`}
                data-umami-event="assessment-next"
                data-umami-event-step={currentStep}
              >
                {currentStep === totalSteps ? "Get My Results" : "Next"}{" "}
                <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Trust signals */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-[#94A3B8]">
          <div className="flex items-center gap-1.5">
            <Shield size={14} /> No credit card required
          </div>
          <div className="flex items-center gap-1.5">
            <Zap size={14} /> Results in 30 seconds
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={14} /> 100% free assessment
          </div>
        </div>
      </div>
    </main>
  );
}
