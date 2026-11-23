import { EQUIPAMIENTOS_EXTERNOS } from '../datos/influenciaExterna.js';

const CODIGOS_SECTOR = { I: '004621', II: '004620', III: '004619' };

function haversineKm(a, b) {
  const rad = Math.PI / 180;
  const dLat = (b.at(1) - a.at(1)) * rad;
  const dLon = (b.at(0) - a.at(0)) * rad;
  const s = Math.sin(dLat / 2) ** 2 + Math.cos(a.at(1) * rad) * Math.cos(b.at(1) * rad) * Math.sin(dLon / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(s), Math.sqrt(1 - s));
}

function longitudTramo(coords) {
  let total = 0;
  for (let i = 1; i < coords.length; i += 1) total += haversineKm(coords.at(i - 1), coords.at(i));
  return total;
}

function externosFiltrados(dominio, sector) {
  return (EQUIPAMIENTOS_EXTERNOS[dominio] || []).filter((item) => {
    if (!sector) return true;
    const texto = `${item.nombre} ${item.nota || ''}`;
    if (dominio === 'catastro') return texto.includes(CODIGOS_SECTOR[sector]) || texto.includes(`Sector ${sector})`);
    if (dominio === 'vias') return new RegExp(`Sector ${sector}(?:[^I]|$)`).test(texto);
    return true;
  });
}

function featureExterno(item, dominio) {
  const esInterna = item.tipo === 'interna';
  const color = esInterna ? (dominio === 'vias' ? '#2563eb' : '#7c3aed') : '#d97706';
  const props = { nombre: item.nombre, cobertura: esInterna ? 'interna' : 'limite_o_externa', nota: item.nota || '', stroke: color, fill: color, 'fill-opacity': 0.3 };
  if (item.poligono) return { type: 'Feature', geometry: { type: 'Polygon', coordinates: [item.poligono.map((p) => [p.at(1), p.at(0)])] }, properties: props };
  if (item.linea) return { type: 'Feature', geometry: { type: 'LineString', coordinates: item.linea.map((p) => [p.at(1), p.at(0)]) }, properties: props };
  if (Array.isArray(item.coordenadas)) return { type: 'Feature', geometry: { type: 'Point', coordinates: item.coordenadas }, properties: props };
  return null;
}

export class AnaliticaSigUI {
  constructor(elemento) {
    this.elemento = elemento;
  }

  render(dominio, config, entidades, sector) {
    if (!this.elemento || !config) return;
    const externas = externosFiltrados(dominio, sector).length;
    const porSec = { I: 0, II: 0, III: 0 };
    entidades.forEach((e) => { if (porSec[e.sector] !== undefined) porSec[e.sector] += 1; });
    const kpis = [
      { titulo: 'Registros internos', valor: `${entidades.length}`, sub: sector ? `Sector ${sector}` : `I: ${porSec.I} · II: ${porSec.II} · III: ${porSec.III}` },
      { titulo: 'Borde / Influencia externa', valor: `${externas}`, sub: 'Cartografía oficial entorno' },
    ];
    if (dominio === 'vias') {
      const km = entidades.reduce((acc, v) => acc + longitudTramo(v.coordenadas || []), 0);
      const buenos = entidades.filter((v) => v.estado === 'bueno').length;
      kpis.push({ titulo: 'Longitud geodésica API', valor: `${km.toFixed(2)} km`, sub: 'Cálculo Haversine WGS84' });
      kpis.push({ titulo: 'Tramos en buen estado', valor: `${entidades.length ? Math.round((buenos * 100) / entidades.length) : 0}%`, sub: `${buenos} de ${entidades.length} tramos` });
    } else if (dominio === 'catastro' || dominio === 'zonas_verdes') {
      const m2 = entidades.reduce((acc, item) => acc + Number(item.area_m2 || item.area_aprox_m2 || 0), 0);
      kpis.push({ titulo: 'Superficie acumulada', valor: `${(m2 / 10000).toFixed(2)} ha`, sub: `${Math.round(m2).toLocaleString('es-CO')} m² verificados` });
    } else if (dominio === 'demografia') {
      const pob = entidades.reduce((acc, d) => acc + Number(d.poblacion_estimada || 0), 0);
      const hog = entidades.reduce((acc, d) => acc + Number(d.hogares_aprox || 0), 0);
      kpis.push({ titulo: 'Población estimada', valor: pob.toLocaleString('es-CO'), sub: 'Proyección DANE / SDP' });
      kpis.push({ titulo: 'Hogares aproximados', valor: hog.toLocaleString('es-CO'), sub: hog ? `${(pob / hog).toFixed(1)} hab/hogar` : 'Sin datos' });
    } else {
      kpis.push({ titulo: 'Geometría dominante', valor: config.geometria, sub: 'Estándar OGC EPSG:4326' });
    }
    this.elemento.innerHTML = kpis.map((k) => `<article class="tarjeta-kpi"><span>${k.titulo}</span><strong>${k.valor}</strong><small>${k.sub}</small></article>`).join('');
  }

  exportarGeoJson(dominio, entidades, sector) {
    const base = entidades.map((e) => ({ type: 'Feature', geometry: e.geometria, properties: { id: e.id, nombre: e.nombre, sector: e.sector, cobertura: 'interna', ...e.atributos() } }));
    const comp = externosFiltrados(dominio, sector).map((item) => featureExterno(item, dominio)).filter(Boolean);
    const fc = { type: 'FeatureCollection', name: `chucua_${dominio}${sector ? `_sector_${sector}` : ''}`, features: [...base, ...comp] };
    const blob = new Blob([JSON.stringify(fc, null, 2)], { type: 'application/geo+json' });
    const enlace = document.createElement('a');
    enlace.href = URL.createObjectURL(blob);
    enlace.download = `${fc.name}.geojson`;
    enlace.click();
    URL.revokeObjectURL(enlace.href);
  }
}
