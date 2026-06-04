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

export function inferTemplateFromPrompt(prompt: string): DashboardTemplateId {
  const normalized = prompt.toLowerCase();

  if (normalized.includes("support") || normalized.includes("case") || normalized.includes("sla")) {
    return "support_operations";
  }

  if (
    normalized.includes("executive") ||
    normalized.includes("business health") ||
    normalized.includes("combined")
  ) {
    return "executive_combined";
  }

  if (normalized.includes("alert") || normalized.includes("insight")) {
    return "executive_intelligence";
  }

  return "sales_performance";
}
