import type { DashboardBreakpoint, DashboardTheme } from "@/types";

export const dashboardBreakpoints: Record<DashboardBreakpoint, number> = {
  lg: 1200,
  md: 996,
  sm: 768,
  xs: 480,
  xxs: 0
};

export const dashboardColumns: Record<DashboardBreakpoint, number> = {
  lg: 12,
  md: 10,
  sm: 6,
  xs: 4,
  xxs: 2
};

export const dashboardThemeTokens: Record<
  DashboardTheme,
  {
    primary: string;
    accent: string;
    semantic: string;
  }
> = {
  executive: {
    primary: "hsl(200 85% 36%)",
    accent: "hsl(171 72% 34%)",
    semantic: "Executive intelligence"
  },
  sales: {
    primary: "hsl(151 64% 36%)",
    accent: "hsl(200 85% 36%)",
    semantic: "Sales performance"
  },
  support: {
    primary: "hsl(258 72% 56%)",
    accent: "hsl(36 92% 43%)",
    semantic: "Support operations"
  },
  dark: {
    primary: "hsl(190 78% 50%)",
    accent: "hsl(151 64% 44%)",
    semantic: "Dark presentation"
  }
};
