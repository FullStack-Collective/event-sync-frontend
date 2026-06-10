import { Question, CreateQuestionPayload } from "../types/question.types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

export const questionService = {
  async getBySession(sessionId: string): Promise<Question[]> {
    const res = await fetch(
      `${API_URL}/questions/sessions/${sessionId}/questions`,
      { cache: "no-store" }
    );
    if (!res.ok) throw new Error("Impossible de charger les questions");
    return res.json();
  },

  async create(payload: CreateQuestionPayload): Promise<Question> {
    const res = await fetch(`${API_URL}/questions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Erreur lors de l'envoi de la question");
    return res.json();
  },

  async upvote(id: string): Promise<Question> {
    const res = await fetch(`${API_URL}/questions/${id}/upvote`, {
      method: "PUT",
    });
    if (!res.ok) throw new Error("Erreur lors de l'upvote");
    return res.json();
  },
};
