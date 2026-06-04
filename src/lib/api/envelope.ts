import type { ApiEnvelope } from "@/types";
import { createRequestId } from "@/lib/utils";

export function createEnvelope<TData>(data: TData): ApiEnvelope<TData> {
  return {
    data,
    meta: {
      requestId: createRequestId("mock"),
      servedBy: "mock-agentforce-adapter",
      generatedAt: new Date().toISOString()
    }
  };
}
