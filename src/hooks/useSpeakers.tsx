"use client";

import { useState, useEffect, useCallback } from "react";
import { speakerApi } from "@/lib/api";
import { Session, Speaker } from "@/types";

export function useSpeakers() {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSpeakers = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await speakerApi.getAll();
      if (Array.isArray(response)) {
        // Le backend retourne directement le tableau pour speakers
        setSpeakers(response);
      } else if (response.success && response.data) {
        setSpeakers(response.data as Speaker[]);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err) || "Erreur lors du chargement des intervenants");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSpeakers();
  }, [fetchSpeakers]);

  return { speakers, isLoading, error, refetch: fetchSpeakers };
}

export function useSpeaker(id: number) {
  const [speaker, setSpeaker] = useState<Speaker | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchSpeaker = async () => {
      setIsLoading(true);
      try {
        const [speakerRes, sessionsRes] = await Promise.all([
          speakerApi.getById(id),
          speakerApi.getSessions(id),
        ]);

        if (speakerRes.success && speakerRes.data) {
          setSpeaker(speakerRes.data);
        }
        if (sessionsRes.success && sessionsRes.data) {
          setSessions(sessionsRes.data);
        }
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setIsLoading(false);
      }
    };

    fetchSpeaker();
  }, [id]);

  return { speaker, sessions, isLoading, error };
}