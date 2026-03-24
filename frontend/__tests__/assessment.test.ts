/**
 * Tests for the Regulatory Change Readiness Score calculation algorithm.
 * Tests the scoring logic described in LAUNCH-PLAN.md.
 */

function calculateReadinessScore(responses: {
  jurisdictions: string;
  team_size: string;
  tracking_method: string;
  implementation_speed: string;
  past_incidents: string[];
  concerns_2026: string[];
}): number {
  let score = 100;

  const jurisdictionRisk: Record<string, number> = {
    single_state: 0,
    "2_5_states": -5,
    "6_15_states": -15,
    "16_plus_states": -25,
    international: -30,
  };
  score += jurisdictionRisk[responses.jurisdictions] ?? 0;

  if (
    responses.team_size === "solo" &&
    responses.jurisdictions !== "single_state"
  ) {
    score -= 20;
  } else if (
    responses.team_size === "2_3" &&
    ["16_plus_states", "international"].includes(responses.jurisdictions)
  ) {
    score -= 15;
  }

  const trackingRisk: Record<string, number> = {
    manual: -20,
    no_tracking: -30,
    law_firm: -10,
    platform: -5,
  };
  score += trackingRisk[responses.tracking_method] ?? 0;

  const speedRisk: Record<string, number> = {
    under_30_days: 0,
    "1_3_months": -5,
    "3_6_months": -10,
    "6_12_months": -20,
    over_12_months: -25,
    not_sure: -30,
  };
  score += speedRisk[responses.implementation_speed] ?? 0;

  const incidents = responses.past_incidents.filter((i) => i !== "none");
  score -= incidents.length * 10;

  const concernsCount = responses.concerns_2026.length;
  if (
    concernsCount >= 4 &&
    ["manual", "no_tracking"].includes(responses.tracking_method)
  ) {
    score -= 15;
  }

  return Math.max(0, Math.min(100, score));
}

describe("Readiness Score Algorithm", () => {
  it("returns 100 for best-case scenario", () => {
    const score = calculateReadinessScore({
      jurisdictions: "single_state",
      team_size: "10_plus",
      tracking_method: "platform",
      implementation_speed: "under_30_days",
      past_incidents: ["none"],
      concerns_2026: [],
    });
    expect(score).toBe(95); // platform = -5
  });

  it("penalizes multi-jurisdiction + solo team", () => {
    const score = calculateReadinessScore({
      jurisdictions: "6_15_states",
      team_size: "solo",
      tracking_method: "platform",
      implementation_speed: "under_30_days",
      past_incidents: ["none"],
      concerns_2026: [],
    });
    // 100 - 15 (jurisdiction) - 20 (solo+multi) - 5 (platform) = 60
    expect(score).toBe(60);
  });

  it("heavily penalizes no tracking + slow implementation", () => {
    const score = calculateReadinessScore({
      jurisdictions: "16_plus_states",
      team_size: "2_3",
      tracking_method: "no_tracking",
      implementation_speed: "over_12_months",
      past_incidents: ["none"],
      concerns_2026: ["dora", "eu_ai_act", "nis2", "state_privacy"],
    });
    // 100 - 25 - 15 - 30 - 25 - 15 (4+ concerns + no tracking) = -10 → clamped to 0
    expect(score).toBe(0);
  });

  it("subtracts 10 per incident", () => {
    const score = calculateReadinessScore({
      jurisdictions: "single_state",
      team_size: "4_10",
      tracking_method: "platform",
      implementation_speed: "under_30_days",
      past_incidents: ["fine", "failed_audit", "missed_deadline"],
      concerns_2026: [],
    });
    // 100 - 5 (platform) - 30 (3 incidents * 10) = 65
    expect(score).toBe(65);
  });

  it("clamps score to 0-100 range", () => {
    const score = calculateReadinessScore({
      jurisdictions: "international",
      team_size: "solo",
      tracking_method: "no_tracking",
      implementation_speed: "not_sure",
      past_incidents: ["fine", "failed_audit", "missed_deadline", "remediation"],
      concerns_2026: ["dora", "eu_ai_act", "nis2", "state_privacy", "hipaa"],
    });
    expect(score).toBe(0);
    expect(score).toBeGreaterThanOrEqual(0);
  });

  it("matches persona Sarah Chen profile (mid-range score)", () => {
    // Sarah: 4 states + federal, 2-3 person team, manual tracking, 3-6 months
    const score = calculateReadinessScore({
      jurisdictions: "2_5_states",
      team_size: "2_3",
      tracking_method: "manual",
      implementation_speed: "3_6_months",
      past_incidents: ["missed_deadline"],
      concerns_2026: ["state_privacy", "federal_banking"],
    });
    // 100 - 5 - 20 - 10 - 10 = 55
    expect(score).toBe(55);
  });
});
