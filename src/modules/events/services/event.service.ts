import { apiClient } from '@/shared/config/api.config';
import { Event, EventListResponse } from '@/types/event';

export interface GetEventsParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: 'upcoming' | 'past' | 'all';
  sortBy?: 'startDate' | 'title' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

export const eventService = {
  
  getAll: async (params: GetEventsParams = {}): Promise<EventListResponse> => {
    const queryParams = new URLSearchParams();
    
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.search) queryParams.append('search', params.search);
    if (params.status) queryParams.append('status', params.status);
    if (params.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);
    
    const url = `/api/events${queryParams.toString() ? `?${queryParams}` : ''}`;
    const response = await apiClient.get<EventListResponse>(url);

    return response;
  },


  getById: async (id: number): Promise<{ success: boolean; data: Event }> => {
    return apiClient.get<{ success: boolean; data: Event }>(`/api/events/${id}`);
  },

 
  getUpcoming: async (limit: number = 5): Promise<{ success: boolean; data: Event[]; count: number }> => {
    return apiClient.get<{ success: boolean; data: Event[]; count: number }>(`/api/events/upcoming?limit=${limit}`);
  },
 
  getCurrentLive: async (eventId: number): Promise<EventCurrentLiveResponse> => {
    return apiClient.get<EventCurrentLiveResponse>(`/api/events/${eventId}/live`);
  },
};

export interface EventCurrentLiveResponse {
  success: boolean;
  data: Record<string, unknown> | null;
  isLive?: boolean;
  message?: string;
}
