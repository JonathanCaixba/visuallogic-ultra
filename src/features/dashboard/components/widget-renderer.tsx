"use client";

import { ChartWidgetView } from "@/features/dashboard/components/widgets/chart-widget";
import { EventListWidgetView } from "@/features/dashboard/components/widgets/event-list-widget";
import { InsightWidgetView } from "@/features/dashboard/components/widgets/insight-widget";
import { KpiWidgetView } from "@/features/dashboard/components/widgets/kpi-widget";
import { TableWidgetView } from "@/features/dashboard/components/widgets/table-widget";
import type { DashboardWidget } from "@/types";

export function WidgetRenderer({ widget }: { widget: DashboardWidget }) {
  switch (widget.type) {
    case "kpi":
      return <KpiWidgetView widget={widget} />;
    case "line-chart":
    case "bar-chart":
      return <ChartWidgetView widget={widget} />;
    case "table":
      return <TableWidgetView widget={widget} />;
    case "insight":
      return <InsightWidgetView widget={widget} />;
    case "event-list":
      return <EventListWidgetView widget={widget} />;
    default:
      return null;
  }
}
