import axios from 'axios';

/**
 * Instancia global de Axios para Agrosoft.
 */
const api = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});



export default api;
