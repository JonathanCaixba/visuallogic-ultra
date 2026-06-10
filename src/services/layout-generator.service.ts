/**
 * layout-generator.service.ts
 */

import type { WidgetLayout } from "@/types/layout";
import type { DashboardWidget } from "@/types/widget";

// ── Grid constant (must match dashboardColumns in design-tokens.ts) ───────────
const TOTAL_COLS = 12;

// ── Height tokens (grid units) ────────────────────────────────────────────────
const KPI_HEIGHT        = 2; // compact metric card
const INSIGHT_HEIGHT    = 3; // analytical summary — content needs more room than a KPI
const CHART_HEIGHT      = 4; // visualisation area
const TABLE_HEIGHT      = 5; // tabular data panel
const EVENT_LIST_HEIGHT = 4; // chronological item list

// ── Internal types ────────────────────────────────────────────────────────────

interface GridBandResult {
  layouts: WidgetLayout[];
  height: number;
}

interface UniformGridOptions {

  lastOddFull?: boolean;
  minW?: number;
  minH?: number;
}

// ── Private helpers ───────────────────────────────────────────────────────────
function uniformGrid(
  widgets: DashboardWidget[],
  startY: number,
  perRow: number,
  h: number,
  { lastOddFull = false, minW = 2, minH = 2 }: UniformGridOptions = {}
): GridBandResult {
  const w = Math.floor(TOTAL_COLS / perRow);
  const layouts: WidgetLayout[] = [];

  widgets.forEach((widget, i) => {
    const row = Math.floor(i / perRow);
    const col = i % perRow;
    const isLastAndOdd =
      lastOddFull && i === widgets.length - 1 && widgets.length % 2 !== 0;

    layouts.push({
      i: widget.id,
      x: isLastAndOdd ? 0 : col * w,
      y: startY + row * h,
      w: isLastAndOdd ? TOTAL_COLS : w,
      h,
      minW,
      minH,
    });
  });

  return {
    layouts,
    height: Math.ceil(widgets.length / perRow) * h,
  };
}

// ── Public API ────────────────────────────────────────────────────────────────
export function generateDashboardLayout(
  widgets: DashboardWidget[]
): WidgetLayout[] {
  const layouts: WidgetLayout[] = [];
  let currentY = 0;

  // ── Partition by display category ─────────────────────────────────────────
  const kpis       = widgets.filter((w) => w.type === "kpi");
  const charts     = widgets.filter(
    (w) => w.type === "line-chart" || w.type === "bar-chart"
  );
  const insights   = widgets.filter((w) => w.type === "insight");
  const tables     = widgets.filter((w) => w.type === "table");
  const eventLists = widgets.filter((w) => w.type === "event-list");

  // ── Band 1: KPIs ───────────────────────────────────────────────────────────
  if (kpis.length > 0) {
    const { layouts: band, height } = uniformGrid(
      kpis,
      currentY,
      Math.min(kpis.length, 4),
      KPI_HEIGHT,
      { minW: 2, minH: 2 }
    );
    layouts.push(...band);
    currentY += height;
  }

  // ── Band 2: Charts (logic preserved verbatim from Phase 5) ────────────────
  if (charts.length === 1) {
    const [chart] = charts;
    if (chart) {
      layouts.push({
        i: chart.id,
        x: 0,
        y: currentY,
        w: TOTAL_COLS,
        h: CHART_HEIGHT,
        minW: 4,
        minH: 3,
      });
      currentY += CHART_HEIGHT;
    }
  } else if (charts.length === 2) {
    const [primary, secondary] = charts;
    if (primary) {
      layouts.push({
        i: primary.id,
        x: 0,
        y: currentY,
        w: 8,
        h: CHART_HEIGHT,
        minW: 4,
        minH: 3,
      });
    }
    if (secondary) {
      layouts.push({
        i: secondary.id,
        x: 8,
        y: currentY,
        w: 4,
        h: CHART_HEIGHT,
        minW: 3,
        minH: 3,
      });
    }
    currentY += CHART_HEIGHT;
  } else if (charts.length >= 3) {
    // 3+ charts: equal thirds, up to 3 per row
    const { layouts: band, height } = uniformGrid(
      charts,
      currentY,
      3,
      CHART_HEIGHT,
      { minW: 3, minH: 3 }
    );
    layouts.push(...band);
    currentY += height;
  }

  // ── Band 3: Insights ───────────────────────────────────────────────────────
  if (insights.length > 0) {
    const { layouts: band, height } = uniformGrid(
      insights,
      currentY,
      Math.min(insights.length, 4),
      INSIGHT_HEIGHT,
      { minW: 2, minH: 2 }
    );
    layouts.push(...band);
    currentY += height;
  }

  // ── Band 4: Tables ─────────────────────────────────────────────────────────
  if (tables.length > 0) {
    const { layouts: band, height } = uniformGrid(
      tables,
      currentY,
      2,
      TABLE_HEIGHT,
      { lastOddFull: true, minW: 4, minH: 3 }
    );
    layouts.push(...band);
    currentY += height;
  }

  // ── Band 5: Event Lists ────────────────────────────────────────────────────
  if (eventLists.length > 0) {
    const perRow = eventLists.length === 1 ? 1 : 2;
    const { layouts: band, height } = uniformGrid(
      eventLists,
      currentY,
      perRow,
      EVENT_LIST_HEIGHT,
      { lastOddFull: true, minW: 3, minH: 3 }
    );
    layouts.push(...band);
    currentY += height;
  }

  return layouts;
}