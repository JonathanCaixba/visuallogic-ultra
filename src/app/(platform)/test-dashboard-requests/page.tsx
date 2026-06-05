import { getDashboardRequests } from "@/services/salesforce/dashboard-request-builder";

export default async function TestDashboardRequestsPage() {

  const dashboards =
    await getDashboardRequests();

  return (
    <div className="p-6">
      <h1>Dashboard Requests</h1>

      <pre>
        {JSON.stringify(
          dashboards,
          null,
          2
        )}
      </pre>
    </div>
  );
}