const API_URL = "http://localhost:5000/api/auth";

export const authService = {
  async login(email, password) {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, error: data.message || "Login failed" };
    }

    // ✅ Store implies backend JWT auth
    localStorage.setItem("token", data.token);
    localStorage.setItem("admin", JSON.stringify(data.admin));

    return { success: true, admin: data.admin };
  },

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
  },

  isAuthenticated() {
    return !!localStorage.getItem("token");
  },

  getToken() {
    return localStorage.getItem("token");
  },

  getCurrentAdmin() {
    const admin = localStorage.getItem("admin");
    return admin ? JSON.parse(admin) : null;
  },
};
