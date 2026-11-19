// Cambia esta URL al desplegar el frontend en GitHub Pages o Vercel.
const ES_LOCAL = ['localhost', '127.0.0.1'].includes(window.location.hostname);
const PARAMETROS = new URLSearchParams(window.location.search);

export const API_URL =
  PARAMETROS.get('api') ||
  window.CHUCUA_API_URL ||
  (ES_LOCAL ? 'http://localhost:8000' : 'https://chucua-api.onrender.com');

export const CENTRO = [4.6278, -74.1655];
export const ZOOM = 16;

export default { API_URL, CENTRO, ZOOM };
