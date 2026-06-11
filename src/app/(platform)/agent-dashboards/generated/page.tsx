import { DashboardRendererShell } from "@/features/dashboard/components/dashboard-renderer-shell";
import { mockDashboardRequest } from "@/data/mock-dashboard-request";
import { renderDashboardFromConfiguration } from "@/services/dashboard-renderer.service";
import { dynamicDashboardRegistry } from "@/lib/salesforce/dynamic-dashboard-registry";

// Stable ID for the mock dashboard — produces "dynamic-mock-generated" as
// the dashboard ID, making /studio/dynamic-mock-generated always resolvable.
const MOCK_REQUEST_ID = "mock-generated";

export default function GeneratedDashboardPage() {
  const dashboard = renderDashboardFromConfiguration(
    mockDashboardRequest,
    MOCK_REQUEST_ID
  );

  // Register so Studio can open this dashboard via /studio/dynamic-mock-generated
  dynamicDashboardRegistry.register(dashboard);

  return <DashboardRendererShell dashboard={dashboard} />;
}
