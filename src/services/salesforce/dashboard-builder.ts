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