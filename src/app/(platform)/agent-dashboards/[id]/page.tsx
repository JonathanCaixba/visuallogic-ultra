import { notFound } from "next/navigation";

import { DashboardRendererShell } from "@/features/dashboard/components/dashboard-renderer-shell";
import { getDashboardRequestById } from "@/services/salesforce/dashboard-request-builder";
import { renderDashboardFromConfiguration } from "@/services/dashboard-renderer.service";
import { dynamicDashboardRegistry } from "@/lib/salesforce/dynamic-dashboard-registry";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function AgentDashboardPage({ params }: PageProps) {
  const { id } = await params;

  // ── Dynamic dashboards ─────────────────────────────────────────────
if (id.startsWith("dynamic-")) {
  const dashboard = dynamicDashboardRegistry.get(id);

  if (!dashboard) {
    notFound();
  }

  return <DashboardRendererShell dashboard={dashboard} />;
}

  const dashboardRequest = await getDashboardRequestById(id);

  if (!dashboardRequest) {
    notFound();
  }

  const configurationJson = dashboardRequest.Configuration__c;

  if (!configurationJson) {
    notFound();
  }

  const configuration = JSON.parse(configurationJson);
  const dashboard = renderDashboardFromConfiguration(configuration, id);

  // ── Post-render mutations ────────────────────────────────────────────────
  const summary = dashboardRequest.Dashboard_Summary__c;

  if (summary) {
    const insightWidget = dashboard.widgets.find(
      (widget) => widget.id === "insight-primary"
    );

    if (insightWidget && insightWidget.type === "insight") {
      insightWidget.data.summary = summary;
      insightWidget.data.agent =
        dashboardRequest.Generated_By_Agent__c ?? "VisualLogic Agent";
      insightWidget.data.bullets = [];
    }
  }

  // ── Register for Studio ──────────────────────────────────────────────────
  dynamicDashboardRegistry.register(dashboard);

  return <DashboardRendererShell dashboard={structuredClone(dashboard)} />;
}
