import Link from "next/link";

import { getDashboardRequests } from "@/services/salesforce/dashboard-request-builder";

export default async function AgentDashboardsPage() {

  const dashboards =
    await getDashboardRequests();

  return (
    <div className="p-6">

      <h1 className="text-3xl font-semibold mb-6">
        Agent Generated Dashboards
      </h1>

      <div className="grid gap-4">

        {dashboards.map((dashboard) => (

          <Link
            key={dashboard.Id}
            href={`/agent-dashboards/${dashboard.Id}`}
            className="dashboard-surface p-4 rounded-xl hover:opacity-90 hover:scale-[1.01] hover:border-primary transition cursor-pointer"
          >

            <h2 className="text-xl font-semibold">
              {dashboard.Name}
            </h2>

            <p className="text-sm text-muted-foreground mt-2">
              Template: {dashboard.Template__c}
            </p>

            <p className="text-sm text-muted-foreground">
              Type: {dashboard.Dashboard_Type__c}
            </p>

            <p className="text-sm text-muted-foreground">
              Status: {dashboard.Status__c}
            </p>

          </Link>

        ))}

      </div>

    </div>
  );
}