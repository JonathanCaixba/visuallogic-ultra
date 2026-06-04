import type { AgentEvent, EventsResponse } from "@/types";
import { apiClient } from "@/lib/api/api-client";

export const EventsService = {
  async getEvents(): Promise<AgentEvent[]> {
    const response = await apiClient.get<EventsResponse>("/api/events");
    return response.data;
  }
};
