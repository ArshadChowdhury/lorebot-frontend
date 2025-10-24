"use client";

import { useState } from "react";
import { useQuests } from "@/lib/hooks/use-quests";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QuestStatus } from "@/lib/types";
import { Scroll, Trophy, CheckCircle2, XCircle, Clock } from "lucide-react";

export default function QuestsPage() {
  const [filter, setFilter] = useState<QuestStatus | undefined>(undefined);
  const { quests, isLoading, acceptQuest, completeQuest, abandonQuest } =
    useQuests(filter);

  const getStatusColor = (status: QuestStatus) => {
    switch (status) {
      case QuestStatus.OFFERED:
        return "bg-blue-900/30 text-blue-400 border-blue-700/50";
      case QuestStatus.ACTIVE:
        return "bg-yellow-900/30 text-yellow-400 border-yellow-700/50";
      case QuestStatus.COMPLETED:
        return "bg-green-900/30 text-green-400 border-green-700/50";
      case QuestStatus.FAILED:
        return "bg-red-900/30 text-red-400 border-red-700/50";
      case QuestStatus.ABANDONED:
        return "bg-gray-900/30 text-gray-400 border-gray-700/50";
      default:
        return "bg-slate-900/30 text-slate-400 border-slate-700/50";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-900/30 text-green-400";
      case "medium":
        return "bg-yellow-900/30 text-yellow-400";
      case "hard":
        return "bg-orange-900/30 text-orange-400";
      case "legendary":
        return "bg-purple-900/30 text-purple-400";
      default:
        return "bg-slate-900/30 text-slate-400";
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto" />
          <p className="text-slate-400">Loading quests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold bg-linear-to-br from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Quest Log
        </h1>
        <p className="text-slate-400">Track and manage your adventures</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-2">
        <Button
          variant={filter === undefined ? "default" : "outline"}
          onClick={() => setFilter(undefined)}
          size="sm"
        >
          All Quests
        </Button>
        <Button
          variant={filter === QuestStatus.OFFERED ? "default" : "outline"}
          onClick={() => setFilter(QuestStatus.OFFERED)}
          size="sm"
        >
          Offered
        </Button>
        <Button
          variant={filter === QuestStatus.ACTIVE ? "default" : "outline"}
          onClick={() => setFilter(QuestStatus.ACTIVE)}
          size="sm"
        >
          Active
        </Button>
        <Button
          variant={filter === QuestStatus.COMPLETED ? "default" : "outline"}
          onClick={() => setFilter(QuestStatus.COMPLETED)}
          size="sm"
        >
          Completed
        </Button>
      </div>

      {/* Quests Grid */}
      {!quests || quests.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[40vh] space-y-4">
          <Scroll className="h-16 w-16 text-slate-600" />
          <h2 className="text-2xl font-semibold text-slate-400">
            No Quests Found
          </h2>
          <p className="text-slate-500">
            Start conversations with characters to receive quests!
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {quests.map((quest) => (
            <Card key={quest.id} className="overflow-hidden">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">
                      {quest.title}
                    </CardTitle>
                    <CardDescription>{quest.description}</CardDescription>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span
                      className={`text-xs px-2 py-1 rounded border ${getStatusColor(
                        quest.status
                      )}`}
                    >
                      {quest.status}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded capitalize ${getDifficultyColor(
                        quest.difficulty
                      )}`}
                    >
                      {quest.difficulty}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Character Info */}
                {quest.character && (
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Scroll className="h-4 w-4" />
                    <span>From: {quest.character.name}</span>
                  </div>
                )}

                {/* Progress Bar */}
                {quest.status === QuestStatus.ACTIVE && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Progress</span>
                      <span className="text-purple-400 font-semibold">
                        {quest.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-linear-to-br from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${quest.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Rewards */}
                {quest.rewards && (
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-slate-400 uppercase">
                      Rewards
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {quest.rewards.experiencePoints && (
                        <span className="text-xs px-2 py-1 rounded bg-amber-900/30 text-amber-400 border border-amber-700/50">
                          {quest.rewards.experiencePoints} XP
                        </span>
                      )}
                      {quest.rewards.items?.map((item, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-1 rounded bg-purple-900/30 text-purple-400 border border-purple-700/50"
                        >
                          {item}
                        </span>
                      ))}
                      {quest.rewards.title && (
                        <span className="text-xs px-2 py-1 rounded bg-pink-900/30 text-pink-400 border border-pink-700/50">
                          Title: {quest.rewards.title}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  {quest.status === QuestStatus.OFFERED && (
                    <Button
                      onClick={() => acceptQuest(quest.id)}
                      className="flex-1"
                      size="sm"
                    >
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Accept Quest
                    </Button>
                  )}
                  {quest.status === QuestStatus.ACTIVE && (
                    <>
                      <Button
                        onClick={() => completeQuest(quest.id)}
                        className="flex-1"
                        size="sm"
                        disabled={quest.progress < 100}
                      >
                        <Trophy className="h-4 w-4 mr-2" />
                        Complete
                      </Button>
                      <Button
                        onClick={() => abandonQuest(quest.id)}
                        variant="destructive"
                        size="sm"
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Abandon
                      </Button>
                    </>
                  )}
                  {quest.status === QuestStatus.COMPLETED && (
                    <div className="flex items-center gap-2 text-green-400 text-sm">
                      <Trophy className="h-4 w-4" />
                      <span>
                        Completed on{" "}
                        {new Date(quest.completedAt!).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
