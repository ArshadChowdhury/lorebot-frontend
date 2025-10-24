import apiClient from "./axios";
import { WorldEvent } from "../types";

export const worldStateApi = {
  // Get active world events
  getActive: async (): Promise<WorldEvent[]> => {
    const { data } = await apiClient.get<WorldEvent[]>("/world-state");
    return data;
  },

  // Get all events (requires auth)
  getAll: async (): Promise<WorldEvent[]> => {
    const { data } = await apiClient.get<WorldEvent[]>("/world-state/all");
    return data;
  },

  deactivate: async (eventId: string) => {
    const { data } = await apiClient.patch<WorldEvent>(
      `/world-state/${eventId}/deactivate`
    );
    return data;
  },

  // Generate random event
  generateRandom: async (): Promise<WorldEvent> => {
    const { data } = await apiClient.post<WorldEvent>("/world-state/generate");
    return data;
  },
};
