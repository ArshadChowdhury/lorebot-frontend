import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { conversationsApi } from "../api/conversations";
import { useChatStore } from "../stores/chat-store";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { SenderType } from "../types";

export function useConversations() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { addMessage, setTyping } = useChatStore();

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
  const { addMessage, setTyping } = useChatStore();

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
      // Optimistically add user message
      const userMessage = {
        id: `temp-${Date.now()}`,
        conversationId,
        senderType: SenderType.USER,
        content,
        isImportant: false,
        conversation: undefined as any,
        timestamp: new Date().toISOString(),
      };
      addMessage(conversationId, userMessage);
      setTyping(conversationId, true);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["messages", conversationId] });
      setTyping(conversationId, false);
    },
    onError: () => {
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
