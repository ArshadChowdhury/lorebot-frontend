"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/lib/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { LogOut, Sparkles, User, Menu, X } from "lucide-react";

export function Navbar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center space-x-2">
          <Sparkles className="h-6 w-6 text-purple-400" />
          <span className="text-xl font-bold bg-gradient-to-br from-purple-400 to-pink-400 bg-clip-text text-transparent">
            LoreBot
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center space-x-6">
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

          {user && (
            <div className="flex items-center space-x-3 border-l border-slate-700 pl-6">
              <Link
                href={"/my-profile"}
                className="flex items-center space-x-2"
              >
                <User className="h-4 w-4 text-slate-400" />
                <span className="text-sm text-slate-300">
                  {user?.displayName || user?.username}
                </span>
              </Link>
              <Button
                className="cursor-pointer"
                variant="ghost"
                size="icon"
                onClick={logout}
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-slate-300 hover:text-white transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-900/90 backdrop-blur-sm">
          <div className="flex flex-col px-4 py-3 space-y-5">
            <Link
              href="/characters"
              className="text-slate-300 hover:text-white transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Characters
            </Link>
            <Link
              href="/quests"
              className="text-slate-300 hover:text-white transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Quests
            </Link>
            <Link
              href="/world"
              className="text-slate-300 hover:text-white transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              World
            </Link>

            {user && (
              <>
                <Link
                  href="/my-profile"
                  className="flex items-center space-x-2 text-slate-300 hover:text-white"
                  onClick={() => setMenuOpen(false)}
                >
                  <User className="h-4 w-4 text-slate-400" />
                  <span>{user?.displayName || user?.username}</span>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  className="-ml-2.5 justify-start text-slate-300 hover:text-white"
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
