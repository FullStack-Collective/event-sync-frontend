export interface Question {
  id: string;
  sessionId: string;
  content: string;
  upvotes: number;
  authorName?: string;
  createdAt: string;
}

export interface CreateQuestionPayload {
  sessionId: string;
  content: string;
  authorName?: string;
}
