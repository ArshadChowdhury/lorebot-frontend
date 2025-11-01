import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { conversationsApi } from "../api/conversations";
import { useChatStore } from "../stores/chat-store";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { SenderType } from "../types";

export function useConversations() {
  const queryClient = useQueryClient();
  const router = useRouter();

  // Get all conversations
  const { data: conversations, isLoading } = useQuery({
    queryKey: ["conversations"],
    queryFn: conversationsApi.getAll,
  });

  // Start conversation mutation
  const startConversationMutation = useMutation({
    mutationFn: conversationsApi.start,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      router.push(`/chat/${data.id}`);
    },
    onError: () => {
      toast.error("Failed to start conversation");
    },
  });

  return {
    conversations,
    isLoading,
    startConversation: startConversationMutation.mutate,
    isStarting: startConversationMutation.isPending,
  };
}

export function useConversation(conversationId: string) {
  const queryClient = useQueryClient();
  const {
    addOptimisticMessage,
    removeOptimisticMessage,
    markMessageAsError,
    setTyping,
  } = useChatStore();

  // Get conversation details
  const { data: conversation, isLoading: isLoadingConversation } = useQuery({
    queryKey: ["conversation", conversationId],
    queryFn: () => conversationsApi.getById(conversationId),
    enabled: !!conversationId,
  });

  // Get messages
  const { data: messages, isLoading: isLoadingMessages } = useQuery({
    queryKey: ["messages", conversationId],
    queryFn: () => conversationsApi.getMessages(conversationId),
    enabled: !!conversationId,
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: (content: string) =>
      conversationsApi.sendMessage(conversationId, { content }),
    onMutate: async (content) => {
      // Create optimistic message
      const optimisticMessage = {
        id: `temp-${Date.now()}`,
        conversationId,
        senderType: SenderType.USER,
        content,
        timestamp: new Date().toISOString(), // ✅ Convert to string
        metadata: undefined,
        conversation: undefined as any,
        character: null,
      };

      // Add optimistic message
      addOptimisticMessage(conversationId, optimisticMessage);
      setTyping(conversationId, true);

      return { optimisticMessage };
    },
    onSuccess: (data, variables, context) => {
      // Remove optimistic message
      if (context?.optimisticMessage) {
        removeOptimisticMessage(conversationId, context.optimisticMessage.id);
      }

      // Invalidate to fetch real messages
      queryClient.invalidateQueries({ queryKey: ["messages", conversationId] });
      queryClient.invalidateQueries({
        queryKey: ["conversation", conversationId],
      });
      setTyping(conversationId, false);
    },
    onError: (error, variables, context) => {
      // Mark optimistic message as error
      if (context?.optimisticMessage) {
        markMessageAsError(conversationId, context.optimisticMessage.id);
      }
      toast.error("Failed to send message");
      setTyping(conversationId, false);
    },
  });

  return {
    conversation,
    messages,
    isLoadingConversation,
    isLoadingMessages,
    sendMessage: sendMessageMutation.mutate,
    isSending: sendMessageMutation.isPending,
  };
}
