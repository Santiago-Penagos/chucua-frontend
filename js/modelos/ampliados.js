import { DOMINIOS } from '../configDominios.js';
import { crearModelo } from './Generico.js';

const DOMINIOS_AMPLIADOS = [
  'jac',
  'centros_salud',
  'seguridad',
  'humedal_puntos',
  'transporte',
  'comercio',
  'cultura',
  'servicios_publicos',
  'zonas_verdes',
  'demografia',
];

export const MODELOS_AMPLIADOS = Object.fromEntries(
  DOMINIOS_AMPLIADOS.map((dominio) => [
    dominio,
    crearModelo(DOMINIOS[dominio].campos),
  ])
);
