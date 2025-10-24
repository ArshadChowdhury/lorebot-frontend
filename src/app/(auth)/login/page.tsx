"use client";

import { LoginForm } from "@/components/auth/login-form";
import { useGuestGuard } from "@/lib/hooks/use-auth-guard";

export default function LoginPage() {
  const { hasHydrated, isAuthenticated } = useGuestGuard();

  if (!hasHydrated || isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-linear-to-br from-slate-950 via-purple-950/20 to-slate-950">
      <LoginForm />
    </div>
  );
}
