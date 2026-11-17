// Cambia esta URL al desplegar el frontend en GitHub Pages o Vercel.
const ES_LOCAL = ['localhost', '127.0.0.1'].includes(window.location.hostname);

export const API_URL =
  window.CHUCUA_API_URL ||
  (ES_LOCAL ? 'http://localhost:8000' : 'https://TU-API.onrender.com');

export const CENTRO = [4.6285, -74.1647];
export const ZOOM = 16;

export default { API_URL, CENTRO, ZOOM };
