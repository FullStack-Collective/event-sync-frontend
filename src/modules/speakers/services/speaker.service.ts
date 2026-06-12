import { apiFetch } from '@/shared/config/api.config';
import { Speaker, SpeakerDetailed, SpeakerArraySchema, SpeakerDetailedSchema } from '../types/speaker.types';

export const SpeakerService = {

  getAll: async (): Promise<Speaker[]> => {
    return apiFetch<Speaker[]>('/api/speakers', {
      schema: SpeakerArraySchema,
      next: { revalidate: 3600 }
    });
  },

  getById: async (id: string): Promise<SpeakerDetailed> => {
    return apiFetch<SpeakerDetailed>(`/api/speakers/${id}`, {
      schema: SpeakerDetailedSchema,
      next: { revalidate: 60 }
    });
  }
};