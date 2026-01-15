"use client"

import React from 'react'
import { motion } from "framer-motion";
import { MessageSquare } from 'lucide-react';


const Footer = () => {
    {/* Footer */}
  return (
    
      <footer className="relative z-10 border-t border-slate-800/50 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center text-slate-400">
          <motion.div
            className="flex items-center justify-center space-x-2 mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-8 h-8 bg-linear-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold bg-linear-to-br from-purple-400 to-pink-400 bg-clip-text text-transparent">
              LoreBot
            </span>
          </motion.div>
          <p>&copy; 2026 LoreBot. All rights reserved.</p>
        </div>
      </footer>
  )
}

export default Footer;