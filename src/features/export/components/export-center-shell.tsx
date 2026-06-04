import Link from "next/link";
import { CalendarClock, FileDown, Presentation } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DashboardGrid } from "@/features/dashboard/components/dashboard-grid";
import type { DashboardConfiguration } from "@/types";

export function ExportCenterShell({ dashboard }: { dashboard: DashboardConfiguration }) {
  return (
    <section data-dashboard-theme={dashboard.theme} className="min-h-full p-4 md:p-6">
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <Badge variant="secondary">Export Center</Badge>
            <Badge variant="outline">{dashboard.template.replaceAll("_", " ")}</Badge>
          </div>
          <h1 className="truncate text-2xl font-semibold">{dashboard.title}</h1>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link href={`/presentation/${dashboard.id}`}>
            <Presentation className="h-4 w-4" aria-hidden="true" />
            Present
          </Link>
        </Button>
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
        <DashboardGrid dashboard={dashboard} mode="view" />
        <aside className="dashboard-surface h-fit p-4">
          <div className="mb-4 flex items-center gap-2">
            <FileDown className="h-4 w-4 text-primary" aria-hidden="true" />
            <h2 className="text-sm font-semibold">PDF Snapshot</h2>
          </div>
          <dl className="space-y-3 text-sm">
            <div className="flex items-center justify-between gap-4">
              <dt className="text-muted-foreground">Format</dt>
              <dd className="font-medium">PDF</dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-muted-foreground">Source</dt>
              <dd className="truncate font-medium">{dashboard.metadata.salesforceFlow}</dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-muted-foreground">Status</dt>
              <dd className="font-medium">Draft</dd>
            </div>
          </dl>
          <Button type="button" className="mt-5 w-full" disabled>
            <CalendarClock className="h-4 w-4" aria-hidden="true" />
            Queue Snapshot
          </Button>
        </aside>
      </div>
    </section>
  );
}
