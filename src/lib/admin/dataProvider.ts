import { fetchUtils } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import { getAdminToken } from './authUtils';

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

const baseDataProvider = simpleRestProvider(API_URL, httpClient);

export const dataProvider = {
  ...baseDataProvider,
  
  getList: async (resource: string, params: any) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const filter = params.filter;
    
    let url = `${API_URL}/api/${resource}`;
    const queryParams = new URLSearchParams();
    
    queryParams.append('page', page.toString());
    queryParams.append('limit', perPage.toString());
    
    if (field && order) {
      queryParams.append('sortBy', field);
      queryParams.append('sortOrder', order.toLowerCase());
    }

    if (filter.status) {
      queryParams.append('status', filter.status);
    }
    if (filter.search) {
      queryParams.append('search', filter.search);
    }
    if (filter.eventId) {
      queryParams.append('eventId', filter.eventId);
    }
    
    const queryString = queryParams.toString();
    const finalUrl = `${url}${queryString ? `?${queryString}` : ''}`;
    
    const { json } = await httpClient(finalUrl);
    
    return {
      data: json.data.map((item: any) => ({ id: item.id, ...item })),
      total: json.pagination?.total || json.data?.length || 0,
    };
  },
  
  getOne: async (resource: string, params: any) => {
    const { json } = await httpClient(`${API_URL}/api/${resource}/${params.id}`);
    return {
      data: { id: json.data.id, ...json.data }
    };
  },
  
  create: async (resource: string, params: any) => {
    const { json } = await httpClient(`${API_URL}/api/${resource}`, {
      method: 'POST',
      body: JSON.stringify(params.data),
    });
    return {
      data: { id: json.data.id, ...json.data }
    };
  },
  
  update: async (resource: string, params: any) => {
    const { json } = await httpClient(`${API_URL}/api/${resource}/${params.id}`, {
      method: 'PUT',
      body: JSON.stringify(params.data),
    });
    return {
      data: { id: json.data.id, ...json.data }
    };
  },
  
  delete: async (resource: string, params: any) => {
    await httpClient(`${API_URL}/api/${resource}/${params.id}`, {
      method: 'DELETE',
    });
    return {
      data: { id: params.id }
    };
  },
  
  getMany: async (resource: string, params: any) => {
    const { ids } = params;
    const promises = ids.map((id: any) => 
      httpClient(`${API_URL}/api/${resource}/${id}`).then(({ json }) => ({
        id: json.data.id,
        ...json.data
      }))
    );
    const data = await Promise.all(promises);
    return { data };
  },
  
  getManyReference: async (resource: string, params: any) => {
    const { target, id, pagination, sort } = params;
    const { page, perPage } = pagination;
    const { field, order } = sort;
    
    let url = `${API_URL}/api/${resource}?${target}=${id}&page=${page}&limit=${perPage}`;
    
    if (field && order) {
      url += `&sortBy=${field}&sortOrder=${order.toLowerCase()}`;
    }
    
    const { json } = await httpClient(url);
    
    return {
      data: json.data.map((item: any) => ({ id: item.id, ...item })),
      total: json.pagination?.total || json.data?.length || 0,
    };
  },
  
  updateMany: async (resource: string, params: any) => {
    const { ids, data } = params;
    const promises = ids.map((id: any) =>
      httpClient(`${API_URL}/api/${resource}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      })
    );
    await Promise.all(promises);
    return { data: ids };
  },
  
  deleteMany: async (resource: string, params: any) => {
    const { ids } = params;
    const promises = ids.map((id: any) =>
      httpClient(`${API_URL}/api/${resource}/${id}`, {
        method: 'DELETE',
      })
    );
    await Promise.all(promises);
    return { data: ids };
  },
};