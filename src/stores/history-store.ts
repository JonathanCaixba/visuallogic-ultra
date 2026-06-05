import { create } from "zustand";

export interface DashboardHistoryItem {
  id: string;
  title: string;
  prompt?: string;
  dashboardId?: string;
  createdAt: string;
}

interface HistoryState {
  items: DashboardHistoryItem[];

  addItem: (item: DashboardHistoryItem) => void;

  loadItems: () => void;
}

export const useHistoryStore = create<HistoryState>((set, get) => ({
  items: [],

  addItem: (item) => {
    const updatedItems = [item, ...get().items];

    localStorage.setItem(
      "vl-history",
      JSON.stringify(updatedItems)
    );

    set({
      items: updatedItems
    });
  },

  loadItems: () => {
    const saved = localStorage.getItem("vl-history");

    if (!saved) {
      return;
    }

    try {
      const parsed = JSON.parse(saved);

      set({
        items: parsed
      });
    } catch {
      console.error("History load failed");
    }
  }
}));