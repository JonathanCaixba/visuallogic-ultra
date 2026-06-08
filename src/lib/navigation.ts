import {
  BarChart3,
  Bot,
  CalendarClock,
  FileDown,
  LayoutDashboard,
  SlidersHorizontal
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface NavigationItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const primaryNavigation: NavigationItem[] = [
  {
    label: "Command Center",
    href: "/",
    icon: Bot
  },
  {
    label: "Dashboard Central",
    href: "/dashboard/dashboard-executive-combined",
    icon: LayoutDashboard
  },
  /*{
    label: "Studio",
    href: "/studio/dashboard-executive-combined",
    icon: SlidersHorizontal
  }, */
  {
  label: "Generated Dashboards",
  href: "/agent-dashboards",
  icon: LayoutDashboard
},
  {
    label: "Events",
    href: "/events",
    icon: CalendarClock
  },
  {
    label: "Export",
    href: "/export/dashboard-executive-combined",
    icon: FileDown
  },
  {
    label: "Presentation",
    href: "/presentation/dashboard-executive-combined",
    icon: BarChart3
  }
];
