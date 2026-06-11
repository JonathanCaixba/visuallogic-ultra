import { notFound } from "next/navigation";

import { DashboardStudioShell } from "@/features/studio/components/dashboard-studio-shell";
import { salesforceAgentforceClient } from "@/lib/salesforce/mock-salesforce-client";
import { buildDashboardCentral } from "@/services/dashboard-central/dashboard-central-builder";

interface StudioPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function StudioPage({ params }: StudioPageProps) {
  const { id } = await params;
  if (id === "dashboard-central") {
  const dashboard =
    await buildDashboardCentral();

  return (
    <DashboardStudioShell
      dashboard={dashboard}
    />
  );
}

  try {
    const dashboard = await salesforceAgentforceClient.getDashboardById(id);
    return <DashboardStudioShell dashboard={dashboard} />;
  } catch {
    notFound();
  }
}
