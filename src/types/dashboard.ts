import type { AgentName } from "./agent";
import type { WidgetLayout } from "./layout";
import type { DashboardTheme } from "./theme";
import type { DashboardWidget } from "./widget";

export type DashboardTemplateId =
  | "sales_performance"
  | "support_operations"
  | "executive_intelligence"
  | "executive_combined";

export type DashboardMode = "view" | "customize" | "presentation";

export interface DashboardMetadata {
  requestPrompt: string;
  salesforceFlow:
    | "GenerateSalesDashboardFlow"
    | "GenerateSupportDashboardFlow"
    | "GenerateExecutiveDashboardFlow"
    | "GenerateCombinedBusinessDashboardFlow";
  agentChain: AgentName[];
  generatedAt: string;
  source: "salesforce-agentforce-mock";
}

export interface DashboardConfiguration {
  id: string;
  title: string;
  description: string;
  template: DashboardTemplateId;
  theme: DashboardTheme;
  layouts: WidgetLayout[];
  widgets: DashboardWidget[];
  metadata: DashboardMetadata;
}
