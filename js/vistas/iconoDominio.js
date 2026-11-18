// Formas SVG asociadas a la clave `icono` de cada dominio.
const ICONOS = {
  balon: '<circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 7.2l3.6 2.6-1.4 4.3H9.8L8.4 9.8z" fill="currentColor"/><path d="M12 7.2V3.5M15.6 9.8l3.4-1.1M14.2 14.1l2.1 2.9M9.8 14.1l-2.1 2.9M8.4 9.8L5 8.7" fill="none" stroke="currentColor" stroke-width="1.4"/>',
  libro: '<path d="M4 5.5c2.8-1.2 5.3-1 8 .8 2.7-1.8 5.2-2 8-.8v13.4c-2.8-1.2-5.3-1-8 .8-2.7-1.8-5.2-2-8-.8z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 6.3v13.4" fill="none" stroke="currentColor" stroke-width="1.6"/>',
  via: '<path d="M7 22L10.5 2h3L17 22z" fill="currentColor"/><path d="M12 5.5v2.5M12 11v2.5M12 16.5V19" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/>',
  predio: '<path d="M3 11l9-8 9 8" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M5.5 9.5V21h13V9.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M9.5 21v-5.5h5V21" fill="none" stroke="currentColor" stroke-width="2"/>',
  comunidad: '<circle cx="9" cy="7.5" r="3.2" fill="currentColor"/><circle cx="16.5" cy="9" r="2.4" fill="currentColor"/><path d="M2.5 20c0-3.6 2.9-6.2 6.5-6.2s6.5 2.6 6.5 6.2z" fill="currentColor"/><path d="M15 20c0-2.4 1-4.1 3-4.9 2 .8 3 2.5 3 4.9z" fill="currentColor"/>',
  salud: '<path d="M9.5 3h5v6.5H21v5h-6.5V21h-5v-6.5H3v-5h6.5z" fill="currentColor"/>',
  escudo: '<path d="M12 2.5l8 3v5.8c0 4.9-3.3 8.8-8 10.7-4.7-1.9-8-5.8-8-10.7V5.5z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M8.3 12l2.6 2.6 4.8-5.2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  hoja: '<path d="M4.5 20C4.5 11 10.5 4.5 21 3.5c.5 10.5-6 16.5-16.5 16.5z" fill="currentColor"/><path d="M5 20l9.5-9.5" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/>',
  bus: '<rect x="4" y="3" width="16" height="14" rx="3" fill="currentColor"/><path d="M7 6.5h10V11H7z" fill="#fff"/><circle cx="8" cy="19" r="1.8" fill="currentColor"/><circle cx="16" cy="19" r="1.8" fill="currentColor"/>',
  tienda: '<path d="M3.5 9h17l-1.4-5H4.9z" fill="currentColor"/><path d="M5.5 10v10.5h13V10" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M9.5 20.5V15h5v5.5" fill="none" stroke="currentColor" stroke-width="2"/>',
  paleta: '<path d="M12 3a9 9 0 100 18c2.2 0 3-1.5 2.2-3-.7-1.5.1-2.7 1.8-2.7h1.8A3.2 3.2 0 0021 12a9 9 0 00-9-9z" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="8" cy="9" r="1.4" fill="currentColor"/><circle cx="12" cy="7" r="1.4" fill="currentColor"/><circle cx="15.8" cy="9.5" r="1.4" fill="currentColor"/>',
  rayo: '<path d="M13.5 2L4 14h6.5L10 22l9.8-12h-6.6z" fill="currentColor"/>',
  arbol: '<path d="M12 2l5 6.5h-3l4 6H6l4-6H7z" fill="currentColor"/><path d="M11 14h2v8h-2z" fill="currentColor"/>',
  poblacion: '<path d="M4 21V10h4v11zM10 21V4h4v17zM16 21v-7h4v7z" fill="currentColor"/>',
};

const DEFECTO = '<circle cx="12" cy="12" r="6" fill="currentColor"/>';

function forma(config) {
  return ICONOS[config?.icono] || DEFECTO;
}

export function crearContenidoIcono(config, { pequeno = false } = {}) {
  const insignia = document.createElement('span');
  insignia.className = pequeno ? 'icono-dominio pequeno' : 'icono-dominio';
  insignia.style.setProperty('--color-dominio', config?.color || 'var(--verde)');
  insignia.setAttribute('role', 'img');
  insignia.setAttribute('aria-label', config?.etiqueta || 'Dominio');
  insignia.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${forma(config)}</svg>`;
  return insignia;
}

export function crearIcono(config, texto) {
  const insignia = crearContenidoIcono(config);
  insignia.title = texto || config?.etiqueta || '';
  return L.divIcon({
    className: 'marcador-dominio',
    html: insignia.outerHTML,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  });
}
