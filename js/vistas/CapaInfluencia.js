import { crearIcono, crearContenidoIcono } from './iconoDominio.js';
import { EQUIPAMIENTOS_EXTERNOS } from '../datos/influenciaExterna.js';

const CONFIG_EXTERNA = { etiqueta: 'Influencia externa / Límite de sector', color: '#d97706', icono: 'building' };
const CODIGOS_SECTOR = { I: '004621', II: '004620', III: '004619' };

export class CapaInfluencia {
  constructor(mapa) {
    this.grupo = L.layerGroup().addTo(mapa);
  }

  mostrar(dominioActivo, sectorActivo = '') {
    this.grupo.clearLayers();
    const lista = (EQUIPAMIENTOS_EXTERNOS[dominioActivo] || []).filter((item) => {
      if (!sectorActivo || dominioActivo !== 'catastro') return true;
      return item.nombre.includes(CODIGOS_SECTOR[sectorActivo]) || item.nombre.includes(`Sector ${sectorActivo})`);
    });
    lista.forEach((item) => {
      if (item.linea) {
        const esInterna = item.tipo === 'interna';
        const estilo = esInterna ? { color: '#2563eb', weight: 4, opacity: 0.85 } : { color: '#d97706', weight: 4.5, opacity: 0.9 };
        L.polyline(item.linea, estilo).bindPopup(this._popup(item, esInterna), { maxWidth: 330, className: 'popup-chucua' }).addTo(this.grupo);
        return;
      }
      if (item.poligono) {
        const esInterna = item.tipo === 'interna';
        const estilo = esInterna ? { color: '#7c3aed', weight: 1.5, fillColor: '#8b5cf6', fillOpacity: 0.25 } : { color: '#d97706', weight: 2, fillColor: '#f59e0b', fillOpacity: 0.34 };
        L.polygon(item.poligono, estilo).bindPopup(this._popup(item, esInterna), { maxWidth: 330, className: 'popup-chucua' }).addTo(this.grupo);
        return;
      }
      if (!Array.isArray(item.coordenadas)) return;
      const [lon, lat] = item.coordenadas;
      L.marker([lat, lon], { icon: crearIcono(CONFIG_EXTERNA, item.nombre), title: `${item.nombre} (Límite / Externa)` })
        .bindPopup(this._popup(item, false), { maxWidth: 330, className: 'popup-chucua' }).addTo(this.grupo);
    });
  }

  agregarLeyenda(leyenda, dominioActivo) {
    const lista = EQUIPAMIENTOS_EXTERNOS[dominioActivo] || [];
    if (!leyenda || !lista.length) return;
    const fila = document.createElement('span');
    const texto = document.createElement('span');
    texto.textContent = CONFIG_EXTERNA.etiqueta;
    fila.append(crearContenidoIcono(CONFIG_EXTERNA, { pequeno: true }), texto);
    leyenda.append(fila);
  }

  _popup(item, esInterna) {
    const caja = document.createElement('article');
    caja.className = 'popup-entidad';
    const sub = esInterna ? 'Información catastral (UAECD / IDECA)' : 'Límite de sector / Influencia externa';
    caja.innerHTML = `<h3>${item.nombre}</h3><p class="popup-meta"><span class="popup-dominio">${sub}</span></p><p class="popup-sin-datos">${item.nota}</p>`;
    return caja;
  }
}
