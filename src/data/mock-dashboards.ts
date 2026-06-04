import { agentforceChain } from "@/data/mock-agent";
import { mockAgentEvents } from "@/data/mock-events";
import type { DashboardConfiguration, DashboardTemplateId, WidgetLayout } from "@/types";

const generatedAt = "2026-06-04T05:50:00.000Z";

const fourWidgetLayout: WidgetLayout[] = [
  { i: "kpi-1", x: 0, y: 0, w: 3, h: 2, minW: 2, minH: 2 },
  { i: "kpi-2", x: 3, y: 0, w: 3, h: 2, minW: 2, minH: 2 },
  { i: "kpi-3", x: 6, y: 0, w: 3, h: 2, minW: 2, minH: 2 },
  { i: "kpi-4", x: 9, y: 0, w: 3, h: 2, minW: 2, minH: 2 },
  { i: "chart-primary", x: 0, y: 2, w: 8, h: 4, minW: 4, minH: 3 },
  { i: "chart-secondary", x: 8, y: 2, w: 4, h: 4, minW: 3, minH: 3 },
  { i: "table-primary", x: 0, y: 6, w: 7, h: 4, minW: 4, minH: 3 },
  { i: "insight-primary", x: 7, y: 6, w: 5, h: 4, minW: 3, minH: 3 }
];

export const dashboardByTemplate: Record<DashboardTemplateId, DashboardConfiguration> = {
  sales_performance: {
    id: "dashboard-sales-performance",
    title: "Sales Performance",
    description: "Revenue, opportunity, trend, and regional performance view.",
    template: "sales_performance",
    theme: "sales",
    layouts: fourWidgetLayout,
    metadata: {
      requestPrompt: "Show closed opportunities this quarter",
      salesforceFlow: "GenerateSalesDashboardFlow",
      agentChain: agentforceChain,
      generatedAt,
      source: "salesforce-agentforce-mock"
    },
    widgets: [
      {
        id: "kpi-1",
        type: "kpi",
        title: "Revenue KPI",
        data: { value: "$4.8M", delta: "+12.4%", trend: "up", caption: "Closed revenue" },
        chrome: { accent: "success" }
      },
      {
        id: "kpi-2",
        type: "kpi",
        title: "Closed Opportunities",
        data: { value: 184, delta: "+23", trend: "up", caption: "Quarter to date" },
        chrome: { accent: "info" }
      },
      {
        id: "kpi-3",
        type: "kpi",
        title: "Pipeline",
        data: { value: "$13.2M", delta: "+8.1%", trend: "up", caption: "Weighted pipeline" },
        chrome: { accent: "neutral" }
      },
      {
        id: "kpi-4",
        type: "kpi",
        title: "Win Rate",
        data: { value: "31%", delta: "+2.8%", trend: "up", caption: "Rolling quarter" },
        chrome: { accent: "success" }
      },
      {
        id: "chart-primary",
        type: "line-chart",
        title: "Revenue Trend",
        data: {
          xKey: "label",
          series: [{ key: "revenue", label: "Revenue", color: "#0f9f6e" }],
          data: [
            { label: "Jan", revenue: 820 },
            { label: "Feb", revenue: 940 },
            { label: "Mar", revenue: 1160 },
            { label: "Apr", revenue: 1320 },
            { label: "May", revenue: 1510 },
            { label: "Jun", revenue: 1680 }
          ]
        }
      },
      {
        id: "chart-secondary",
        type: "bar-chart",
        title: "Regional Distribution",
        data: {
          xKey: "label",
          series: [{ key: "closed", label: "Closed", color: "#2563eb" }],
          data: [
            { label: "NA", closed: 48 },
            { label: "LATAM", closed: 31 },
            { label: "EMEA", closed: 42 },
            { label: "APAC", closed: 27 }
          ]
        }
      },
      {
        id: "table-primary",
        type: "table",
        title: "Closed Opportunities",
        data: {
          columns: [
            { key: "account", label: "Account" },
            { key: "stage", label: "Stage" },
            { key: "amount", label: "Amount", align: "right" }
          ],
          rows: [
            { account: "Aster Retail", stage: "Closed Won", amount: "$420K" },
            { account: "Northstar Energy", stage: "Closed Won", amount: "$390K" },
            { account: "Mira Health", stage: "Closed Won", amount: "$340K" }
          ]
        }
      },
      {
        id: "insight-primary",
        type: "insight",
        title: "Revenue Intelligence",
        data: {
          agent: "Revenue Intelligence Agent",
          severity: "success",
          summary: "Pipeline expansion is strongest in strategic accounts.",
          bullets: ["Enterprise deal velocity improved", "Regional mix remains balanced", "Late-stage risk is concentrated in APAC"]
        }
      }
    ]
  },
  support_operations: {
    id: "dashboard-support-operations",
    title: "Support Operations",
    description: "Case volume, critical case, SLA risk, and escalation tracking view.",
    template: "support_operations",
    theme: "support",
    layouts: fourWidgetLayout,
    metadata: {
      requestPrompt: "Support operations overview",
      salesforceFlow: "GenerateSupportDashboardFlow",
      agentChain: agentforceChain,
      generatedAt,
      source: "salesforce-agentforce-mock"
    },
    widgets: [
      {
        id: "kpi-1",
        type: "kpi",
        title: "Open Cases",
        data: { value: 312, delta: "-6.2%", trend: "down", caption: "Active support queue" },
        chrome: { accent: "info" }
      },
      {
        id: "kpi-2",
        type: "kpi",
        title: "Critical Cases",
        data: { value: 18, delta: "+4", trend: "up", caption: "Priority escalations" },
        chrome: { accent: "critical" }
      },
      {
        id: "kpi-3",
        type: "kpi",
        title: "SLA Risk",
        data: { value: "9.8%", delta: "+1.3%", trend: "up", caption: "At-risk case share" },
        chrome: { accent: "warning" }
      },
      {
        id: "kpi-4",
        type: "kpi",
        title: "Median Response",
        data: { value: "42m", delta: "-8m", trend: "down", caption: "Across priority cases" },
        chrome: { accent: "success" }
      },
      {
        id: "chart-primary",
        type: "line-chart",
        title: "SLA Risk Trend",
        data: {
          xKey: "label",
          series: [{ key: "risk", label: "SLA Risk", color: "#d97706" }],
          data: [
            { label: "Mon", risk: 7 },
            { label: "Tue", risk: 8 },
            { label: "Wed", risk: 9 },
            { label: "Thu", risk: 11 },
            { label: "Fri", risk: 10 }
          ]
        }
      },
      {
        id: "chart-secondary",
        type: "bar-chart",
        title: "Case Mix",
        data: {
          xKey: "label",
          series: [{ key: "cases", label: "Cases", color: "#7c3aed" }],
          data: [
            { label: "Billing", cases: 74 },
            { label: "Access", cases: 58 },
            { label: "Defect", cases: 39 },
            { label: "How-to", cases: 91 }
          ]
        }
      },
      {
        id: "table-primary",
        type: "table",
        title: "Escalation Tracking",
        data: {
          columns: [
            { key: "case", label: "Case" },
            { key: "account", label: "Account" },
            { key: "risk", label: "Risk", align: "right" }
          ],
          rows: [
            { case: "CS-12094", account: "Northstar Energy", risk: "Critical" },
            { case: "CS-12081", account: "Aster Retail", risk: "High" },
            { case: "CS-12063", account: "Mira Health", risk: "High" }
          ]
        }
      },
      {
        id: "insight-primary",
        type: "insight",
        title: "Support Monitoring",
        data: {
          agent: "Support Monitoring Agent",
          severity: "warning",
          summary: "SLA risk is clustered in enterprise priority cases.",
          bullets: ["Billing cases carry the highest risk", "Response time is improving", "Critical queue needs focused triage"]
        }
      }
    ]
  },
  executive_intelligence: {
    id: "dashboard-executive-intelligence",
    title: "Executive Intelligence",
    description: "Revenue alerts, SLA breaches, and executive insight view.",
    template: "executive_intelligence",
    theme: "executive",
    layouts: fourWidgetLayout,
    metadata: {
      requestPrompt: "Show executive insights",
      salesforceFlow: "GenerateExecutiveDashboardFlow",
      agentChain: agentforceChain,
      generatedAt,
      source: "salesforce-agentforce-mock"
    },
    widgets: [
      {
        id: "kpi-1",
        type: "kpi",
        title: "Revenue Alerts",
        data: { value: 6, delta: "+2", trend: "up", caption: "Active signals" },
        chrome: { accent: "warning" }
      },
      {
        id: "kpi-2",
        type: "kpi",
        title: "SLA Breaches",
        data: { value: 3, delta: "-1", trend: "down", caption: "Open breach count" },
        chrome: { accent: "critical" }
      },
      {
        id: "kpi-3",
        type: "kpi",
        title: "Executive Insights",
        data: { value: 12, delta: "+5", trend: "up", caption: "Generated today" },
        chrome: { accent: "info" }
      },
      {
        id: "kpi-4",
        type: "kpi",
        title: "Business Health",
        data: { value: "82", unit: "/100", delta: "+4", trend: "up", caption: "Composite signal" },
        chrome: { accent: "success" }
      },
      {
        id: "chart-primary",
        type: "line-chart",
        title: "Business Health Overview",
        data: {
          xKey: "label",
          series: [
            { key: "revenue", label: "Revenue", color: "#0f9f6e" },
            { key: "support", label: "Support", color: "#2563eb" }
          ],
          data: [
            { label: "W1", revenue: 76, support: 71 },
            { label: "W2", revenue: 78, support: 73 },
            { label: "W3", revenue: 81, support: 72 },
            { label: "W4", revenue: 84, support: 76 }
          ]
        }
      },
      {
        id: "chart-secondary",
        type: "bar-chart",
        title: "Signal Distribution",
        data: {
          xKey: "label",
          series: [{ key: "signals", label: "Signals", color: "#0891b2" }],
          data: [
            { label: "Revenue", signals: 6 },
            { label: "SLA", signals: 3 },
            { label: "Pipeline", signals: 5 },
            { label: "Health", signals: 4 }
          ]
        }
      },
      {
        id: "table-primary",
        type: "event-list",
        title: "Executive Event Center",
        data: { events: mockAgentEvents }
      },
      {
        id: "insight-primary",
        type: "insight",
        title: "Executive Intelligence",
        data: {
          agent: "Executive Intelligence Agent",
          severity: "info",
          summary: "The combined business signal is healthy with localized support risk.",
          bullets: ["Revenue trend offsets SLA exposure", "Strategic pipeline quality improved", "Northwest variance needs monitoring"]
        }
      }
    ]
  },
  executive_combined: {
    id: "dashboard-executive-combined",
    title: "Executive Combined",
    description: "Revenue, pipeline, cases, SLA risk, and business health overview.",
    template: "executive_combined",
    theme: "executive",
    layouts: fourWidgetLayout,
    metadata: {
      requestPrompt: "Show closed opportunities this quarter",
      salesforceFlow: "GenerateCombinedBusinessDashboardFlow",
      agentChain: agentforceChain,
      generatedAt,
      source: "salesforce-agentforce-mock"
    },
    widgets: [
      {
        id: "kpi-1",
        type: "kpi",
        title: "Revenue",
        data: { value: "$4.8M", delta: "+12.4%", trend: "up", caption: "Closed revenue" },
        chrome: { accent: "success" }
      },
      {
        id: "kpi-2",
        type: "kpi",
        title: "Pipeline",
        data: { value: "$13.2M", delta: "+8.1%", trend: "up", caption: "Weighted pipeline" },
        chrome: { accent: "info" }
      },
      {
        id: "kpi-3",
        type: "kpi",
        title: "Open Cases",
        data: { value: 312, delta: "-6.2%", trend: "down", caption: "Active support queue" },
        chrome: { accent: "neutral" }
      },
      {
        id: "kpi-4",
        type: "kpi",
        title: "SLA Risk",
        data: { value: "9.8%", delta: "+1.3%", trend: "up", caption: "At-risk case share" },
        chrome: { accent: "warning" }
      },
      {
        id: "chart-primary",
        type: "line-chart",
        title: "Revenue and Support Signals",
        data: {
          xKey: "label",
          series: [
            { key: "revenue", label: "Revenue", color: "#0f9f6e" },
            { key: "support", label: "Support", color: "#2563eb" }
          ],
          data: [
            { label: "Jan", revenue: 820, support: 69 },
            { label: "Feb", revenue: 940, support: 72 },
            { label: "Mar", revenue: 1160, support: 70 },
            { label: "Apr", revenue: 1320, support: 74 },
            { label: "May", revenue: 1510, support: 77 },
            { label: "Jun", revenue: 1680, support: 76 }
          ]
        }
      },
      {
        id: "chart-secondary",
        type: "bar-chart",
        title: "Regional Revenue",
        data: {
          xKey: "label",
          series: [{ key: "closed", label: "Closed", color: "#0891b2" }],
          data: [
            { label: "NA", closed: 48 },
            { label: "LATAM", closed: 31 },
            { label: "EMEA", closed: 42 },
            { label: "APAC", closed: 27 }
          ]
        }
      },
      {
        id: "table-primary",
        type: "table",
        title: "Business Signals",
        data: {
          columns: [
            { key: "signal", label: "Signal" },
            { key: "owner", label: "Owner" },
            { key: "status", label: "Status", align: "right" }
          ],
          rows: [
            { signal: "Revenue variance", owner: "Revenue Agent", status: "Monitor" },
            { signal: "Enterprise SLA risk", owner: "Support Agent", status: "New" },
            { signal: "Pipeline quality", owner: "Executive Agent", status: "Review" }
          ]
        }
      },
      {
        id: "insight-primary",
        type: "insight",
        title: "Business Health Overview",
        data: {
          agent: "Executive Intelligence Agent",
          severity: "info",
          summary: "Revenue strength is carrying the overall business health signal.",
          bullets: ["Sales momentum remains positive", "Support risk requires executive visibility", "Pipeline quality improved in strategic segments"]
        }
      }
    ]
  }
};

export const latestDashboardId = "dashboard-executive-combined";

export const dashboardById = Object.values(dashboardByTemplate).reduce<Record<string, DashboardConfiguration>>(
  (dashboards, dashboard) => {
    dashboards[dashboard.id] = dashboard;
    return dashboards;
  },
  {}
);
