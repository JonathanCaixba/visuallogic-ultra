import type {
  DashboardConfiguration,
  DashboardRequestConfiguration,
  DashboardTemplateId
} from "@/types";

import { dashboardByTemplate } from "@/data/mock-dashboards";

export function renderDashboardFromConfiguration(
  configuration: DashboardRequestConfiguration
): DashboardConfiguration {

  const template =
    configuration.template as DashboardTemplateId;

  const dashboard =
    structuredClone(
      dashboardByTemplate[template]
    );

  dashboard.title =
    configuration.dashboardName;

  dashboard.metadata.requestPrompt =
    configuration.dashboardName;

    dashboard.widgets.forEach((widget) => {

  if (
    widget.id === "kpi-2" &&
    widget.type === "kpi"
  ) {
    widget.data.value =
      Number(
        configuration.sales?.opportunities ?? 0
      );
  }

  if (
    widget.id === "kpi-3" &&
    widget.type === "kpi"
  ) {
    widget.data.value =
      Number(
        configuration.support?.cases ?? 0
      );
  }

});

  return dashboard;
}