import { NextResponse } from "next/server";

import { createEnvelope } from "@/lib/api/envelope";
import { salesforceAgentforceClient } from "@/lib/salesforce/mock-salesforce-client";
import type { ApiErrorPayload } from "@/types";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;

  try {
    const dashboard = await salesforceAgentforceClient.getDashboardById(id);
    return NextResponse.json(createEnvelope(dashboard));
  } catch {
    const payload: ApiErrorPayload = {
      code: "NOT_FOUND",
      message: `Dashboard '${id}' was not found.`
    };

    return NextResponse.json(payload, { status: 404 });
  }
}
