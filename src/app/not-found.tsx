"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Sparkles, Ghost, ArrowLeft } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-purple-950/20 to-slate-950 text-white flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated Background Lights */}
      <motion.div
        className="absolute top-1/3 -left-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/3 -right-40 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, delay: 1 }}
      />

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center relative z-10"
      >
        <motion.div
          animate={{
            textShadow: [
              "0 0 20px rgba(168, 85, 247, 0.5)",
              "0 0 40px rgba(236, 72, 153, 0.5)",
              "0 0 20px rgba(168, 85, 247, 0.5)",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <h1 className="text-7xl font-bold mb-6 bg-linear-to-br from-purple-400 to-pink-400 bg-clip-text text-transparent">
            404: Lost in the Realm
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center mb-8"
        >
          <Ghost className="w-16 h-16 text-purple-400 animate-bounce-slow" />
        </motion.div>

        <p className="text-xl text-slate-300 mb-10 max-w-md mx-auto">
          The path you seek fades into mist... Perhaps this page, character, or
          conversation has wandered into legend.
        </p>

        <motion.button
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 30px rgba(168, 85, 247, 0.4)",
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/")}
          className="px-8 py-4 bg-linear-to-br from-purple-600 to-pink-600 rounded-lg text-lg font-semibold w-full flex items-center justify-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
          Return to the Realm
        </motion.button>

        <motion.div
          className="flex justify-center mt-12 space-x-2 text-slate-400"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Sparkles className="w-4 h-4" />
          <span>“Even the lost pages tell a story.”</span>
          <Sparkles className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </div>
  );
}
