"use client";

import PublicNavbar from "@/components/layout/public-navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MessageCircle,
  Scroll,
  Wand2,
  Sparkles,
  Users,
  Globe,
  Zap,
  Heart,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div>
      <PublicNavbar />
      <div className="max-w-7xl mx-6 lg:mx-auto space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-4 mt-14">
          <div className="inline-block">
            <Sparkles className="h-16 w-16 text-purple-400 mx-auto mb-4 animate-pulse" />
          </div>
          <h1 className="text-5xl font-bold bg-linear-to-br from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent">
            About LoreBot
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            An AI-powered fantasy world where you can chat with unique
            characters, complete quests, and experience a living, breathing
            realm that evolves with every interaction.
          </p>
        </div>

        {/* What is LoreBot */}
        <Card className="bg-linear-to-br from-purple-900/20 to-slate-800 border-purple-700/50">
          <CardHeader>
            <CardTitle className="text-3xl flex items-center gap-3">
              <Wand2 className="h-8 w-8 text-purple-400" />
              What is LoreBot?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-slate-300 leading-relaxed">
            <p>
              LoreBot is an immersive AI-powered fantasy experience that brings
              you into a shared universe where every character has their own
              personality, memories, and stories to tell. Unlike traditional
              chatbots, LoreBot creates a persistent world where your actions
              and conversations have lasting impacts.
            </p>
            <p>
              Powered by Google's Gemini AI, each character remembers your
              conversations, develops relationships with you, and reacts to
              world events in real-time. Whether you're seeking wisdom from
              Elara the Mystic, gathering gossip at Borin's tavern, or striking
              deals with the mysterious Shade, every interaction is unique and
              meaningful.
            </p>
          </CardContent>
        </Card>

        {/* Key Features */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-center bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Key Features
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="hover:shadow-lg hover:shadow-purple-500/10 transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <MessageCircle className="h-6 w-6 text-purple-400" />
                  Dynamic Characters
                </CardTitle>
              </CardHeader>
              <CardContent className="text-slate-300">
                Each NPC has a unique personality, speech patterns, and
                knowledge domains. They remember your conversations and build
                relationships over time, creating truly personalized
                interactions.
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg hover:shadow-purple-500/10 transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Scroll className="h-6 w-6 text-pink-400" />
                  Epic Quest System
                </CardTitle>
              </CardHeader>
              <CardContent className="text-slate-300">
                Characters naturally offer quests during conversations. Track
                your progress, complete objectives, and earn rewards including
                experience points, items, and prestigious titles.
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg hover:shadow-purple-500/10 transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Globe className="h-6 w-6 text-blue-400" />
                  Living World Events
                </CardTitle>
              </CardHeader>
              <CardContent className="text-slate-300">
                The realm evolves with dynamic world events that affect all
                characters. From celestial phenomena to political upheavals,
                watch as the world responds and changes around you.
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg hover:shadow-purple-500/10 transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Zap className="h-6 w-6 text-amber-400" />
                  Persistent Memory
                </CardTitle>
              </CardHeader>
              <CardContent className="text-slate-300">
                Characters remember important details about you, your
                preferences, and your shared history. Every conversation builds
                upon the last, creating deeper and more meaningful
                relationships.
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Meet the Characters */}
        <Card className="bg-linear-to-br from-slate-800 to-purple-900/20 border-slate-700">
          <CardHeader>
            <CardTitle className="text-3xl flex items-center gap-3">
              <Users className="h-8 w-8 text-purple-400" />
              Meet the Characters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-slate-300">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-purple-400">
                  Elara the Mystic
                </h3>
                <p className="text-sm text-slate-400">
                  Ancient Sorceress • The Celestial Tower
                </p>
                <p>
                  A 300-year-old mage who speaks in riddles and metaphors. Elara
                  has witnessed the rise and fall of kingdoms and possesses
                  knowledge of ancient magic and cosmic events.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-amber-400">
                  Borin Ironfoot
                </h3>
                <p className="text-sm text-slate-400">
                  Tavern Keeper • The Golden Barrel
                </p>
                <p>
                  A jovial dwarf who runs the realm's most popular tavern.
                  Former adventurer turned innkeeper, Borin knows everyone's
                  secrets and serves the best ale in the land.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-slate-400">Shade</h3>
                <p className="text-sm text-slate-400">
                  Rogue Trader • Shadow Market
                </p>
                <p>
                  A mysterious hooded figure dealing in rare goods and secrets.
                  Witty, cautious, and always two steps ahead, Shade operates by
                  their own code in the city's underbelly.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-red-400">
                  Captain Thorne
                </h3>
                <p className="text-sm text-slate-400">
                  Guard Captain • Royal Barracks
                </p>
                <p>
                  A disciplined military leader with 20 years of service.
                  Honorable and stern, Captain Thorne values duty above all and
                  protects the realm with unwavering dedication.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technology Stack */}
        <Card className="border-slate-700">
          <CardHeader>
            <CardTitle className="text-3xl flex items-center gap-3">
              <Sparkles className="h-8 w-8 text-purple-400" />
              Technology
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-slate-300">
            <p className="leading-relaxed">
              LoreBot is built with cutting-edge technology to deliver a
              seamless and immersive experience:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-purple-400">Frontend</h4>
                <ul className="space-y-1 text-sm text-slate-400">
                  <li>• Next.js 14 with App Router</li>
                  <li>• React with TypeScript</li>
                  <li>• TanStack Query for data management</li>
                  <li>• Zustand for state management</li>
                  <li>• Tailwind CSS for styling</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-pink-400">Backend</h4>
                <ul className="space-y-1 text-sm text-slate-400">
                  <li>• NestJS framework</li>
                  <li>• PostgreSQL database</li>
                  <li>• TypeORM for data persistence</li>
                  <li>• JWT authentication</li>
                  <li>• Google Gemini AI integration</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How It Works */}
        <Card className="bg-linear-to-br from-pink-900/20 to-slate-800 border-pink-700/50">
          <CardHeader>
            <CardTitle className="text-3xl flex items-center gap-3">
              <Zap className="h-8 w-8 text-pink-400" />
              How It Works
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-slate-300">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2">
                    Choose a Character
                  </h4>
                  <p className="text-slate-400">
                    Select from our roster of unique NPCs, each with their own
                    personality, location, and expertise.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2">
                    Start Conversing
                  </h4>
                  <p className="text-slate-400">
                    Engage in natural conversations. Ask questions, share
                    stories, or simply chat. The AI adapts to your style and
                    remembers important details.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2">Accept Quests</h4>
                  <p className="text-slate-400">
                    Characters naturally offer quests during conversation.
                    Accept them to track objectives and earn rewards upon
                    completion.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2">
                    Experience the Living World
                  </h4>
                  <p className="text-slate-400">
                    Watch as world events unfold and affect all characters. The
                    realm evolves, and your favorite NPCs react to these changes
                    in real-time.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Future Plans */}
        <Card className="border-slate-700">
          <CardHeader>
            <CardTitle className="text-3xl flex items-center gap-3">
              <Heart className="h-8 w-8 text-pink-400" />
              Future Plans
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-slate-300">
            <p className="leading-relaxed">
              LoreBot is constantly evolving. Here's what we're working on:
            </p>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-start gap-3">
                <span className="text-purple-400 mt-1">▸</span>
                <span>
                  Character relationships and cross-character conversations
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 mt-1">▸</span>
                <span>
                  AI-generated images for quest completions and important
                  moments
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 mt-1">▸</span>
                <span>Inventory system for items and collectibles</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 mt-1">▸</span>
                <span>Voice synthesis for character dialogue</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 mt-1">▸</span>
                <span>Multiplayer interactions and shared world events</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 mt-1">▸</span>
                <span>
                  More characters from different races and backgrounds
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 mt-1">▸</span>
                <span>Dynamic world map with explorable locations</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Footer Note */}
        <div className="text-center py-8 space-y-2">
          <p className="text-slate-400">
            Created with <Heart className="h-4 w-4 inline text-pink-400" />{" "}
            using Next.js, NestJS, and Google Gemini AI
          </p>
          <p className="text-sm text-slate-500">
            © 2025 LoreBot. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
