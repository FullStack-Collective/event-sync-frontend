"use client";

import { useState, useEffect, useCallback } from "react";
import { questionApi } from "@/lib/api";
import { Question } from "@/types";

export function useQuestions(sessionId: number) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(false);

  const fetchQuestions = useCallback(async () => {
    if (!sessionId) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await questionApi.getBySession(sessionId);
      // Trier par upvotes décroissant
      const sorted = [...data].sort((a, b) => b.upvotes - a.upvotes);
      setQuestions(sorted);
      setIsLive(true);
    } catch (err: unknown) {
      const status =
        typeof err === "object" && err !== null && "status" in err
          ? (err as { status?: number }).status
          : undefined;

      if (status === 403) {
        setError("La session n'est pas en direct. Les questions ne sont disponibles que pendant les sessions live.");
        setIsLive(false);
      } else {
        setError(err instanceof Error ? err.message : String(err) || "Erreur lors du chargement des questions");
      }
    } finally {
      setIsLoading(false);
    }
  }, [sessionId]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  // Polling toutes les 10 secondes pendant les sessions live
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(fetchQuestions, 10000);
    return () => clearInterval(interval);
  }, [isLive, fetchQuestions]);

  const createQuestion = useCallback(
    async (content: string, authorName?: string) => {
      try {
        const response = await questionApi.create(content, sessionId, authorName);
        if (response.success && response.data) {
          setQuestions((prev) =>
            [...prev, response.data!].sort((a, b) => b.upvotes - a.upvotes)
          );
        }
        return response.data;
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : String(err) || "Erreur lors de la création de la question");
        throw err;
      }
    },
    [sessionId]
  );

  const upvoteQuestion = useCallback(async (questionId: number) => {
    try {
      const response = await questionApi.upvote(questionId);
      if (response.success && response.data) {
        setQuestions((prev) =>
          prev
            .map((q) => (q.id === questionId ? { ...q, upvotes: q.upvotes + 1 } : q))
            .sort((a, b) => b.upvotes - a.upvotes)
        );
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err) || "Erreur lors du vote de la question");
    }
  }, []);

  return {
    questions,
    isLoading,
    error,
    isLive,
    createQuestion,
    upvoteQuestion,
    refetch: fetchQuestions,
  };
}