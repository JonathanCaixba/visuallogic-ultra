"use client";

import { usePathname } from "next/navigation";

import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { primaryNavigation } from "@/lib/navigation";

function getPageTitle(pathname: string) {
  const match = primaryNavigation.find((item) => {
    if (item.href === "/") {
      return pathname === "/";
    }

    const section = item.href.split("/")[1];
    return section ? pathname.startsWith(`/${section}`) : false;
  });

  return match?.label ?? "VisualLogic Ultra";
}

export function TopBar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/95 px-4 backdrop-blur md:px-6">
      <div className="min-w-0">
        <div className="truncate text-sm font-semibold lg:hidden">VisualLogic Ultra</div>
        <div className="truncate text-lg font-semibold leading-tight">{getPageTitle(pathname)}</div>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant="secondary" className="hidden sm:inline-flex">
          Salesforce Source of Truth
        </Badge>
        <ThemeToggle />
      </div>
    </header>
  );
}
