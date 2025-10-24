import { useMutation, useQuery } from "@tanstack/react-query";
import { authApi } from "../api/auth";
import { useAuthStore } from "../stores/auth-store";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    setAuth,
    logout: logoutStore,
    user,
    isAuthenticated,
  } = useAuthStore();

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      queryClient.clear();
      setAuth(data.user, data.accessToken);
      toast.success("Welcome back!");
      router.push("/dashboard");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Login failed");
    },
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      queryClient.clear();
      setAuth(data.user, data.accessToken);
      toast.success("Account created successfully!");
      router.push("/dashboard");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Registration failed");
    },
  });

  // Get profile query
  const { data: profileData, isLoading: isLoadingProfile } = useQuery({
    queryKey: ["profile"],
    queryFn: authApi.getProfile,
    enabled: isAuthenticated,
    retry: false,
  });

  // Logout function
  const logout = () => {
    authApi.logout();
    logoutStore();
    queryClient.clear();
    toast.success("Logged out successfully");
    router.push("/login");
  };

  return {
    user,
    isAuthenticated,
    isLoadingProfile,
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout,
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
  };
}
