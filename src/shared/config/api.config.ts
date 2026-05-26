import { z } from 'zod';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

/**
 * Classe d'erreur personnalisée pour centraliser et traiter les retours HTTP invalides.
 */
export class APIError extends Error {
  status: number;
  payload: any;

  constructor(message: string, status: number, payload: any = null) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.payload = payload;
  }
}

/**
 * Options étendues pour apiFetch incluant la validation Zod optionnelle.
 */
interface ApiFetchOptions<Schema extends z.ZodTypeAny = z.ZodTypeAny> extends RequestInit {
  schema?: Schema;
}

/**
 * Fetcher universel (Serveur/Client) avec support optionnel pour la validation Zod.
 */
export async function apiFetch<T>(
  endpoint: string,
  options: ApiFetchOptions<z.ZodType<T>> = {}
): Promise<T> {
  const { schema, ...fetchOptions } = options;
  let token: string | null = null;
  
  const isServer = typeof window === 'undefined';
  const isGetRequest = !fetchOptions.method || fetchOptions.method.toUpperCase() === 'GET';

  if (!isServer) {
    token = localStorage.getItem('admin_token');
  } else if (!isGetRequest || endpoint.startsWith('/admin') || endpoint.startsWith('/auth/me')) {
    try {
      const { cookies } = await import('next/headers');
      const cookieStore = await cookies();
      token = cookieStore.get('admin_token')?.value || null;
    } catch {
      token = null; 
    }
  }

  const headers = new Headers({
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...fetchOptions.headers,
  });

  const config: RequestInit = {
    ...fetchOptions,
    headers,
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);

    if (response.status === 204) return {} as T;

    if (!response.ok) {
      let errorData = null;
      try {
        errorData = await response.json();
      } catch {
        errorData = { message: "Erreur brute du serveur (Impossible de lire le JSON)" };
      }
      throw new APIError(
        errorData?.message || `Échec de la requête : Statut ${response.status}`,
        response.status,
        errorData
      );
    }

    const rawData = await response.json();

    if (schema) {
      const parseResult = schema.safeParse(rawData);
      if (!parseResult.success) {
        console.error(`[ZOD VALIDATION ERROR] sur l'endpoint: ${endpoint}`, parseResult.error.format());
        throw new APIError(
          "Les données renvoyées par le serveur ne correspondent pas au contrat attendu par l'application.",
          422,
          parseResult.error.format()
        );
      }
      return parseResult.data;
    }

    return rawData as T;
  } catch (error: any) {
    if (error instanceof APIError) throw error;
    throw new APIError(`Erreur réseau : ${error.message}`, 503);
  }
}