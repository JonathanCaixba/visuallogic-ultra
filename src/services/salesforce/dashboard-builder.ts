import { querySalesforce } from "./salesforce-query";

import type { DashboardWidget } from "@/types";

export async function getAccountsTableWidget(): Promise<DashboardWidget> {
  const result = await querySalesforce(`
    SELECT Id, Name
    FROM Account
    ORDER BY Name
    LIMIT 10
  `);

  return {
    id: "table-primary",
    type: "table",
    title: "Salesforce Accounts",
    data: {
      columns: [
        {
          key: "name",
          label: "Account Name"
        }
      ],
      rows: result.records.map(
        (account: { Name: string }) => ({
          name: account.Name
        })
      )
    }
  };
}

export async function getOpportunitiesTableWidget(): Promise<DashboardWidget> {
  const result = await querySalesforce(`
    SELECT Id, Name, StageName
    FROM Opportunity
    ORDER BY CreatedDate DESC
    LIMIT 10
  `);

  return {
    id: "table-secondary",
    type: "table",
    title: "Salesforce Opportunities",
    data: {
      columns: [
        {
          key: "name",
          label: "Opportunity"
        },
        {
          key: "stage",
          label: "Stage"
        }
      ],
      rows: result.records.map(
        (opp: {
          Name: string;
          StageName: string;
        }) => ({
          name: opp.Name,
          stage: opp.StageName
        })
      )
    }
  };
}

export async function getCasesTableWidget(): Promise<DashboardWidget> {
  const result = await querySalesforce(`
    SELECT Id, CaseNumber, Status
    FROM Case
    ORDER BY CreatedDate DESC
    LIMIT 10
  `);

  return {
    id: "table-tertiary",
    type: "table",
    title: "Salesforce Cases",
    data: {
      columns: [
        {
          key: "number",
          label: "Case"
        },
        {
          key: "status",
          label: "Status"
        }
      ],
      rows: result.records.map(
        (item: {
          CaseNumber: string;
          Status: string;
        }) => ({
          number: item.CaseNumber,
          status: item.Status
        })
      )
    }
  };
}