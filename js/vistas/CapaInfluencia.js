import { crearIcono, crearContenidoIcono } from './iconoDominio.js';

const AMBAR = '#d97706';

export const EQUIPAMIENTOS_EXTERNOS = {
  escenarios: [
    {
      nombre: 'Parque Metropolitano Cayetano Cañizares (IDRD 08-241)',
      coordenadas: [-74.161956, 4.62504],
      entidad: 'IDRD',
      nota: 'Equipamiento estructurante colindante (82.891 m², cruzando la Av. Carrera 80). Catastralmente no pertenece a Chucua de la Vaca I, II ni III, pero se incluye por ser el principal complejo deportivo y recreativo que abastece al barrio.',
    },
  ],
  educativos: [
    {
      nombre: 'Colegio La Amistad (IED) Sede Pinar del Río',
      coordenadas: [-74.164253, 4.631804],
      entidad: 'IED · SED',
      nota: 'Sede oficial distrital colindante al norte del Sector III. Aunque el punto cae fuera del polígono catastral, cubre la educación oficial de los hogares del barrio.',
    },
    {
      nombre: 'Colegio La Amistad (IED) Sede Llano Grande',
      coordenadas: [-74.162809, 4.632994],
      entidad: 'IED · SED',
      nota: 'Sede oficial distrital colindante al nororiente del barrio. Se incluye por su cobertura educativa oficial sobre Chucua de la Vaca.',
    },
    {
      nombre: 'Colegio San Pedro Claver (IED) Sede Germán Zea',
      coordenadas: [-74.171091, 4.631722],
      entidad: 'IED · SED',
      nota: 'Sede oficial distrital colindante al noroccidente del barrio. Atiende población escolar de los sectores I y II pese a estar fuera del límite catastral.',
    },
    {
      nombre: 'Colegio San José (IED)',
      coordenadas: [-74.163331, 4.62129],
      entidad: 'IED · SED',
      nota: 'Colegio oficial distrital colindante al sur del Sector II. Es la sede principal de la educación pública que abastece al barrio.',
    },
  ],
  jac: [
    { nombre: 'Junta de Acción Comunal Villa Nelly III Sector Los Alisos (IDPAC 8187)', coordenadas: [-74.168709, 4.633089], entidad: 'IDPAC', nota: 'Salón comunal colindante al norte del Sector III, sobre el borde de Villa Nelly III Sector Los Alisos; atiende población de la ronda norte de Chucua de la Vaca.' },
    { nombre: 'Junta de Acción Comunal Villa Hermosa (IDPAC 8079)', coordenadas: [-74.167207, 4.632267], entidad: 'IDPAC', nota: 'Salón comunal colindante al nororiente del Sector III. Aunque su sector catastral es Provivienda Occidental, su sede queda frente al límite de Chucua de la Vaca.' },
    { nombre: 'Junta de Acción Comunal Calarcá Sur (IDPAC 8022)', coordenadas: [-74.168193, 4.620040], entidad: 'IDPAC', nota: 'Salón comunal colindante al sur del Sector I, en el borde de Casa Blanca Sur; presta servicios a hogares de la ronda sur del barrio.' },
    { nombre: 'Junta de Acción Comunal El Carmelo II Sector (IDPAC 8229)', coordenadas: [-74.174353, 4.620999], entidad: 'IDPAC', nota: 'Salón comunal colindante al occidente del Sector I, en el borde de El Carmelo; se incluye por su influencia sobre la ronda occidental de Chucua de la Vaca.' },
  ],
};

const CONFIGS = {
  escenarios: { etiqueta: 'Influencia externa (fuera del límite catastral)', color: AMBAR, icono: 'balon' },
  educativos: { etiqueta: 'Colegios públicos distritales (IED) colindantes', color: AMBAR, icono: 'libro' },
  jac: { etiqueta: 'Salones comunales colindantes (IDPAC)', color: AMBAR, icono: 'comunidad' },
};

export class CapaInfluencia {
  constructor(mapa) {
    this.grupo = L.layerGroup().addTo(mapa);
  }

  mostrar(dominioActivo) {
    this.grupo.clearLayers();
    const config = this._config(dominioActivo);
    (EQUIPAMIENTOS_EXTERNOS[dominioActivo] || []).forEach((item) => {
      const [lon, lat] = item.coordenadas;
      const marcador = L.marker([lat, lon], { icon: crearIcono(config, item.nombre), title: `${item.nombre} (Influencia externa)` });
      marcador.bindPopup(this._popup(item), { maxWidth: 330, className: 'popup-chucua' });
      marcador.addTo(this.grupo);
    });
  }

  agregarLeyenda(leyenda, dominioActivo) {
    const lista = EQUIPAMIENTOS_EXTERNOS[dominioActivo] || [];
    if (!leyenda || !lista.length) return;
    const config = this._config(dominioActivo);
    const fila = document.createElement('span');
    const texto = document.createElement('span');
    texto.textContent = config.etiqueta;
    fila.append(crearContenidoIcono(config, { pequeno: true }), texto);
    leyenda.append(fila);
  }

  _config(dominioActivo) {
    return CONFIGS[dominioActivo] || CONFIGS.escenarios;
  }

  _popup(item) {
    const caja = document.createElement('article');
    caja.className = 'popup-entidad';
    caja.innerHTML = `<h3>${item.nombre}</h3><p class="popup-meta"><span class="popup-dominio">Influencia externa · ${item.entidad || 'IDRD'}</span></p><p class="popup-sin-datos">${item.nota}</p>`;
    return caja;
  }
}
