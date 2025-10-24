"use client";

import { useAuth } from "@/lib/hooks/use-auth";
import { useConversations } from "@/lib/hooks/use-conversations";
import { useQuests } from "@/lib/hooks/use-quests";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Scroll, Trophy, Sparkles } from "lucide-react";
import Link from "next/link";
import { QuestStatus } from "@/lib/types";

export default function DashboardPage() {
  const { user } = useAuth();
  const { conversations, isLoading: isLoadingConversations } =
    useConversations();
  const { quests, isLoading: isLoadingQuests } = useQuests();

  const activeQuests =
    quests?.filter((q) => q.status === QuestStatus.ACTIVE) || [];
  const completedQuests =
    quests?.filter((q) => q.status === QuestStatus.COMPLETED) || [];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Welcome back, {user?.displayName || user?.username}!
        </h1>
        <p className="text-slate-400">
          Level {user?.level} • {user?.experiencePoints} XP
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-purple-900/20 to-slate-800 border-purple-700/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageCircle className="h-5 w-5 text-purple-400" />
              <span>Conversations</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{conversations?.length || 0}</p>
            <p className="text-sm text-slate-400 mt-1">Active chats</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-pink-900/20 to-slate-800 border-pink-700/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Scroll className="h-5 w-5 text-pink-400" />
              <span>Active Quests</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{activeQuests.length}</p>
            <p className="text-sm text-slate-400 mt-1">In progress</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-900/20 to-slate-800 border-amber-700/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-amber-400" />
              <span>Completed</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{completedQuests.length}</p>
            <p className="text-sm text-slate-400 mt-1">Quests finished</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Conversations */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Conversations</CardTitle>
            <CardDescription>Continue your adventures</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingConversations ? (
              <p className="text-slate-400">Loading...</p>
            ) : conversations && conversations.length > 0 ? (
              <div className="space-y-3">
                {conversations.slice(0, 3).map((conv) => (
                  <Link
                    key={conv.id}
                    href={`/chat/${conv.id}`}
                    className="block p-3 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{conv.character?.name}</p>
                        <p className="text-sm text-slate-400">
                          {conv.metadata.totalMessages || 0} messages
                        </p>
                      </div>
                      <MessageCircle className="h-5 w-5 text-purple-400" />
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-slate-400 mb-4">No conversations yet</p>
                <Link href="/characters">
                  <Button>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Meet Characters
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Active Quests */}
        <Card>
          <CardHeader>
            <CardTitle>Active Quests</CardTitle>
            <CardDescription>Your current objectives</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingQuests ? (
              <p className="text-slate-400">Loading...</p>
            ) : activeQuests.length > 0 ? (
              <div className="space-y-3">
                {activeQuests.slice(0, 3).map((quest) => (
                  <div
                    key={quest.id}
                    className="p-3 rounded-lg bg-slate-800 border border-slate-700"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <p className="font-medium">{quest.title}</p>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          quest.difficulty === "easy"
                            ? "bg-green-900/30 text-green-400"
                            : quest.difficulty === "medium"
                            ? "bg-yellow-900/30 text-yellow-400"
                            : quest.difficulty === "hard"
                            ? "bg-orange-900/30 text-orange-400"
                            : "bg-purple-900/30 text-purple-400"
                        }`}
                      >
                        {quest.difficulty}
                      </span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-purple-500 h-2 rounded-full transition-all"
                        style={{ width: `${quest.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      {quest.progress}% complete
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-slate-400 mb-4">No active quests</p>
                <Link href="/characters">
                  <Button variant="outline">
                    <Scroll className="mr-2 h-4 w-4" />
                    Find Quests
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Link href="/characters">
              <Button>
                <Sparkles className="mr-2 h-4 w-4" />
                Explore Characters
              </Button>
            </Link>
            <Link href="/quests">
              <Button variant="outline">
                <Scroll className="mr-2 h-4 w-4" />
                View All Quests
              </Button>
            </Link>
            <Link href="/world">
              <Button variant="outline">
                <Trophy className="mr-2 h-4 w-4" />
                World Events
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
