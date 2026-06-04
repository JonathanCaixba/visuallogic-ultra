"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { primaryNavigation } from "@/lib/navigation";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  const section = href.split("/")[1];
  return section ? pathname.startsWith(`/${section}`) : false;
}

export function SideNav() {
  const pathname = usePathname();

  return (
    <aside className="hidden min-h-screen w-64 shrink-0 border-r bg-card/70 lg:block">
      <div className="flex h-16 items-center gap-3 border-b px-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-sm font-bold text-primary-foreground">
          VL
        </div>
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold">VisualLogic Ultra</div>
          <div className="truncate text-xs text-muted-foreground">Agentforce Visualization</div>
        </div>
      </div>
      <div className="px-3 py-4">
        <Badge variant="outline" className="mb-3 w-full justify-center">
          Public Demo
        </Badge>
        <nav className="space-y-1">
          {primaryNavigation.map((item) => {
            const active = isActive(pathname, item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                  active && "bg-secondary text-foreground"
                )}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
