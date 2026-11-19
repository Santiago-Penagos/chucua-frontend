import { DOMINIOS_BASE } from './config/baseDominios.js';
import { DOMINIOS_AMPLIADOS_A } from './config/dominios1.js';
import { DOMINIOS_AMPLIADOS_B } from './config/dominios2.js';

export const DOMINIOS = {
  ...DOMINIOS_BASE,
  ...DOMINIOS_AMPLIADOS_A,
  ...DOMINIOS_AMPLIADOS_B,
};

export const GRUPOS = [
  {
    nombre: 'Equipamientos y comunidad',
    dominios: ['escenarios', 'educativos', 'jac', 'centros_salud', 'seguridad', 'cultura', 'servicios_publicos'],
  },
  {
    nombre: 'Ambiente y territorio',
    dominios: ['humedal_puntos', 'zonas_verdes', 'catastro', 'demografia'],
  },
  {
    nombre: 'Movilidad y economía',
    dominios: ['vias', 'transporte', 'comercio'],
  },
];

export const ORDEN = GRUPOS.flatMap((g) => g.dominios);
