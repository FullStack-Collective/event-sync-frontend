"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { questionService } from "../services/question.service";
import { Question } from "../types/question.types";
import { QuestionItem } from "./QuestionItem";
import { QuestionForm } from "./QuestionForm";

interface Props {
  sessionId: string;
  pollIntervalMs?: number;
}

export function QuestionList({ sessionId, pollIntervalMs = 5000 }: Props) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isMounted = useRef(true);

  const fetchQuestions = useCallback(async () => {
    try {
      const data = await questionService.getBySession(sessionId);
      if (!isMounted.current) return;
      // Tri par upvotes desc
      setQuestions([...data].sort((a, b) => b.upvotes - a.upvotes));
      setError(null);
    } catch (err) {
      if (isMounted.current) setError((err as Error).message);
    } finally {
      if (isMounted.current) setLoading(false);
    }
  }, [sessionId]);

  // Polling
  useEffect(() => {
    isMounted.current = true;
    fetchQuestions();
    const interval = setInterval(fetchQuestions, pollIntervalMs);
    return () => {
      isMounted.current = false;
      clearInterval(interval);
    };
  }, [fetchQuestions, pollIntervalMs]);

  const handleCreated = (q: Question) => {
    setQuestions((prev) => [q, ...prev]);
  };

  const handleUpvoteUpdate = (id: string, newCount: number) => {
    setQuestions((prev) =>
      [...prev]
        .map((q) => (q.id === id ? { ...q, upvotes: newCount } : q))
        .sort((a, b) => b.upvotes - a.upvotes)
    );
  };

  return (
    <div className="flex flex-col h-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-4 min-h-[420px]">
      {/* Liste scrollable */}
      <div className="flex-1 overflow-y-auto pr-1 custom-scroll">
        {loading && questions.length === 0 ? (
          <p className="text-sm text-[var(--color-text-dim)] text-center py-8">
            Chargement…
          </p>
        ) : error ? (
          <p className="text-sm text-[var(--color-ochre-500)] text-center py-8">
            {error}
          </p>
        ) : questions.length === 0 ? (
          <p className="text-sm text-[var(--color-text-dim)] text-center py-8">
            Soyez le premier à poser une question
          </p>
        ) : (
          <ul className="space-y-2">
            {questions.map((q) => (
              <QuestionItem
                key={q.id}
                question={q}
                onUpvoteUpdate={handleUpvoteUpdate}
              />
            ))}
          </ul>
        )}
      </div>

      {/* Formulaire en bas */}
      <div className="mt-4 pt-4 border-t border-[var(--color-border-light)]">
        <QuestionForm sessionId={sessionId} onCreated={handleCreated} />
      </div>
    </div>
  );
}
