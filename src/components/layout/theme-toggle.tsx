"use client";

import { Monitor, Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useThemeStore } from "@/stores/theme-store";
import type { ThemeMode } from "@/types";

const themeCycle: ThemeMode[] = ["system", "light", "dark"];

export function ThemeToggle() {
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);
  const nextTheme = themeCycle[(themeCycle.indexOf(theme) + 1) % themeCycle.length] ?? "system";
  const Icon = theme === "dark" ? Moon : theme === "light" ? Sun : Monitor;

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      title={`Theme: ${theme}`}
      aria-label={`Theme: ${theme}`}
      onClick={() => setTheme(nextTheme)}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
    </Button>
  );
}
