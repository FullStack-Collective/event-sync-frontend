// src/app/admin/login/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, LogIn } from 'lucide-react';
import Image from "next/image";
import logo from "@/app/(public)/logo/Logo.png";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Rediriger si déjà connecté
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      window.location.href = '/admin/dashboard';
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success && data.data?.token) {
        localStorage.setItem('admin_token', data.data.token);
        document.cookie = `admin_token=${data.data.token}; path=/; max-age=86400`;
        // Utiliser window.location pour une redirection forcée
        window.location.href = '/admin/dashboard';
      } else {
        setError(data.message || 'Email ou mot de passe incorrect');
      }
    } catch (err) {
      console.error('Erreur:', err);
      setError('Erreur de connexion au serveur');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-sage">
      <div className="bg-bg-surface rounded-2xl shadow-2xl p-8 w-full max-w-md border border-border">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center">
            <Image
              src={logo}
              alt="Logo"
              width={150}
              height={75}
            />
          </div>
          <p className="text-text-muted text-sm mt-2">
            Log in to your admin panel
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-text text-sm font-medium mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-bg border border-border rounded-lg focus:outline-none focus:border-primary text-text"
                placeholder="admin@eventsync.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-text text-sm font-medium mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-bg border border-border rounded-lg focus:outline-none focus:border-primary text-text"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {error && (
            <div className="bg-error/10 text-error text-sm p-3 rounded-lg text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                Sign In
                <LogIn className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}