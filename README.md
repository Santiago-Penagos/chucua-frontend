# chucua-frontend

Aplicación web sin build para consultar y editar los cuatro dominios
geográficos del barrio Chucua de la Vaca sobre un mapa Leaflet.

## Requisitos

- Python 3 (solo para servir archivos estáticos) o cualquier servidor HTTP.
- La API `chucua-api` en ejecución.

## Arranque

Desde `chucua-frontend`:

```powershell
python -m http.server 5500
```

Abre http://localhost:5500. También sirve desde la raíz del proyecto con
`python -m http.server 5500 --directory chucua-frontend`.

No abras `index.html` con doble clic: los módulos ES6 requieren HTTP.

## URL de la API

Edita `config.js` (raíz del repositorio) para apuntar al backend:

```js
export const API_URL = 'http://localhost:8000';
```

En GitHub Pages o Vercel cambia ese valor por la URL pública de la API, por
ejemplo `https://mi-api.onrender.com`. También puedes definir
`window.CHUCUA_API_URL` antes de cargar `js/app.js` si prefieres inyectarla
desde el hosting. `CENTRO` y `ZOOM` controlan la vista inicial del mapa.

La configuración de dominios (colores, campos y geometría) vive en
`js/configDominios.js`.

## Uso

1. Elige el dominio en las pestañas superiores.
2. Filtra por sector con el selector del encabezado.
3. Pulsa **Nueva entidad** y completa nombre, sector, atributos y geometría.
   - Punto: longitud y latitud.
   - Línea o polígono: una coordenada por línea (`longitud, latitud`).
4. **Editar** precarga el formulario; **Eliminar** pide confirmación.
5. Haz clic en una figura del mapa para abrir su detalle y cambiar de dominio.

Tras cada operación la aplicación recarga los cuatro dominios desde la API y
redibuja el mapa.

## Estructura

```text
index.html                 estructura de la interfaz
config.js                  URL de API, centro y zoom
css/                       base, navegación, componentes, mapa y formularios
js/app.js                  punto de entrada
js/api/ClienteApi.js       operaciones HTTP
js/modelos/                entidades, subclases y geometría
js/controlador/            aplicación, pestañas, carga y acciones CRUD
js/vistas/                 mapa, panel, formulario y mensajes
```

## Notas

- Leaflet 1.9.4 y sus estilos se cargan por CDN (`unpkg.com`).
- Los datos y el mapa base se atribuyen en pantalla a
  *© OpenStreetMap contributors* (**ODbL 1.0**) y a Leaflet.
- Para publicar en GitHub Pages o Vercel basta subir esta carpeta tal cual; no
  hay dependencias de build ni `node_modules`.
