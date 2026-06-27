import { z } from 'zod';

// Supprimons le "/api" ici car il sera ajouté dans les endpoints
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

/**
 * Classe d'erreur personnalisée
 */
export class APIError extends Error {
  status: number;
  payload: unknown;

  constructor(message: string, status: number, payload: unknown = null) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.payload = payload;
  }
}

interface ApiFetchOptions<Schema extends z.ZodTypeAny = z.ZodTypeAny> extends RequestInit {
  schema?: Schema;
}

/**
 * Fetcher universel (Serveur/Client)
 */
export async function apiFetch<T>(
  endpoint: string,
  options: ApiFetchOptions<z.ZodType<T>> = {}
): Promise<T> {
  const { schema, ...fetchOptions } = options;
  
  // Récupération du token si nécessaire
  let token: string | null = null;
  const isServer = typeof window === 'undefined';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isGetRequest = !fetchOptions.method || fetchOptions.method.toUpperCase() === 'GET';

  if (!isServer) {
    token = localStorage.getItem('admin_token');
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
        errorData = { message: "Erreur brute du serveur" };
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
        console.error(`[ZOD VALIDATION ERROR] sur: ${endpoint}`, parseResult.error.format());
        throw new APIError(
          "Les données ne correspondent pas au contrat attendu",
          422,
          parseResult.error.format()
        );
      }
      return parseResult.data;
    }

    return rawData as T;
  } catch (error: unknown) {
    if (error instanceof APIError) throw error;
    throw new APIError(`Erreur réseau : ${ (error as Error).message }`, 503);
  }
}

// Créons un client simple pour les méthodes GET, POST, etc.
export const apiClient = {
  get: <T>(endpoint: string): Promise<T> => apiFetch<T>(endpoint, { method: 'GET' }),
  post: <T>(endpoint: string, data?: any): Promise<T> => apiFetch<T>(endpoint, { method: 'POST', body: JSON.stringify(data) }),
  put: <T>(endpoint: string, data?: any): Promise<T> => apiFetch<T>(endpoint, { method: 'PUT', body: JSON.stringify(data) }),
  delete: <T>(endpoint: string): Promise<T> => apiFetch<T>(endpoint, { method: 'DELETE' }),
};