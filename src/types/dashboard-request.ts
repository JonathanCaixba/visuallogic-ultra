export interface DashboardRequestConfiguration {
  template: string;

  dashboardType: string;

  dashboardName: string;

  sales?: {
    opportunities?: string;
    revenue?: string;
  };

  support?: {
    cases?: string;
    slaRisk?: string;
  };

  kpis: string[];

  charts: string[];
}

export interface DashboardRequestRecord {
  Id: string;
  Name: string;

  Dashboard_Type__c: string;

  Template__c: string;

  Status__c: string;

  Dashboard_Summary__c?: string;

  Configuration__c?: string;

  Generated_By_Agent__c?: string;

  Dashboard_URL__c?: string;
}