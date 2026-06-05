"use client";

import Link from "next/link";

import { useHistoryStore } from "@/stores/history-store";
import { useEffect } from "react";

export function HistorySidebar() {
    const items = useHistoryStore((state) => state.items);

    const loadItems = useHistoryStore((state) => state.loadItems);

    useEffect(() => {
        loadItems();
    }, [loadItems]);

    function formatDate(dateString: string) {
        const date = new Date(dateString);

        return date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        });
    }

    return (
        <div className="dashboard-surface p-4">
            <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-semibold uppercase tracking-wide">
                    Conversation History
                </h3>

                <span className="text-xs text-muted-foreground">
                    Today
                </span>
            </div>

            <div className="space-y-2">
                {items.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                        No dashboards generated yet.
                    </p>
                ) : (
                    items.map((item) => (
                        <Link
                            key={item.id}
                            href={`/dashboard/${item.id}`}
                            className="block rounded-lg border p-3 transition hover:bg-accent"
                        >
                            <div className="font-medium">
                                {item.title}
                            </div>

                            <div className="text-xs text-muted-foreground">
                                {formatDate(item.createdAt)}
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
}