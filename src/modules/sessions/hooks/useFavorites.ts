"use client";

import { useState, useEffect, useCallback } from "react";
import type { Session } from "../types/session.type";

const STORAGE_KEY = "eventsync_favorite_sessions";

function readStorage(): Session[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function writeStorage(sessions: Session[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<Session[]>([]);

  useEffect(() => {
    setFavorites(readStorage());
  }, []);

  const isFavorite = useCallback(
    (sessionId: string) => favorites.some((s) => s.id === sessionId),
    [favorites]
  );

  const toggleFavorite = useCallback((session: Session) => {
    setFavorites((prev) => {
      const exists = prev.some((s) => s.id === session.id);
      const next = exists
        ? prev.filter((s) => s.id !== session.id)
        : [...prev, session];
      writeStorage(next);
      return next;
    });
  }, []);

  const removeFavorite = useCallback((sessionId: string) => {
    setFavorites((prev) => {
      const next = prev.filter((s) => s.id !== sessionId);
      writeStorage(next);
      return next;
    });
  }, []);

  return { favorites, isFavorite, toggleFavorite, removeFavorite };
}