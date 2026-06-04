import type { DashboardTemplateId } from "./dashboard";

export type AgentStatus = "pending" | "running" | "completed" | "failed";

export type AgentName =
  | "Dashboard Visualization Agent"
  | "Revenue Intelligence Agent"
  | "Support Monitoring Agent"
  | "Executive Intelligence Agent";

export interface AgentTask {
  id: string;
  agentName: AgentName;
  status: AgentStatus;
  description: string;
  startedAt?: string;
  completedAt?: string;
}

export interface GenerateDashboardRequest {
  prompt: string;
  templateHint?: DashboardTemplateId;
}

export interface GenerateDashboardResponse {
  requestId: string;
  dashboardId: string;
  template: DashboardTemplateId;
  tasks: AgentTask[];
  createdAt: string;
}
