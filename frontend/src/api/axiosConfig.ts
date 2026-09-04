import axios from 'axios';

/**
 * Instancia global de Axios para Agrosoft.
 *
 * En DESARROLLO se conecta directamente al backend NestJS en http://localhost:3000
 * CORS está habilitado en el backend para permitir estas conexiones.
 *
 * En PRODUCCIÓN se usa la variable de entorno VITE_API_URL.
 * Si no está definida, cae al backend en producción.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3000',
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

/* ── Interceptor de REQUEST ────────────────────────────────── */
// Adjunta el token JWT si existe en localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* ── Interceptor de RESPONSE ───────────────────────────────── */
// Manejo centralizado de errores HTTP
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado → limpiar sesión
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
