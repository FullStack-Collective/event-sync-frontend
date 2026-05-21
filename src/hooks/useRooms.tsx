"use client";

import { useState, useEffect, useCallback } from "react";
import { roomApi } from "@/lib/api";
import { Room } from "@/types";

export function useRooms() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRooms = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await roomApi.getAll();
      if (response.success && response.data) {
        setRooms(response.data);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err) || "Erreur lors du chargement des salles");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  return { rooms, isLoading, error, refetch: fetchRooms };
}