"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Circle, CircleX, LoaderCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { AgentStatus, AgentTask } from "@/types";

const statusIcon = {
  pending: Circle,
  running: LoaderCircle,
  completed: CheckCircle2,
  failed: CircleX
};

const statusClass: Record<AgentStatus, string> = {
  pending: "text-muted-foreground",
  running: "text-primary",
  completed: "text-success",
  failed: "text-destructive"
};

export function AgentThinkingTimeline({ tasks }: { tasks: AgentTask[] }) {
  if (tasks.length === 0) {
    return (
      <div className="dashboard-surface p-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="text-sm font-semibold">Live Agent Thinking Timeline</h2>
          <Badge variant="outline">Ready</Badge>
        </div>
        <div className="space-y-3 text-sm text-muted-foreground">
          <div>Dashboard Visualization Agent</div>
          <div>Revenue Intelligence Agent</div>
          <div>Support Monitoring Agent</div>
          <div>Executive Intelligence Agent</div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-surface p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold">Live Agent Thinking Timeline</h2>
        <Badge variant="secondary">Agentforce</Badge>
      </div>
      <div className="space-y-3">
        {tasks.map((task, index) => {
          const Icon = statusIcon[task.status];

          return (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.06 }}
              className="flex gap-3 rounded-md border bg-background/50 p-3"
            >
              <Icon
                className={cn("mt-0.5 h-4 w-4 shrink-0", statusClass[task.status], task.status === "running" && "animate-spin")}
                aria-hidden="true"
              />
              <div className="min-w-0">
                <div className="truncate text-sm font-medium">{task.agentName}</div>
                <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{task.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
