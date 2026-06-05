import { querySalesforce } from "./salesforce-query";
import type { DashboardRequestRecord } from "@/types";

export async function getDashboardRequests(): Promise<DashboardRequestRecord[]> {
  const result = await querySalesforce(`
    SELECT
      Id,
      Name,
      Dashboard_Type__c,
      Template__c,
      Status__c,
      Dashboard_Summary__c,
      Configuration__c,
      Generated_By_Agent__c,
      Dashboard_URL__c
    FROM Dashboard_Request__c
    ORDER BY CreatedDate DESC
    LIMIT 50
  `);

  return result.records as DashboardRequestRecord[];
}

export async function getDashboardRequestById(
  id: string
): Promise<DashboardRequestRecord | null> {

  const result = await querySalesforce(`
    SELECT
      Id,
      Name,
      Dashboard_Type__c,
      Template__c,
      Status__c,
      Dashboard_Summary__c,
      Configuration__c,
      Generated_By_Agent__c,
      Dashboard_URL__c
    FROM Dashboard_Request__c
    WHERE Id = '${id}'
    LIMIT 1
  `);

  if (!result.records.length) {
    return null;
  }

  return result.records[0] as DashboardRequestRecord;
}