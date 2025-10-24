import apiClient from "./axios";
import { Quest, QuestStatus } from "../types";

export const questsApi = {
  // Get all user quests
  getAll: async (status?: QuestStatus): Promise<Quest[]> => {
    const { data } = await apiClient.get<Quest[]>("/quests", {
      params: { status },
    });
    return data;
  },

  // Get single quest
  getById: async (id: string): Promise<Quest> => {
    const { data } = await apiClient.get<Quest>(`/quests/${id}`);
    return data;
  },

  // Accept quest
  accept: async (id: string): Promise<Quest> => {
    const { data } = await apiClient.post<Quest>(`/quests/${id}/accept`);
    return data;
  },

  // Update progress
  updateProgress: async (id: string, progress: number): Promise<Quest> => {
    const { data } = await apiClient.patch<Quest>(`/quests/${id}/progress`, {
      progress,
    });
    return data;
  },

  // Complete quest
  complete: async (id: string): Promise<Quest> => {
    const { data } = await apiClient.post<Quest>(`/quests/${id}/complete`);
    return data;
  },

  // Abandon quest
  abandon: async (id: string): Promise<Quest> => {
    const { data } = await apiClient.post<Quest>(`/quests/${id}/abandon`);
    return data;
  },
};
