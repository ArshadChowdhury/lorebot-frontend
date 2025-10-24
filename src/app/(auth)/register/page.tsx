"use client";

import { RegisterForm } from "../../../components/auth/register-form";
import { useGuestGuard } from "@/lib/hooks/use-auth-guard";

export default function RegisterPage() {
  const { hasHydrated, isAuthenticated } = useGuestGuard();

  if (!hasHydrated || isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950">
      <RegisterForm />
    </div>
  );
}
