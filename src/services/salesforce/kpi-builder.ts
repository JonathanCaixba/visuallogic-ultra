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
    SELECT StageName, COUNT(Id)
    total
    FROM Opportunity
    GROUP BY StageName
  `);

  return result.records.map(
    (record: {
      StageName: string;
      total: number;
    }) => ({
      label: record.StageName || "Unknown",
      value: record.total
    })
  );
}

export async function getCasesByStatusChartData() {
  const result = await querySalesforce(`
    SELECT Status, COUNT(Id)
    total
    FROM Case
    GROUP BY Status
  `);

  return result.records.map(
    (record: {
      Status: string;
      total: number;
    }) => ({
      label: record.Status || "Unknown",
      value: record.total
    })
  );
}

export async function getRecentCases() {
  const result = await querySalesforce(`
    SELECT CaseNumber, Subject, Status
    FROM Case
    ORDER BY CreatedDate DESC
    LIMIT 10
  `);

  return result.records;
}

export async function getBusinessSummary() {
  const accounts = await querySalesforce(`
    SELECT COUNT()
    FROM Account
  `);

  const opportunities = await querySalesforce(`
    SELECT COUNT()
    FROM Opportunity
  `);

  const cases = await querySalesforce(`
    SELECT COUNT()
    FROM Case
  `);

  return {
    accounts: accounts.totalSize,
    opportunities: opportunities.totalSize,
    cases: cases.totalSize
  };
}