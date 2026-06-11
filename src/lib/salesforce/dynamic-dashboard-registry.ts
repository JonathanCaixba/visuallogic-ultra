/**
 * dynamic-dashboard-registry.ts
 */

import type { DashboardConfiguration } from "@/types";

// Module-level singleton — persists for the lifetime of the server process.
const _store = new Map<string, DashboardConfiguration>();

export const dynamicDashboardRegistry = {
  
  register(dashboard: DashboardConfiguration): void {
    _store.set(dashboard.id, dashboard);
  },

  get(id: string): DashboardConfiguration | undefined {
    return _store.get(id);
  },

  has(id: string): boolean {
    return _store.has(id);
  },
} as const;