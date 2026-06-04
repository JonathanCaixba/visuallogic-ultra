"use client";

import { create } from "zustand";

import type { AgentStatus, AgentTask } from "@/types";

interface CommandCenterState {
  prompt: string;
  tasks: AgentTask[];
  isGenerating: boolean;
  lastGeneratedDashboardId?: string;
  setPrompt: (prompt: string) => void;
  startGeneration: (tasks: AgentTask[]) => void;
  updateTaskStatus: (taskId: string, status: AgentStatus) => void;
  completeGeneration: (dashboardId: string) => void;
  reset: () => void;
}

export const useCommandCenterStore = create<CommandCenterState>((set) => ({
  prompt: "",
  tasks: [],
  isGenerating: false,
  setPrompt: (prompt) => set({ prompt }),
  startGeneration: (tasks) => set({ tasks, isGenerating: true, lastGeneratedDashboardId: undefined }),
  updateTaskStatus: (taskId, status) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status,
              startedAt: status === "running" ? new Date().toISOString() : task.startedAt,
              completedAt: status === "completed" ? new Date().toISOString() : task.completedAt
            }
          : task
      )
    })),
  completeGeneration: (dashboardId) => set({ isGenerating: false, lastGeneratedDashboardId: dashboardId }),
  reset: () => set({ prompt: "", tasks: [], isGenerating: false, lastGeneratedDashboardId: undefined })
}));
