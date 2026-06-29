"use client";

import { Heart } from "lucide-react";
import { useFavorites } from "../hooks/useFavorites";
import type { Session } from "../types/session.type";

interface FavoriteButtonProps {
  session: Session;
  className?: string;
}

export function FavoriteButton({ session, className = "" }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(session.id);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(session);
      }}
      aria-label={active ? "Remove from Favorites" : "Add to Favorites"}
      title={active ? "Remove from Favorites" : "Add to Favorites"}
      className={`group flex items-center justify-center w-9 h-9 rounded-full border transition-all duration-200
        ${active
          ? "border-red-400/60 bg-red-500/15 text-red-400 hover:bg-red-500/25"
          : "border-border bg-bg-elevated text-text-dim hover:border-red-400/50 hover:text-red-400 hover:bg-red-500/10"
        } ${className}`}
    >
      <Heart
        className={`w-4 h-4 transition-all duration-200 ${
          active ? "fill-red-400 scale-110" : "group-hover:scale-110"
        }`}
      />
    </button>
  );
}