"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, MessageSquare, BookOpen, Zap } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { charactersApi } from "@/lib/api/characters";
import { useConversations } from "@/lib/hooks/use-conversations";
import Image from "next/image";

export default function CharacterDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  const router = useRouter();
  const { startConversation, isStarting } = useConversations();

  const { data: character, isLoading } = useQuery({
    queryKey: ["character", id],
    queryFn: () => charactersApi.getById(id),
  });

  const handleStartChat = () => {
    startConversation(id);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto" />
          <p className="text-slate-400">Loading character...</p>
        </div>
      </div>
    );
  }

  if (!character) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-400 mb-4">Character not found</p>
        <Button onClick={() => router.push("/characters")} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Characters
        </Button>
      </div>
    );
  }

  const getCharacterImage = () => {
    if (character.avatarUrl) {
      const match = character.avatarUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
      if (match) {
        const fileId = match[1];
        return `https://drive.google.com/uc?export=view&id=${fileId}`;
      }
      return character.avatarUrl; // fallback in case it’s already a direct link
    }

    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      character.name
    )}&size=200&background=7c3aed&color=fff&bold=true`;
  };

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
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          onClick={() => router.push("/characters")}
          variant="ghost"
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Characters
        </Button>
      </motion.div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="overflow-hidden">
          <div className="relative h-64 md:h-80 bg-linear-to-br from-purple-900/40 to-pink-900/40">
            <Image
              src={getCharacterImage()}
              alt={character.name}
              fill
              className="object-contain opacity-50"
              unoptimized
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/80 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                  <motion.h1
                    className="text-4xl md:text-5xl font-bold mb-2 bg-linear-to-br from-purple-400 to-pink-400 bg-clip-text text-transparent"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {character.name}
                  </motion.h1>
                  <motion.p
                    className="text-xl text-purple-400 mb-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {character.role}
                  </motion.p>
                  <motion.div
                    className="flex items-center text-slate-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    {character.location}
                  </motion.div>
                </div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button
                    onClick={handleStartChat}
                    size="lg"
                    disabled={isStarting}
                    className="text-white bg-linear-to-br from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    <MessageSquare className="mr-2 h-5 w-5" />
                    {isStarting ? "Starting..." : "Start Conversation"}
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Content Grid */}
      <motion.div
        className="grid md:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Content - 2 columns */}
        <div className="md:col-span-2 space-y-6">
          {/* Backstory */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-bold flex items-center">
                  <BookOpen className="mr-2 h-6 w-6 text-purple-400" />
                  Backstory
                </h2>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 leading-relaxed whitespace-pre-line">
                  {character.backstory}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Speech Patterns */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-bold flex items-center">
                  <MessageSquare className="mr-2 h-6 w-6 text-purple-400" />
                  Speech Patterns
                </h2>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {character.speechPatterns?.map(
                    (pattern: string, i: number) => (
                      <motion.li
                        key={i}
                        className="flex items-start text-slate-300"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                      >
                        <span className="text-purple-400 mr-2">•</span>
                        {pattern}
                      </motion.li>
                    )
                  )}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Sidebar - 1 column */}
        <div className="space-y-6">
          {/* Knowledge Domains */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <h2 className="text-xl font-bold flex items-center">
                  <Zap className="mr-2 h-5 w-5 text-purple-400" />
                  Expertise
                </h2>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {character.knowledgeDomains?.map(
                    (domain: string, i: number) => (
                      <motion.li
                        key={i}
                        className="flex items-center text-slate-300 text-sm"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + i * 0.05 }}
                      >
                        <span className="w-2 h-2 bg-purple-400 rounded-full mr-2" />
                        {domain}
                      </motion.li>
                    )
                  )}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Current Mood */}
          {character.currentMood && (
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-bold">Current Mood</h2>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300 capitalize">
                        {character.currentMood.state}
                      </span>
                      <span className="text-purple-400 font-semibold">
                        {character.currentMood.intensity}/10
                      </span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <motion.div
                        className="bg-linear-to-br from-purple-500 to-pink-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{
                          width: `${character.currentMood.intensity * 10}%`,
                        }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Quick Actions */}
          <motion.div variants={itemVariants}>
            <Card className="bg-linear-to-br from-purple-900/20 to-pink-900/20 border-purple-500/30">
              <CardContent className="pt-6">
                <Button
                  onClick={handleStartChat}
                  disabled={isStarting}
                  className="w-full text-white bg-linear-to-br from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  size="lg"
                >
                  <MessageSquare className="mr-2 h-5 w-5" />
                  {isStarting ? "Starting..." : "Begin Conversation"}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
