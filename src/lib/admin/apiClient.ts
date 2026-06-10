import { fetchUtils } from 'react-admin';
import { getAdminToken, saveAdminToken, removeAdminToken } from './authUtils';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const httpClient = (url: string, options: fetchUtils.Options = {}) => {
  const token = getAdminToken();
  
  if (token) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  
  return fetchUtils.fetchJson(url, options);
};

export const dataProvider = {
  getList: async (resource: string, params: any) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const filter = params.filter;
    
    let url = `${API_URL}/api/${resource}?page=${page}&limit=${perPage}`;
    
    if (field && order) {
      url += `&sortBy=${field}&sortOrder=${order.toLowerCase()}`;
    }
    
    // Gestion des filtres spécifiques
    if (filter.status) {
      url += `&status=${filter.status}`;
    }
    if (filter.search) {
      url += `&search=${filter.search}`;
    }
    
    const { json } = await httpClient(url);
    
    // Adaptation de la réponse pour React Admin
    return {
      data: json.data.map((item: any) => ({ id: item.id, ...item })),
      total: json.pagination?.total || json.data?.length || 0,
    };
  },
  
  getOne: async (resource: string, params: any) => {
    const { json } = await httpClient(`${API_URL}/api/${resource}/${params.id}`);
    return { data: { id: json.data.id, ...json.data } };
  },
  
  create: async (resource: string, params: any) => {
    const { json } = await httpClient(`${API_URL}/api/${resource}`, {
      method: 'POST',
      body: JSON.stringify(params.data),
    });
    return { data: { id: json.data.id, ...json.data } };
  },
  
  update: async (resource: string, params: any) => {
    const { json } = await httpClient(`${API_URL}/api/${resource}/${params.id}`, {
      method: 'PUT',
      body: JSON.stringify(params.data),
    });
    return { data: { id: json.data.id, ...json.data } };
  },
  
  delete: async (resource: string, params: any) => {
    await httpClient(`${API_URL}/api/${resource}/${params.id}`, {
      method: 'DELETE',
    });
    return { data: { id: params.id } };
  },
};