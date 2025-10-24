"use client";

import { useCharacters } from "@/lib/hooks/use-character";
import { CharacterCard } from "@/components/characters/character-card";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export default function CharactersPage() {
  const { characters, isLoading, seedCharacters, isSeeding } = useCharacters();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto" />
          <p className="text-slate-400">Loading characters...</p>
        </div>
      </div>
    );
  }

  if (!characters || characters.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4 max-w-md">
          <Sparkles className="h-16 w-16 text-purple-400 mx-auto" />
          <h2 className="text-2xl font-bold">No Characters Found</h2>
          <p className="text-slate-400">
            Let's populate the realm with some interesting characters!
          </p>
          <Button
            onClick={() => seedCharacters()}
            disabled={isSeeding}
            size="lg"
          >
            {isSeeding ? "Creating Characters..." : "Seed Characters"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Meet the Characters
        </h1>
        <p className="text-slate-400">
          Choose a character to begin your conversation
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {characters.map((character: any) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
    </div>
  );
}
