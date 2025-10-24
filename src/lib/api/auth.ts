import apiClient from "./axios";
import {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
  User,
} from "../types";

export const authApi = {
  // Register new user
  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    const { data } = await apiClient.post<AuthResponse>(
      "/auth/register",
      credentials
    );
    return data;
  },

  // Login user
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const { data } = await apiClient.post<AuthResponse>(
      "/auth/login",
      credentials
    );
    return data;
  },

  // Get current user profile
  getProfile: async (): Promise<{ user: User }> => {
    const { data } = await apiClient.post<{ user: User }>("/auth/me");
    return data;
  },

  // Logout (client-side only)
  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
  },
};
