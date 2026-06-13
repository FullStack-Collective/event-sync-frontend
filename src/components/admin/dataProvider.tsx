import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const httpClient = (url: string, options: fetchUtils.Options = {}) => {
  const token = localStorage.getItem('admin_token');
  
  options.headers = new Headers(options.headers);
  options.headers.set('Content-Type', 'application/json');
  
  if (token) {
    options.headers.set('Authorization', `Bearer ${token}`);
  }
  
  return fetchUtils.fetchJson(url, options);
};

const convertParams = (params: any) => {
  const { pagination, sort, filter } = params;
  
  const query: any = {};
  
  if (pagination) {
    query.page = pagination.page;
    query.limit = pagination.perPage;
  }
  
  if (sort) {
    query.sortBy = sort.field;
    query.sortOrder = sort.order.toLowerCase();
  }
  
  if (filter) {
    if (filter.q) {
      query.search = filter.q;
    }
    if (filter.title) {
      query.search = filter.title;
    }
    if (filter.name) {
      query.search = filter.name;
    }
    if (filter.status) {
      query.status = filter.status;
    }
  }
  
  return query;
};

export const dataProvider = {
  getList: async (resource: string, params: any) => {
    const query = convertParams(params);
    const queryString = stringify(query);
    const url = `${API_URL}/api/${resource}${queryString ? `?${queryString}` : ''}`;
    
    const response = await httpClient(url);
    
    let data = response.json.data || response.json;
    let total = response.json.total || response.json.pagination?.total || data.length;
    
    if (resource === 'questions') {
      const sessionId = params.filter?.sessionId;
      if (sessionId) {
        const questionsUrl = `${API_URL}/api/questions/sessions/${sessionId}/questions`;
        const questionsResponse = await httpClient(questionsUrl);
        data = questionsResponse.json.data || questionsResponse.json;
        total = data.length;
      }
    }
    
    return {
      data: data.map((item: any) => ({ ...item, id: item.id })),
      total: total,
    };
  },
  
  getOne: async (resource: string, params: any) => {
    const url = `${API_URL}/api/${resource}/${params.id}`;
    const response = await httpClient(url);
    
    let data = response.json.data || response.json;
    
    if (resource === 'sessions' && data.speakers) {
      data = {
        ...data,
        speakers: data.speakers.map((s: any) => s.speaker || s),
      };
    }
    
    return { data: { ...data, id: data.id } };
  },
  
  create: async (resource: string, params: any) => {
    const url = `${API_URL}/api/${resource}`;
    const response = await httpClient(url, {
      method: 'POST',
      body: JSON.stringify(params.data),
    });
    
    const data = response.json.data || response.json;
    return { data: { ...data, id: data.id } };
  },
  
  update: async (resource: string, params: any) => {
    const url = `${API_URL}/api/${resource}/${params.id}`;
    const response = await httpClient(url, {
      method: 'PUT',
      body: JSON.stringify(params.data),
    });
    
    const data = response.json.data || response.json;
    return { data: { ...data, id: data.id } };
  },
  
  delete: async (resource: string, params: any) => {
    const url = `${API_URL}/api/${resource}/${params.id}`;
    await httpClient(url, { method: 'DELETE' });
    return { data: { id: params.id } };
  },
  
  getMany: async (resource: string, params: any) => {
    const query = { id: params.ids };
    const queryString = stringify(query);
    const url = `${API_URL}/api/${resource}?${queryString}`;
    const response = await httpClient(url);
    const data = response.json.data || response.json;
    return { data: data.map((item: any) => ({ ...item, id: item.id })) };
  },
  
  getManyReference: async (resource: string, params: any) => {
    const { target, id, pagination, sort } = params;
    const query: any = { [target]: id };
    
    if (pagination) {
      query.page = pagination.page;
      query.limit = pagination.perPage;
    }
    if (sort) {
      query.sortBy = sort.field;
      query.sortOrder = sort.order.toLowerCase();
    }
    
    const queryString = stringify(query);
    const url = `${API_URL}/api/${resource}?${queryString}`;
    const response = await httpClient(url);
    const data = response.json.data || response.json;
    
    return {
      data: data.map((item: any) => ({ ...item, id: item.id })),
      total: response.json.total || data.length,
    };
  },
  
  updateMany: async (resource: string, params: any) => {
    const promises = params.ids.map((id: number) =>
      httpClient(`${API_URL}/api/${resource}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(params.data),
      })
    );
    await Promise.all(promises);
    return { data: params.ids };
  },
  
  deleteMany: async (resource: string, params: any) => {
    const promises = params.ids.map((id: number) =>
      httpClient(`${API_URL}/api/${resource}/${id}`, { method: 'DELETE' })
    );
    await Promise.all(promises);
    return { data: params.ids };
  },
};