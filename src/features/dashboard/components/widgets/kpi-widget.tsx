import { ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { KpiWidget } from "@/types";

const trendIcon = {
  up: ArrowUpRight,
  down: ArrowDownRight,
  flat: ArrowRight
};

export function KpiWidgetView({ widget }: { widget: KpiWidget }) {
  const TrendIcon = trendIcon[widget.data.trend ?? "flat"];

  return (
    <div className="flex h-full min-h-0 flex-col justify-between gap-3">
      <div className="min-w-0">
        <div className="flex items-baseline gap-1">
          <span className="truncate text-3xl font-semibold">{widget.data.value}</span>
          {widget.data.unit ? <span className="text-sm text-muted-foreground">{widget.data.unit}</span> : null}
        </div>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{widget.data.caption}</p>
      </div>
      {widget.data.delta ? (
        <Badge variant="outline" className="w-fit gap-1">
          <TrendIcon className="h-3 w-3" aria-hidden="true" />
          {widget.data.delta}
        </Badge>
      ) : null}
    </div>
  );
}
