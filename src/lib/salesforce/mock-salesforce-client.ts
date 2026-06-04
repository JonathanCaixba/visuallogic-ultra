import { buildAgentTasks, inferTemplateFromPrompt } from "@/data/mock-agent";
import { dashboardById, dashboardByTemplate, latestDashboardId } from "@/data/mock-dashboards";
import { mockAgentEvents } from "@/data/mock-events";
import type {
  AgentEvent,
  DashboardConfiguration,
  GenerateDashboardRequest,
  GenerateDashboardResponse,
  PersistedDashboardLayout,
  SaveLayoutRequest
} from "@/types";
import type { SalesforceAgentforceAdapter } from "@/lib/salesforce/salesforce-adapter";
import { createRequestId } from "@/lib/utils";

function cloneDashboard(dashboard: DashboardConfiguration): DashboardConfiguration {
  return structuredClone(dashboard);
}

function requireDashboard(id: string): DashboardConfiguration {
  const dashboard = dashboardById[id];

  if (!dashboard) {
    throw new Error(`Dashboard '${id}' was not found in the mock Agentforce adapter.`);
  }

  return dashboard;
}

class MockSalesforceAgentforceClient implements SalesforceAgentforceAdapter {
  async getLatestDashboard(): Promise<DashboardConfiguration> {
    return cloneDashboard(requireDashboard(latestDashboardId));
  }

  async getDashboardById(id: string): Promise<DashboardConfiguration> {
    return cloneDashboard(requireDashboard(id));
  }

  async getEvents(): Promise<AgentEvent[]> {
    return structuredClone(mockAgentEvents);
  }

  async generateDashboard(request: GenerateDashboardRequest): Promise<GenerateDashboardResponse> {
    const template = request.templateHint ?? inferTemplateFromPrompt(request.prompt);
    const dashboard = dashboardByTemplate[template];

    return {
      requestId: createRequestId("agentforce"),
      dashboardId: dashboard.id,
      template,
      tasks: buildAgentTasks("pending"),
      createdAt: new Date().toISOString()
    };
  }

  async saveLayout(request: SaveLayoutRequest): Promise<PersistedDashboardLayout> {
    return {
      dashboardId: request.dashboardId,
      layout: request.layout,
      hiddenWidgetIds: request.hiddenWidgetIds ?? [],
      savedAt: new Date().toISOString()
    };
  }
}

export const salesforceAgentforceClient = new MockSalesforceAgentforceClient();
