import { AuthProvider } from "react-admin";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

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

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(new Error("Invalid credentials"));
    }
  },

  logout: async () => {
    try {
      await fetch(`${API_URL}/api/auth/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    return Promise.resolve();
  },

  checkAuth: async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return Promise.reject();
    }

    try {
      const response = await fetch(`${API_URL}/api/auth/verify`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok || !data.valid) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        return Promise.reject();
      }

      return Promise.resolve();
    } catch (error) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return Promise.reject();
    }
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