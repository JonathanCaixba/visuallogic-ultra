import { notFound } from "next/navigation";

import { DashboardRendererShell } from "@/features/dashboard/components/dashboard-renderer-shell";

import { getDashboardRequestById } from "@/services/salesforce/dashboard-request-builder";
import { renderDashboardFromConfiguration } from "@/services/dashboard-renderer.service";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function AgentDashboardPage({
    params
}: PageProps) {

    const { id } = await params;

    const dashboardRequest =
        await getDashboardRequestById(id);

    if (!dashboardRequest) {
        notFound();
    }

    const configurationJson =
        dashboardRequest.Configuration__c;

    if (!configurationJson) {
        notFound();
    }

    const configuration =
        JSON.parse(configurationJson);

    const dashboard =
        renderDashboardFromConfiguration(
            configuration
        );

    return (
        <DashboardRendererShell
            dashboard={dashboard}
        />
    );
}