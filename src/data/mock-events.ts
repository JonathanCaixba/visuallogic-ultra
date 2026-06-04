import type { AgentEvent } from "@/types";

export const mockAgentEvents: AgentEvent[] = [
  {
    id: "event-revenue-001",
    severity: "high",
    domain: "revenue",
    timestamp: "2026-06-04T04:12:00.000Z",
    agent: "Revenue Intelligence Agent",
    status: "monitoring",
    title: "Northwest revenue variance",
    description: "Closed won revenue is tracking below the quarterly benchmark.",
    relatedDashboardId: "dashboard-executive-combined"
  },
  {
    id: "event-support-001",
    severity: "critical",
    domain: "support",
    timestamp: "2026-06-04T04:36:00.000Z",
    agent: "Support Monitoring Agent",
    status: "new",
    title: "Enterprise SLA risk",
    description: "Priority cases are approaching escalation thresholds.",
    relatedDashboardId: "dashboard-support-operations"
  },
  {
    id: "event-exec-001",
    severity: "medium",
    domain: "executive",
    timestamp: "2026-06-04T05:05:00.000Z",
    agent: "Executive Intelligence Agent",
    status: "reviewing",
    title: "Pipeline quality signal",
    description: "Late-stage opportunity mix shifted toward strategic accounts.",
    relatedDashboardId: "dashboard-sales-performance"
  },
  {
    id: "event-system-001",
    severity: "low",
    domain: "system",
    timestamp: "2026-06-04T05:41:00.000Z",
    agent: "Dashboard Visualization Agent",
    status: "resolved",
    title: "Dashboard template refreshed",
    description: "Executive combined template metadata is ready for presentation.",
    relatedDashboardId: "dashboard-executive-combined"
  }
];
