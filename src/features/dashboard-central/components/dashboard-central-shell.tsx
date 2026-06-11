interface DashboardCentralData {
  accounts: number;
  opportunities: number;
  cases: number;

  dashboardsToday: number;
  dashboardsWeek: number;
  dashboardsMonth: number;

  events: number;
}

interface Props {
  data: DashboardCentralData;
}

export function DashboardCentralShell({ data }: Props) {
  return (
  <section className="p-6">
    <h1 className="mb-8 text-4xl font-bold">
      Dashboard Central
    </h1>

    {/* Salesforce Overview */}
    <div className="mb-6 grid grid-cols-4 gap-4">
      <div className="dashboard-surface p-4">
        <h3 className="text-sm text-muted-foreground">
          Accounts
        </h3>
        <p className="mt-2 text-4xl font-bold">
          {data.accounts}
        </p>
      </div>

      <div className="dashboard-surface p-4">
        <h3 className="text-sm text-muted-foreground">
          Opportunities
        </h3>
        <p className="mt-2 text-4xl font-bold">
          {data.opportunities}
        </p>
      </div>

      <div className="dashboard-surface p-4">
        <h3 className="text-sm text-muted-foreground">
          Cases
        </h3>
        <p className="mt-2 text-4xl font-bold">
          {data.cases}
        </p>
      </div>

      <div className="dashboard-surface p-4">
        <h3 className="text-sm text-muted-foreground">
          Agent Events
        </h3>
        <p className="mt-2 text-4xl font-bold">
          {data.events}
        </p>
      </div>
    </div>

    {/* Dashboard Metrics */}
    <div className="grid grid-cols-3 gap-4">
      <div className="dashboard-surface p-4">
        <h3 className="text-sm text-muted-foreground">
          Dashboards Today
        </h3>
        <p className="mt-2 text-3xl font-bold">
          {data.dashboardsToday}
        </p>
      </div>

      <div className="dashboard-surface p-4">
        <h3 className="text-sm text-muted-foreground">
          Dashboards This Week
        </h3>
        <p className="mt-2 text-3xl font-bold">
          {data.dashboardsWeek}
        </p>
      </div>

      <div className="dashboard-surface p-4">
        <h3 className="text-sm text-muted-foreground">
          Dashboards This Month
        </h3>
        <p className="mt-2 text-3xl font-bold">
          {data.dashboardsMonth}
        </p>
      </div>
    </div>
  </section>
);
}