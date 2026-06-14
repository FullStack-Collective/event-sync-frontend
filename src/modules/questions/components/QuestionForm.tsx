"use client";

import { useState, FormEvent } from "react";
import { questionService } from "../services/question.service";
import { Question } from "../types/question.types";

interface Props {
  sessionId: string;
  onCreated: (q: Question) => void;
}

export function QuestionForm({ sessionId, onCreated }: Props) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = content.trim();
    if (trimmed.length < 3 || trimmed.length > 500) {
      setError("Entre 3 et 500 caractères.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const q = await questionService.create({ sessionId, content: trimmed });
      onCreated(q);
      setContent("");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-stretch gap-2">
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Posez votre question…"
        maxLength={500}
        className="flex-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2.5 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-dim)] focus:outline-none focus:border-[var(--color-mint-500)] transition"
        disabled={loading}
      />
      <button
        type="submit"
        disabled={loading || !content.trim()}
        className="px-4 py-2.5 rounded-lg bg-[var(--color-sage-500)] hover:bg-[var(--color-sage-400)] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium transition flex items-center gap-1"
      >
        {loading ? "…" : "→"}
      </button>
      {error && (
        <p className="text-xs text-[var(--color-ochre-500)] absolute -bottom-5">
          {error}
        </p>
      )}
    </form>
  );
}
