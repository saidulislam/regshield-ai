// ─── Enum-like String Literal Types ───────────────────────────────────────────

export type ClientTier = "starter" | "professional" | "enterprise";
export type ClientStatus = "active" | "onboarding" | "suspended" | "churned";

export type JurisdictionType = "federal" | "state" | "local" | "international";

export type SourceType = "rss" | "api" | "scraper" | "manual" | "webhook";
export type PollFrequency = number; // minutes

export type ChangeType =
  | "new_regulation"
  | "amendment"
  | "repeal"
  | "guidance"
  | "enforcement_action"
  | "proposed_rule"
  | "final_rule";

export type Urgency = "critical" | "high" | "medium" | "low";

export type RiskLevel = "critical" | "high" | "medium" | "low" | "negligible";

export type PipelineStatus =
  | "ingested"
  | "classified"
  | "matched"
  | "assessed"
  | "published"
  | "archived";

export type ImpactAssessmentStatus =
  | "draft"
  | "in_review"
  | "approved"
  | "rejected"
  | "superseded";

export type ObligationType =
  | "reporting"
  | "disclosure"
  | "operational"
  | "governance"
  | "licensing"
  | "record_keeping"
  | "training"
  | "audit";

export type ObligationCategory =
  | "data_privacy"
  | "financial"
  | "environmental"
  | "labor"
  | "health_safety"
  | "consumer_protection"
  | "cybersecurity"
  | "anti_money_laundering"
  | "tax"
  | "other";

export type ObligationStatus =
  | "pending"
  | "active"
  | "in_progress"
  | "compliant"
  | "non_compliant"
  | "waived"
  | "expired";

export type Recurrence =
  | "one_time"
  | "daily"
  | "weekly"
  | "monthly"
  | "quarterly"
  | "semi_annual"
  | "annual";

export type ActionPlanStatus =
  | "draft"
  | "active"
  | "in_progress"
  | "completed"
  | "on_hold"
  | "cancelled";

export type ActionItemPriority = "critical" | "high" | "medium" | "low";

export type ActionItemStatus =
  | "pending"
  | "in_progress"
  | "blocked"
  | "completed"
  | "cancelled"
  | "overdue";

export type MappingType = "full" | "partial" | "gap" | "not_applicable";

export type PolicyMappingStatus =
  | "identified"
  | "in_progress"
  | "remediated"
  | "accepted";

export type EvidenceType =
  | "document"
  | "screenshot"
  | "log"
  | "attestation"
  | "report"
  | "certificate"
  | "other";

export type AuditAction =
  | "created"
  | "updated"
  | "deleted"
  | "status_changed"
  | "assigned"
  | "reviewed"
  | "approved"
  | "rejected"
  | "uploaded"
  | "verified";

export type ActorType = "user" | "system" | "ai";

// ─── Core Entities ───────────────────────────────────────────────────────────

export interface Client {
  id: string;
  name: string;
  slug: string;
  industry: string;
  sub_industry: string;
  revenue_range: string;
  employee_count: number;
  tier: ClientTier;
  status: ClientStatus;
  primary_contact_name: string;
  primary_contact_email: string;
  primary_contact_title: string;
  onboarding_completed_at: string | null;
  monthly_rate_cents: number;
  contract_start_date: string;
  contract_end_date: string;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface ClientJurisdiction {
  id: string;
  client_id: string;
  jurisdiction_type: JurisdictionType;
  jurisdiction_code: string;
  jurisdiction_name: string;
  is_primary: boolean;
}

export interface RegulatorySource {
  id: string;
  name: string;
  source_type: SourceType;
  url: string;
  jurisdiction_code: string;
  regulatory_body: string;
  domain: string;
  poll_frequency_minutes: number;
  adapter_class: string;
  is_active: boolean;
  last_polled_at: string | null;
  error_count: number;
  created_at: string;
  updated_at: string;
}

export interface RegulatoryChange {
  id: string;
  regulation_id: string;
  source_id: string;
  title: string;
  change_type: ChangeType;
  jurisdiction_code: string;
  regulatory_body: string;
  domain: string;
  industry_tags: string[];
  published_date: string;
  effective_date: string | null;
  comment_deadline: string | null;
  urgency: Urgency;
  impact_score: number;
  summary: string;
  full_text: string;
  source_url: string;
  classification_confidence: number;
  pipeline_status: PipelineStatus;
  human_review_required: boolean;
  created_at: string;
  updated_at: string;
}

export interface ImpactAssessment {
  id: string;
  client_id: string;
  regulatory_change_id: string;
  summary: string;
  impact_description: string;
  affected_business_units: string[];
  affected_processes: string[];
  risk_level: RiskLevel;
  estimated_effort_hours: number;
  implementation_deadline: string | null;
  enforcement_timeline: string | null;
  conflict_flags: string[];
  ai_generated: boolean;
  human_reviewed: boolean;
  status: ImpactAssessmentStatus;
  created_at: string;
  updated_at: string;
}

export interface Obligation {
  id: string;
  client_id: string;
  regulation_id: string;
  regulatory_change_id: string;
  title: string;
  description: string;
  obligation_type: ObligationType;
  category: ObligationCategory;
  effective_date: string;
  deadline: string | null;
  recurrence: Recurrence;
  risk_level: RiskLevel;
  status: ObligationStatus;
  conflict_flag: boolean;
  conflict_details: string | null;
  created_at: string;
  updated_at: string;
}

export interface ActionPlan {
  id: string;
  client_id: string;
  impact_assessment_id: string;
  title: string;
  executive_summary: string;
  total_action_items: number;
  completed_action_items: number;
  estimated_total_hours: number;
  earliest_deadline: string | null;
  latest_deadline: string | null;
  status: ActionPlanStatus;
  created_at: string;
  updated_at: string;
}

export interface ActionItem {
  id: string;
  action_plan_id: string;
  client_id: string;
  obligation_id: string;
  title: string;
  description: string;
  assigned_to: string | null;
  assigned_role: string | null;
  priority: ActionItemPriority;
  deadline: string | null;
  estimated_hours: number;
  evidence_requirements: string[];
  status: ActionItemStatus;
  started_at: string | null;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface PolicyMapping {
  id: string;
  client_id: string;
  obligation_id: string;
  policy_name: string;
  policy_section: string;
  mapping_type: MappingType;
  gap_description: string | null;
  status: PolicyMappingStatus;
  created_at: string;
  updated_at: string;
}

export interface ComplianceEvidence {
  id: string;
  client_id: string;
  action_item_id: string;
  evidence_type: EvidenceType;
  title: string;
  description: string;
  file_name: string;
  uploaded_by: string;
  verified: boolean;
  verified_by: string | null;
  verified_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface AuditLog {
  id: string;
  client_id: string;
  entity_type: string;
  entity_id: string;
  action: AuditAction;
  actor_type: ActorType;
  actor_id: string;
  actor_name: string;
  old_values: Record<string, unknown> | null;
  new_values: Record<string, unknown> | null;
  description: string;
  created_at: string;
}

// ─── Dashboard ───────────────────────────────────────────────────────────────

export interface DashboardOverview {
  compliance_score: number;
  score_trend: number;
  active_changes: number;
  pending_action_items: number;
  overdue_items: number;
  upcoming_deadlines: UpcomingDeadline[];
  recent_activity: RecentActivity[];
}

export interface UpcomingDeadline {
  id: string;
  title: string;
  deadline: string;
  entity_type: string;
  entity_id: string;
  risk_level: RiskLevel;
}

export interface RecentActivity {
  id: string;
  description: string;
  actor_name: string;
  actor_type: ActorType;
  action: AuditAction;
  created_at: string;
}
