import { DashboardRendererShell }
  from "@/features/dashboard/components/dashboard-renderer-shell";

import { buildDashboardCentral }
  from "@/services/dashboard-central/dashboard-central-builder";

export default async function DashboardCentralPage() {

  const dashboard =
    await buildDashboardCentral();

  return (
    <DashboardRendererShell
      dashboard={dashboard}
    />
  );
}