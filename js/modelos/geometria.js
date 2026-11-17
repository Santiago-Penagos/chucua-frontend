export function textoVertices(coordenadas) {
  const anillo =
    Array.isArray(coordenadas[0]) && Array.isArray(coordenadas[0][0])
      ? coordenadas[0]
      : coordenadas;
  return anillo.map(([lon, lat]) => `${lon}, ${lat}`).join('\n');
}

export function parsearVertices(texto, minimo, cerrar = false) {
  const pares = texto
    .split(/\n|;/)
    .map((linea) => linea.trim())
    .filter(Boolean)
    .map((linea) => {
      const [lon, lat] = linea.split(/[,\s]+/).map(Number);
      if (!Number.isFinite(lon) || !Number.isFinite(lat)) {
        throw new Error(`Vértice inválido: ${linea}`);
      }
      if (lon < -180 || lon > 180 || lat < -90 || lat > 90) {
        throw new Error(`Coordenada fuera de rango: ${linea}`);
      }
      return [lon, lat];
    });
  if (pares.length < minimo) {
    throw new Error(`Se requieren al menos ${minimo} vértices`);
  }
  if (cerrar) {
    const [lon, lat] = pares[0];
    const [ultimoLon, ultimoLat] = pares[pares.length - 1];
    if (lon !== ultimoLon || lat !== ultimoLat) pares.push([lon, lat]);
  }
  return pares;
}

export function parsearPunto(lon, lat) {
  const valores = [Number(lon), Number(lat)];
  if (!valores.every(Number.isFinite)) throw new Error('Longitud y latitud son obligatorias');
  if (valores[0] < -180 || valores[0] > 180) throw new Error('Longitud fuera de rango');
  if (valores[1] < -90 || valores[1] > 90) throw new Error('Latitud fuera de rango');
  return valores;
}
