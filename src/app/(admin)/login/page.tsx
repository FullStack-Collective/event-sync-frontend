// src/app/admin/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authProvider } from '@/lib/admin/authProvider';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await authProvider.login({ email, password });
      router.push('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg">
      <div className="card p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-sage rounded-2xl rotate-45 mx-auto mb-4" />
          <h1 className="text-2xl font-display font-bold text-gradient-primary">
            Admin Access
          </h1>
          <p className="text-text-muted text-sm mt-2">
            Enter your credentials to access the dashboard
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-text text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-bg-surface border border-border text-text focus:border-primary focus:outline-none transition-colors"
              placeholder="admin@eventsync.com"
              required
              disabled={loading}
            />
          </div>
          
          <div>
            <label className="block text-text text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-bg-surface border border-border text-text focus:border-primary focus:outline-none transition-colors"
              placeholder="••••••••"
              required
              disabled={loading}
            />
          </div>
          
          {error && (
            <div className="bg-error/10 border border-error/20 rounded-lg p-3">
              <p className="text-error text-sm text-center">{error}</p>
            </div>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-2 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Connecting...
              </>
            ) : (
              'Access Dashboard'
            )}
          </button>
        </form>
        
        <div className="mt-6 pt-6 border-t border-border text-center">
          <p className="text-text-muted text-xs">
            Secure administrator area. Unauthorized access is prohibited.
          </p>
        </div>
      </div>
    </div>
  );
}