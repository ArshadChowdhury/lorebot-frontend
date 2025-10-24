"use client";

interface TypingIndicatorProps {
  characterName: string;
}

export function TypingIndicator({ characterName }: TypingIndicatorProps) {
  return (
    <div className="flex gap-3 animate-fadeIn">
      <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0">
        <div className="w-2 h-2 bg-purple-400 rounded-full" />
      </div>
      <div className="bg-slate-800 rounded-2xl rounded-tl-none px-4 py-3 border border-slate-700">
        <p className="text-xs font-semibold text-purple-400 mb-1">
          {characterName}
        </p>
        <div className="flex gap-1">
          <div
            className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}
          />
          <div
            className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"
            style={{ animationDelay: "150ms" }}
          />
          <div
            className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"
            style={{ animationDelay: "300ms" }}
          />
        </div>
      </div>
    </div>
  );
}
