// "use client";

// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";
// import { MessageSquare } from "lucide-react";
// import { useConversations } from "@/lib/hooks/use-conversations";
// import Image from "next/image";

// interface CharacterCardProps {
//   character: {
//     id: string;
//     name: string;
//     role: string;
//     personality: string[];
//     backstory: string;
//     imageUrl?: string;
//   };
// }

// export function CharacterCard({ character }: CharacterCardProps) {
//   const router = useRouter();
//   const { startConversation, isStarting } = useConversations();

//   const getCharacterImage = () => {
//     if (character.imageUrl) return character.imageUrl;
//     return `https://ui-avatars.com/api/?name=${encodeURIComponent(
//       character.name
//     )}&size=200&background=7c3aed&color=fff&bold=true`;
//   };

//   const handleStartChat = () => {
//     startConversation(character.id);
//   };

//   return (
//     <Card className="group hover:border-purple-500/50 transition-all duration-300 overflow-hidden">
//       {/* ... rest of the card ... */}

//       <CardContent className="space-y-4">
//         <p className="text-sm text-slate-300 line-clamp-3">
//           {character.backstory}
//         </p>

//         {/* <div className="flex flex-wrap gap-2">
//           {character.personality.slice(0, 3).map((trait: string) => (
//             <span
//               key={trait}
//               className="px-2 py-1 text-xs rounded-full bg-purple-500/20 text-purple-300"
//             >
//               {trait}
//             </span>
//           ))}
//         </div> */}

//         <Button
//           onClick={handleStartChat}
//           className="w-full"
//           variant="default"
//           disabled={isStarting}
//         >
//           <MessageSquare className="mr-2 h-4 w-4" />
//           {isStarting ? "Loading..." : "Start Conversation"}
//         </Button>
//       </CardContent>
//     </Card>
//   );
// }

"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { useConversations } from "@/lib/hooks/use-conversations";
import Image from "next/image";
import Link from "next/link";

interface CharacterCardProps {
  character: {
    id: string;
    name: string;
    role: string;
    personality: string[];
    backstory: string;
    imageUrl?: string;
  };
}

export function CharacterCard({ character }: CharacterCardProps) {
  const { startConversation, isStarting } = useConversations();

  const getCharacterImage = () => {
    if (character.imageUrl) return character.imageUrl;
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      character.name
    )}&size=200&background=7c3aed&color=fff&bold=true`;
  };

  const handleStartChat = () => {
    startConversation(character.id);
  };

  return (
    <Card className="group hover:border-purple-500/50 transition-all duration-300 overflow-hidden">
      <div className="relative h-48 w-full overflow-hidden bg-linear-to-br from-purple-900/20 to-pink-900/20">
        <Image
          src={getCharacterImage()}
          alt={character.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
          unoptimized
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/50 to-transparent" />
      </div>

      <CardHeader>
        <div className="space-y-1">
          <Link
            href={`/characters/${character.id}`}
            className="text-xl font-bold text-purple-100"
          >
            {character.name}
          </Link>
          <p className="text-sm text-purple-400">{character.role}</p>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-slate-300 line-clamp-3">
          {character.backstory}
        </p>

        {/* <div className="flex flex-wrap gap-2">
          {character.personality.slice(0, 3).map((trait: string) => (
            <span
              key={trait}
              className="px-2 py-1 text-xs rounded-full bg-purple-500/20 text-purple-300"
            >
              {trait}
            </span>
          ))}
        </div> */}

        <Button
          onClick={handleStartChat}
          className="w-full"
          variant="default"
          disabled={isStarting}
        >
          <MessageSquare className="mr-2 h-4 w-4" />
          {isStarting ? "Loading..." : "Start Conversation"}
        </Button>
      </CardContent>
    </Card>
  );
}
