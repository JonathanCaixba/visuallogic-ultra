import { notFound } from "next/navigation";

import { DashboardRendererShell } from "@/features/dashboard/components/dashboard-renderer-shell";
import { salesforceAgentforceClient } from "@/lib/salesforce/mock-salesforce-client";

interface DashboardPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  const { id } = await params;

  try {
    const dashboard = await salesforceAgentforceClient.getDashboardById(id);
    return <DashboardRendererShell dashboard={dashboard} />;
  } catch {
    notFound();
  }
}
