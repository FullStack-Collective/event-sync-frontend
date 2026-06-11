"use client";

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { authProvider, rootDataProvider } from "@/providers";

const Admin = dynamic(() => import('react-admin').then(mod => mod.Admin), { ssr: false });
const Resource = dynamic(() => import('react-admin').then(mod => mod.Resource), { ssr: false });
const ListGuesser = dynamic(() => import('react-admin').then(mod => mod.ListGuesser), { ssr: false });
const EditGuesser = dynamic(() => import('react-admin').then(mod => mod.EditGuesser), { ssr: false });
const ShowGuesser = dynamic(() => import('react-admin').then(mod => mod.ShowGuesser), { ssr: false });
const Create = dynamic(() => import('react-admin').then(mod => mod.Create), { ssr: false });

export default function AdminPage() {
  const [isClient, setIsClient] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsClient(true);
    
    const checkAuth = async () => {
      try {
        await authProvider.checkAuth({});
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Auth error:', error);
        window.location.href = '/admin-login';
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  if (!isClient || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-text-muted">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Admin 
      authProvider={authProvider}
      dataProvider={rootDataProvider}
      basename="/admin"
    >
      <Resource 
        name="events" 
        list={ListGuesser} 
        edit={EditGuesser}
        create={Create}
        show={ShowGuesser}
        options={{ label: "📅 Événements" }}
      />
    </Admin>
  );
}