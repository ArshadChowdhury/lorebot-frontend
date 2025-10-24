// "use client";

// import React from "react";
// import { useEffect, useRef } from "react";
// import { useConversation } from "@/lib/hooks/use-conversations";
// import { useChatStore } from "../../../../lib/stores/chat-store";
// import { MessageBubble } from "@/components/chat/message-bubble";
// import { MessageInput } from "../../../../components/chat/message-input";
// import { TypingIndicator } from "../../../../components/chat/typing-indicator";
// import { Card } from "@/components/ui/card";
// import { ArrowLeft, MapPin } from "lucide-react";
// import Link from "next/link";

// export default function ChatPage({
//   params,
// }: {
//   params: Promise<{ conversationId: string }>;
// }) {
//   const { conversationId } = React.use(params);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   const {
//     conversation,
//     messages,
//     isLoadingConversation,
//     isLoadingMessages,
//     sendMessage,
//     isSending,
//   } = useConversation(conversationId);

//   const isTyping = useChatStore((state) => state.isTyping[conversationId]);

//   // Auto-scroll to bottom
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, isTyping]);

//   if (isLoadingConversation || isLoadingMessages) {
//     return (
//       <div className="flex items-center justify-center min-h-[60vh]">
//         <div className="text-center space-y-4">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto" />
//           <p className="text-slate-400">Loading conversation...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!conversation) {
//     return (
//       <div className="text-center py-12">
//         <p className="text-slate-400 mb-4">Conversation not found</p>
//         <Link href="/dashboard" className="text-purple-400 hover:underline">
//           Return to Dashboard
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto space-y-4">
//       {/* Header */}
//       <Card className="p-4">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-4">
//             <Link href="/characters">
//               <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
//                 <ArrowLeft className="h-5 w-5" />
//               </button>
//             </Link>
//             <div>
//               <h2 className="text-2xl font-bold">
//                 {conversation.character?.name}
//               </h2>
//               <p className="text-sm text-slate-400 flex items-center">
//                 <MapPin className="h-3 w-3 mr-1" />
//                 {conversation.character?.location}
//               </p>
//             </div>
//           </div>
//           <div className="text-right">
//             <p className="text-sm text-slate-400">Messages</p>
//             <p className="text-xl font-semibold">
//               {conversation.metadata.totalMessages || 0}
//             </p>
//           </div>
//         </div>
//       </Card>

//       {/* Messages Container */}
//       <Card className="p-6 min-h-[500px] max-h-[600px] overflow-y-auto flex flex-col">
//         <div className="flex-1 space-y-4">
//           {messages && messages.length > 0 ? (
//             messages.map((message) => (
//               <MessageBubble
//                 key={message.id}
//                 message={message}
//                 characterName={conversation.character?.name}
//               />
//             ))
//           ) : (
//             <div className="flex items-center justify-center h-full">
//               <div className="text-center space-y-2">
//                 <p className="text-slate-400">No messages yet</p>
//                 <p className="text-sm text-slate-500">
//                   Start the conversation by saying hello!
//                 </p>
//               </div>
//             </div>
//           )}

//           {isTyping && (
//             <TypingIndicator
//               characterName={conversation.character?.name || "Character"}
//             />
//           )}

//           <div ref={messagesEndRef} />
//         </div>
//       </Card>

//       {/* Input */}
//       <Card className="p-4">
//         <MessageInput onSend={sendMessage} disabled={isSending} />
//       </Card>
//     </div>
//   );
// }

"use client";

import React, { useMemo } from "react";
import { useEffect, useRef } from "react";
import { useConversation } from "@/lib/hooks/use-conversations";
import { useChatStore } from "../../../../lib/stores/chat-store";
import { MessageBubble } from "@/components/chat/message-bubble";
import { MessageInput } from "../../../../components/chat/message-input";
import { TypingIndicator } from "../../../../components/chat/typing-indicator";
import { Card } from "@/components/ui/card";
import { ArrowLeft, MapPin } from "lucide-react";
import Link from "next/link";

export default function ChatPage({
  params,
}: {
  params: Promise<{ conversationId: string }>;
}) {
  const { conversationId } = React.use(params);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    conversation,
    messages,
    isLoadingConversation,
    isLoadingMessages,
    sendMessage,
    isSending,
  } = useConversation(conversationId);

  const isTyping = useChatStore((state) => state.isTyping[conversationId]);

  // ✅ Fix: Use useMemo to create stable reference
  const optimisticMessages = useChatStore(
    (state) => state.optimisticMessages[conversationId]
  );

  const safeOptimisticMessages = useMemo(
    () => optimisticMessages || [],
    [optimisticMessages]
  );

  // Combine real messages with optimistic messages
  const allMessages = useMemo(
    () => [...(messages || []), ...safeOptimisticMessages],
    [messages, safeOptimisticMessages]
  );

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allMessages, isTyping]);

  if (!conversation) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-400 mb-4">Conversation not found</p>
        <Link href="/dashboard" className="text-purple-400 hover:underline">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {/* Header */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/characters">
              <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
                <ArrowLeft className="h-5 w-5" />
              </button>
            </Link>
            <div>
              <h2 className="text-2xl font-bold">
                {conversation.character?.name}
              </h2>
              <p className="text-sm text-slate-400 flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                {conversation.character?.location}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-400">Messages</p>
            <p className="text-xl font-semibold">
              {conversation.metadata.totalMessages || 0}
            </p>
          </div>
        </div>
      </Card>

      {/* Messages Container */}
      <Card className="p-6 min-h-[500px] max-h-[600px] overflow-y-auto flex flex-col">
        <div className="flex-1 space-y-4">
          {allMessages.length > 0 ? (
            allMessages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                characterName={conversation.character?.name}
              />
            ))
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-2">
                <p className="text-slate-400">No messages yet</p>
                <p className="text-sm text-slate-500">
                  Start the conversation by saying hello!
                </p>
              </div>
            </div>
          )}

          {isTyping && (
            <TypingIndicator
              characterName={conversation.character?.name || "Character"}
            />
          )}

          <div ref={messagesEndRef} />
        </div>
      </Card>

      {/* Input */}
      <Card className="p-4">
        <MessageInput onSend={sendMessage} disabled={isSending} />
      </Card>
    </div>
  );
}
