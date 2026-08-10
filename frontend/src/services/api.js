import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL,
  timeout: 15000,
});

api.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem(
        "adminToken"
      );

    if (token) {
      config.headers =
        config.headers || {};

      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },

  (error) =>
    Promise.reject(error)
);

api.interceptors.response.use(
  (response) =>
    response,

  (error) => {
    const status =
      error.response?.status;

    if (status === 401) {
      localStorage.removeItem(
        "adminToken"
      );

      const isAdminPage =
        window.location.pathname
          .startsWith(
            "/admin"
          );

      const isLoginPage =
        window.location.pathname ===
        "/admin/login";

      if (
        isAdminPage &&
        !isLoginPage
      ) {
        window.location.replace(
          "/admin/login"
        );
      }
    }

    return Promise.reject(error);
  }
);

export default api;