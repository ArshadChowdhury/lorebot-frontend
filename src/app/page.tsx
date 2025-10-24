"use client";

// import React, { useState } from "react";
// import { motion, useScroll, useTransform } from "framer-motion";
// import {
//   MessageSquare,
//   Sparkles,
//   Zap,
//   Shield,
//   ArrowRight,
//   Menu,
//   X,
// } from "lucide-react";

// export default function LorebotLanding() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const { scrollYProgress } = useScroll();
//   const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

//   const features = [
//     {
//       icon: <MessageSquare className="w-6 h-6" />,
//       title: "Dynamic Conversations",
//       description:
//         "Engage with AI characters that remember your interactions and evolve over time",
//     },
//     {
//       icon: <Sparkles className="w-6 h-6" />,
//       title: "Rich Character Lore",
//       description:
//         "Each character has unique backstories, personalities, and evolving narratives",
//     },
//     {
//       icon: <Zap className="w-6 h-6" />,
//       title: "Powered by Gemini AI",
//       description:
//         "Advanced AI technology delivers natural, context-aware conversations",
//     },
//     {
//       icon: <Shield className="w-6 h-6" />,
//       title: "Your Journey, Your Story",
//       description:
//         "Track your conversations and watch relationships develop naturally",
//     },
//   ];

//   const characters = [
//     {
//       name: "Elara the Mystic",
//       role: "Ancient Sorceress",
//       color: "from-purple-400 to-pink-400",
//       description: "Speaks in riddles and cosmic wisdom",
//     },
//     {
//       name: "Borin Ironfoot",
//       role: "Tavern Keeper",
//       color: "from-amber-400 to-orange-400",
//       description: "Knows all the local gossip and tales",
//     },
//     {
//       name: "Shade",
//       role: "Mysterious Rogue",
//       color: "from-slate-400 to-slate-600",
//       description: "Deals in secrets and rare information",
//     },
//     {
//       name: "Captain Thorne",
//       role: "City Guard Captain",
//       color: "from-blue-400 to-cyan-400",
//       description: "Honorable warrior with unwavering principles",
//     },
//   ];

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         duration: 0.5,
//       },
//     },
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 text-white overflow-hidden">
//       {/* Animated Background Orbs */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <motion.div
//           className="absolute top-1/4 -left-48 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"
//           animate={{
//             scale: [1, 1.2, 1],
//             opacity: [0.3, 0.5, 0.3],
//           }}
//           transition={{
//             duration: 8,
//             repeat: Infinity,
//             ease: "easeInOut",
//           }}
//         />
//         <motion.div
//           className="absolute bottom-1/4 -right-48 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl"
//           animate={{
//             scale: [1.2, 1, 1.2],
//             opacity: [0.3, 0.5, 0.3],
//           }}
//           transition={{
//             duration: 10,
//             repeat: Infinity,
//             ease: "easeInOut",
//           }}
//         />
//       </div>

//       {/* Navigation */}
//       <motion.nav
//         className="relative z-50 border-b border-slate-800/50 backdrop-blur-sm bg-slate-950/80"
//         initial={{ y: -100 }}
//         animate={{ y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <motion.div
//               className="flex items-center space-x-2"
//               whileHover={{ scale: 1.05 }}
//             >
//               <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
//                 <MessageSquare className="w-6 h-6" />
//               </div>
//               <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
//                 LoreBot
//               </span>
//             </motion.div>

//             {/* Desktop Menu */}
//             <div className="hidden md:flex items-center space-x-8">
//               <a
//                 href="#features"
//                 className="hover:text-purple-400 transition-colors"
//               >
//                 Features
//               </a>
//               <a
//                 href="#characters"
//                 className="hover:text-purple-400 transition-colors"
//               >
//                 Characters
//               </a>
//               <motion.button
//                 className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg"
//                 whileHover={{
//                   scale: 1.05,
//                   boxShadow: "0 0 20px rgba(168, 85, 247, 0.5)",
//                 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 Get Started
//               </motion.button>
//             </div>

//             {/* Mobile Menu Button */}
//             <button
//               className="md:hidden p-2"
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             >
//               {mobileMenuOpen ? <X /> : <Menu />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {mobileMenuOpen && (
//           <motion.div
//             className="md:hidden border-t border-slate-800 bg-slate-950/95 backdrop-blur-sm"
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//           >
//             <div className="px-4 py-4 space-y-3">
//               <a
//                 href="#features"
//                 className="block py-2 hover:text-purple-400 transition-colors"
//               >
//                 Features
//               </a>
//               <a
//                 href="#characters"
//                 className="block py-2 hover:text-purple-400 transition-colors"
//               >
//                 Characters
//               </a>
//               <button className="w-full px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
//                 Get Started
//               </button>
//             </div>
//           </motion.div>
//         )}
//       </motion.nav>

//       {/* Hero Section */}
//       <section className="relative z-10 pt-20 pb-32 px-4">
//         <div className="max-w-7xl mx-auto text-center">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//           >
//             <motion.div className="mb-8 inline-block" style={{ y }}>
//               <h1 className="text-5xl md:text-7xl font-bold mb-6">
//                 <motion.span
//                   className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
//                   initial={{ opacity: 0, x: -50 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ duration: 0.8, delay: 0.2 }}
//                 >
//                   Enter the Realm of
//                 </motion.span>
//                 <motion.span
//                   className="block bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent"
//                   initial={{ opacity: 0, x: 50 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ duration: 0.8, delay: 0.4 }}
//                 >
//                   Living Stories
//                 </motion.span>
//               </h1>
//             </motion.div>

//             <motion.p
//               className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.8, delay: 0.6 }}
//             >
//               Immerse yourself in conversations with AI characters that
//               remember, evolve, and create unique narratives with every
//               interaction
//             </motion.p>

//             <motion.div
//               className="flex flex-col sm:flex-row gap-4 justify-center items-center"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.8 }}
//             >
//               <motion.button
//                 className="group px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-lg font-semibold"
//                 whileHover={{
//                   scale: 1.05,
//                   boxShadow: "0 0 30px rgba(168, 85, 247, 0.6)",
//                 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 Start Your Journey
//                 <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
//               </motion.button>
//               <motion.button
//                 className="px-8 py-4 border border-purple-500/50 rounded-lg text-lg font-semibold hover:bg-purple-500/10 transition-all"
//                 whileHover={{
//                   scale: 1.05,
//                   borderColor: "rgba(168, 85, 247, 1)",
//                 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 Watch Demo
//               </motion.button>
//             </motion.div>
//           </motion.div>

//           {/* Floating Character Cards */}
//           <div className="mt-20 relative h-64 hidden md:block">
//             {characters.slice(0, 3).map((char, i) => (
//               <motion.div
//                 key={i}
//                 className="absolute left-1/2 top-1/2 w-64 h-40 bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6"
//                 style={{
//                   x: (i - 1) * 280,
//                 }}
//                 initial={{ opacity: 0, y: 100 }}
//                 animate={{
//                   opacity: 0.8 + i * 0.1,
//                   y: 0,
//                 }}
//                 transition={{
//                   duration: 0.8,
//                   delay: 1 + i * 0.2,
//                 }}
//                 whileHover={{
//                   scale: 1.05,
//                   opacity: 1,
//                   borderColor: "rgba(168, 85, 247, 0.5)",
//                   y: -10,
//                 }}
//               >
//                 <div className="flex items-center space-x-3 mb-3">
//                   <div
//                     className={`w-10 h-10 rounded-full bg-gradient-to-br ${char.color}`}
//                   />
//                   <div>
//                     <p className="font-semibold text-sm">{char.name}</p>
//                     <p className="text-xs text-slate-400">{char.role}</p>
//                   </div>
//                 </div>
//                 <p className="text-xs text-slate-300">{char.description}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section id="features" className="relative z-10 py-20 px-4">
//         <div className="max-w-7xl mx-auto">
//           <motion.h2
//             className="text-4xl md:text-5xl font-bold text-center mb-16"
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//           >
//             <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
//               Powered by Magic & AI
//             </span>
//           </motion.h2>

//           <motion.div
//             className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
//             variants={containerVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//           >
//             {features.map((feature, i) => (
//               <motion.div
//                 key={i}
//                 className="group p-6 bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 hover:border-purple-500/50 transition-all"
//                 variants={itemVariants}
//                 whileHover={{ scale: 1.05, y: -5 }}
//               >
//                 <motion.div
//                   className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center mb-4"
//                   whileHover={{ rotate: 360 }}
//                   transition={{ duration: 0.5 }}
//                 >
//                   <div className="text-purple-400">{feature.icon}</div>
//                 </motion.div>
//                 <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
//                 <p className="text-slate-400 text-sm">{feature.description}</p>
//               </motion.div>
//             ))}
//           </motion.div>
//         </div>
//       </section>

//       {/* Characters Preview */}
//       <section id="characters" className="relative z-10 py-20 px-4">
//         <div className="max-w-7xl mx-auto text-center">
//           <motion.h2
//             className="text-4xl md:text-5xl font-bold mb-8"
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//           >
//             <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
//               Meet the Characters
//             </span>
//           </motion.h2>
//           <motion.p
//             className="text-xl text-slate-300 mb-16 max-w-2xl mx-auto"
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//           >
//             Each character brings their own unique story, personality, and
//             secrets waiting to be discovered
//           </motion.p>

//           <motion.div
//             className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
//             variants={containerVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//           >
//             {characters.map((char, i) => (
//               <motion.div
//                 key={i}
//                 className="group relative overflow-hidden rounded-2xl bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 hover:border-purple-500/50 transition-all p-8"
//                 variants={itemVariants}
//                 whileHover={{ scale: 1.05, y: -10 }}
//               >
//                 <motion.div
//                   className={`w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br ${char.color} flex items-center justify-center text-3xl font-bold`}
//                   whileHover={{ rotate: 360, scale: 1.1 }}
//                   transition={{ duration: 0.5 }}
//                 >
//                   {char.name[0]}
//                 </motion.div>
//                 <h3 className="text-2xl font-bold mb-2">{char.name}</h3>
//                 <p className="text-purple-400 mb-3 text-sm">{char.role}</p>
//                 <p className="text-slate-400 text-sm mb-4">
//                   {char.description}
//                 </p>
//                 <motion.button
//                   className="px-6 py-2 border border-purple-500/50 rounded-lg hover:bg-purple-500/10 transition-all"
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   Learn More
//                 </motion.button>
//               </motion.div>
//             ))}
//           </motion.div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="relative z-10 py-20 px-4">
//         <div className="max-w-4xl mx-auto text-center">
//           <motion.div
//             className="relative p-12 rounded-3xl bg-slate-900/50 backdrop-blur-sm border border-purple-500/30"
//             initial={{ opacity: 0, scale: 0.9 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//           >
//             <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-2xl rounded-3xl" />
//             <div className="relative">
//               <motion.h2
//                 className="text-4xl md:text-5xl font-bold mb-6"
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.6, delay: 0.2 }}
//               >
//                 <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
//                   Begin Your Adventure
//                 </span>
//               </motion.h2>
//               <motion.p
//                 className="text-xl text-slate-300 mb-8"
//                 initial={{ opacity: 0 }}
//                 whileInView={{ opacity: 1 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.6, delay: 0.4 }}
//               >
//                 Join thousands of adventurers exploring dynamic narratives and
//                 unforgettable conversations
//               </motion.p>
//               <motion.button
//                 className="px-10 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-lg font-semibold"
//                 whileHover={{
//                   scale: 1.05,
//                   boxShadow: "0 0 30px rgba(168, 85, 247, 0.6)",
//                 }}
//                 whileTap={{ scale: 0.95 }}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.6, delay: 0.6 }}
//               >
//                 Start Free Today
//               </motion.button>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="relative z-10 border-t border-slate-800/50 py-12 px-4">
//         <div className="max-w-7xl mx-auto text-center text-slate-400">
//           <motion.div
//             className="flex items-center justify-center space-x-2 mb-4"
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             viewport={{ once: true }}
//           >
//             <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
//               <MessageSquare className="w-5 h-5" />
//             </div>
//             <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
//               LoreBot
//             </span>
//           </motion.div>
//           <p>&copy; 2025 LoreBot. All rights reserved.</p>
//         </div>
//       </footer>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  MessageSquare,
  Sparkles,
  Zap,
  Shield,
  ArrowRight,
  Menu,
  X,
  BookOpen,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/stores/auth-store";

export default function LorebotLanding() {
  const router = useRouter();
  const { isAuthenticated, hasHydrated } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  useEffect(() => {
    if (hasHydrated) {
      if (isAuthenticated) {
        router.replace("/dashboard");
      }
    }
  }, [isAuthenticated, hasHydrated, router]);

  const features = [
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Dynamic Conversations",
      description:
        "Engage with AI characters that remember your interactions and evolve over time",
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Rich Character Lore",
      description:
        "Each character has unique backstories, personalities, and evolving narratives",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Powered by Gemini AI",
      description:
        "Advanced AI technology delivers natural, context-aware conversations",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Your Journey, Your Story",
      description:
        "Track your conversations and watch relationships develop naturally",
    },
  ];

  const characters = [
    {
      name: "Elara the Mystic",
      role: "Ancient Sorceress",
      location: "The Celestial Tower",
      description:
        "An ancient sorceress who speaks in riddles and cosmic wisdom",
    },
    {
      name: "Borin Ironfoot",
      role: "Tavern Keeper",
      location: "The Golden Barrel",
      description:
        "A jovial dwarf who knows all the realm's gossip and secrets",
    },
    {
      name: "Shade",
      role: "Shadow Dealer",
      location: "The Shadow Market",
      description: "A mysterious rogue who trades in secrets and rare goods",
    },
    {
      name: "Captain Thorne",
      role: "Guard Captain",
      location: "The Royal Barracks",
      description: "An honorable warrior with unwavering principles",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 text-white overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 -left-48 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-48 w-96 h-96 bg-pink-600/30 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      {/* Navigation */}
      <motion.nav
        className="relative z-50 border-b border-slate-800/50 backdrop-blur-xl bg-slate-950/80"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                LoreBot
              </span>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="hover:text-purple-400 transition-colors"
              >
                Features
              </a>
              <a
                href="#characters"
                className="hover:text-purple-400 transition-colors"
              >
                Characters
              </a>
              <a
                href="#about"
                className="hover:text-purple-400 transition-colors"
              >
                About
              </a>
              <motion.button
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-medium"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(168, 85, 247, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
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
          <div className="px-4 py-4 space-y-3">
            <a
              href="#features"
              className="block py-2 hover:text-purple-400 transition-colors"
            >
              Features
            </a>
            <a
              href="#characters"
              className="block py-2 hover:text-purple-400 transition-colors"
            >
              Characters
            </a>
            <a
              href="#about"
              className="block py-2 hover:text-purple-400 transition-colors"
            >
              About
            </a>
            <button className="w-full px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg">
              Get Started
            </button>
          </div>
        </motion.div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ y }}
          >
            <motion.div
              className="mb-8 inline-block"
              animate={{
                textShadow: [
                  "0 0 20px rgba(168, 85, 247, 0.5)",
                  "0 0 40px rgba(236, 72, 153, 0.5)",
                  "0 0 20px rgba(168, 85, 247, 0.5)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Enter the Realm of
                </span>
                <br />
                <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                  Living Stories
                </span>
              </h1>
            </motion.div>

            <motion.p
              className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Immerse yourself in conversations with AI characters that
              remember, evolve, and create unique narratives with every
              interaction
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <motion.button
                className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-lg font-semibold"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(168, 85, 247, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Journey
                <motion.span
                  className="inline-block ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="inline-block" />
                </motion.span>
              </motion.button>
              <motion.button
                className="px-8 py-4 border-2 border-purple-500/50 rounded-lg text-lg font-semibold backdrop-blur-sm"
                whileHover={{
                  scale: 1.05,
                  borderColor: "rgba(168, 85, 247, 0.8)",
                  backgroundColor: "rgba(168, 85, 247, 0.1)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                Watch Demo
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Floating Character Cards */}
          <div className="mt-32 relative h-80 hidden md:block">
            {characters.slice(0, 3).map((char, i) => (
              <motion.div
                key={i}
                className="absolute left-1/2 top-1/2 w-72 bg-slate-900/40 backdrop-blur-md rounded-2xl border border-slate-700/50 p-6 shadow-xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  x: (i - 1) * 300 - 144,
                  y: Math.sin((i * Math.PI) / 3) * 40 - 80,
                }}
                transition={{
                  delay: 1 + i * 0.2,
                  duration: 0.8,
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: 2,
                }}
                whileHover={{
                  scale: 1.05,
                  borderColor: "rgba(168, 85, 247, 0.5)",
                }}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-lg font-bold">
                    {char.name[0]}
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-white">{char.name}</p>
                    <p className="text-sm text-purple-400">{char.role}</p>
                  </div>
                </div>
                <p className="text-sm text-slate-300">
                  {char.description.substring(0, 50)}...
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Powered by Magic & AI
            </span>
          </motion.h2>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="group p-6 bg-slate-900/40 backdrop-blur-md rounded-2xl border border-slate-700/50 hover:border-purple-500/50 transition-all"
                whileHover={{
                  y: -10,
                  boxShadow: "0 20px 40px rgba(168, 85, 247, 0.2)",
                }}
              >
                <motion.div
                  className="w-12 h-12 bg-gradient-to-br from-purple-600/30 to-pink-600/30 rounded-lg flex items-center justify-center mb-4"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="text-purple-400">{feature.icon}</div>
                </motion.div>
                <h3 className="text-xl font-bold mb-3 text-white">
                  {feature.title}
                </h3>
                <p className="text-slate-400">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Characters Section */}
      <section id="characters" className="relative z-10 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Meet the Characters
              </span>
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Each character brings their own unique story, personality, and
              secrets waiting to be discovered
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {characters.map((char, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="relative overflow-hidden rounded-2xl bg-slate-900/40 backdrop-blur-md border border-slate-700/50 hover:border-purple-500/50 p-6"
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <motion.div
                  className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-2xl font-bold"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  {char.name[0]}
                </motion.div>
                <h3 className="text-xl font-bold mb-2 text-white text-center">
                  {char.name}
                </h3>
                <p className="text-purple-400 text-center mb-2">{char.role}</p>
                <p className="text-sm text-slate-400 text-center mb-4">
                  {char.location}
                </p>
                <p className="text-sm text-slate-300 mb-4">
                  {char.description}
                </p>
                <motion.button
                  className="w-full px-4 py-2 border border-purple-500/50 rounded-lg hover:bg-purple-500/10 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Conversation
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="relative p-12 rounded-3xl bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-md border border-purple-500/30"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-2xl rounded-3xl"
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.05, 1],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <div className="relative text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Begin Your Adventure
                </span>
              </h2>
              <p className="text-xl text-slate-300 mb-8">
                Join thousands of adventurers exploring dynamic narratives and
                unforgettable conversations
              </p>
              <motion.button
                className="px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-lg font-semibold"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 60px rgba(168, 85, 247, 0.5)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                Start Free Today
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800/50 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center text-slate-400">
          <motion.div
            className="flex items-center justify-center space-x-2 mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              LoreBot
            </span>
          </motion.div>
          <p>&copy; 2025 LoreBot. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
