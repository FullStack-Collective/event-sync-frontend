"use client";

import { useState, useEffect, useCallback } from "react";
import { eventApi } from "@/lib/api";
import { Event, Pagination, Session } from "@/types";

interface UseEventsOptions {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}

export function useEvents(options: UseEventsOptions = {}) {
  const { page = 1, limit = 10, search, status } = options;

  const [events, setEvents] = useState<Event[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: limit,
    totalPages: 1,
    total: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });

  const fetchEvents = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [allResponse, upcomingResponse] = await Promise.all([
        eventApi.getAll({ page, limit, search, status }),
        eventApi.getUpcoming(3),
      ]);

      if (allResponse.success && allResponse.data) {
        setEvents(allResponse.data.data);
        setPagination(allResponse.data.pagination);
      }

      if (upcomingResponse.success && upcomingResponse.data) {
        setUpcomingEvents(upcomingResponse.data);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message || "Erreur lors du chargement des événements");
    } finally {
      setIsLoading(false);
    }
  }, [page, limit, search, status]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return {
    events,
    upcomingEvents,
    isLoading,
    error,
    pagination,
    refetch: fetchEvents,
  };
}

export function useEvent(id: number) {
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchEvent = async () => {
      setIsLoading(true);
      try {
        const response = await eventApi.getById(id);
        if (response.success && response.data) {
          setEvent(response.data);
        }
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  return { event, isLoading, error };
}

export function useLiveSession(eventId: number) {
  const [liveSession, setLiveSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!eventId) return;

    const fetchLive = async () => {
      try {
        const response = await eventApi.getCurrentLive(eventId);
        if (response.success) {
          setLiveSession(response.data ?? null);
        }
      } catch {
        setLiveSession(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLive();
    // Rafraîchir toutes les 30 secondes
    const interval = setInterval(fetchLive, 30000);
    return () => clearInterval(interval);
  }, [eventId]);

  return { liveSession, isLoading };
}
