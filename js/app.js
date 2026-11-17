import { API_URL, CENTRO, ZOOM } from '../config.js';
import { ClienteApi } from './api/ClienteApi.js';
import { DOMINIOS, ORDEN } from './configDominios.js';
import { Aplicacion } from './controlador/Aplicacion.js';

const aplicacion = new Aplicacion({
  api: new ClienteApi(API_URL),
  dominios: DOMINIOS,
  orden: ORDEN,
  centro: CENTRO,
  zoom: ZOOM,
});

aplicacion.iniciar();
