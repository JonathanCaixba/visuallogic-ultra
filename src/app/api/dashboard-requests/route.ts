import { NextResponse } from "next/server";

import { createEnvelope } from "@/lib/api/envelope";
import { getDashboardRequests } from "@/services/salesforce/dashboard-request-builder";

export async function GET() {

  const dashboards =
    await getDashboardRequests();

  return NextResponse.json(
    createEnvelope(dashboards)
  );

}