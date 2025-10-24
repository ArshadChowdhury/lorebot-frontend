"use client";

import Link from "next/link";
import { useAuth } from "@/lib/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { LogOut, Sparkles, User } from "lucide-react";

export function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <Sparkles className="h-6 w-6 text-purple-400" />
          <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            LoreBot
          </span>
        </Link>

        <div className="flex items-center space-x-6">
          <Link
            href="/characters"
            className="text-slate-300 hover:text-white transition-colors"
          >
            Characters
          </Link>
          <Link
            href="/quests"
            className="text-slate-300 hover:text-white transition-colors"
          >
            Quests
          </Link>
          <Link
            href="/world"
            className="text-slate-300 hover:text-white transition-colors"
          >
            World
          </Link>

          <div className="flex items-center space-x-3 border-l border-slate-700 pl-6">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-slate-400" />
              <span className="text-sm text-slate-300">
                {user?.displayName || user?.username}
              </span>
            </div>
            <Button variant="ghost" size="icon" onClick={logout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
