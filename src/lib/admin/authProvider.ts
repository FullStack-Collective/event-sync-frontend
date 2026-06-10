import { AuthProvider } from 'react-admin';
import { 
  saveAdminToken, 
  removeAdminToken, 
  saveAdminUser, 
  getAdminUser,
  isAuthenticated,
  getAdminToken 
} from './authUtils';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Login failed');
      }
      
      saveAdminToken(data.data.token);
      saveAdminUser({ email, token: data.data.token });
      
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(new Error('Invalid email or password'));
    }
  },
  
  logout: async () => {
    try {
      const token = localStorage.getItem('admin_token');
      if (token) {
        await fetch(`${API_URL}/api/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
      }
    } catch (error) {
    } finally {
      removeAdminToken();
    }
    return Promise.resolve();
  },
  
  checkAuth: async () => {
    if (!isAuthenticated()) {
      return Promise.reject();
    }
    
    try {
      const token = getAdminToken();
      const response = await fetch(`${API_URL}/api/auth/verify`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        removeAdminToken();
        return Promise.reject();
      }
      
      return Promise.resolve();
    } catch {
      return Promise.resolve();
    }
  },
  
  checkError: (error: any) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      removeAdminToken();
      return Promise.reject();
    }
    return Promise.resolve();
  },
  
  getPermissions: async () => {
    return Promise.resolve('admin');
  },
  
  getIdentity: async () => {
    const user = getAdminUser();
    return Promise.resolve({
      id: user?.email || 'admin',
      fullName: 'Administrator',
      avatar: undefined,
    });
  },
};