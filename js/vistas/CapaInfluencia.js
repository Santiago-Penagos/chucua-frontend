import { crearIcono, crearContenidoIcono } from './iconoDominio.js';
import { EQUIPAMIENTOS_EXTERNOS } from '../datos/influenciaExterna.js';

const CONFIG_EXTERNA = {
  etiqueta: 'Influencia externa (fuera del límite catastral)',
  color: '#d97706',
  icono: 'building',
};

export class CapaInfluencia {
  constructor(mapa) {
    this.grupo = L.layerGroup().addTo(mapa);
  }

  mostrar(dominioActivo) {
    this.grupo.clearLayers();
    (EQUIPAMIENTOS_EXTERNOS[dominioActivo] || []).forEach((item) => {
      const [lon, lat] = item.coordenadas;
      const marcador = L.marker([lat, lon], {
        icon: crearIcono(CONFIG_EXTERNA, item.nombre),
        title: `${item.nombre} (Influencia externa)`,
      });
      marcador.bindPopup(this._popup(item), { maxWidth: 330, className: 'popup-chucua' });
      marcador.addTo(this.grupo);
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

  _popup(item) {
    const caja = document.createElement('article');
    caja.className = 'popup-entidad';
    caja.innerHTML = `<h3>${item.nombre}</h3><p class="popup-meta"><span class="popup-dominio">Influencia externa oficial</span></p><p class="popup-sin-datos">${item.nota}</p>`;
    return caja;
  }
}
