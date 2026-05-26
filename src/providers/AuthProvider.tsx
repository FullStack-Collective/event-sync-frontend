// src/providers/AuthProvider.tsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAdmin: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    setIsAdmin(!!token);
    setIsLoading(false);
  }, []);

  const login = (token: string) => {
    localStorage.setItem('admin_token', token);
    document.cookie = `admin_token=${token}; path=/; max-age=86400; SameSite=Strict; Secure`;
    setIsAdmin(true);
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    setIsAdmin(false);
    window.location.href = '/'; 
  };

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth doit être utilisé dans AuthProvider');
  return context;
};