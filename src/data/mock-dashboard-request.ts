import type { DashboardRequestConfiguration } from "@/types";

export const mockDashboardRequest: DashboardRequestConfiguration = {
  template: "executive_combined",

  dashboardType: "combined",

  dashboardName: "🚀 DASHBOARD GENERADO POR AGENTFORCE DE VISUALLOGIC ULTRA 🚀",

  sales: {
    opportunities: "39"
  },

  support: {
    cases: "17"
  },

  kpis: [
    "Revenue",
    "Pipeline",
    "Open Cases",
    "SLA Risk"
  ],

  charts: [
    "Revenue Trend",
    "Open Cases by Priority",
    "Business Health Overview"
  ]
};