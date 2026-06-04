import type { PersistedDashboardLayout, SaveLayoutRequest, SaveLayoutResponse, WidgetLayout } from "@/types";
import { apiClient } from "@/lib/api/api-client";
import { saveStoredDashboardLayout } from "@/lib/storage/layout-storage";

export const LayoutService = {
  async saveLayout(
    dashboardId: string,
    layout: WidgetLayout[],
    hiddenWidgetIds: string[]
  ): Promise<PersistedDashboardLayout> {
    const persisted = saveStoredDashboardLayout(dashboardId, layout, hiddenWidgetIds);
    const request: SaveLayoutRequest = { dashboardId, layout, hiddenWidgetIds };
    await apiClient.post<SaveLayoutResponse, SaveLayoutRequest>("/api/layout/save", request);
    return persisted;
  }
};
