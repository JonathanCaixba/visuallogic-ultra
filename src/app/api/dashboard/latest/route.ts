import { NextResponse } from "next/server";

import { createEnvelope } from "@/lib/api/envelope";
import { salesforceAgentforceClient } from "@/lib/salesforce/mock-salesforce-client";

export async function GET() {
  const dashboard = await salesforceAgentforceClient.getLatestDashboard();
  return NextResponse.json(createEnvelope(dashboard));
}
