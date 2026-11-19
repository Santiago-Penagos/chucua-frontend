import { escenarios } from './config/escenarios.js';
import { educativos } from './config/educativos.js';
import { jac } from './config/jac.js';
import { salud } from './config/salud.js';
import { seguridad } from './config/seguridad.js';
import { cultura } from './config/cultura.js';
import { servicios_publicos } from './config/servicios_publicos.js';
import { humedal_puntos } from './config/humedal_puntos.js';
import { zonas_verdes } from './config/zonas_verdes.js';
import { catastro } from './config/catastro.js';
import { demografia } from './config/demografia.js';
import { vias } from './config/vias.js';
import { transporte } from './config/transporte.js';
import { comercio } from './config/comercio.js';

export const DOMINIOS = {
  escenarios, educativos, jac, salud, seguridad, cultura, servicios_publicos,
  humedal_puntos, zonas_verdes, catastro, demografia, vias, transporte, comercio,
};

export const DOMINIOS_ORDEN = Object.keys(DOMINIOS);
