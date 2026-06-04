import { CheckCircle2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { getToneClasses } from "@/lib/utils";
import type { InsightWidget } from "@/types";

export function InsightWidgetView({ widget }: { widget: InsightWidget }) {
  return (
    <div className="flex h-full min-h-0 flex-col gap-4">
      <div className="min-w-0">
        <Badge variant="outline" className={getToneClasses(widget.data.severity)}>
          {widget.data.agent}
        </Badge>
        <p className="mt-3 text-sm leading-6 text-foreground">{widget.data.summary}</p>
      </div>
      <div className="space-y-2 overflow-auto">
        {widget.data.bullets.map((bullet) => (
          <div key={bullet} className="flex gap-2 text-sm text-muted-foreground">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            <span>{bullet}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
