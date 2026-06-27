import { Question, CreateQuestionPayload } from "../types/question.types";
import { apiClient, APIError } from "../../../shared/config/api.config";

export const questionService = {
  async getBySession(sessionId: string): Promise<Question[]> {
    try {
      return await apiClient.get<Question[]>(
        `/api/questions/sessions/${sessionId}/questions`,
      );
    } catch (err: unknown) {
      if (err instanceof APIError && err.status === 403) {
        const payload: any = err.payload;
        if (
          payload &&
          (payload.message === "SESSION_NOT_LIVE" ||
            payload.code === "SESSION_NOT_LIVE")
        ) {
          throw new Error("La session n'est pas active");
        }
      }
      throw err;
    }
  },

  async create(payload: CreateQuestionPayload): Promise<Question> {
    return apiClient.post<Question>(`/api/questions`, payload);
  },

  async upvote(id: string): Promise<Question> {
    return apiClient.put<Question>(`/api/questions/${id}/upvote`);
  },
};
