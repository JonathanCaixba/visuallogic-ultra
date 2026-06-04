import type { PersistedDashboardLayout, WidgetLayout } from "@/types";

const STORAGE_KEY = "visuallogic-ultra-layouts";

type LayoutStorageState = Record<string, PersistedDashboardLayout>;

function readState(): LayoutStorageState {
  if (typeof window === "undefined") {
    return {};
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return {};
  }

  try {
    const parsed = JSON.parse(raw) as unknown;
    return typeof parsed === "object" && parsed !== null ? (parsed as LayoutStorageState) : {};
  } catch {
    return {};
  }
}

function writeState(state: LayoutStorageState) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function getStoredDashboardLayout(dashboardId: string) {
  return readState()[dashboardId];
}

export function saveStoredDashboardLayout(
  dashboardId: string,
  layout: WidgetLayout[],
  hiddenWidgetIds: string[]
) {
  const state = readState();
  const nextLayout: PersistedDashboardLayout = {
    dashboardId,
    layout,
    hiddenWidgetIds,
    savedAt: new Date().toISOString()
  };

  writeState({
    ...state,
    [dashboardId]: nextLayout
  });

  return nextLayout;
}

export function clearStoredDashboardLayout(dashboardId: string) {
  const state = readState();
  const nextState = { ...state };
  delete nextState[dashboardId];
  writeState(nextState);
}
