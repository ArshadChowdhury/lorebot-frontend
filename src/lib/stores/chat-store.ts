import { create } from "zustand";
import { Message } from "../types";

interface ChatState {
  messages: Record<string, Message[]>; // conversationId -> messages
  isTyping: Record<string, boolean>; // conversationId -> isTyping

  // Actions
  setMessages: (conversationId: string, messages: Message[]) => void;
  addMessage: (conversationId: string, message: Message) => void;
  setTyping: (conversationId: string, isTyping: boolean) => void;
  clearMessages: (conversationId: string) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: {},
  isTyping: {},

  setMessages: (conversationId, messages) =>
    set((state) => ({
      messages: { ...state.messages, [conversationId]: messages },
    })),

  addMessage: (conversationId, message) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [conversationId]: [...(state.messages[conversationId] || []), message],
      },
    })),

  setTyping: (conversationId, isTyping) =>
    set((state) => ({
      isTyping: { ...state.isTyping, [conversationId]: isTyping },
    })),

  clearMessages: (conversationId) =>
    set((state) => {
      const newMessages = { ...state.messages };
      delete newMessages[conversationId];
      return { messages: newMessages };
    }),
}));
