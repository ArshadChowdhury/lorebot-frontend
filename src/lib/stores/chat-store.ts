import { create } from "zustand";
import { Message } from "../types";

interface ChatStore {
  messages: Record<string, Message[]>;
  isTyping: Record<string, boolean>;
  optimisticMessages: Record<string, Message[]>;

  addMessage: (conversationId: string, message: Message) => void;
  setMessages: (conversationId: string, messages: Message[]) => void;
  setTyping: (conversationId: string, isTyping: boolean) => void;
  addOptimisticMessage: (conversationId: string, message: Message) => void;
  removeOptimisticMessage: (conversationId: string, messageId: string) => void;
  markMessageAsError: (conversationId: string, messageId: string) => void;
  getOptimisticMessages: (conversationId: string) => Message[]; // ✅ Add getter
}

export const useChatStore = create<ChatStore>((set, get) => ({
  messages: {},
  isTyping: {},
  optimisticMessages: {},

  addMessage: (conversationId, message) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [conversationId]: [...(state.messages[conversationId] || []), message],
      },
    })),

  setMessages: (conversationId, messages) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [conversationId]: messages,
      },
    })),

  setTyping: (conversationId, isTyping) =>
    set((state) => ({
      isTyping: { ...state.isTyping, [conversationId]: isTyping },
    })),

  addOptimisticMessage: (conversationId, message) =>
    set((state) => ({
      optimisticMessages: {
        ...state.optimisticMessages,
        [conversationId]: [
          ...(state.optimisticMessages[conversationId] || []),
          message,
        ],
      },
    })),

  removeOptimisticMessage: (conversationId, messageId) =>
    set((state) => ({
      optimisticMessages: {
        ...state.optimisticMessages,
        [conversationId]: (
          state.optimisticMessages[conversationId] || []
        ).filter((m) => m.id !== messageId),
      },
    })),

  markMessageAsError: (conversationId, messageId) =>
    set((state) => ({
      optimisticMessages: {
        ...state.optimisticMessages,
        [conversationId]: (state.optimisticMessages[conversationId] || []).map(
          (m) => (m.id === messageId ? { ...m, error: true } : m)
        ),
      },
    })),

  // ✅ Stable getter method
  getOptimisticMessages: (conversationId) => {
    return get().optimisticMessages[conversationId] || [];
  },
}));
