import { getRealKpis } from "@/services/salesforce/kpi-builder";

export async function getDashboardCentralData() {
  const kpis = await getRealKpis();

  return {
    accounts: kpis.accounts,
    opportunities: kpis.opportunities,
    cases: kpis.cases,

    events: 0,

    dashboardsToday: 0,
    dashboardsWeek: 0,
    dashboardsMonth: 0,

    recentDashboards: [],
    recentEvents: []
  };
}