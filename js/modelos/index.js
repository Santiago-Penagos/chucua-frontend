import { Catastro } from './Catastro.js';
import { Educativo } from './Educativo.js';
import { Escenario } from './Escenario.js';
import { Via } from './Via.js';
import { MODELOS_AMPLIADOS } from './ampliados.js';

const CLASES = {
  escenarios: Escenario,
  educativos: Educativo,
  vias: Via,
  catastro: Catastro,
  ...MODELOS_AMPLIADOS,
};

export function desdeFeature(dominio, feature) {
  return CLASES[dominio].desdeFeature(feature);
}

export { Catastro, Educativo, Escenario, Via };
