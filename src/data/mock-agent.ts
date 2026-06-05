import type { AgentName, AgentTask, DashboardTemplateId } from "@/types";

export const agentforceChain: AgentName[] = [
  "Dashboard Visualization Agent",
  "Revenue Intelligence Agent",
  "Support Monitoring Agent",
  "Executive Intelligence Agent"
];

export function buildAgentTasks(status: AgentTask["status"] = "pending"): AgentTask[] {
  return [
    {
      id: "task-visualization",
      agentName: "Dashboard Visualization Agent",
      status,
      description: "Interprets the visualization request and selects a dashboard contract."
    },
    {
      id: "task-revenue",
      agentName: "Revenue Intelligence Agent",
      status,
      description: "Prepares revenue, pipeline, and opportunity signals."
    },
    {
      id: "task-support",
      agentName: "Support Monitoring Agent",
      status,
      description: "Prepares case volume, SLA, and escalation signals."
    },
    {
      id: "task-executive",
      agentName: "Executive Intelligence Agent",
      status,
      description: "Composes executive insights and business health indicators."
    }
  ];
}

export function inferTemplateFromPrompt(
  prompt: string
): DashboardTemplateId {

  const normalized = prompt.toLowerCase();

  // Support

  if (
    normalized.includes("support") ||
    normalized.includes("case") ||
    normalized.includes("cases") ||
    normalized.includes("sla") ||
    normalized.includes("ticket")
  ) {
    return "support_operations";
  }

  // Executive

  if (
    normalized.includes("executive") ||
    normalized.includes("business health") ||
    normalized.includes("combined") ||
    normalized.includes("overview") ||
    normalized.includes("summary")
  ) {
    return "executive_combined";
  }

  // Intelligence

  if (
    normalized.includes("insight") ||
    normalized.includes("alert") ||
    normalized.includes("prediction") ||
    normalized.includes("risk")
  ) {
    return "executive_intelligence";
  }

  // Sales

  if (
    normalized.includes("sales") ||
    normalized.includes("opportunity") ||
    normalized.includes("opportunities") ||
    normalized.includes("pipeline") ||
    normalized.includes("revenue") ||
    normalized.includes("account") ||
    normalized.includes("accounts")
  ) {
    return "sales_performance";
  }

  return "sales_performance";
}
