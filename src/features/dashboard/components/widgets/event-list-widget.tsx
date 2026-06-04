import { Badge } from "@/components/ui/badge";
import { formatTimestamp, getSeverityTone, getToneClasses } from "@/lib/utils";
import type { EventListWidget } from "@/types";

export function EventListWidgetView({ widget }: { widget: EventListWidget }) {
  return (
    <div className="h-full space-y-3 overflow-auto">
      {widget.data.events.map((event) => (
        <div key={event.id} className="rounded-md border bg-background/50 p-3">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="truncate text-sm font-medium">{event.title}</div>
              <div className="mt-1 text-xs text-muted-foreground">{formatTimestamp(event.timestamp)}</div>
            </div>
            <Badge variant="outline" className={getToneClasses(getSeverityTone(event.severity))}>
              {event.severity}
            </Badge>
          </div>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{event.description}</p>
        </div>
      ))}
    </div>
  );
}
