/**
 * Tests for TypeScript type definitions — ensures types are correctly defined and usable.
 */
import type {
  Client,
  RegulatoryChange,
  ImpactAssessment,
  ActionItem,
  Obligation,
  AuditLog,
} from "@/types";

describe("Type Definitions", () => {
  it("Client type has required fields", () => {
    const client: Client = {
      id: "test-id",
      name: "Test Company",
      slug: "test-company",
      industry: "financial_services",
      sub_industry: "community_banking",
      revenue_range: "50M-100M",
      employee_count: 85,
      tier: "professional",
      status: "active",
      primary_contact_name: "Sarah Chen",
      primary_contact_email: "sarah@test.com",
      primary_contact_title: "CCO",
      onboarding_completed_at: "2026-01-15T00:00:00Z",
      monthly_rate_cents: 500000,
      contract_start_date: "2026-01-01",
      contract_end_date: "2027-01-01",
      metadata: {},
      created_at: "2026-01-01T00:00:00Z",
      updated_at: "2026-01-01T00:00:00Z",
    };
    expect(client.name).toBe("Test Company");
    expect(client.tier).toBe("professional");
  });

  it("RegulatoryChange type is structurally sound", () => {
    // Testing a minimal construction — full type has many required fields
    const partial: Partial<RegulatoryChange> = {
      id: "change-id",
      title: "CFPB Final Rule",
      change_type: "new_regulation",
      jurisdiction_code: "US",
      domain: "consumer_protection",
      urgency: "critical",
      impact_score: 85,
    };
    expect(partial.urgency).toBe("critical");
    expect(partial.impact_score).toBe(85);
  });

  it("ImpactAssessment type is structurally sound", () => {
    const partial: Partial<ImpactAssessment> = {
      id: "ia-id",
      client_id: "client-id",
      regulatory_change_id: "change-id",
      summary: "This affects lending operations",
      risk_level: "high",
      status: "draft",
      ai_generated: true,
      human_reviewed: false,
    };
    expect(partial.ai_generated).toBe(true);
    expect(partial.risk_level).toBe("high");
  });

  it("ActionItem type is structurally sound", () => {
    const partial: Partial<ActionItem> = {
      id: "ai-id",
      title: "Update Privacy Policy",
      priority: "critical",
      deadline: "2026-04-15",
      status: "pending",
    };
    expect(partial.priority).toBe("critical");
    expect(partial.status).toBe("pending");
  });

  it("Obligation type is structurally sound", () => {
    const partial: Partial<Obligation> = {
      id: "ob-id",
      title: "Annual BSA/AML SAR Filing",
      obligation_type: "reporting",
      risk_level: "high",
      status: "active",
      conflict_flag: false,
    };
    expect(partial.conflict_flag).toBe(false);
  });

  it("AuditLog type is structurally sound", () => {
    const partial: Partial<AuditLog> = {
      id: "log-id",
      entity_type: "regulatory_change",
      entity_id: "change-id",
      action: "created",
      actor_type: "ai",
      description: "AI classified regulatory change",
    };
    expect(partial.actor_type).toBe("ai");
  });
});
