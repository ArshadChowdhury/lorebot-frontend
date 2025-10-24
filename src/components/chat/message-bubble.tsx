import { Message, SenderType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { User, Bot } from "lucide-react";
import { format } from "date-fns";

interface MessageBubbleProps {
  message: Message;
  characterName?: string;
}

export function MessageBubble({ message, characterName }: MessageBubbleProps) {
  const isUser = message.senderType === SenderType.USER;

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
            "rounded-2xl px-4 py-3 shadow-md",
            isUser
              ? "bg-purple-600 text-white rounded-tr-none"
              : "bg-slate-800 text-slate-100 rounded-tl-none border border-slate-700"
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
        </div>
        <span className="text-xs text-slate-500 mt-1 px-1">
          {format(new Date(message.timestamp), "HH:mm")}
        </span>
      </div>
    </div>
  );
}
