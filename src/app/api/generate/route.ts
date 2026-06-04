import { NextResponse } from "next/server";

import { createEnvelope } from "@/lib/api/envelope";
import { salesforceAgentforceClient } from "@/lib/salesforce/mock-salesforce-client";
import type { ApiErrorPayload, GenerateRequest } from "@/types";

function isGenerateRequest(value: unknown): value is GenerateRequest {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const candidate = value as Partial<GenerateRequest>;
  return typeof candidate.prompt === "string" && candidate.prompt.trim().length > 0;
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

  if (!isGenerateRequest(body)) {
    const payload: ApiErrorPayload = {
      code: "BAD_REQUEST",
      message: "A non-empty prompt is required."
    };

    return NextResponse.json(payload, { status: 400 });
  }

  const response = await salesforceAgentforceClient.generateDashboard({
    ...body,
    prompt: body.prompt.trim()
  });

  return NextResponse.json(createEnvelope(response));
}
