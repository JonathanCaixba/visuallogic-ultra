import { NextResponse } from "next/server";

import { createEnvelope } from "@/lib/api/envelope";
import { salesforceAgentforceClient } from "@/lib/salesforce/mock-salesforce-client";
import type { ApiErrorPayload, SaveLayoutRequest, WidgetLayout } from "@/types";

function isWidgetLayout(value: unknown): value is WidgetLayout {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const candidate = value as Partial<WidgetLayout>;
  return (
    typeof candidate.i === "string" &&
    typeof candidate.x === "number" &&
    typeof candidate.y === "number" &&
    typeof candidate.w === "number" &&
    typeof candidate.h === "number"
  );
}

function isSaveLayoutRequest(value: unknown): value is SaveLayoutRequest {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const candidate = value as Partial<SaveLayoutRequest>;
  return (
    typeof candidate.dashboardId === "string" &&
    Array.isArray(candidate.layout) &&
    candidate.layout.every(isWidgetLayout)
  );
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = (await request.json()) as unknown;
  } catch {
    const payload: ApiErrorPayload = {
      code: "BAD_REQUEST",
      message: "Request body must be valid JSON."
    };

    return NextResponse.json(payload, { status: 400 });
  }

  if (!isSaveLayoutRequest(body)) {
    const payload: ApiErrorPayload = {
      code: "BAD_REQUEST",
      message: "A dashboard id and widget layout array are required."
    };

    return NextResponse.json(payload, { status: 400 });
  }

  const response = await salesforceAgentforceClient.saveLayout(body);
  return NextResponse.json(createEnvelope(response));
}
