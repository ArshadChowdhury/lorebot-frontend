import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { questsApi } from "../api/quests";
import { QuestStatus } from "../types";
import { toast } from "sonner";

export function useQuests(status?: QuestStatus) {
  const queryClient = useQueryClient();

  // Get all quests
  const { data: quests, isLoading } = useQuery({
    queryKey: ["quests", status],
    queryFn: () => questsApi.getAll(status),
  });

  // Accept quest mutation
  const acceptMutation = useMutation({
    mutationFn: questsApi.accept,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quests"] });
      toast.success("Quest accepted!");
    },
    onError: () => {
      toast.error("Failed to accept quest");
    },
  });

  // Complete quest mutation
  const completeMutation = useMutation({
    mutationFn: questsApi.complete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quests"] });
      toast.success("Quest completed! 🎉");
    },
    onError: () => {
      toast.error("Failed to complete quest");
    },
  });

  // Abandon quest mutation
  const abandonMutation = useMutation({
    mutationFn: questsApi.abandon,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quests"] });
      toast.info("Quest abandoned");
    },
    onError: () => {
      toast.error("Failed to abandon quest");
    },
  });

  // Update progress mutation
  const updateProgressMutation = useMutation({
    mutationFn: ({ id, progress }: { id: string; progress: number }) =>
      questsApi.updateProgress(id, progress),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quests"] });
    },
  });

  return {
    quests,
    isLoading,
    acceptQuest: acceptMutation.mutate,
    completeQuest: completeMutation.mutate,
    abandonQuest: abandonMutation.mutate,
    updateProgress: updateProgressMutation.mutate,
  };
}
