import { z } from 'zod';

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "L'email est requis." })
    .trim() // Supprime les espaces accidentels avant/après
    .toLowerCase() // Normalise pour éviter les conflits de casse (ex: Admin@ vs admin@)
    .pipe(
      z.string().email({ message: "Format de l'email invalide." })
    ),
  password: z
    .string()
    .min(6, { message: "Le mot de passe doit contenir au moins 6 caractères." })
});

export type LoginInput = z.infer<typeof LoginSchema>;