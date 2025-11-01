import apiClient from "./axios";
import { Conversation, Message, SendMessageDto } from "../types";

export const conversationsApi = {
  // Start new conversation

  start: async (characterId: string) => {
    const response = await apiClient.post<Conversation>(
      `/conversations/start/${characterId}`
    );
    return response.data;
  },

  // Get all user conversations
  getAll: async (): Promise<Conversation[]> => {
    const { data } = await apiClient.get<Conversation[]>("/conversations");
    return data;
  },

  // Get specific conversation
  getById: async (id: string): Promise<Conversation> => {
    const { data } = await apiClient.get<Conversation>(`/conversations/${id}`);
    return data;
  },

  // Get conversation messages
  getMessages: async (id: string, limit?: number): Promise<Message[]> => {
    const { data } = await apiClient.get<Message[]>(
      `/conversations/${id}/messages`,
      {
        params: { limit },
      }
    );
    return data;
  },

  // Send message
  sendMessage: async (
    id: string,
    message: SendMessageDto
  ): Promise<Message> => {
    const { data } = await apiClient.post<Message>(
      `/conversations/${id}/send`,
      message
    );
    return data;
  },
};
