export function etiquetaLegible(clave) {
  const texto = String(clave ?? '').replaceAll('_', ' ').trim();
  if (!texto) return 'Atributo';
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}
