import { AuthProvider } from "react-admin";
import { API_URL } from "@/lib/httpClient";

export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("token", data.data.token);
      localStorage.setItem("user", JSON.stringify({ email }));
      document.cookie = `admin-token=${data.data.token}; path=/; max-age=86400`;

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(new Error("Invalid credentials"));
    }
  },

  logout: async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        await fetch(`${API_URL}/api/auth/logout`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (error) {
        console.error("Logout error:", error);
      }
    }
    
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    document.cookie = "admin-token=; path=/; max-age=0";
    
    return Promise.resolve();
  },

// src/providers/auth/authProvider.ts (vérifie cette méthode)

checkAuth: async (params: any) => {
  const token = localStorage.getItem("token");
  console.log('🔐 checkAuth - token présent:', !!token);
  
  if (!token) {
    console.log('❌ checkAuth: pas de token');
    return Promise.reject();
  }

  try {
    console.log('🔐 Vérification token auprès du backend...');
    const response = await fetch(`${API_URL}/api/auth/verify`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    console.log('🔐 Réponse vérification:', { ok: response.ok, valid: data.valid });

    if (!response.ok || !data.valid) {
      console.log('❌ checkAuth: token invalide');
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      document.cookie = "admin-token=; path=/; max-age=0";
      return Promise.reject();
    }

    console.log('✅ checkAuth: token valide');
    return Promise.resolve();
  } catch (error) {
    console.error('❌ checkAuth erreur:', error);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    document.cookie = "admin-token=; path=/; max-age=0";
    return Promise.reject();
  }
},

  checkError: async (error: any) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      document.cookie = "admin-token=; path=/; max-age=0";
      return Promise.reject();
    }
    return Promise.resolve();
  },

  getPermissions: async () => {
    const token = localStorage.getItem("token");
    if (!token) return Promise.reject();

    try {
      const response = await fetch(`${API_URL}/api/auth/verify`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      return data.role || "admin";
    } catch {
      return Promise.reject();
    }
  },

  getIdentity: async () => {
    const userStr = localStorage.getItem("user");
    if (!userStr) return Promise.reject();
    
    const user = JSON.parse(userStr);
    return Promise.resolve({ id: user.email, fullName: user.email });
  },
};