"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { primaryNavigation } from "@/lib/navigation";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  const section = href.split("/")[1];
  return section ? pathname.startsWith(`/${section}`) : false;
}

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="grid grid-cols-6 gap-1 border-t bg-card px-2 py-2 lg:hidden">
      {primaryNavigation.map((item) => {
        const Icon = item.icon;
        const active = isActive(pathname, item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-label={item.label}
            className={cn(
              "flex h-11 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
              active && "bg-secondary text-foreground"
            )}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
          </Link>
        );
      })}
    </nav>
  );
}
