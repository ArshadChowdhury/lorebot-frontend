"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { MessageSquare, Sparkles, Zap, Shield, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import PublicNavbar from "@/components/layout/public-navbar";

export default function LorebotLanding() {
  const router = useRouter();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

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
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-purple-950/20 to-slate-950 text-white overflow-hidden">
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

      <PublicNavbar />

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
                <span className="bg-linear-to-br from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Enter the Realm of
                </span>
                <br />
                <span className="bg-linear-to-br from-pink-400 to-purple-400 bg-clip-text text-transparent">
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
              remember, evolve and create unique narratives with every
              interaction
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <motion.button
                className="group px-8 py-4 bg-linear-to-br from-purple-600 to-pink-600 rounded-lg text-lg font-semibold cursor-pointer"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(168, 85, 247, 0.4)",
                }}
                onClick={() => router.push("/register")}
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
                  <div className="w-12 h-12 rounded-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center text-lg font-bold">
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
            <span className="bg-linear-to-br from-purple-400 to-pink-400 bg-clip-text text-transparent">
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
                  className="w-12 h-12 bg-linear-to-br from-purple-600/30 to-pink-600/30 rounded-lg flex items-center justify-center mb-4"
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
              <span className="bg-linear-to-br from-purple-400 to-pink-400 bg-clip-text text-transparent">
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
                  className="w-20 h-20 mx-auto mb-4 rounded-full bg-linear-to-br from-purple-600 to-pink-600 flex items-center justify-center text-2xl font-bold"
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
                  onClick={() => router.push("/register")}
                  className="w-full px-4 py-2 border border-purple-500/50 rounded-lg hover:bg-purple-500/10 transition-all cursor-pointer"
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
            className="relative p-12 rounded-3xl bg-linear-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-md border border-purple-500/30"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="absolute inset-0 bg-linear-to-br from-purple-500/10 to-pink-500/10 blur-2xl rounded-3xl"
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.05, 1],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <div className="relative text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-linear-to-br from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Begin Your Adventure
                </span>
              </h2>
              <p className="text-xl text-slate-300 mb-8">
                Join thousands of adventurers exploring dynamic narratives and
                unforgettable conversations
              </p>
              <motion.button
                onClick={() => router.push("/characters")}
                className="cursor-pointer px-10 py-4 bg-linear-to-br from-purple-600 to-pink-600 rounded-lg text-lg font-semibold"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 60px rgba(168, 85, 247, 0.5)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                Start Conversation Now
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
