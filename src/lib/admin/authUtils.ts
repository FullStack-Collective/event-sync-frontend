const TOKEN_KEY = 'admin_token';
const USER_KEY = 'admin_user';

export const saveAdminToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getAdminToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(TOKEN_KEY);
  }
  return null;
};

export const removeAdminToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const saveAdminUser = (user: any) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getAdminUser = () => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  }
  return null;
};

export const isAuthenticated = (): boolean => {
  return !!getAdminToken();
};