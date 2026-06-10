"use client";

import { useMemo } from "react";
import { Responsive, WidthProvider, type Layout } from "react-grid-layout";

import { WidgetFrame } from "@/features/dashboard/components/widget-frame";
import { useLayoutStore } from "@/stores/layout-store";
import { dashboardBreakpoints, dashboardColumns } from "@/styles/design-tokens";
import type { DashboardConfiguration, DashboardMode, WidgetLayout } from "@/types";

const ResponsiveGridLayout = WidthProvider(Responsive);

function toWidgetLayout(layout: Layout): WidgetLayout {
  return {
    i: layout.i,
    x: layout.x,
    y: layout.y,
    w: layout.w,
    h: layout.h,
    minW: layout.minW,
    minH: layout.minH,
    maxW: layout.maxW,
    maxH: layout.maxH,
    static: layout.static
  };
}

interface DashboardGridProps {
  dashboard: DashboardConfiguration;
  mode: DashboardMode;
}

export function DashboardGrid({ dashboard, mode }: DashboardGridProps) {
  const storedLayout = useLayoutStore(
    (state) => state.layouts[dashboard.id]
  );

  const EMPTY_ARRAY: string[] = [];
  
  const hiddenWidgetIds = useLayoutStore(
  (state) => state.hiddenWidgetIds[dashboard.id]
) ?? EMPTY_ARRAY;
  const setLayout = useLayoutStore((state) => state.setLayout);
  const activeLayout = storedLayout ?? dashboard.layouts;
  const hiddenWidgetIdSet = useMemo(() => new Set(hiddenWidgetIds), [hiddenWidgetIds]);
  const visibleWidgets = dashboard.widgets.filter((widget) => !hiddenWidgetIdSet.has(widget.id));
  const visibleWidgetIds = useMemo(() => new Set(visibleWidgets.map((widget) => widget.id)), [visibleWidgets]);
  const visibleLayout = activeLayout.filter((layout) => visibleWidgetIds.has(layout.i));
  const editable = mode === "customize";

  const handleLayoutChange = (currentLayout: Layout[]) => {
    if (!editable) {
      return;
    }

    setLayout(dashboard.id, currentLayout.map(toWidgetLayout));
  };

  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={{ lg: visibleLayout }}
      breakpoints={dashboardBreakpoints}
      cols={dashboardColumns}
      rowHeight={48}
      margin={[16, 16]}
      containerPadding={[0, 0]}
      isDraggable={editable}
      isResizable={editable}
      draggableHandle=".widget-drag-handle"
      onLayoutChange={handleLayoutChange}
    >
      {visibleWidgets.map((widget) => (
        <div key={widget.id} className="min-h-0">
          <WidgetFrame dashboardId={dashboard.id} widget={widget} mode={mode} />
        </div>
      ))}
    </ResponsiveGridLayout>
  );
}

