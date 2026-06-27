


import { Session } from "../types/session.type";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ??
  "http://localhost:5000";
const API_URL = `${API_BASE}/api`;

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const msg = await res.text().catch(() => "");
    throw new Error(msg || `Request failed (${res.status})`);
  }
  const json = await res.json();
  // tolère { data: ... } ou la valeur brute
  return (json?.data ?? json) as T;
}

export const sessionService = {
  async getOne(sessionId: string, eventId?: string): Promise<Session> {
    const endpoint = eventId
      ? `${API_URL}/events/${eventId}/sessions/${sessionId}`
      : `${API_URL}/sessions/${sessionId}`;
    const res = await fetch(endpoint, { cache: "no-store" });
    return handle<Session>(res);
  },

  async getByEvent(eventId: string | number): Promise<Session[]> {
    const res = await fetch(`${API_URL}/sessions/event/${eventId}`, {
      cache: "no-store",
    });
    const data = await handle<Session[] | { sessions: Session[] }>(res);
    return Array.isArray(data) ? data : (data?.sessions ?? []);
  },
};
