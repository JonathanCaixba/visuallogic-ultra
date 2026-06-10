import type { WidgetTone, WidgetType } from "./widget";

// ─────────────────────────────────────────────────────────────────────────────
// Severity
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Severity strings that Salesforce Agentforce Flows produce.
 * Mapped to WidgetTone at render time by the widget factory.
 */
export type AnalysisSeverity =
  | "healthy"
  | "low"
  | "watch"
  | "info"
  | "warning"
  | "high"
  | "critical";

// ─────────────────────────────────────────────────────────────────────────────
// Metrics
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Scalar metrics produced by an Agentforce Flow.
 * Keys are camelCase; values are numbers or pre-formatted strings.
 * An index signature allows arbitrary Agentforce-generated metric names.
 */
export interface DashboardMetricsMap {
  strategicOpportunities?: number;
  highPriorityCases?: number;
  opportunityCount?: number;
  caseCount?: number;
  eventCount?: number;
  revenue?: string | number;
  pipeline?: string | number;
  winRate?: string | number;
  openCases?: number;
  slaRisk?: string | number;
  /** Arbitrary agent-generated metric keys */
  [key: string]: string | number | undefined;
}

// ─────────────────────────────────────────────────────────────────────────────
// Analysis
// ─────────────────────────────────────────────────────────────────────────────

/**
 * A single analysis entry produced by a specialised Agentforce agent.
 * Common domains: revenue, sla, executive.
 */
export interface AnalysisEntry {
  /** Agentforce-produced severity string, mapped to WidgetTone at render time */
  severity: AnalysisSeverity | string;
  /** Human-readable summary sentence */
  summary: string;
  /** Optional structured bullet points; derived from summary when absent */
  bullets?: string[];
  /** Name of the agent that produced this entry */
  agent?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Events
// ─────────────────────────────────────────────────────────────────────────────

/**
 * A structured event item that maps directly to AgentEvent at render time.
 */
export interface DashboardEventItem {
  id: string;
  title: string;
  description: string;
  severity: "low" | "medium" | "high" | "critical";
  domain: "revenue" | "support" | "executive" | "system";
  timestamp: string;
  status?: "new" | "reviewing" | "resolved" | "monitoring";
  agent?: string;
}

/**
 * Events payload from the Agentforce Flow.
 * Supports both legacy boolean execution flags and structured event items.
 */
export interface DashboardEventsMap {
  /** Legacy execution flags (kept for backward compatibility) */
  revenueAnalysisExecuted?: boolean;
  slaAnalysisExecuted?: boolean;
  executiveAnalysisExecuted?: boolean;
  /** Structured event items rendered as an EventList widget */
  items?: DashboardEventItem[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Widget Configuration Entry
// ─────────────────────────────────────────────────────────────────────────────

/**
 * A single widget declaration inside Configuration__c.widgets[].
 *
 * The `source` field is a dot-path pointer to data in the configuration tree:
 *   "strategicOpportunities"       → metrics.strategicOpportunities
 *   "metrics.strategicOpportunities" → metrics.strategicOpportunities
 *   "analysis.revenue"             → analysis.revenue (AnalysisEntry)
 *   "events.items"                 → events.items (DashboardEventItem[])
 *
 * Type-specific overrides (value, delta, summary, etc.) take precedence
 * over the resolved source data.
 */
export interface WidgetConfigEntry {
  /** Unique widget identifier; used as React key and layout key */
  id: string;
  /** Widget render type */
  type: WidgetType;
  /** Display title shown in the widget header */
  title: string;
  /**
   * Data source pointer. Resolved at render time against the
   * surrounding DashboardRequestConfiguration.
   */
  source?: string;

  // ── KPI overrides ──────────────────────────────────────────────────────────
  /** Override the resolved numeric/string value */
  value?: string | number;
  /** Delta badge text, e.g. "+12.4%" */
  delta?: string;
  /** Trend direction for the delta arrow */
  trend?: "up" | "down" | "flat";
  /** Caption below the KPI value */
  caption?: string;

  // ── Insight overrides ──────────────────────────────────────────────────────
  /** Override insight summary text */
  summary?: string;
  /** Override bullet points */
  bullets?: string[];
  /** Override agent name */
  agent?: string;

  // ── Visual tone ────────────────────────────────────────────────────────────
  /** Explicit tone/accent; takes precedence over severity-derived tone */
  tone?: WidgetTone;

  // ── Chart / Table inline data ──────────────────────────────────────────────
  /**
   * Inline data for chart and table widgets when no source pointer is needed.
   * For charts: ChartWidgetData shape. For tables: TableWidgetData shape.
   */
  data?: Record<string, unknown>;
}

// ─────────────────────────────────────────────────────────────────────────────
// Salesforce Record
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Shape of a Dashboard_Request__c record as returned by the Salesforce API.
 * Configuration__c is a serialised JSON string of DashboardRequestConfiguration.
 */
export interface DashboardRequestRecord {
  Id: string;
  Name: string;
  Dashboard_Type__c?: string;
  Template__c?: string;
  Status__c?: string;
  Dashboard_Summary__c?: string;
  Configuration__c?: string;
  Generated_By_Agent__c?: string;
  Dashboard_URL__c?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Root Configuration
// ─────────────────────────────────────────────────────────────────────────────

/**
 * The complete payload stored in Dashboard_Request__c.Configuration__c.
 *
 * This is the SINGLE SOURCE OF TRUTH for dynamic dashboard rendering.
 *
 * Rendering decision tree (evaluated in renderDashboardFromConfiguration):
 *   1. If widgets[], metrics, analysis, or events.items contain data
 *      → Dynamic render: JSON drives every widget, layout, and insight
 *   2. Otherwise
 *      → Legacy render: template clone + metric patches (backward compat)
 */
export interface DashboardRequestConfiguration {
  /** Fallback template id used only when no dynamic content is present */
  template: string;
  /** Dashboard type hint (e.g. "combined", "sales", "support") */
  dashboardType: string;
  /** Display name for the dashboard header */
  dashboardName: string;
  /** ISO timestamp when the configuration was generated */
  generatedAt?: string;
  /** Agent metadata stamped by the Agentforce Flow */
  agentMetadata?: {
    generatedBy: string;
    version: string;
  };
  /**
   * Scalar metrics.
   * Serves as the data source for KPI widgets via the source resolver.
   */
  metrics?: DashboardMetricsMap;
  /**
   * Analysis entries keyed by domain.
   * Common keys: revenue, sla, executive.
   * Serves as the data source for Insight widgets.
   */
  analysis?: Record<string, AnalysisEntry | undefined>;
  /**
   * Events produced or flagged by the Agentforce Flow.
   * items[] are rendered as an EventList widget when present.
   */
  events?: DashboardEventsMap;
  /**
   * Explicit widget declarations.
   * When non-empty, these declarations drive the full dynamic rendering
   * pipeline and replace all template-based logic.
   */
  widgets?: WidgetConfigEntry[];
}
