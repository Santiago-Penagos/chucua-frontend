export const DOMINIOS_BASE = {
  escenarios: {
    etiqueta: 'Escenarios deportivos',
    ruta: 'escenarios',
    color: '#d9480f',
    icono: 'balon',
    geometria: 'Point',
    campos: [
      { nombre: 'tipo_escenario', etiqueta: 'Tipo de escenario', tipo: 'text', requerido: true },
    ],
  },
  educativos: {
    etiqueta: 'Centros educativos',
    ruta: 'educativos',
    color: '#1971c2',
    icono: 'libro',
    geometria: 'Point',
    campos: [
      {
        nombre: 'nivel_educativo', etiqueta: 'Nivel educativo', tipo: 'select', requerido: true,
        opciones: ['preescolar', 'basica', 'media', 'superior', 'no_especificado'],
      },
      {
        nombre: 'naturaleza', etiqueta: 'Naturaleza', tipo: 'select', requerido: true,
        opciones: ['publico', 'privado', 'no_especificado'],
      },
    ],
  },
  vias: {
    etiqueta: 'Estado de las vías',
    ruta: 'vias',
    color: '#2b8a3e',
    icono: 'via',
    geometria: 'LineString',
    campos: [
      {
        nombre: 'tipo_via', etiqueta: 'Tipo de vía', tipo: 'select', requerido: true,
        opciones: ['primary', 'secondary', 'tertiary', 'residential', 'service', 'pedestrian', 'otra'],
      },
      {
        nombre: 'estado', etiqueta: 'Estado', tipo: 'select', requerido: true,
        opciones: ['bueno', 'regular', 'malo', 'sin_evaluar'],
      },
    ],
  },
  catastro: {
    etiqueta: 'Información catastral',
    ruta: 'catastro',
    color: '#7048e8',
    icono: 'predio',
    geometria: 'Polygon',
    campos: [
      {
        nombre: 'uso_suelo', etiqueta: 'Uso del suelo', tipo: 'select', requerido: true,
        opciones: ['residencial', 'comercial', 'dotacional', 'industrial', 'no_especificado'],
      },
      { nombre: 'area_m2', etiqueta: 'Área (m²)', tipo: 'number', requerido: true },
    ],
  },
};
