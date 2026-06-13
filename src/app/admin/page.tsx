// src/app/admin/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();
  
  useEffect(() => {
    // Rediriger vers l'application React Admin
    // On utilise window.location pour éviter les conflits de routing
    window.location.href = '/admin/dashboard';
  }, [router]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-sage">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-text-muted">Redirection vers l'administration...</p>
      </div>
    </div>
  );
}