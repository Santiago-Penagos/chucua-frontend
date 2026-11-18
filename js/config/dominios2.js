const TEXTO = 'text';
const SELECT = 'select';
const NUMERO = 'number';

export const DOMINIOS_AMPLIADOS_B = {
  comercio: {
    etiqueta: 'Comercio local',
    ruta: 'comercio',
    color: '#a61e4d',
    geometria: 'Point',
    campos: [
      {
        nombre: 'categoria_comercial', etiqueta: 'Categoría comercial', tipo: SELECT, requerido: true,
        opciones: ['alimentos', 'salud', 'educacion', 'ferreteria', 'servicios', 'otro'],
      },
      { nombre: 'nombre_establecimiento', etiqueta: 'Nombre del establecimiento', tipo: TEXTO, requerido: true },
      { nombre: 'direccion', etiqueta: 'Dirección', tipo: TEXTO, requerido: true },
      { nombre: 'horario', etiqueta: 'Horario', tipo: TEXTO, requerido: true },
    ],
  },
  cultura: {
    etiqueta: 'Centros culturales y culto',
    ruta: 'cultura',
    color: '#862e9c',
    geometria: 'Point',
    campos: [
      {
        nombre: 'tipo_espacio', etiqueta: 'Tipo de espacio', tipo: SELECT, requerido: true,
        opciones: ['casa_cultura', 'iglesia', 'salon_comunal', 'biblioteca', 'teatro'],
      },
      { nombre: 'actividad_principal', etiqueta: 'Actividad principal', tipo: TEXTO, requerido: true },
      { nombre: 'direccion', etiqueta: 'Dirección', tipo: TEXTO, requerido: true },
      { nombre: 'aforo_aproximado', etiqueta: 'Aforo aproximado', tipo: NUMERO, requerido: true },
    ],
  },
  servicios_publicos: {
    etiqueta: 'Servicios públicos',
    ruta: 'servicios_publicos',
    color: '#868e96',
    geometria: 'Point',
    campos: [
      {
        nombre: 'tipo_servicio', etiqueta: 'Tipo de servicio', tipo: SELECT, requerido: true,
        opciones: ['acueducto', 'energia', 'gas', 'telecomunicaciones', 'aseo', 'alcantarillado'],
      },
      {
        nombre: 'estado_operativo', etiqueta: 'Estado operativo', tipo: SELECT, requerido: true,
        opciones: ['operativo', 'mantenimiento', 'fuera_servicio'],
      },
      { nombre: 'ubicacion_referencia', etiqueta: 'Ubicación de referencia', tipo: TEXTO, requerido: true },
    ],
  },
  zonas_verdes: {
    etiqueta: 'Zonas verdes y parques',
    ruta: 'zonas_verdes',
    color: '#5c940d',
    geometria: 'Point',
    campos: [
      { nombre: 'area_aprox_m2', etiqueta: 'Área aproximada (m²)', tipo: NUMERO, requerido: true },
      {
        nombre: 'tipo_vegetacion', etiqueta: 'Tipo de vegetación', tipo: SELECT, requerido: true,
        opciones: ['arboles_nativos', 'pasto', 'jardines', 'mixta'],
      },
      {
        nombre: 'estado_mantenimiento', etiqueta: 'Estado de mantenimiento', tipo: SELECT, requerido: true,
        opciones: ['bueno', 'regular', 'malo'],
      },
      { nombre: 'direccion', etiqueta: 'Dirección', tipo: TEXTO, requerido: true },
    ],
  },
  demografia: {
    etiqueta: 'Población y demografía',
    ruta: 'demografia',
    color: '#d6336c',
    geometria: 'Point',
    campos: [
      { nombre: 'poblacion_estimada', etiqueta: 'Población estimada', tipo: NUMERO, requerido: true },
      { nombre: 'hogares_aprox', etiqueta: 'Hogares aproximados', tipo: NUMERO, requerido: true },
      {
        nombre: 'grupo_etario_predominante', etiqueta: 'Grupo etario predominante', tipo: SELECT, requerido: true,
        opciones: ['ninos', 'jovenes', 'adultos', 'adultos_mayores', 'mixto'],
      },
      { nombre: 'anio_censo', etiqueta: 'Año del censo', tipo: NUMERO, requerido: true },
    ],
  },
};
