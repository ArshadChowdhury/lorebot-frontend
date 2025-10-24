// User & Auth Types
export interface User {
  id: string;
  username: string;
  email: string;
  displayName: string;
  experiencePoints: number;
  level: number;
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
  displayName?: string;
}

export type ChatMessage = {
  id: string;
  conversationId: string;
  senderType: SenderType;
  content: string;
  timestamp: Date;
  metadata?: any;
};

// Character Types
export enum CharacterRole {
  MAGE = "mage",
  MERCHANT = "merchant",
  WARRIOR = "warrior",
  ROGUE = "rogue",
  NOBLE = "noble",
  SCHOLAR = "scholar",
}

export interface Character {
  id: string;
  name: string;
  role: CharacterRole;
  description: string;
  backstory: string;
  avatarUrl?: string;
  location: string;
  currentMood: {
    state: string;
    intensity: number;
    reason?: string;
  };
  speechPatterns: string[];
  knowledgeDomains: string[];
  isActive: boolean;
}

// Conversation Types
export interface Conversation {
  id: string;
  userId: string;
  characterId: string;
  summary?: string;
  metadata: {
    totalMessages?: number;
    lastTopic?: string;
    userFacts?: string[];
  };
  isActive: boolean;
  createdAt: string;
  lastMessageAt: string;
  character?: Character;
}

export enum SenderType {
  USER = "user",
  CHARACTER = "character",
  SYSTEM = "system",
}

// export interface Message {
//   id: string;
//   conversationId: string;
//   senderType: SenderType;
//   content: string;
//   metadata?: {
//     mood?: string;
//     questUpdate?: any;
//     actionTaken?: string;
//     imageUrl?: string;
//   };
//   isImportant: boolean;
//   timestamp: string;
// }

export interface Message {
  id: string;
  conversationId: string;
  senderType: SenderType;
  content: string;
  timestamp: string; // ✅ Should be string (ISO format)
  metadata?: any;
  conversation?: any;
  character?: any;
  error?: boolean; // ✅ Add optional error flag
}

export interface SendMessageDto {
  content: string;
}

// Quest Types
export enum QuestStatus {
  OFFERED = "offered",
  ACTIVE = "active",
  COMPLETED = "completed",
  FAILED = "failed",
  ABANDONED = "abandoned",
}

export enum QuestDifficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
  LEGENDARY = "legendary",
}

export interface Quest {
  id: string;
  userId: string;
  characterId: string;
  title: string;
  description: string;
  status: QuestStatus;
  difficulty: QuestDifficulty;
  objectives: {
    description: string;
    completed: boolean;
  }[];
  progress: number;
  rewards?: {
    experiencePoints?: number;
    items?: string[];
    title?: string;
  };
  imageUrl?: string;
  completedAt?: string;
  createdAt: string;
  character?: Character;
}

// World State Types
export enum EventSeverity {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  CRITICAL = "critical",
}

export interface WorldEvent {
  createdAt: string | number | Date;
  id: string;
  eventName: string;
  description: string;
  severity: EventSeverity;
  affectedLocations: string[];
  affectedCharacterIds: string[];
  effects?: {
    moodShift?: string;
    behaviorChange?: string;
    knowledgeGained?: string;
  };
  isActive: boolean;
  expiresAt?: string;
  timestamp: string;
}
