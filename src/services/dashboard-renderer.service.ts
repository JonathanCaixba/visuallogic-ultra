import type {
  DashboardConfiguration,
  DashboardRequestConfiguration,
  DashboardTemplateId,
} from "@/types";

import { dashboardByTemplate } from "@/data/mock-dashboards";

export function renderDashboardFromConfiguration(
  configuration: DashboardRequestConfiguration,
): DashboardConfiguration {
  const template = configuration.template as DashboardTemplateId;

  const dashboard = structuredClone(dashboardByTemplate[template]);

  dashboard.title = configuration.dashboardName;

  dashboard.metadata.requestPrompt = configuration.dashboardName;

  dashboard.widgets.forEach((widget) => {

    if (widget.id === "kpi-1" && widget.type === "kpi") {
      widget.data.value = configuration.analysis?.revenue?.severity?.toUpperCase() ?? widget.data.value;
    }

    if (widget.id === "kpi-2" && widget.type === "kpi") {
      widget.data.value = Number(
        configuration.metrics?.strategicOpportunities ?? 0,
      );
    }

    if (widget.id === "kpi-3" && widget.type === "kpi") {
      widget.data.value = Number(configuration.metrics?.highPriorityCases ?? 0);
    }

    if (widget.id === "kpi-4" && widget.type === "kpi") {
      widget.data.value = configuration.analysis?.sla?.severity?.toUpperCase() ?? widget.data.value;
    }

    if (
  widget.id === "insight-agentforce" &&
  widget.type === "insight"
) {
  widget.data.bullets = [
    configuration.analysis?.revenue?.summary ??
      "No revenue analysis available",

    configuration.analysis?.sla?.summary ??
      "No SLA analysis available",

    configuration.analysis?.executive?.summary ??
      "No executive insight available"
  ];
}
  });

  return dashboard;
}
