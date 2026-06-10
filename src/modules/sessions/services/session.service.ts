import { Session } from "../types/session.type";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

export const sessionService = {
  async getOne(sessionId: string): Promise<Session> {
    const res = await fetch(`${API_URL}/sessions/${sessionId}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Session introuvable");
    return res.json();
  },
};
