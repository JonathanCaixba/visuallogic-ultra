import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-6">
      <div className="dashboard-surface max-w-md p-6 text-center">
        <h1 className="text-2xl font-semibold">Dashboard Not Found</h1>
        <p className="mt-2 text-sm text-muted-foreground">The requested VisualLogic Ultra dashboard is not available.</p>
        <Button asChild className="mt-5">
          <Link href="/">Command Center</Link>
        </Button>
      </div>
    </main>
  );
}
