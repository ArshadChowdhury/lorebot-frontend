import apiClient from "./axios";
import { Character } from "../types";

export const charactersApi = {
  // Get all characters
  getAll: async (): Promise<Character[]> => {
    const { data } = await apiClient.get<Character[]>("/characters");
    return data;
  },

  // Get single character
  getById: async (id: string): Promise<Character> => {
    const { data } = await apiClient.get<Character>(`/characters/${id}`);
    return data;
  },

  // Seed characters (for initial setup)
  seed: async (): Promise<Character[]> => {
    const { data } = await apiClient.get<Character[]>("/characters/seed/init");
    return data;
  },
};
