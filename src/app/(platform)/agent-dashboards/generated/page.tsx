import { DashboardRendererShell } from "@/features/dashboard/components/dashboard-renderer-shell";

import { mockDashboardRequest } from "@/data/mock-dashboard-request";

import { renderDashboardFromConfiguration } from "@/services/dashboard-renderer.service";

export default function GeneratedDashboardPage() {
  const dashboard =
    renderDashboardFromConfiguration(
      mockDashboardRequest
    );

  return (
    <DashboardRendererShell
      dashboard={dashboard}
    />
  );
}