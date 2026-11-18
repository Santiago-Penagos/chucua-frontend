const TEXTO = 'text';
const SELECT = 'select';

export const DOMINIOS_AMPLIADOS_A = {
  jac: {
    etiqueta: 'Juntas de Acción Comunal',
    ruta: 'jac',
    color: '#c92a2a',
    geometria: 'Point',
    campos: [
      { nombre: 'presidente_contacto', etiqueta: 'Contacto del presidente', tipo: TEXTO, requerido: true },
      { nombre: 'direccion', etiqueta: 'Dirección', tipo: TEXTO, requerido: true },
      { nombre: 'horario_atencion', etiqueta: 'Horario de atención', tipo: TEXTO, requerido: true },
    ],
  },
  centros_salud: {
    etiqueta: 'Centros de salud',
    ruta: 'centros_salud',
    color: '#0b7285',
    geometria: 'Point',
    campos: [
      {
        nombre: 'tipo_centro', etiqueta: 'Tipo de centro', tipo: SELECT, requerido: true,
        opciones: ['centro_salud', 'puesto_salud', 'clinica', 'hospital', 'unidad_medica'],
      },
      {
        nombre: 'nivel_atencion', etiqueta: 'Nivel de atención', tipo: SELECT, requerido: true,
        opciones: ['I', 'II', 'III'],
      },
      { nombre: 'horario', etiqueta: 'Horario', tipo: TEXTO, requerido: true },
      { nombre: 'direccion', etiqueta: 'Dirección', tipo: TEXTO, requerido: true },
    ],
  },
  seguridad: {
    etiqueta: 'Seguridad ciudadana',
    ruta: 'seguridad',
    color: '#364fc7',
    geometria: 'Point',
    campos: [
      {
        nombre: 'tipo_punto', etiqueta: 'Tipo de punto', tipo: SELECT, requerido: true,
        opciones: ['CAI', 'estacion_policia', 'puesto_movil', 'camara', 'alumbrado'],
      },
      { nombre: 'cuadrante', etiqueta: 'Cuadrante', tipo: TEXTO, requerido: true },
      { nombre: 'telefono_contacto', etiqueta: 'Teléfono de contacto', tipo: TEXTO, requerido: true },
    ],
  },
  humedal_puntos: {
    etiqueta: 'Puntos ecológicos del humedal',
    ruta: 'humedal_puntos',
    color: '#0c8599',
    geometria: 'Point',
    campos: [
      {
        nombre: 'zona_humedal', etiqueta: 'Zona del humedal', tipo: SELECT, requerido: true,
        opciones: ['ronda_norte', 'ronda_sur', 'cuerpo_agua', 'zona_recuperacion'],
      },
      {
        nombre: 'estado_conservacion', etiqueta: 'Estado de conservación', tipo: SELECT, requerido: true,
        opciones: ['bueno', 'regular', 'critico', 'en_recuperacion'],
      },
      { nombre: 'especie_destacada', etiqueta: 'Especie destacada', tipo: TEXTO, requerido: true },
    ],
  },
  transporte: {
    etiqueta: 'Transporte y paraderos SITP',
    ruta: 'transporte',
    color: '#f08c00',
    geometria: 'Point',
    campos: [
      { nombre: 'codigo_paradero', etiqueta: 'Código de paradero', tipo: TEXTO, requerido: true },
      { nombre: 'rutas_alimentadoras', etiqueta: 'Rutas alimentadoras', tipo: TEXTO, requerido: true },
      { nombre: 'direccion', etiqueta: 'Dirección', tipo: TEXTO, requerido: true },
      {
        nombre: 'estado_senalizacion', etiqueta: 'Estado de señalización', tipo: SELECT, requerido: true,
        opciones: ['buena', 'regular', 'mala', 'sin_senalizacion'],
      },
    ],
  },
};
