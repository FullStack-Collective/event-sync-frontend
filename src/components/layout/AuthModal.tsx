"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      onClose();
    } catch {
      // Error géré par le hook
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="rounded-2xl p-8 w-full max-w-md bg-es-bg2 border border-white/[0.06] shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-display text-xl font-bold">Espace Admin</h2>
          <button onClick={onClose} className="text-es-text-muted hover:text-white transition-colors">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-sm text-es-text-muted mb-1 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-[10px] p-3 text-sm bg-es-bg3 border border-white/[0.06] text-white placeholder:text-es-text-dim outline-none focus:border-violet-500/50"
              placeholder="admin@eventsync.com"
              required
            />
          </div>

          <div>
            <label className="text-sm text-es-text-muted mb-1 block">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-[10px] p-3 text-sm bg-es-bg3 border border-white/[0.06] text-white placeholder:text-es-text-dim outline-none focus:border-violet-500/50"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <p className="text-sm text-red-400 bg-red-500/10 p-3 rounded-lg">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={cn(
              "w-full rounded-[10px] py-3 text-sm font-semibold text-white transition-all",
              isLoading ? "opacity-50 cursor-not-allowed" : "hover:opacity-90 hover:-translate-y-px"
            )}
            style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)" }}
          >
            {isLoading ? "Connexion..." : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
}