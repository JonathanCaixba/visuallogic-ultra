export interface DashboardRequestConfiguration {
  template: string;

  dashboardType: string;

  dashboardName: string;

  generatedAt?: string;

  agentMetadata?: {
    generatedBy: string;
    version: string;
  };

  metrics?: {
    strategicOpportunities?: number;
    highPriorityCases?: number;

    opportunityCount?: number;
    caseCount?: number;
    eventCount?: number;
  };

  analysis?: {
    revenue?: {
      severity: string;
      summary: string;
    };

    sla?: {
      severity: string;
      summary: string;
    };

    executive?: {
      severity: string;
      summary: string;
    };
  };

  events?: {
    revenueAnalysisExecuted?: boolean;
    slaAnalysisExecuted?: boolean;
    executiveAnalysisExecuted?: boolean;
  };

  widgets?: {
    id: string;
    type: string;
    title: string;
    source: string;
  }[];
}