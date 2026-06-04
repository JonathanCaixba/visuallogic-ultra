import { notFound } from "next/navigation";

import { DashboardStudioShell } from "@/features/studio/components/dashboard-studio-shell";
import { salesforceAgentforceClient } from "@/lib/salesforce/mock-salesforce-client";

interface StudioPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function StudioPage({ params }: StudioPageProps) {
  const { id } = await params;

  try {
    const dashboard = await salesforceAgentforceClient.getDashboardById(id);
    return <DashboardStudioShell dashboard={dashboard} />;
  } catch {
    notFound();
  }
}
