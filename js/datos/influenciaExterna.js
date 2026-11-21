import { VIAS_COMPLEMENTO } from './viasComplemento.js';
import { CATASTRO_COMPLEMENTO } from './catastroComplemento.js';
export const EQUIPAMIENTOS_EXTERNOS = {
  catastro: CATASTRO_COMPLEMENTO,
  vias: VIAS_COMPLEMENTO,
  transporte: [
    { nombre: 'Paradero SITP Br. Villa Nelly · Av. Villavicencio - Kr 81G (033A08)', coordenadas: [-74.169198, 4.625882], nota: 'Paradero zonal oficial TransMilenio (033A08) sobre el corredor Av. Villavicencio (Zonas F / K).' },
    { nombre: 'Paradero SITP Br. Chucua de la Vaca (Cenefa 024A08)', coordenadas: [-74.168912, 4.629458], nota: 'Paradero oficial TransMilenio/SITP sobre el borde occidental (AV. C. de Cali - CL 42C Sur · Zona K).' },
    { nombre: 'Paradero SITP Br. Dindalito (Cenefa 025A08)', coordenadas: [-74.168651, 4.629963], nota: 'Paradero oficial TransMilenio/SITP sobre el corredor Av. Ciudad de Cali (CL 42B Sur · Zona K).' },
    { nombre: 'Paradero SITP Portal Américas (Cenefa 023A08)', coordenadas: [-74.171926, 4.628023], nota: 'Nodo de integración troncal y zonal Portal Américas (AV. C. de Cali - AV. Villavicencio · Zona K).' },
    { nombre: 'Paradero SITP Br. Villa Nelly III Los Alisos (Cenefa 179A08)', coordenadas: [-74.165125, 4.621553], nota: 'Paradero oficial TransMilenio/SITP sobre el borde oriental (AV. Agoberto Mejía - CL 42C Sur · Zona L).' },
    { nombre: 'Paradero SITP Pq. Metropolitano Cayetano Cañizares (Cenefa 008A08)', coordenadas: [-74.162571, 4.623002], nota: 'Paradero oficial TransMilenio/SITP frente al complejo deportivo (AV. Agoberto Mejía - CL 41C Sur · Zona L).' },
    { nombre: 'Paradero SITP Br. Villavicencio (Cenefa 035A08)', coordenadas: [-74.164878, 4.619381], nota: 'Paradero oficial TransMilenio/SITP sobre el corredor sur (AV. Villavicencio - KR 79C · Zona F).' },
  ],
  comercio: [
    { nombre: 'Corabastos — Central de Abastos de Bogotá (IDECA 06210003)', coordenadas: [-74.16045, 4.62915], nota: 'Principal central mayorista de abastecimiento alimentario del país (IDECA 06210003), colindante con el Sector III (004619).' },
    { nombre: 'Centro Comercial Milenio Plaza (IDECA 01010069)', coordenadas: [-74.16818, 4.63115], nota: 'Centro comercial y nodo de servicios bancarios y comercio formal (IDECA 01010069) en Av. Ciudad de Cali con Calle 42A Sur.' },
    { nombre: 'Establecimiento Comercial Casa Kiwi (IDECA 01030527)', coordenadas: [-74.16955, 4.62485], nota: 'Sitio de interés comercial registrado en Catastro Bogotá / IDECA (01030527) en el borde occidental del Sector I.' },
  ],
  escenarios: [
    { nombre: 'Parque Metropolitano Cayetano Cañizares (IDRD 08-241)', coordenadas: [-74.161956, 4.62504], nota: 'Equipamiento estructurante colindante (82.891 m², cruzando la Av. Carrera 80). Catastralmente no pertenece a Chucua de la Vaca I, II ni III, pero es el principal complejo deportivo del sector.' },
  ],
  educativos: [
    { nombre: 'Colegio La Amistad (IED) Sede Pinar del Río', coordenadas: [-74.164253, 4.631804], nota: 'Colegio público distrital colindante (KR 83 # 40 BIS - 36 SUR · Tel: 4521700). Cubre la demanda educativa oficial de Chucua de la Vaca.' },
    { nombre: 'Colegio La Amistad (IED) Sede Llano Grande', coordenadas: [-74.162809, 4.632994], nota: 'Segunda sede del colegio público distrital sobre la misma vía (KR 83 # 38 B - 12 SUR · Tel: 2655399 - 4524812) al norte del Sector III.' },
    { nombre: 'Colegio San Pedro Claver (IED) Sede Germán Zea', coordenadas: [-74.171091, 4.631722], nota: 'Colegio público distrital colindante (CL 42 G SUR # 87 - 06 · Tel: 2992763) cruzando la Av. Carrera 86.' },
    { nombre: 'Colegio San José (IED)', coordenadas: [-74.163331, 4.62129], nota: 'Colegio público distrital colindante (CL 42 A SUR # 79 D - 37 · Tel: 4549361) cruzando la Av. Carrera 80.' },
  ],
  centros_salud: [
    { nombre: 'USS 30 Bomberos (IDECA 04140154)', coordenadas: [-74.158425, 4.622455], nota: 'Unidad de Servicios de Salud colindante (CL 40 C SUR # 79 10) cruzando la Av. Carrera 80. Cubre la atención primaria del sector ante el déficit interno.' },
    { nombre: 'USS 71 Patio Bonito (IDECA 04140213)', coordenadas: [-74.161098, 4.634478], nota: 'Unidad de Servicios de Salud colindante al norte (DG 38 SUR # 82 30 · Subred Sur Occidente).' },
    { nombre: 'USS 68 Britalia (IDECA 04140049)', coordenadas: [-74.171809, 4.622021], nota: 'Unidad de Servicios de Salud colindante al suroccidente (KR 81 C # 48 25 SUR).' },
    { nombre: 'Hospital Occidente de Kennedy III Nivel (IDECA 04140278)', coordenadas: [-74.148155, 4.62048], nota: 'Hospital público de alta complejidad de la localidad (Carrera 73 D No 36 - 13 SUR).' },
  ],
  humedal_puntos: [
    { nombre: 'PEDH Humedal La Vaca — Sector Sur (Calle 46 Sur / Cra. 82)', coordenadas: [-74.17265, 4.61885], nota: 'Segundo cuerpo del complejo ecológico del Humedal La Vaca (Sector Sur), conectado hidrológicamente con el Sector Norte.' },
  ],
  servicios_publicos: [
    { nombre: 'SuperCADE Américas (IDECA 06210103)', coordenadas: [-74.1733, 4.628271], nota: 'Punto integral de atención de servicios públicos y trámites distritales colindante (AK 86 43 55 SUR).' },
    { nombre: 'CADE Kennedy (IDECA 06210100)', coordenadas: [-74.153349, 4.624622], nota: 'Centro de Atención Distrital Especializado colindante (KR 78G 38C 11 SUR).' },
    { nombre: 'Alcaldía Local de Kennedy (IDECA 06210116)', coordenadas: [-74.15748, 4.619051], nota: 'Sede administrativa local colindante (TV 78K 41A 04 SUR).' },
  ],
  cultura: [
    { nombre: 'Parroquia San Justino Márquez (IDECA 05150142)', coordenadas: [-74.170998, 4.622212], nota: 'Templo parroquial colindante al suroccidente (KR 81C 47A 32 SUR).' },
    { nombre: 'Parroquia Santa Luisa de Marillac (IDECA 05150132)', coordenadas: [-74.164642, 4.6355], nota: 'Templo parroquial colindante al norte (CL 38A SUR 86F 17).' },
    { nombre: 'Iglesia De Dios Ministerial (IDECA 05150299)', coordenadas: [-74.16502, 4.621693], nota: 'Centro de culto colindante al sur (AC 80 42C 83 SUR).' },
    { nombre: 'Escultura Homenaje a A.J.F (IDECA 05180485)', coordenadas: [-74.168036, 4.621811], nota: 'Monumento público colindante (DG 45 SUR - KR 80G).' },
  ],
  seguridad: [
    { nombre: 'CAI Britalia (IDECA 06250504)', coordenadas: [-74.171227, 4.624365], nota: 'CAI colindante al suroccidente (Calle 46 Sur 90 B - 00 · Tel: 2934903).' },
    { nombre: 'CAI Caldas (IDECA 06250505)', coordenadas: [-74.154017, 4.632131], nota: 'CAI colindante al nororiente (Carrera 80 2 - 00 · Tel: 2926298).' },
    { nombre: 'Estación de Policía Kennedy (IDECA 06250033)', coordenadas: [-74.159083, 4.619599], nota: 'Estación de Policía local colindante (CL 41D SUR 78N 05 · Tel: 2739099).' },
    { nombre: 'Estación de Bomberos de Kennedy (IDECA 06250016)', coordenadas: [-74.160171, 4.620243], nota: 'Estación oficial de bomberos colindante (KR 79 41D 20 SUR · Tel: 2648343).' },
  ],
  jac: [
    { nombre: 'Salón Comunal Villa Nelly III Sector Los Alisos', coordenadas: [-74.16587, 4.622008], nota: 'Equipamiento comunal colindante al sur del Sector I.' },
    { nombre: 'Salón Comunal Villa Hermosa', coordenadas: [-74.1704, 4.6258], nota: 'Equipamiento comunal colindante cruzando la Av. Carrera 86.' },
    { nombre: 'Salón Comunal Calarcá Sur', coordenadas: [-74.1615, 4.6272], nota: 'Equipamiento comunal colindante cruzando la Av. Carrera 80.' },
    { nombre: 'Salón Comunal El Carmelo II Sector', coordenadas: [-74.1648, 4.6326], nota: 'Equipamiento comunal colindante al norte del Sector III.' },
  ],
};






