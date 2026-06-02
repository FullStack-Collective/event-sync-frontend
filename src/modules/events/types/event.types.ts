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
  speakers?: SessionSpeaker[];
  questions?: Question[];
}

export interface SessionSpeaker {
  id: number;
  speaker: Speaker;
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

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface EventListResponse {
  success: boolean;
  data: Event[];
  pagination: Pagination;
}

export interface EventDetailResponse {
  success: boolean;
  data: Event;
}

export interface GetEventsParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: 'upcoming' | 'past';
  sortBy?: 'startDate' | 'title' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}