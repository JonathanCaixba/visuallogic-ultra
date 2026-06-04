import type { DashboardTemplateId, GenerateRequest, GenerateResponse } from "@/types";
import { apiClient } from "@/lib/api/api-client";

export const AgentService = {
  async generateDashboard(prompt: string, templateHint?: DashboardTemplateId) {
    const request: GenerateRequest = { prompt, templateHint };
    const response = await apiClient.post<GenerateResponse, GenerateRequest>("/api/generate", request);
    return response.data;
  }
};
