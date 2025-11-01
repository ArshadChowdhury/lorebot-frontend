"use client";

import Link from "next/link";
import { MessageSquare, X, Menu } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const PublicNavbar = () => {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <motion.nav
      className="relative z-50 border-b border-slate-800/50 backdrop-blur-xl bg-slate-950/80"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/">
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-10 h-10 bg-linear-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold bg-linear-to-br from-purple-400 to-pink-400 bg-clip-text text-transparent">
                LoreBot
              </span>
            </motion.div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/#features"
              className="hover:text-purple-400 transition-colors"
            >
              Features
            </Link>
            <Link
              href="/#characters"
              className="hover:text-purple-400 transition-colors"
            >
              Characters
            </Link>
            <Link
              href="/about"
              className="hover:text-purple-400 transition-colors"
            >
              About
            </Link>
            <motion.button
              className="px-6 py-2 bg-linear-to-br from-purple-600 to-pink-600 rounded-lg font-medium cursor-pointer"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px rgba(168, 85, 247, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/register")}
            >
              Get Started
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{ height: mobileMenuOpen ? "auto" : 0 }}
        className="md:hidden overflow-hidden border-t border-slate-800 bg-slate-950/95 backdrop-blur-xl"
      >
        <div className="px-4 py-4 flex flex-col items-center space-y-3">
          <Link
            href="/#features"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="block py-2 hover:text-purple-400 transition-colors"
          >
            Features
          </Link>
          <Link
            href="/#characters"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="block py-2 hover:text-purple-400 transition-colors"
          >
            Characters
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="block py-2 hover:text-purple-400 transition-colors"
          >
            About
          </Link>
          <Link
            href={"/register"}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-1/2 text-center px-6 py-2 bg-linear-to-br from-purple-600 to-pink-600 rounded-lg mb-4"
          >
            Get Started
          </Link>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default PublicNavbar;
