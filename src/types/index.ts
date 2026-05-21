// ═══════════════════════════════════════════════════════════════
// TYPES EVENTSYNC — Correspondance avec le backend Prisma
// ═══════════════════════════════════════════════════════════════

export interface Event {
  id: number;
  title: string;
  description: string | null;
  startDate: string; // ISO 8601
  endDate: string;   // ISO 8601
  location: string | null;
  isLive?: boolean;
  isUpcoming?: boolean;
  isPast?: boolean;
  totalSessions?: number;
  totalQuestions?: number;
  sessions?: Session[];
}

export interface Session {
  id: number;
  title: string;
  description: string | null;
  startTime: string; // ISO 8601
  endTime: string;   // ISO 8601
  eventId: number;
  roomId: number;
  isLive?: boolean;
  questionsCount?: number;
  totalUpvotes?: number;
  event?: Event;
  room?: Room;
  speakers?: SessionSpeaker[];
  questions?: Question[];
}

export interface Room {
  id: number;
  name: string;
  capacity: number | null;
  sessions?: Session[];
}

export interface Speaker {
  id: number;
  name: string;
  photoUrl: string | null;
  bio: string | null;
  twitter: string | null;
  linkedin: string | null;
  website: string | null;
  facebook: string | null;
  sessions?: SessionSpeaker[];
}

export interface SessionSpeaker {
  sessionId: number;
  speakerId: number;
  session?: Session;
  speaker?: Speaker;
}

export interface Question {
  id: number;
  content: string;
  authorName: string | null;
  upvotes: number;
  sessionId: number;
  createdAt: string; // ISO 8601
  session?: Session;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  pagination?: Pagination;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface AuthUser {
  id: number;
  email: string;
  role: string;
  name: string;
}

export interface LoginResponse {
  token: string;
  user: AuthUser;
  expiresIn: string;
}

export interface VerifyResponse {
  valid: boolean;
  user?: AuthUser;
}

export interface FavItem {
  id: number;
  time: string;
  title: string;
  room: string;
  speakers: string[];
  live?: boolean;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
  color: "violet" | "cyan" | "pink" | "gold" | "live";
}