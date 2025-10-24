"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/stores/auth-store";

export function useAuthGuard(redirectTo: string = "/login") {
  const router = useRouter();
  const { isAuthenticated, hasHydrated } = useAuthStore();

  useEffect(() => {
    if (hasHydrated && !isAuthenticated) {
      router.replace(redirectTo);
    }
  }, [isAuthenticated, hasHydrated, router, redirectTo]);

  return { isAuthenticated, hasHydrated };
}

export function useGuestGuard(redirectTo: string = "/dashboard") {
  const router = useRouter();
  const { isAuthenticated, hasHydrated } = useAuthStore();

  useEffect(() => {
    if (hasHydrated && isAuthenticated) {
      router.replace(redirectTo);
    }
  }, [isAuthenticated, hasHydrated, router, redirectTo]);

  return { isAuthenticated, hasHydrated };
}
