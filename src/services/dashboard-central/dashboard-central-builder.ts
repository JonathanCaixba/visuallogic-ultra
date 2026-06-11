import {
  getRealKpis,
  getOpportunityChartData,
  getCasesByStatusChartData,
  getBusinessSummary,
} from "@/services/salesforce/kpi-builder";

import { getDashboardRequests } from "@/services/salesforce/dashboard-request-builder";

import type {
  DashboardConfiguration,
  DashboardRequestConfiguration,
} from "@/types";

import { renderDashboardFromConfiguration } from "@/services/dashboard-renderer.service";

export async function buildDashboardCentral(): Promise<DashboardConfiguration> {
  const kpis = await getRealKpis();
  const summary = await getBusinessSummary();
  const requests = await getDashboardRequests();
  const opportunityChartData = await getOpportunityChartData();
  const casesChartData = await getCasesByStatusChartData();
  const recentRequests = requests.slice(0, 10);

  const configuration: DashboardRequestConfiguration = {
    template: "executive_combined",
    dashboardType: "central",
    dashboardName: "Dashboard Central",

    metrics: {
      accounts: kpis.accounts,
      opportunities: kpis.opportunities,
      cases: kpis.cases,
      generatedDashboards: 0,
    },

    analysis: {
      salesforce: {
        severity: "info",
        summary: `Organization contains ${summary.accounts} Accounts, ${summary.opportunities} Opportunities and ${summary.cases} Cases.`,
      },
    },

    widgets: [
      {
        id: "accounts",
        type: "kpi",
        title: "Accounts",
        value: kpis.accounts,
      },

      {
        id: "opportunities",
        type: "kpi",
        title: "Opportunities",
        value: kpis.opportunities,
      },

      {
        id: "cases",
        type: "kpi",
        title: "Cases",
        value: kpis.cases,
      },

      {
        id: "generated-dashboards",
        type: "kpi",
        title: "Generated Dashboards",
        value: requests.length,
      },

      {
        id: "salesforce-intelligence",
        type: "insight",
        title: "Salesforce Intelligence",
        source: "salesforce",
      },

      {
        id: "opportunities-stage-chart",

        type: "line-chart",

        title: "Opportunities by Stage",

        data: {
          xKey: "label",

          series: [
            {
              key: "value",
              label: "Opportunities",
              color: "#0f9f6e",
            },
          ],

          data: opportunityChartData,
        },
      },
      {
        id: "cases-status-chart",

        type: "bar-chart",

        title: "Cases by Status",

        data: {
          xKey: "label",

          series: [
            {
              key: "value",
              label: "Cases",
            },
          ],

          data: casesChartData,
        },
      },
      {
        id: "recent-dashboard-requests",

        type: "table",

        title: "Recent Dashboard Requests",

        data: {
          columns: [
            {
              key: "name",
              label: "Name",
            },
            {
              key: "template",
              label: "Template",
            },
            {
              key: "status",
              label: "Status",
            },
          ],

          rows: recentRequests.map((request) => ({
            name: request.Name,

            template: request.Template__c,

            status: request.Status__c,
          })),
        },
      },
    ],
  };

  const dashboard =
  renderDashboardFromConfiguration(
    configuration,
    "dashboard-central"
  );

dashboard.id = "dashboard-central";

return dashboard;
}
