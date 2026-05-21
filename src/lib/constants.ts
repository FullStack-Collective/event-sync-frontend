// ═══════════════════════════════════════════════════════════════
// CONSTANTS — Configuration API + Design System
// ═══════════════════════════════════════════════════════════════

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const THEME = {
  bg: "#06060f",
  bg2: "#0d0d1e",
  bg3: "#111128",
  violet: "#7c3aed",
  violetLight: "#a855f7",
  cyan: "#06b6d4",
  cyanLight: "#67e8f9",
  pink: "#ec4899",
  gold: "#f59e0b",
  text: "#f1f0ff",
  textMuted: "#8b8aaa",
  textDim: "#4a4a6a",
  border: "rgba(124,58,237,0.18)",
  borderLight: "rgba(255,255,255,0.06)",
  live: "#22c55e",
  radius: "16px",
  radiusSm: "10px",
} as const;

export const COLOR_MAP: Record<string, { bg: string; border: string; text: string }> = {
  violet: { bg: "bg-violet-500/20", border: "border-violet-500", text: "text-violet-400" },
  cyan: { bg: "bg-cyan-500/20", border: "border-cyan-500", text: "text-cyan-400" },
  pink: { bg: "bg-pink-500/20", border: "border-pink-500", text: "text-pink-400" },
  gold: { bg: "bg-amber-500/20", border: "border-amber-500", text: "text-amber-400" },
  live: { bg: "bg-green-500/20", border: "border-green-500", text: "text-green-400" },
};

export const ROOM_COLORS: Record<string, string> = {
  "Amphi A": "violet",
  "Innovation": "cyan",
  "Atelier Lab": "pink",
};

export const ENDPOINTS = {
  auth: {
    login: `${API_BASE_URL}/auth/login`,
    logout: `${API_BASE_URL}/auth/logout`,
    verify: `${API_BASE_URL}/auth/verify`,
  },
  events: {
    list: `${API_BASE_URL}/events`,
    upcoming: `${API_BASE_URL}/events/upcoming`,
    detail: (id: number) => `${API_BASE_URL}/events/${id}`,
    live: (id: number) => `${API_BASE_URL}/events/${id}/live`,
  },
  sessions: {
    list: `${API_BASE_URL}/sessions`,
    detail: (id: number) => `${API_BASE_URL}/sessions/${id}`,
    byEvent: (eventId: number) => `${API_BASE_URL}/sessions/event/${eventId}`,
  },
  speakers: {
    list: `${API_BASE_URL}/speakers`,
    detail: (id: number) => `${API_BASE_URL}/speakers/${id}`,
    sessions: (id: number) => `${API_BASE_URL}/speakers/${id}/sessions`,
  },
  rooms: {
    list: `${API_BASE_URL}/rooms`,
    detail: (id: number) => `${API_BASE_URL}/rooms/${id}`,
  },
  questions: {
    bySession: (sessionId: number) => `${API_BASE_URL}/questions/sessions/${sessionId}/questions`,
    create: `${API_BASE_URL}/questions`,
    upvote: (id: number) => `${API_BASE_URL}/questions/${id}/upvote`,
    delete: (id: number) => `${API_BASE_URL}/questions/${id}`,
  },
} as const;