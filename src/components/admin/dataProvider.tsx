// src/components/admin/dataProvider.ts
import simpleRestProvider from 'ra-data-simple-rest';
import { fetchUtils } from 'react-admin';

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

export const dataProvider = simpleRestProvider(`${API_URL}/api`, httpClient);