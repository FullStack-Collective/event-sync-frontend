"use client";

import { useState } from "react";
import { LiveBadge } from "@/components/ui/LiveBadge";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { useQuestions } from "@/hooks/useQuestions";
import { formatTime } from "@/lib/utils";

interface QASystemProps {
  sessionId: number;
  isLive: boolean;
}

export function QASystem({ sessionId, isLive }: QASystemProps) {
  const { questions, isLoading, error, isLive: qaLive, createQuestion, upvoteQuestion } = useQuestions(sessionId);
  const [qaText, setQaText] = useState("");
  const [qaName, setQaName] = useState("");

  const handleSubmit = async () => {
    const text = qaText.trim();
    const name = qaName.trim() || "Anonyme";
    if (!text) return;

    try {
      await createQuestion(text, name);
      setQaText("");
      setQaName("");
    } catch {
      // Error géré par le hook
    }
  };

  if (!isLive || !qaLive) {
    return (
      <div className="rounded-[20px] p-7 sticky top-[90px] bg-es-bg2 border border-white/[0.06]">
        <div className="text-center py-10 text-es-text-muted">
          <p className="mb-2">⏱ Q&A non disponible</p>
          <p className="text-sm text-es-text-dim">
            Les questions ne sont accessibles que pendant les sessions en direct.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[20px] p-7 sticky top-[90px] bg-es-bg2 border border-white/[0.06]">
      <div className="font-display text-base font-bold mb-5 flex items-center gap-2.5">
        💬 Questions & Réponses
        <LiveBadge />
      </div>

      <div className="mb-6">
        <textarea
          value={qaText}
          onChange={(e) => setQaText(e.target.value)}
          placeholder="Posez votre question à l'intervenant..."
          className="w-full rounded-[10px] p-3 px-4 text-sm outline-none transition-colors duration-200 focus:border-violet-500/50 resize-y min-h-[80px] mb-2.5 bg-es-bg3 border border-white/[0.06] text-white placeholder:text-es-text-dim"
        />
        <input
          type="text"
          value={qaName}
          onChange={(e) => setQaName(e.target.value)}
          placeholder="Votre nom (optionnel — anonyme possible)"
          className="w-full rounded-[10px] p-3 px-4 text-sm outline-none transition-colors duration-200 focus:border-violet-500/50 h-10 mb-2.5 bg-es-bg3 border border-white/[0.06] text-white placeholder:text-es-text-dim"
        />
        <button
          onClick={handleSubmit}
          className="w-full rounded-[10px] py-3 text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 hover:-translate-y-px"
          style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)" }}
        >
          Envoyer la question →
        </button>
      </div>

      <div className="text-xs mb-3 flex items-center gap-1.5 text-es-text-muted">
        🔺 Triées par upvotes · {questions.length} question{questions.length !== 1 ? "s" : ""}
      </div>

      {isLoading && questions.length === 0 ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : (
        <div className="flex flex-col gap-3 max-h-[380px] overflow-y-auto pr-1">
          {questions.map((q) => (
            <div
              key={q.id}
              className="rounded-[10px] p-3.5 transition-colors duration-200 hover:border-violet-500/20 animate-slideIn bg-es-bg3 border border-white/[0.06]"
            >
              <div className="text-sm mb-2.5 leading-relaxed">{q.content}</div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-es-text-dim">
                  — {q.authorName || "Anonyme"} · {formatTime(q.createdAt)}
                </span>
                <button
                  onClick={() => upvoteQuestion(q.id)}
                  className="flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold transition-all duration-200 hover:scale-105 bg-violet-500/10 border border-violet-500/20 hover:bg-violet-500/20"
                  style={{ color: "#a855f7" }}
                >
                  🔺 {q.upvotes}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}