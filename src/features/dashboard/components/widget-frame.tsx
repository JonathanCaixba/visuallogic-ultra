"use client";

import { EyeOff, GripVertical } from "lucide-react";

import { Button } from "@/components/ui/button";
import { WidgetRenderer } from "@/features/dashboard/components/widget-renderer";
import { cn } from "@/lib/utils";
import { useLayoutStore } from "@/stores/layout-store";
import type { DashboardMode, DashboardWidget } from "@/types";

interface WidgetFrameProps {
  dashboardId: string;
  widget: DashboardWidget;
  mode: DashboardMode;
}

export function WidgetFrame({ dashboardId, widget, mode }: WidgetFrameProps) {
  const hideWidget = useLayoutStore((state) => state.hideWidget);
  const editable = mode === "customize";

  return (
    <section className="dashboard-surface flex h-full min-h-0 flex-col overflow-hidden">
      <header className="flex min-h-12 items-center justify-between gap-2 border-b px-4">
        <div className="flex min-w-0 items-center gap-2">
          {editable ? (
            <span className="widget-drag-handle cursor-move text-muted-foreground" title="Move widget">
              <GripVertical className="h-4 w-4" aria-hidden="true" />
            </span>
          ) : null}
          <div className="min-w-0">
            <h2 className="truncate text-sm font-semibold">{widget.title}</h2>
            {widget.description ? (
              <p className="truncate text-xs text-muted-foreground">{widget.description}</p>
            ) : null}
          </div>
        </div>
        {editable ? (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            title="Hide widget"
            aria-label={`Hide ${widget.title}`}
            onClick={() => hideWidget(dashboardId, widget.id)}
          >
            <EyeOff className="h-4 w-4" aria-hidden="true" />
          </Button>
        ) : null}
      </header>
      <div
        className={cn(
          "min-h-0 flex-1 p-4",
          widget.type === "kpi" ? "flex" : "overflow-hidden",
          widget.chrome?.compact && "p-3"
        )}
      >
        <WidgetRenderer widget={widget} />
      </div>
    </section>
  );
}
