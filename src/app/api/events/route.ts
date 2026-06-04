import { NextResponse } from "next/server";

import { createEnvelope } from "@/lib/api/envelope";
import { salesforceAgentforceClient } from "@/lib/salesforce/mock-salesforce-client";

export async function GET() {
  const events = await salesforceAgentforceClient.getEvents();
  return NextResponse.json(createEnvelope(events));
}
