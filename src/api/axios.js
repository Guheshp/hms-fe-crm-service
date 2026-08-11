import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const publicRoutes = [
  "/users/create",
  "/auth/login",
  "/auth/forgot-password",
  "/auth/verify-otp",
  "/auth/reset-password",
  "/onboarding/create",
];

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  const isPublicRoute = publicRoutes.some((route) =>
    config.url.includes(route),
  );

  if (!isPublicRoute && token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);

export default api;
