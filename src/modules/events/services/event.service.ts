import { apiClient } from '@/shared/config/api.config';
import { Event, EventListResponse } from '../types/event.types';

export interface GetEventsParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: 'upcoming' | 'past' | 'all';
  sortBy?: 'startDate' | 'title' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

export const eventService = {
  /**
   * Récupère tous les événements avec pagination
   */
  getAll: async (params: GetEventsParams = {}): Promise<EventListResponse> => {
    const queryParams = new URLSearchParams();

    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.search) queryParams.append('search', params.search);
    if (params.status) queryParams.append('status', params.status);
    if (params.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);

    const url = `/api/events${queryParams.toString() ? `?${queryParams}` : ''}`;
    const response = await apiClient.get(url);

    return {
      success: response.success,
      data: response.data,
      pagination: response.pagination
    };
  },

  getById: async (id: number): Promise<{ success: boolean; data: Event }> => {
    return apiClient.get(`/api/events/${id}`);
  },

  getUpcoming: async (limit: number = 10): Promise<{ success: boolean; data: Event[]; count: number }> => {
    return apiClient.get(`/api/events/upcoming?limit=${limit}`);
  },
};