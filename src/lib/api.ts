// ═══════════════════════════════════════════════════════════════
// API SERVICE — Client HTTP pour le backend Express
// ═══════════════════════════════════════════════════════════════

import { ENDPOINTS } from "./constants";
import { ApiResponse, Event, Session, Speaker, Room, Question, LoginResponse, VerifyResponse } from "@/types";

// Remplacement de `any` par un type explicite pour respecter eslint@typescript-eslint/no-explicit-any
// La pagination peut contenir des champs numériques standards, et d'autres clés éventuelles.
type Pagination = {
  page?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
  [key: string]: unknown;
};

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

async function fetcher<T>(url: string, options?: RequestInit): Promise<T> {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...((options?.headers as Record<string, string>) || {}),
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new ApiError(
      response.status,
      errorData.error || errorData.message || `HTTP ${response.status}`
    );
  }

  return response.json();
}

// ═══════════════════════════════════════════════════════════════
// AUTH
// ═══════════════════════════════════════════════════════════════

export const authApi = {
  login: (email: string, password: string) =>
    fetcher<ApiResponse<LoginResponse>>(ENDPOINTS.auth.login, {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  logout: () =>
    fetcher<ApiResponse<{ message: string }>>(ENDPOINTS.auth.logout, {
      method: "POST",
    }),

  verify: () =>
    fetcher<ApiResponse<VerifyResponse>>(ENDPOINTS.auth.verify, {
      method: "GET",
    }),
};

// ═══════════════════════════════════════════════════════════════
// EVENTS
// ═══════════════════════════════════════════════════════════════

export const eventApi = {
  getAll: (params?: { page?: number; limit?: number; search?: string; status?: string }) => {
    const query = new URLSearchParams();
    if (params?.page) query.set("page", String(params.page));
    if (params?.limit) query.set("limit", String(params.limit));
    if (params?.search) query.set("search", params.search);
    if (params?.status) query.set("status", params.status);
    
    const url = `${ENDPOINTS.events.list}?${query.toString()}`;
    return fetcher<ApiResponse<{ data: Event[]; pagination: Pagination }>>(url);
  },

  getUpcoming: (limit?: number) => {
    const query = limit ? `?limit=${limit}` : "";
    return fetcher<ApiResponse<Event[]>>(`${ENDPOINTS.events.upcoming}${query}`);
  },

  getById: (id: number) =>
    fetcher<ApiResponse<Event>>(ENDPOINTS.events.detail(id)),

  getCurrentLive: (id: number) =>
    fetcher<ApiResponse<Session | null>>(ENDPOINTS.events.live(id)),
};

// ═══════════════════════════════════════════════════════════════
// SESSIONS
// ═══════════════════════════════════════════════════════════════

export const sessionApi = {
  getAll: () =>
    fetcher<ApiResponse<Session[]>>(ENDPOINTS.sessions.list),

  getById: (id: number) =>
    fetcher<ApiResponse<Session>>(ENDPOINTS.sessions.detail(id)),

  getByEvent: (eventId: number) =>
    fetcher<ApiResponse<Session[]>>(ENDPOINTS.sessions.byEvent(eventId)),
};

// ═══════════════════════════════════════════════════════════════
// SPEAKERS
// ═══════════════════════════════════════════════════════════════

export const speakerApi = {
  getAll: () =>
    fetcher<ApiResponse<Speaker[]>>(ENDPOINTS.speakers.list),

  getById: (id: number) =>
    fetcher<ApiResponse<Speaker>>(ENDPOINTS.speakers.detail(id)),

  // Le endpoint des sessions du speaker retourne des objets de session.
  getSessions: (id: number) =>
    fetcher<ApiResponse<Session[]>>(ENDPOINTS.speakers.sessions(id)),
};

// ═══════════════════════════════════════════════════════════════
// ROOMS
// ═══════════════════════════════════════════════════════════════

export const roomApi = {
  getAll: () =>
    fetcher<ApiResponse<Room[]>>(ENDPOINTS.rooms.list),

  getById: (id: number) =>
    fetcher<ApiResponse<Room>>(ENDPOINTS.rooms.detail(id)),
};

// ═══════════════════════════════════════════════════════════════
// QUESTIONS
// ═══════════════════════════════════════════════════════════════

export const questionApi = {
  getBySession: (sessionId: number) =>
    fetcher<Question[]>(ENDPOINTS.questions.bySession(sessionId)),

  create: (content: string, sessionId: number, authorName?: string) =>
    fetcher<ApiResponse<Question>>(ENDPOINTS.questions.create, {
      method: "POST",
      body: JSON.stringify({ content, sessionId, authorName }),
    }),

  upvote: (id: number) =>
    fetcher<ApiResponse<Question>>(ENDPOINTS.questions.upvote(id), {
      method: "PUT",
    }),

  delete: (id: number) =>
    fetcher<ApiResponse<void>>(ENDPOINTS.questions.delete(id), {
      method: "DELETE",
    }),
};