import { notFound } from "next/navigation";

import { PresentationShell } from "@/features/presentation/components/presentation-shell";
import { salesforceAgentforceClient } from "@/lib/salesforce/mock-salesforce-client";

interface PresentationPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PresentationPage({ params }: PresentationPageProps) {
  const { id } = await params;

  try {
    const dashboard = await salesforceAgentforceClient.getDashboardById(id);
    return <PresentationShell dashboard={dashboard} />;
  } catch {
    notFound();
  }
}
