import {
  Bot,
  CalendarClock,
  LayoutDashboard,
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
    href: "/dashboard-central",
    icon: LayoutDashboard
  },
  {
  label: "Generated Dashboards",
  href: "/agent-dashboards",
  icon: LayoutDashboard
},
  {
    label: "Events",
    href: "/events",
    icon: CalendarClock
  }
];
