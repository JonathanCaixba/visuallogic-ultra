import { create } from "zustand";

interface ConversationState {
  currentTitle: string;

  setCurrentTitle: (title: string) => void;
}

export const useConversationStore =
  create<ConversationState>((set) => ({
    currentTitle: "",

    setCurrentTitle: (title) =>
      set({
        currentTitle: title
      })
  }));