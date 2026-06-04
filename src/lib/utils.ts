import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import type { AgentEventSeverity, WidgetTone } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createRequestId(prefix = "vlu") {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now().toString(36)}`;
}

export function formatTimestamp(value: string) {
  return new Intl.DateTimeFormat("en", {
    hour: "numeric",
    minute: "2-digit",
    month: "short",
    day: "numeric"
  }).format(new Date(value));
}

export function getToneClasses(tone: WidgetTone = "neutral") {
  const toneMap: Record<WidgetTone, string> = {
    neutral: "border-border bg-card text-card-foreground",
    success: "border-success/35 bg-success/[0.08] text-success",
    warning: "border-warning/40 bg-warning/10 text-warning",
    critical: "border-destructive/35 bg-destructive/10 text-destructive",
    info: "border-primary/35 bg-primary/[0.08] text-primary"
  };

  return toneMap[tone];
}

export function getSeverityTone(severity: AgentEventSeverity): WidgetTone {
  const severityMap: Record<AgentEventSeverity, WidgetTone> = {
    low: "neutral",
    medium: "info",
    high: "warning",
    critical: "critical"
  };

  return severityMap[severity];
}
