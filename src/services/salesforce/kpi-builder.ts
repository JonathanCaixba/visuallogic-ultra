import { querySalesforce } from "./salesforce-query";

export async function getRealKpis() {
  const accountsResult = await querySalesforce(`
    SELECT COUNT()
    FROM Account
  `);

  const opportunitiesResult = await querySalesforce(`
    SELECT COUNT()
    FROM Opportunity
  `);

  const casesResult = await querySalesforce(`
    SELECT COUNT()
    FROM Case
  `);

  return {
    accounts: accountsResult.totalSize,
    opportunities: opportunitiesResult.totalSize,
    cases: casesResult.totalSize
  };
}

export async function getOpportunityChartData() {
  const result = await querySalesforce(`
    SELECT Name
    FROM Opportunity
    LIMIT 10
  `);

  return result.records.map(
    (record: { Name: string }, index: number) => ({
      label: `Opp ${index + 1}`,
      value: index + 1
    })
  );
}