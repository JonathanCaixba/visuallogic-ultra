import type { AgentEvent } from "./events";

export type WidgetTone = "neutral" | "success" | "warning" | "critical" | "info";

export type WidgetType =
  | "kpi"
  | "line-chart"
  | "bar-chart"
  | "table"
  | "insight"
  | "event-list";

export interface WidgetChrome {
  accent?: WidgetTone;
  locked?: boolean;
  compact?: boolean;
}

export interface KpiWidgetData {
  value: string | number;
  unit?: string;
  delta?: string;
  trend?: "up" | "down" | "flat";
  caption: string;
}

export interface ChartDatum {
  label: string;
  [metric: string]: string | number;
}

export interface ChartSeries {
  key: string;
  label: string;
  color?: string;
}

export interface ChartWidgetData {
  data: ChartDatum[];
  xKey: string;
  series: ChartSeries[];
}

export type TableCellValue = string | number | boolean | null;

export interface TableColumn {
  key: string;
  label: string;
  align?: "left" | "center" | "right";
}

export interface TableWidgetData {
  columns: TableColumn[];
  rows: Record<string, TableCellValue>[];
}

export interface InsightWidgetData {
  summary: string;
  bullets: string[];
  agent: string;
  severity: WidgetTone;
}

export interface EventListWidgetData {
  events: AgentEvent[];
}

interface WidgetBase<TType extends WidgetType, TData> {
  id: string;
  type: TType;
  title: string;
  description?: string;
  data: TData;
  chrome?: WidgetChrome;
}

export type KpiWidget = WidgetBase<"kpi", KpiWidgetData>;
export type LineChartWidget = WidgetBase<"line-chart", ChartWidgetData>;
export type BarChartWidget = WidgetBase<"bar-chart", ChartWidgetData>;
export type TableWidget = WidgetBase<"table", TableWidgetData>;
export type InsightWidget = WidgetBase<"insight", InsightWidgetData>;
export type EventListWidget = WidgetBase<"event-list", EventListWidgetData>;

export type DashboardWidget =
  | KpiWidget
  | LineChartWidget
  | BarChartWidget
  | TableWidget
  | InsightWidget
  | EventListWidget;
