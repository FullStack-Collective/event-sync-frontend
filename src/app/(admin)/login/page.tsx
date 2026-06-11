"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authProvider } from "@/providers/authProvider";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await authProvider.login({ email, password });
      const token = localStorage.getItem("token");
      if (token) {
        document.cookie = `admin-token=${token}; path=/; max-age=86400`;
      }
      router.push("/admin");
    } catch (err) {
      setError("Email ou mot de passe incorrect");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg">
      <div className="card p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-display font-bold text-gradient-primary">
            Admin Login
          </h1>
          <p className="text-text-muted text-sm mt-2">
            Accès réservé aux administrateurs
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
              className="w-full px-4 py-2 bg-bg-surface border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
              placeholder="admin@eventsync.com"
              required
            />
          </div>

          <div>
            <label className="block text-text text-sm font-medium mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-bg-surface border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="bg-error/10 text-error text-sm p-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-2 disabled:opacity-50"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-text-muted text-xs">
            URL privée - Accès restreint
          </p>
        </div>
      </div>
    </div>
  );
}