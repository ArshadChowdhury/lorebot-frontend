"use client";

import { Navbar } from "@/components/layout/navbar";
import { useAuthGuard } from "@/lib/hooks/use-auth-guard";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { hasHydrated, isAuthenticated } = useAuthGuard();

  // Show loading while hydrating
  if (!hasHydrated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500" />
      </div>
    );
  }

  // Show nothing while redirecting
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
