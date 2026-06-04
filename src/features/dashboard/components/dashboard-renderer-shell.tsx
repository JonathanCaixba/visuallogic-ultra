import { Badge } from "@/components/ui/badge";
import { DashboardActions } from "@/features/dashboard/components/dashboard-actions";
import { DashboardGrid } from "@/features/dashboard/components/dashboard-grid";
import type { DashboardConfiguration } from "@/types";

export function DashboardRendererShell({ dashboard }: { dashboard: DashboardConfiguration }) {
  return (
    <section data-dashboard-theme={dashboard.theme} className="min-h-full p-4 md:p-6">
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{dashboard.template.replaceAll("_", " ")}</Badge>
            <Badge variant="outline">{dashboard.metadata.salesforceFlow}</Badge>
          </div>
          <h1 className="truncate text-2xl font-semibold">{dashboard.title}</h1>
          <p className="mt-1 max-w-3xl text-sm text-muted-foreground">{dashboard.description}</p>
        </div>
        <DashboardActions dashboardId={dashboard.id} />
      </div>
      <DashboardGrid dashboard={dashboard} mode="view" />
    </section>
  );
}
