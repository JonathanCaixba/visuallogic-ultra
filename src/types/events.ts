import type { AgentName } from "./agent";

export type AgentEventSeverity = "low" | "medium" | "high" | "critical";

export type AgentEventDomain = "revenue" | "support" | "executive" | "system";

export interface AgentEvent {
  id: string;
  severity: AgentEventSeverity;
  domain: AgentEventDomain;
  timestamp: string;
  agent: AgentName;
  status: "new" | "reviewing" | "resolved" | "monitoring";
  title: string;
  description: string;
  relatedDashboardId?: string;
}
