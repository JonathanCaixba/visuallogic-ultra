import Link from "next/link";
import { ExternalLink } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatTimestamp, getSeverityTone, getToneClasses } from "@/lib/utils";
import type { AgentEvent } from "@/types";

export function EventCenterShell({ events }: { events: AgentEvent[] }) {
  return (
    <section className="min-h-full p-4 md:p-6">
      <div className="mb-5">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <Badge variant="secondary">Executive Event Center</Badge>
          <Badge variant="outline">Agent_Event__c</Badge>
        </div>
        <h1 className="text-2xl font-semibold">Agent Events</h1>
      </div>

      <div className="grid gap-3">
        {events.map((event) => (
          <article key={event.id} className="dashboard-surface p-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="min-w-0">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className={getToneClasses(getSeverityTone(event.severity))}>
                    {event.severity}
                  </Badge>
                  <Badge variant="outline">{event.domain}</Badge>
                  <span className="text-xs text-muted-foreground">{formatTimestamp(event.timestamp)}</span>
                </div>
                <h2 className="truncate text-base font-semibold">{event.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{event.description}</p>
                <p className="mt-3 text-xs text-muted-foreground">{event.agent}</p>
              </div>
              {event.relatedDashboardId ? (
                <Button asChild variant="outline" size="sm" className="shrink-0">
                  <Link href={`/dashboard/${event.relatedDashboardId}`}>
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    Dashboard
                  </Link>
                </Button>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
