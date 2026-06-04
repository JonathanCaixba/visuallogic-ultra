import type { TableWidget } from "@/types";

export function TableWidgetView({ widget }: { widget: TableWidget }) {
  return (
    <div className="h-full overflow-auto">
      <table className="w-full min-w-[420px] text-sm">
        <thead className="text-xs text-muted-foreground">
          <tr className="border-b">
            {widget.data.columns.map((column) => (
              <th key={column.key} className="px-2 py-2 text-left font-medium first:pl-0 last:pr-0">
                <span className={column.align === "right" ? "block text-right" : undefined}>{column.label}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {widget.data.rows.map((row, index) => (
            <tr key={index} className="border-b last:border-0">
              {widget.data.columns.map((column) => (
                <td key={column.key} className="px-2 py-3 first:pl-0 last:pr-0">
                  <span
                    className={
                      column.align === "right"
                        ? "block text-right font-medium"
                        : "block max-w-[220px] truncate text-foreground"
                    }
                  >
                    {String(row[column.key] ?? "")}
                  </span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
