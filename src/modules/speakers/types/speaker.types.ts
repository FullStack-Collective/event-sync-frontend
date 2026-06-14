import { z } from 'zod';

export const SpeakerSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Le nom est obligatoire"),
  photoUrl: z.string().nullable().optional(), 
  bio: z.string().nullable().optional(),
  twitter: z.string().nullable().optional(),
  linkedin: z.string().nullable().optional(),
  website: z.string().nullable().optional(),
  facebook: z.string().nullable().optional(),
});

export const SpeakerDetailedSchema = SpeakerSchema.extend({
  sessions: z.array(z.any()).default([]), 
});

export const SpeakerArraySchema = z.array(SpeakerSchema);

export type Speaker = z.infer<typeof SpeakerSchema>;
export type SpeakerDetailed = z.infer<typeof SpeakerDetailedSchema>;