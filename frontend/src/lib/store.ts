import { create } from "zustand";
import type {
  Client,
  ClientJurisdiction,
  RegulatoryChange,
  ImpactAssessment,
  Obligation,
  ActionPlan,
  ActionItem,
  PolicyMapping,
  ComplianceEvidence,
  AuditLog,
  DashboardOverview,
} from "../types";
import {
  clients,
  clientJurisdictions,
  regulatoryChanges,
  impactAssessments,
  obligations,
  actionPlans,
  actionItems,
  policyMappings,
  complianceEvidence,
  auditLogs,
  dashboardOverviews,
  complianceScoreHistory,
} from "./demo-data";

// ─── Store Types ─────────────────────────────────────────────────────────────

interface AppState {
  // Auth & UI
  isAuthenticated: boolean;
  sidebarOpen: boolean;
  currentClientId: string;

  // Actions
  setCurrentClient: (clientId: string) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setAuthenticated: (auth: boolean) => void;

  // Client getters
  getCurrentClient: () => Client;
  getClients: () => Client[];
  getClientById: (id: string) => Client | undefined;
  getJurisdictionsForClient: (clientId?: string) => ClientJurisdiction[];

  // Regulatory changes
  getRegulatoryChanges: () => RegulatoryChange[];
  getChangesForClient: (clientId?: string) => RegulatoryChange[];
  getChangeById: (id: string) => RegulatoryChange | undefined;

  // Impact assessments
  getImpactAssessments: (clientId?: string) => ImpactAssessment[];
  getImpactAssessmentById: (id: string) => ImpactAssessment | undefined;
  getImpactAssessmentsForChange: (changeId: string) => ImpactAssessment[];

  // Obligations
  getObligationsForClient: (clientId?: string) => Obligation[];
  getObligationById: (id: string) => Obligation | undefined;
  getObligationsForChange: (changeId: string) => Obligation[];

  // Action plans
  getActionPlansForClient: (clientId?: string) => ActionPlan[];
  getActionPlanById: (id: string) => ActionPlan | undefined;

  // Action items
  getActionItemsForClient: (clientId?: string) => ActionItem[];
  getActionItemById: (id: string) => ActionItem | undefined;
  getActionItemsForPlan: (planId: string) => ActionItem[];
  getOverdueActionItems: (clientId?: string) => ActionItem[];

  // Policy mappings
  getPolicyMappingsForClient: (clientId?: string) => PolicyMapping[];
  getPolicyMappingById: (id: string) => PolicyMapping | undefined;

  // Compliance evidence
  getEvidenceForClient: (clientId?: string) => ComplianceEvidence[];
  getEvidenceForActionItem: (actionItemId: string) => ComplianceEvidence[];

  // Audit logs
  getAuditLogsForClient: (clientId?: string) => AuditLog[];
  getRecentAuditLogs: (clientId?: string, limit?: number) => AuditLog[];

  // Dashboard
  getDashboardOverview: (clientId?: string) => DashboardOverview | undefined;
  getComplianceScoreHistory: (clientId?: string) => { month: string; score: number }[];
}

// ─── Store ───────────────────────────────────────────────────────────────────

export const useAppStore = create<AppState>()((set, get) => ({
  // ── State ────────────────────────────────────────────────────────────────

  isAuthenticated: true,
  sidebarOpen: true,
  currentClientId: clients[0].id,

  // ── Actions ──────────────────────────────────────────────────────────────

  setCurrentClient: (clientId: string) => {
    set({ currentClientId: clientId });
  },

  toggleSidebar: () => {
    set((state) => ({ sidebarOpen: !state.sidebarOpen }));
  },

  setSidebarOpen: (open: boolean) => {
    set({ sidebarOpen: open });
  },

  setAuthenticated: (auth: boolean) => {
    set({ isAuthenticated: auth });
  },

  // ── Client Getters ───────────────────────────────────────────────────────

  getCurrentClient: () => {
    const { currentClientId } = get();
    return clients.find((c) => c.id === currentClientId) ?? clients[0];
  },

  getClients: () => clients,

  getClientById: (id: string) => clients.find((c) => c.id === id),

  getJurisdictionsForClient: (clientId?: string) => {
    const id = clientId ?? get().currentClientId;
    return clientJurisdictions.filter((j) => j.client_id === id);
  },

  // ── Regulatory Changes ───────────────────────────────────────────────────

  getRegulatoryChanges: () => regulatoryChanges,

  getChangesForClient: (clientId?: string) => {
    const id = clientId ?? get().currentClientId;
    const jurisdictions = clientJurisdictions
      .filter((j) => j.client_id === id)
      .map((j) => j.jurisdiction_code);

    return regulatoryChanges.filter((rc) => {
      // Match by jurisdiction
      const jurisdictionMatch = jurisdictions.includes(rc.jurisdiction_code);
      // Also match if there's an impact assessment linking this change to the client
      const assessmentMatch = impactAssessments.some(
        (ia) => ia.client_id === id && ia.regulatory_change_id === rc.id
      );
      return jurisdictionMatch || assessmentMatch;
    });
  },

  getChangeById: (id: string) => regulatoryChanges.find((rc) => rc.id === id),

  // ── Impact Assessments ───────────────────────────────────────────────────

  getImpactAssessments: (clientId?: string) => {
    const id = clientId ?? get().currentClientId;
    return impactAssessments.filter((ia) => ia.client_id === id);
  },

  getImpactAssessmentById: (id: string) =>
    impactAssessments.find((ia) => ia.id === id),

  getImpactAssessmentsForChange: (changeId: string) =>
    impactAssessments.filter((ia) => ia.regulatory_change_id === changeId),

  // ── Obligations ──────────────────────────────────────────────────────────

  getObligationsForClient: (clientId?: string) => {
    const id = clientId ?? get().currentClientId;
    return obligations.filter((ob) => ob.client_id === id);
  },

  getObligationById: (id: string) => obligations.find((ob) => ob.id === id),

  getObligationsForChange: (changeId: string) =>
    obligations.filter((ob) => ob.regulatory_change_id === changeId),

  // ── Action Plans ─────────────────────────────────────────────────────────

  getActionPlansForClient: (clientId?: string) => {
    const id = clientId ?? get().currentClientId;
    return actionPlans.filter((ap) => ap.client_id === id);
  },

  getActionPlanById: (id: string) => actionPlans.find((ap) => ap.id === id),

  // ── Action Items ─────────────────────────────────────────────────────────

  getActionItemsForClient: (clientId?: string) => {
    const id = clientId ?? get().currentClientId;
    return actionItems.filter((ai) => ai.client_id === id);
  },

  getActionItemById: (id: string) => actionItems.find((ai) => ai.id === id),

  getActionItemsForPlan: (planId: string) =>
    actionItems.filter((ai) => ai.action_plan_id === planId),

  getOverdueActionItems: (clientId?: string) => {
    const id = clientId ?? get().currentClientId;
    return actionItems.filter(
      (ai) => ai.client_id === id && ai.status === "overdue"
    );
  },

  // ── Policy Mappings ──────────────────────────────────────────────────────

  getPolicyMappingsForClient: (clientId?: string) => {
    const id = clientId ?? get().currentClientId;
    return policyMappings.filter((pm) => pm.client_id === id);
  },

  getPolicyMappingById: (id: string) =>
    policyMappings.find((pm) => pm.id === id),

  // ── Compliance Evidence ──────────────────────────────────────────────────

  getEvidenceForClient: (clientId?: string) => {
    const id = clientId ?? get().currentClientId;
    return complianceEvidence.filter((ce) => ce.client_id === id);
  },

  getEvidenceForActionItem: (actionItemId: string) =>
    complianceEvidence.filter((ce) => ce.action_item_id === actionItemId),

  // ── Audit Logs ───────────────────────────────────────────────────────────

  getAuditLogsForClient: (clientId?: string) => {
    const id = clientId ?? get().currentClientId;
    return auditLogs
      .filter((al) => al.client_id === id)
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
  },

  getRecentAuditLogs: (clientId?: string, limit = 10) => {
    const id = clientId ?? get().currentClientId;
    return auditLogs
      .filter((al) => al.client_id === id)
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )
      .slice(0, limit);
  },

  // ── Dashboard ────────────────────────────────────────────────────────────

  getDashboardOverview: (clientId?: string) => {
    const id = clientId ?? get().currentClientId;
    return dashboardOverviews[id];
  },

  getComplianceScoreHistory: (clientId?: string) => {
    const id = clientId ?? get().currentClientId;
    return complianceScoreHistory[id] ?? [];
  },
}));
