import Link from "next/link";
import { ArrowLeft, SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DashboardGrid } from "@/features/dashboard/components/dashboard-grid";
import type { DashboardConfiguration } from "@/types";

export function PresentationShell({ dashboard }: { dashboard: DashboardConfiguration }) {
  return (
    <main data-dashboard-theme={dashboard.theme} className="min-h-screen bg-background p-3 md:p-5">
      <header className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <h1 className="truncate text-xl font-semibold md:text-2xl">{dashboard.title}</h1>
          <p className="truncate text-sm text-muted-foreground">{dashboard.metadata.salesforceFlow}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href={`/dashboard/${dashboard.id}`}>
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Dashboard
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href={`/studio/${dashboard.id}`}>
              <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
              Studio
            </Link>
          </Button>
        </div>
      </header>
      <DashboardGrid dashboard={dashboard} mode="presentation" />
    </main>
  );
}
