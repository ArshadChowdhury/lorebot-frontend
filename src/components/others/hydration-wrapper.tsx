"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/stores/auth-store";

export function HydrationWrapper({ children }: { children: React.ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);

  useEffect(() => {
    setIsHydrated(hasHydrated);
  }, [hasHydrated]);

  if (!isHydrated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500" />
      </div>
    );
  }

  return <>{children}</>;
}
