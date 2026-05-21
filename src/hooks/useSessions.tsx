"use client";

import { useState, useEffect, useCallback } from "react";
import { sessionApi } from "@/lib/api";
import { Session } from "@/types";

export function useSessions(eventId?: number) {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSessions = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      let response;
      if (eventId) {
        response = await sessionApi.getByEvent(eventId);
      } else {
        response = await sessionApi.getAll();
      }

      if (response.success && response.data) {
        // Enrichir avec isLive côté client (backup)
        const enriched = response.data.map((session) => ({
          ...session,
          isLive:
            session.isLive ??
            isSessionLive(session.startTime, session.endTime),
        }));
        setSessions(enriched);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err) || "Erreur lors du chargement des sessions");
    } finally {
      setIsLoading(false);
    }
  }, [eventId]);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  // Rafraîchir le statut live toutes les 60 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setSessions((prev) =>
        prev.map((s) => ({
          ...s,
          isLive: isSessionLive(s.startTime, s.endTime),
        }))
      );
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return { sessions, isLoading, error, refetch: fetchSessions };
}

export function useSession(id: number) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchSession = async () => {
      setIsLoading(true);
      try {
        const response = await sessionApi.getById(id);
        if (response.success && response.data) {
          setSession({
            ...response.data,
            isLive:
              response.data.isLive ??
              isSessionLive(response.data.startTime, response.data.endTime),
          });
        }
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setIsLoading(false);
      }
    };

    fetchSession();
  }, [id]);

  return { session, isLoading, error };
}

// Helper local
function isSessionLive(startTime: string, endTime: string): boolean {
  const now = new Date();
  const start = new Date(startTime);
  const end = new Date(endTime);
  return now >= start && now <= end;
}