export type DashboardBreakpoint = "lg" | "md" | "sm" | "xs" | "xxs";

export interface WidgetLayout {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minW?: number;
  minH?: number;
  maxW?: number;
  maxH?: number;
  static?: boolean;
}

export type DashboardLayouts = Partial<Record<DashboardBreakpoint, WidgetLayout[]>>;

export interface PersistedDashboardLayout {
  dashboardId: string;
  layout: WidgetLayout[];
  hiddenWidgetIds: string[];
  savedAt: string;
}
