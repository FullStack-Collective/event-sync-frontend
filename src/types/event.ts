import { z } from 'zod';

// Types de base
export interface Event {
  id: number;
  title: string;
  description: string | null;
  startDate: string;
  endDate: string;
  location: string | null;
  bannerUrl: string | null;
  createdAt: string;
  updatedAt: string;
  isLive: boolean;
  isUpcoming: boolean;
  isPast: boolean;
  totalSessions: number;
  totalQuestions: number;
  sessions?: Session[];
}

export interface Session {
  id: number;
  title: string;
  description: string | null;
  startTime: string;
  endTime: string;
  roomId: number;
  eventId: number;
  isLive: boolean;
  questionsCount: number;
  totalUpvotes: number;
  room?: Room;
  speakers?: Speaker[];
  questions?: Question[];
}

export interface Speaker {
  id: number;
  name: string;
  photoUrl: string | null;
  bio: string | null;
}

export interface Room {
  id: number;
  name: string;
  capacity: number | null;
}

export interface Question {
  id: number;
  content: string;
  authorName: string | null;
  upvotes: number;
  createdAt: string;
}

// Schémas Zod pour validation
export const EventSchema = z.object({
  id: z.number(),
  title: z.string().min(3).max(200),
  description: z.string().nullable(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  location: z.string().nullable(),
  bannerUrl: z.string().url().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  isLive: z.boolean(),
  isUpcoming: z.boolean(),
  isPast: z.boolean(),
  totalSessions: z.number(),
  totalQuestions: z.number(),
});

export const EventListResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(EventSchema),
  pagination: z.object({
    page: z.number(),
    limit: z.number(),
    total: z.number(),
    totalPages: z.number(),
    hasNextPage: z.boolean(),
    hasPrevPage: z.boolean(),
  }),
});

// Types inférés des schémas
export type EventListResponse = z.infer<typeof EventListResponseSchema>;