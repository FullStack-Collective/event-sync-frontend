'use client';

import dynamic from 'next/dynamic';

const AdminApp = dynamic(
  () => import('@/components/admin/AdminApp'),
  { 
    ssr: false,
    loading: () => (
      <div className="min-h-screen flex items-center justify-center bg-gradient-sage">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-text-muted">Chargement de l'administration...</p>
        </div>
      </div>
    )
  }
);

export default function AdminDashboardPage() {
  return <AdminApp />;
}