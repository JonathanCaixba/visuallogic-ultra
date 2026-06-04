import type { DashboardByIdResponse, DashboardConfiguration, DashboardLatestResponse } from "@/types";
import { apiClient } from "@/lib/api/api-client";

export const DashboardService = {
  async getLatest(): Promise<DashboardConfiguration> {
    const response = await apiClient.get<DashboardLatestResponse>("/api/dashboard/latest");
    return response.data;
  },

  async getById(id: string): Promise<DashboardConfiguration> {
    const response = await apiClient.get<DashboardByIdResponse>(`/api/dashboard/${id}`);
    return response.data;
  }
};
