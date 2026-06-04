import type { AgentEvent } from "./events";
import type { GenerateDashboardRequest, GenerateDashboardResponse } from "./agent";
import type { DashboardConfiguration } from "./dashboard";
import type { PersistedDashboardLayout, WidgetLayout } from "./layout";

export interface ApiEnvelope<TData> {
  data: TData;
  meta: {
    requestId: string;
    servedBy: "mock-agentforce-adapter";
    generatedAt: string;
  };
}

export interface ApiErrorPayload {
  code: "BAD_REQUEST" | "NOT_FOUND" | "MOCK_ADAPTER_ERROR";
  message: string;
}

export type DashboardLatestResponse = ApiEnvelope<DashboardConfiguration>;
export type DashboardByIdResponse = ApiEnvelope<DashboardConfiguration>;
export type EventsResponse = ApiEnvelope<AgentEvent[]>;
export type GenerateResponse = ApiEnvelope<GenerateDashboardResponse>;

export type GenerateRequest = GenerateDashboardRequest;

export interface SaveLayoutRequest {
  dashboardId: string;
  layout: WidgetLayout[];
  hiddenWidgetIds?: string[];
}

export type SaveLayoutResponse = ApiEnvelope<PersistedDashboardLayout>;
