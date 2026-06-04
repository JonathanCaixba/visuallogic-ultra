import { buildAgentTasks, inferTemplateFromPrompt } from "@/data/mock-agent";
import { dashboardById, dashboardByTemplate, latestDashboardId } from "@/data/mock-dashboards";
import { getAccountsTableWidget } from "@/services/salesforce/dashboard-builder";
import { getRealKpis } from "@/services/salesforce/kpi-builder";
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
  const dashboard = cloneDashboard(
    requireDashboard(latestDashboardId)
  );

  const kpis = await getRealKpis();

  const tableIndex = dashboard.widgets.findIndex(
    (widget) => widget.id === "table-primary"
  );

  if (tableIndex >= 0) {
    dashboard.widgets[tableIndex] =
      await getAccountsTableWidget();
  }

  dashboard.widgets.forEach((widget) => {
  if (widget.id === "kpi-1" && widget.type === "kpi") {
    widget.data.value = kpis.accounts;
    widget.title = "Accounts";
  }

  if (widget.id === "kpi-2" && widget.type === "kpi") {
    widget.data.value = kpis.opportunities;
    widget.title = "Opportunities";
  }

  if (widget.id === "kpi-3" && widget.type === "kpi") {
    widget.data.value = kpis.cases;
    widget.title = "Cases";
  }
});

  return dashboard;
}

  async getDashboardById(
  id: string
): Promise<DashboardConfiguration> {

  const dashboard = cloneDashboard(
    requireDashboard(id)
  );

  const kpis = await getRealKpis();

  dashboard.widgets.forEach((widget) => {
  if (widget.id === "kpi-1" && widget.type === "kpi") {
    widget.data.value = kpis.accounts;
    widget.title = "Accounts";
  }

  if (widget.id === "kpi-2" && widget.type === "kpi") {
    widget.data.value = kpis.opportunities;
    widget.title = "Opportunities";
  }

  if (widget.id === "kpi-3" && widget.type === "kpi") {
    widget.data.value = kpis.cases;
    widget.title = "Cases";
  }
});

  const tableIndex = dashboard.widgets.findIndex(
    (widget) => widget.id === "table-primary"
  );

  if (tableIndex >= 0) {
    dashboard.widgets[tableIndex] =
      await getAccountsTableWidget();
  }
  

  return dashboard;
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
