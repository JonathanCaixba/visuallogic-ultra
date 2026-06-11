/**
 * widget-factory.service.ts
 */

import type {
  DashboardRequestConfiguration,
  WidgetConfigEntry,
  AnalysisEntry,
} from "@/types/dashboard-request";

import type {
  DashboardWidget,
  WidgetTone,
  KpiWidgetData,
  InsightWidgetData,
  EventListWidgetData,
  ChartWidgetData,
  TableWidgetData,
} from "@/types/widget";

import type { AgentEvent } from "@/types/events";
import type { AgentName } from "@/types/agent";

// ─────────────────────────────────────────────────────────────────────────────
// Severity → WidgetTone mapping
// ─────────────────────────────────────────────────────────────────────────────

const SEVERITY_TO_TONE: Record<string, WidgetTone> = {
  healthy: "success",
  low: "neutral",
  watch: "info",
  info: "info",
  warning: "warning",
  high: "warning",
  critical: "critical",
  error: "critical",
};

/**
 * Convert an Agentforce severity string to a WidgetTone.
 * Falls back to "neutral" for unknown values.
 */
export function mapSeverityToTone(severity: string | undefined): WidgetTone {
  if (!severity) return "neutral";
  return SEVERITY_TO_TONE[severity.toLowerCase()] ?? "neutral";
}

// ─────────────────────────────────────────────────────────────────────────────
// Source resolver
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Resolve a source pointer against the configuration tree.
 *
 * Supported formats:
 *   "metricKey"                 → config.metrics[metricKey]
 *   "metrics.metricKey"         → config.metrics[metricKey]
 *   "analysis.domain"           → config.analysis[domain]   (AnalysisEntry)
 *   "events.items"              → config.events.items        (DashboardEventItem[])
 */
function resolveSource(
  source: string,
  config: DashboardRequestConfiguration
): unknown {
  const dotIndex = source.indexOf(".");
  if (dotIndex === -1) {

  if (config.metrics?.[source] !== undefined) {
    return config.metrics[source];
  }

  if (config.analysis?.[source] !== undefined) {
    return config.analysis[source];
  }

  return undefined;
}

  const root = source.slice(0, dotIndex);
  const tail = source.slice(dotIndex + 1);

  switch (root) {
    case "metrics":
      return config.metrics?.[tail];
    case "analysis":
      return config.analysis?.[tail];
    case "events":
      if (tail === "items") return config.events?.items;
      return undefined;
    default:
      // Treat entire string as a metrics key (legacy fallback)
      return config.metrics?.[source];
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Tone resolution (explicit > severity-derived > neutral)
// ─────────────────────────────────────────────────────────────────────────────

const KNOWN_TONES = new Set<string>([
  "neutral",
  "success",
  "warning",
  "critical",
  "info",
]);

function resolveTone(
  explicitTone: WidgetTone | undefined,
  severityOrTone: string | undefined
): WidgetTone {
  if (explicitTone) return explicitTone;
  if (!severityOrTone) return "neutral";
  if (KNOWN_TONES.has(severityOrTone)) return severityOrTone as WidgetTone;
  return mapSeverityToTone(severityOrTone);
}

// ─────────────────────────────────────────────────────────────────────────────
// Per-type widget builders
// ─────────────────────────────────────────────────────────────────────────────

function buildKpiWidget(
  entry: WidgetConfigEntry,
  config: DashboardRequestConfiguration
): DashboardWidget {
  // Priority: explicit value > resolved source > placeholder
  let resolvedValue: string | number = entry.value ?? "—";
  if (entry.value === undefined && entry.source) {
    const raw = resolveSource(entry.source, config);
    if (raw !== undefined && raw !== null) {
      resolvedValue = raw as string | number;
    }
  }

  const data: KpiWidgetData = {
    value: resolvedValue,
    caption: entry.caption ?? entry.title,
    delta: entry.delta,
    trend: entry.trend,
  };

  return {
    id: entry.id,
    type: "kpi",
    title: entry.title,
    data,
    chrome: { accent: entry.tone ?? "neutral" },
  };
}

function buildInsightWidget(
  entry: WidgetConfigEntry,
  config: DashboardRequestConfiguration
): DashboardWidget {
  // Resolve analysis entry from source
  let resolved: AnalysisEntry | undefined;
  if (entry.source) {
    const raw = resolveSource(entry.source, config);
    if (raw && typeof raw === "object" && "summary" in raw) {
      resolved = raw as AnalysisEntry;
    }
  }

  const tone = resolveTone(entry.tone, resolved?.severity ?? entry.tone);

  const data: InsightWidgetData = {
    summary:
      entry.summary ??
      resolved?.summary ??
      "Analysis is being processed by Agentforce.",
    bullets: entry.bullets ?? resolved?.bullets ?? [],
    agent:
      entry.agent ??
      resolved?.agent ??
      "Agentforce Agent",
    severity: tone,
  };

  return {
    id: entry.id,
    type: "insight",
    title: entry.title,
    data,
    chrome: { accent: tone },
  };
}

function buildEventListWidget(
  entry: WidgetConfigEntry,
  config: DashboardRequestConfiguration
): DashboardWidget {
  let events: AgentEvent[] = [];

  if (entry.source) {
    const raw = resolveSource(entry.source, config);
    if (Array.isArray(raw)) {
      events = raw.map((item, i) => ({
        id: item.id ?? `event-factory-${i}`,
        severity: item.severity ?? "low",
        domain: item.domain ?? "system",
        timestamp: item.timestamp ?? new Date().toISOString(),
        // DashboardEventItem.agent is string; AgentEvent.agent is AgentName.
        // Agentforce guarantees valid agent names; cast is safe.
        agent: (item.agent ?? "Dashboard Visualization Agent") as AgentName,
        status: item.status ?? "new",
        title: item.title ?? "Event",
        description: item.description ?? "",
      }));
    }
  }

  const data: EventListWidgetData = { events };

  return {
    id: entry.id,
    type: "event-list",
    title: entry.title,
    data,
  };
}

function buildChartWidget(
  entry: WidgetConfigEntry,
  _config: DashboardRequestConfiguration
): DashboardWidget {
  const inlineData = entry.data as ChartWidgetData | undefined;
  const chartData: ChartWidgetData = inlineData ?? {
    data: [],
    xKey: "label",
    series: [{ key: "value", label: entry.title }],
  };

  return {
    id: entry.id,
    type: entry.type as "line-chart" | "bar-chart",
    title: entry.title,
    data: chartData,
  };
}

function buildTableWidget(
  entry: WidgetConfigEntry,
  _config: DashboardRequestConfiguration
): DashboardWidget {
  const inlineData = entry.data as TableWidgetData | undefined;
  const tableData: TableWidgetData = inlineData ?? {
    columns: [{ key: "name", label: "Name" }],
    rows: [],
  };

  return {
    id: entry.id,
    type: "table",
    title: entry.title,
    data: tableData,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Main entry: build one widget from a WidgetConfigEntry
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Phase 2: Dynamic Widget Factory.
 * Converts a single WidgetConfigEntry + configuration into a DashboardWidget.
 */
export function buildWidgetFromConfig(
  entry: WidgetConfigEntry,
  config: DashboardRequestConfiguration
): DashboardWidget {
  switch (entry.type) {
    case "kpi":
      return buildKpiWidget(entry, config);
    case "insight":
      return buildInsightWidget(entry, config);
    case "event-list":
      return buildEventListWidget(entry, config);
    case "line-chart":
    case "bar-chart":
      return buildChartWidget(entry, config);
    case "table":
      return buildTableWidget(entry, config);
    default:
      // Unknown type: render as a KPI with the raw source value
      return buildKpiWidget({ ...entry, type: "kpi" }, config);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Auto-generation from implicit configuration data
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Human-readable metadata for known metrics keys.
 * Used when no explicit widget declaration covers a metric.
 */
const KPI_META: Record<
  string,
  { title: string; caption: string; tone: WidgetTone }
> = {
  strategicOpportunities: {
    title: "Strategic Opportunities",
    caption: "Active pipeline opportunities",
    tone: "info",
  },
  highPriorityCases: {
    title: "High Priority Cases",
    caption: "Priority escalations",
    tone: "warning",
  },
  opportunityCount: {
    title: "Opportunities",
    caption: "Total opportunities",
    tone: "info",
  },
  caseCount: { title: "Cases", caption: "Total cases", tone: "neutral" },
  eventCount: { title: "Events", caption: "Agent events", tone: "neutral" },
  revenue: { title: "Revenue", caption: "Closed revenue", tone: "success" },
  pipeline: {
    title: "Pipeline",
    caption: "Weighted pipeline",
    tone: "info",
  },
  winRate: { title: "Win Rate", caption: "Rolling quarter", tone: "success" },
  openCases: {
    title: "Open Cases",
    caption: "Active support queue",
    tone: "neutral",
  },
  slaRisk: {
    title: "SLA Risk",
    caption: "At-risk case share",
    tone: "warning",
  },
};

/**
 * Phase 2: Auto-generate KPI widgets from metrics that are not covered
 * by any explicit widget declaration.
 */
export function autoGenerateKpiWidgets(
  config: DashboardRequestConfiguration,
  coveredIds: Set<string>
): DashboardWidget[] {
  const metrics = config.metrics;
  if (!metrics) return [];

  const generated: DashboardWidget[] = [];

  for (const [key, value] of Object.entries(metrics)) {
    if (value === undefined || value === null) continue;
    const autoId = `auto-kpi-${key}`;
    if (coveredIds.has(autoId)) continue;

    const meta = KPI_META[key] ?? {
      title: key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (c) => c.toUpperCase()),
      caption: key,
      tone: "neutral" as WidgetTone,
    };

    generated.push({
      id: autoId,
      type: "kpi",
      title: meta.title,
      data: {
        value: value as string | number,
        caption: meta.caption,
      },
      chrome: { accent: meta.tone },
    });
  }

  return generated;
}

/**
 * Phase 3: Auto-generate Insight widgets from analysis entries that are not
 * covered by any explicit widget declaration.
 */
export function autoGenerateInsightWidgets(
  config: DashboardRequestConfiguration,
  coveredIds: Set<string>
): DashboardWidget[] {
  const analysis = config.analysis;
  if (!analysis) return [];

  const DOMAIN_AGENT: Record<string, string> = {
    revenue: "Revenue Intelligence Agent",
    sla: "Support Monitoring Agent",
    executive: "Executive Intelligence Agent",
  };

  const generated: DashboardWidget[] = [];

  for (const [domain, entry] of Object.entries(analysis)) {
    if (!entry) continue;
    const autoId = `auto-insight-${domain}`;
    if (coveredIds.has(autoId)) continue;

    const tone = mapSeverityToTone(entry.severity);
    const label = domain.charAt(0).toUpperCase() + domain.slice(1);

    generated.push({
      id: autoId,
      type: "insight",
      title: `${label} Analysis`,
      data: {
        summary: entry.summary,
        bullets: entry.bullets ?? [],
        agent: entry.agent ?? DOMAIN_AGENT[domain] ?? "Agentforce Agent",
        severity: tone,
      } satisfies InsightWidgetData,
      chrome: { accent: tone },
    });
  }

  return generated;
}

/**
 * Phase 4: Auto-generate an EventList widget from events.items if no
 * explicit event-list widget declaration covers the events.
 */
export function autoGenerateEventWidget(
  config: DashboardRequestConfiguration,
  coveredIds: Set<string>
): DashboardWidget | null {
  const items = config.events?.items;
  if (!items || items.length === 0) return null;

  const autoId = "auto-events";
  if (coveredIds.has(autoId)) return null;

  const events: AgentEvent[] = items.map((item, i) => ({
    id: item.id ?? `auto-event-${i}`,
    severity: item.severity ?? "low",
    domain: item.domain ?? "system",
    timestamp: item.timestamp ?? new Date().toISOString(),
    agent: (item.agent ?? "Dashboard Visualization Agent") as AgentName,
    status: item.status ?? "new",
    title: item.title ?? "Event",
    description: item.description ?? "",
  }));

  return {
    id: autoId,
    type: "event-list",
    title: "Agent Events",
    data: { events } satisfies EventListWidgetData,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Orchestration
// ─────────────────────────────────────────────────────────────────────────────
export function buildAllWidgets(
  config: DashboardRequestConfiguration
): DashboardWidget[] {
  // Step 1: explicit widget declarations
  const explicit: DashboardWidget[] = (config.widgets ?? []).map((entry) =>
    buildWidgetFromConfig(entry, config)
  );

  const coveredIds = new Set(explicit.map((w) => w.id));
  const hasKpis = explicit.some((w) => w.type === "kpi");
  const hasInsights = explicit.some((w) => w.type === "insight");
  const hasEventList = explicit.some((w) => w.type === "event-list");

  // Step 2: auto-generate from implicit data
  const autoKpis = !hasKpis
    ? autoGenerateKpiWidgets(config, coveredIds)
    : [];

  const autoInsights = !hasInsights
    ? autoGenerateInsightWidgets(config, coveredIds)
    : [];

  const autoEvent =
    !hasEventList ? autoGenerateEventWidget(config, coveredIds) : null;

  return [
    ...explicit,
    ...autoKpis,
    ...autoInsights,
    ...(autoEvent ? [autoEvent] : []),
  ];
}
