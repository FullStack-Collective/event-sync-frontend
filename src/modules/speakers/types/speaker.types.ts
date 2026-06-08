import { z } from 'zod';

// Schéma de base pour la liste globale
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

const SpeakerSessionSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().nullable().optional(),
  scheduledAt: z.string(), 
  eventId: z.number(),     
});

export const SpeakerDetailedSchema = SpeakerSchema.extend({
  sessions: z.array(SpeakerSessionSchema).default([]),
});

export const SpeakerArraySchema = z.array(SpeakerSchema);

export type Speaker = z.infer<typeof SpeakerSchema>;
export type SpeakerDetailed = z.infer<typeof SpeakerDetailedSchema>;