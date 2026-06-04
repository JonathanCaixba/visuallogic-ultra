"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { WidgetLayout } from "@/types";
const EMPTY_ARRAY: string[] = [];

interface LayoutState {
  layouts: Record<string, WidgetLayout[]>;
  hiddenWidgetIds: Record<string, string[]>;
  setLayout: (dashboardId: string, layout: WidgetLayout[]) => void;
  hideWidget: (dashboardId: string, widgetId: string) => void;
  showWidget: (dashboardId: string, widgetId: string) => void;
  resetDashboardLayout: (dashboardId: string) => void;
  getLayout: (dashboardId: string) => WidgetLayout[] | undefined;
  getHiddenWidgetIds: (dashboardId: string) => string[];
}

export const useLayoutStore = create<LayoutState>()(
  persist(
    (set, get) => ({
      layouts: {},
      hiddenWidgetIds: {},
      setLayout: (dashboardId, layout) =>
        set((state) => ({
          layouts: {
            ...state.layouts,
            [dashboardId]: layout
          }
        })),
      hideWidget: (dashboardId, widgetId) =>
        set((state) => {
          const hidden = new Set(state.hiddenWidgetIds[dashboardId] ?? []);
          hidden.add(widgetId);

          return {
            hiddenWidgetIds: {
              ...state.hiddenWidgetIds,
              [dashboardId]: Array.from(hidden)
            }
          };
        }),
      showWidget: (dashboardId, widgetId) =>
        set((state) => ({
          hiddenWidgetIds: {
            ...state.hiddenWidgetIds,
            [dashboardId]: (state.hiddenWidgetIds[dashboardId] ?? []).filter((id) => id !== widgetId)
          }
        })),
      resetDashboardLayout: (dashboardId) =>
        set((state) => {
          const layouts = { ...state.layouts };
          const hiddenWidgetIds = { ...state.hiddenWidgetIds };
          delete layouts[dashboardId];
          delete hiddenWidgetIds[dashboardId];

          return { layouts, hiddenWidgetIds };
        }),
      getLayout: (dashboardId) => get().layouts[dashboardId],
      getHiddenWidgetIds: (dashboardId) => get().hiddenWidgetIds[dashboardId] ?? EMPTY_ARRAY
    }),
    {
      name: "visuallogic-ultra-dashboard-layouts",
      storage: createJSONStorage(() => localStorage)
    }
  )
);
