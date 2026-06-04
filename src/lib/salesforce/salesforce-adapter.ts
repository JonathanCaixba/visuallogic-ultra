import type {
  AgentEvent,
  DashboardConfiguration,
  GenerateDashboardRequest,
  GenerateDashboardResponse,
  PersistedDashboardLayout,
  SaveLayoutRequest
} from "@/types";

export interface SalesforceAgentforceAdapter {
  getLatestDashboard(): Promise<DashboardConfiguration>;
  getDashboardById(id: string): Promise<DashboardConfiguration>;
  getEvents(): Promise<AgentEvent[]>;
  generateDashboard(request: GenerateDashboardRequest): Promise<GenerateDashboardResponse>;
  saveLayout(request: SaveLayoutRequest): Promise<PersistedDashboardLayout>;
}
