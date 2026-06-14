"use client";

import { useState } from "react";
import { questionService } from "../services/question.service";

interface Props {
  questionId: string;
  initialCount: number;
  onUpdate: (id: string, newCount: number) => void;
}

export function UpvoteButton({ questionId, initialCount, onUpdate }: Props) {
  const [count, setCount] = useState(initialCount);
  const [voted, setVoted] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(`upvoted_${questionId}`) === "1";
  });
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (voted || loading) return;
    // Mise à jour optimiste
    const optimistic = count + 1;
    setCount(optimistic);
    setVoted(true);
    onUpdate(questionId, optimistic);
    localStorage.setItem(`upvoted_${questionId}`, "1");
    setLoading(true);

    try {
      const updated = await questionService.upvote(questionId);
      setCount(updated.upvotes);
      onUpdate(questionId, updated.upvotes);
    } catch {
      // Rollback
      setCount(count);
      setVoted(false);
      onUpdate(questionId, count);
      localStorage.removeItem(`upvoted_${questionId}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={voted || loading}
      className={`flex flex-col items-center justify-center min-w-[48px] px-2 py-1.5 rounded-lg border transition ${
        voted
          ? "bg-[var(--color-sage-600)] border-[var(--color-mint-500)] text-[var(--color-mint-200)]"
          : "bg-[var(--color-bg)] border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-mint-500)] hover:text-[var(--color-mint-300)]"
      }`}
      aria-label="Upvote"
    >
      <span className="text-xs leading-none">▲</span>
      <span className="text-xs font-semibold mt-0.5">{count}</span>
    </button>
  );
}
