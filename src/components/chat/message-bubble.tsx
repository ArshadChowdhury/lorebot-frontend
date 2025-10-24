import { Message, SenderType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { User, Bot, AlertCircle, Clock } from "lucide-react";
import { format } from "date-fns";

interface MessageBubbleProps {
  message: Message;
  characterName?: string;
}

export function MessageBubble({ message, characterName }: MessageBubbleProps) {
  const isUser = message.senderType === SenderType.USER;
  const isError = (message as any).error;
  const isOptimistic = message.id.startsWith("temp-");

  return (
    <div
      className={cn(
        "flex gap-3 animate-fadeIn",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
          isUser ? "bg-purple-600" : "bg-slate-700"
        )}
      >
        {isUser ? (
          <User className="h-4 w-4 text-white" />
        ) : (
          <Bot className="h-4 w-4 text-purple-400" />
        )}
      </div>

      {/* Message Content */}
      <div
        className={cn(
          "flex flex-col max-w-[70%]",
          isUser ? "items-end" : "items-start"
        )}
      >
        <div
          className={cn(
            "rounded-2xl px-4 py-3 shadow-md transition-all",
            isUser
              ? "bg-purple-600 text-white rounded-tr-none"
              : "bg-slate-800 text-slate-100 rounded-tl-none border border-slate-700",
            isError && "opacity-50 border-red-500",
            isOptimistic && "opacity-75"
          )}
        >
          {!isUser && characterName && (
            <p className="text-xs font-semibold text-purple-400 mb-1">
              {characterName}
            </p>
          )}
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>

          {message.metadata?.mood && !isUser && (
            <p className="text-xs text-slate-400 mt-2 italic">
              *{message.metadata.mood}*
            </p>
          )}

          {message.metadata?.actionTaken && !isUser && (
            <p className="text-xs text-purple-300 mt-2 italic">
              {message.metadata.actionTaken}
            </p>
          )}

          {/* Error indicator */}
          {isError && (
            <div className="flex items-center gap-1 mt-2 text-red-400">
              <AlertCircle className="h-3 w-3" />
              <span className="text-xs">Failed to send</span>
            </div>
          )}

          {/* Sending indicator */}
          {isOptimistic && !isError && (
            <div className="flex items-center gap-1 mt-2 text-slate-400">
              <Clock className="h-3 w-3 animate-pulse" />
              <span className="text-xs">Sending...</span>
            </div>
          )}
        </div>
        <span className="text-xs text-slate-500 mt-1 px-1">
          {format(new Date(message.timestamp), "p")}
        </span>
      </div>
    </div>
  );
}
