import { buildAgentTasks, inferTemplateFromPrompt } from "@/data/mock-agent";
import { dashboardById, dashboardByTemplate, latestDashboardId } from "@/data/mock-dashboards";
import { getAccountsTableWidget } from "@/services/salesforce/dashboard-builder";
import { getRealKpis } from "@/services/salesforce/kpi-builder";
import { getOpportunityChartData } from "@/services/salesforce/kpi-builder";
import { getRecentCases } from "@/services/salesforce/kpi-builder";
import { getBusinessSummary } from "@/services/salesforce/kpi-builder";
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
  const chartData = await getOpportunityChartData();
  const cases = await getRecentCases();
  const summary = await getBusinessSummary();

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
  
  if (widget.id === "table-primary") {
  widget.title = "Recent Cases";

  widget.data = {
    columns: [
      {
        key: "caseNumber",
        label: "Case"
      },
      {
        key: "subject",
        label: "Subject"
      },
      {
        key: "status",
        label: "Status"
      }
    ],

    rows: cases.map(
      (item: {
        CaseNumber: string;
        Subject: string;
        Status: string;
      }) => ({
        caseNumber: item.CaseNumber,
        subject: item.Subject,
        status: item.Status
      })
    )
  };
}

  if (widget.id === "chart-primary") {
  widget.title = "Salesforce Opportunities";

  widget.data = {
    xKey: "label",
    series: [
      {
        key: "value",
        label: "Opportunities",
        color: "#0f9f6e"
      }
    ],
    data: chartData
  };
}

if (widget.id === "insight-primary") {
  widget.title = "Salesforce Intelligence";

  widget.data = {
    agent: "VisualLogic AI",
    severity: "info",
    summary: `Organization currently contains ${summary.accounts} Accounts, ${summary.opportunities} Opportunities and ${summary.cases} Cases.`,
    bullets: [
      `${summary.accounts} active Accounts detected`,
      `${summary.opportunities} active Opportunities detected`,
      `${summary.cases} Cases currently available`
    ]
  };
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
  const chartData = await getOpportunityChartData();
  const cases = await getRecentCases();
  const summary = await getBusinessSummary();

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

  if (widget.id === "chart-primary") {
  widget.title = "Salesforce Opportunities";

  widget.data = {
    xKey: "label",
    series: [
      {
        key: "value",
        label: "Opportunities",
        color: "#0f9f6e"
      }
    ],
    data: chartData
  };
}

if (widget.id === "table-primary") {
  widget.title = "Recent Cases";

  widget.data = {
    columns: [
      {
        key: "caseNumber",
        label: "Case"
      },
      {
        key: "subject",
        label: "Subject"
      },
      {
        key: "status",
        label: "Status"
      }
    ],

    rows: cases.map(
      (item: {
        CaseNumber: string;
        Subject: string;
        Status: string;
      }) => ({
        caseNumber: item.CaseNumber,
        subject: item.Subject,
        status: item.Status
      })
    )
  };
}

if (widget.id === "insight-primary") {
  widget.title = "Salesforce Intelligence";

  widget.data = {
    agent: "VisualLogic AI",
    severity: "info",
    summary: `Organization currently contains ${summary.accounts} Accounts, ${summary.opportunities} Opportunities and ${summary.cases} Cases.`,
    bullets: [
      `${summary.accounts} active Accounts detected`,
      `${summary.opportunities} active Opportunities detected`,
      `${summary.cases} Cases currently available`
    ]
  };
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
