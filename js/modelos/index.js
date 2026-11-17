import { Catastro } from './Catastro.js';
import { Educativo } from './Educativo.js';
import { Escenario } from './Escenario.js';
import { Via } from './Via.js';

const CLASES = {
  escenarios: Escenario,
  educativos: Educativo,
  vias: Via,
  catastro: Catastro,
};

export function desdeFeature(dominio, feature) {
  return CLASES[dominio].desdeFeature(feature);
}

export { Catastro, Educativo, Escenario, Via };
