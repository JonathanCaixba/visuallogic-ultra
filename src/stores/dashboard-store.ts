"use client";

import { create } from "zustand";

import type { DashboardMode } from "@/types";

interface DashboardState {
  activeDashboardId: string;
  mode: DashboardMode;
  setActiveDashboardId: (dashboardId: string) => void;
  setMode: (mode: DashboardMode) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  activeDashboardId: "dashboard-executive-combined",
  mode: "view",
  setActiveDashboardId: (activeDashboardId) => set({ activeDashboardId }),
  setMode: (mode) => set({ mode })
}));
