import { API_URL, CENTRO, ZOOM } from '../config.js';
import { ApiService } from './api/ApiService.js';
import { DOMINIOS, ORDEN, GRUPOS } from './configDominios.js';
import { ZONAS } from './datos/zonasDestacadas.js';
import { NavegacionPortal } from './controlador/NavegacionPortal.js';
import { GestorCrudUI } from './controlador/GestorCrudUI.js';
import { ZonasDestacadasUI } from './vistas/ZonasDestacadasUI.js';
import { MapaInteractivo } from './vistas/MapaInteractivo.js?v=3';

let gestor;

const mapa = new MapaInteractivo('mapa', {
  centro: CENTRO,
  zoom: ZOOM,
  alEditar: (dominio, entidad) => gestor?.editarDesdeMapa(dominio, entidad),
});

gestor = new GestorCrudUI({
  api: new ApiService(API_URL),
  dominios: DOMINIOS,
  orden: ORDEN,
  grupos: GRUPOS,
  mapa,
});

const zonas = new ZonasDestacadasUI({
  elemento: document.querySelector('#zonas-destacadas'),
  zonas: ZONAS,
  alUbicar: (zona) => {
    document.querySelector('#sig').scrollIntoView({ behavior: 'smooth', block: 'start' });
    mapa.centrar(zona.coordenadas, zona.zoom);
  },
});

const navegacion = new NavegacionPortal({
  elemento: document.querySelector('#nav-portal'),
  secciones: ['inicio', 'historia', 'zonas', 'sig'],
});

navegacion.iniciar();
zonas.render();
gestor.iniciar();

