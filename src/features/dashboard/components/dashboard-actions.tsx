import Link from "next/link";
import { FileDown, Presentation, SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";

export function DashboardActions({ dashboardId }: { dashboardId: string }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button asChild variant="outline" size="sm">
        <Link href={`/studio/${dashboardId}`}>
          <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
          Studio
        </Link>
      </Button>
      <Button asChild variant="outline" size="sm">
        <Link href={`/presentation/${dashboardId}`}>
          <Presentation className="h-4 w-4" aria-hidden="true" />
          Present
        </Link>
      </Button>
      <Button asChild variant="outline" size="sm">
        <Link href={`/export/${dashboardId}`}>
          <FileDown className="h-4 w-4" aria-hidden="true" />
          Export
        </Link>
      </Button>
    </div>
  );
}
