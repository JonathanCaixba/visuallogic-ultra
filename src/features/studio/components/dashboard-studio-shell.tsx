"use client";

import Link from "next/link";
import { Eye, RotateCcw, Save, SquareArrowOutUpRight } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DashboardGrid } from "@/features/dashboard/components/dashboard-grid";
import { LayoutService } from "@/services/layout.service";
import { useLayoutStore } from "@/stores/layout-store";
import type { DashboardConfiguration } from "@/types";

export function DashboardStudioShell({ dashboard }: { dashboard: DashboardConfiguration }) {
  const activeLayout = useLayoutStore((state) => state.getLayout(dashboard.id)) ?? dashboard.layouts;
  const hiddenWidgetIds = useLayoutStore((state) => state.getHiddenWidgetIds(dashboard.id));
  const showWidget = useLayoutStore((state) => state.showWidget);
  const resetDashboardLayout = useLayoutStore((state) => state.resetDashboardLayout);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved">("idle");
  const hiddenWidgets = dashboard.widgets.filter((widget) => hiddenWidgetIds.includes(widget.id));

  const saveLayout = async () => {
    setSaveState("saving");
    await LayoutService.saveLayout(dashboard.id, activeLayout, hiddenWidgetIds);
    setSaveState("saved");
    window.setTimeout(() => setSaveState("idle"), 1800);
  };

  const viewHref =
    dashboard.id === "dashboard-central"
      ? "/dashboard-central"
      : `/dashboard/${dashboard.id}`;

  return (
    <section data-dashboard-theme={dashboard.theme} className="min-h-full p-4 md:p-6">
      <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="min-w-0">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <Badge variant="secondary">Dashboard Studio</Badge>
            <Badge variant="outline">{dashboard.template.replaceAll("_", " ")}</Badge>
          </div>
          <h1 className="truncate text-2xl font-semibold">{dashboard.title}</h1>
          <p className="mt-1 max-w-3xl text-sm text-muted-foreground">{dashboard.description}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button type="button" variant="outline" size="sm" onClick={saveLayout} disabled={saveState === "saving"}>
            <Save className="h-4 w-4" aria-hidden="true" />
            {saveState === "saving" ? "Saving" : saveState === "saved" ? "Saved" : "Save"}
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => resetDashboardLayout(dashboard.id)}>
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Restore
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href={viewHref}>
              <Eye className="h-4 w-4" />
              View
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href={`/presentation/${dashboard.id}`}>
              <SquareArrowOutUpRight className="h-4 w-4" aria-hidden="true" />
              Present
            </Link>
          </Button>
        </div>
      </div>

      {hiddenWidgets.length > 0 ? (
        <div className="mb-4 flex flex-wrap items-center gap-2 rounded-lg border bg-card p-3">
          <span className="mr-1 text-sm font-medium">Hidden</span>
          {hiddenWidgets.map((widget) => (
            <Button
              key={widget.id}
              type="button"
              variant="subtle"
              size="sm"
              onClick={() => showWidget(dashboard.id, widget.id)}
            >
              {widget.title}
            </Button>
          ))}
        </div>
      ) : null}

      <DashboardGrid dashboard={dashboard} mode="customize" />
    </section>
  );
}
