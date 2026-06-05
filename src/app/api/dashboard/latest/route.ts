import { NextResponse } from "next/server";

import { createEnvelope } from "@/lib/api/envelope";

import { mockDashboardRequest } from "@/data/mock-dashboard-request";

import { renderDashboardFromConfiguration }
  from "@/services/dashboard-renderer.service";

export async function GET() {

  const dashboard =
    renderDashboardFromConfiguration(
      mockDashboardRequest
    );

  return NextResponse.json(
    createEnvelope(dashboard)
  );
}