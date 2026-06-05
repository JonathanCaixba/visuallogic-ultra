import { apiClient } from "@/lib/api/api-client";

export const DashboardRequestService = {

  async getAll() {

  interface DashboardRequestRecord {
  Id: string;
  Name: string;
}
const response =
  await apiClient.get<{
    data: DashboardRequestRecord[];
  }>(
    "/api/dashboard-requests"
  );

    return response.data;
  }

};