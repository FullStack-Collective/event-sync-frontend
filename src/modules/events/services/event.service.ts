import { apiFetch } from '@/shared/config/api.config';
import {
  Event,
  EventListResponse,
  EventDetailResponse,
  GetEventsParams,
} from '../types/event.types';

export const eventService = {

  getAll: async (params: GetEventsParams = {}): Promise<EventListResponse> => {
    const query = new URLSearchParams();
    if (params.page)      query.set('page',      String(params.page));
    if (params.limit)     query.set('limit',     String(params.limit));
    if (params.search)    query.set('search',    params.search);
    if (params.status)    query.set('status',    params.status);
    if (params.sortBy)    query.set('sortBy',    params.sortBy);
    if (params.sortOrder) query.set('sortOrder', params.sortOrder);

    const qs = query.toString();
    return apiFetch<EventListResponse>(`/events${qs ? `?${qs}` : ''}`);
  },

  getUpcoming: async (limit = 5): Promise<{ success: boolean; data: Event[]; count: number }> => {
    return apiFetch(`/events/upcoming?limit=${limit}`);
  },

  getById: async (id: number): Promise<EventDetailResponse> => {
    return apiFetch<EventDetailResponse>(`/events/${id}`);
  },

  getLiveSession: async (eventId: number) => {
    return apiFetch(`/events/${eventId}/live`);
  },
};
