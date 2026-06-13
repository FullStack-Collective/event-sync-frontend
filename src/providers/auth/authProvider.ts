import { AuthProvider } from 'react-admin';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.success && data.data?.token) {
      localStorage.setItem('admin_token', data.data.token);
      return Promise.resolve();
    }
    
    return Promise.reject(new Error('Identifiants invalides'));
  },

  logout: async () => {
    localStorage.removeItem('admin_token');
    return Promise.resolve();
  },

  checkAuth: async () => {
    const token = localStorage.getItem('admin_token');
    
    if (!token) {
      return Promise.reject();
    }

    try {
      const response = await fetch(`${API_URL}/api/auth/verify`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (response.ok) {
        return Promise.resolve();
      }
      
      localStorage.removeItem('admin_token');
      return Promise.reject();
    } catch {
      return Promise.reject();
    }
  },

  checkError: (error) => {
    if (error.status === 401 || error.status === 403) {
      localStorage.removeItem('admin_token');
      return Promise.reject();
    }
    return Promise.resolve();
  },

  getPermissions: async () => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      return Promise.resolve('admin');
    }
    return Promise.reject();
  },

  getIdentity: async () => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      return Promise.resolve({ id: 'admin', fullName: 'Administrator' });
    }
    return Promise.reject();
  },
};