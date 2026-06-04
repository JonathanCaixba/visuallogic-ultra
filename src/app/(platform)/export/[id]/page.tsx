import { notFound } from "next/navigation";

import { ExportCenterShell } from "@/features/export/components/export-center-shell";
import { salesforceAgentforceClient } from "@/lib/salesforce/mock-salesforce-client";

interface ExportPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ExportPage({ params }: ExportPageProps) {
  const { id } = await params;

  try {
    const dashboard = await salesforceAgentforceClient.getDashboardById(id);
    return <ExportCenterShell dashboard={dashboard} />;
  } catch {
    notFound();
  }
}
