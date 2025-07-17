# Sistema Maestro Detalle de Direcciones

Este proyecto es un sistema de maestro-detalle para la gestión de clientes y sus direcciones. Permite consultar información de empresas en el SRI utilizando el RUC, extraer datos relevantes y almacenarlos en una base de datos. El sistema está desarrollado para la empresa PrimeCode y utiliza tecnologías como Node.js, Express, MongoDB y Selenium para pruebas automatizadas.

## Características principales

- Consulta de información de empresas en el SRI por RUC.
- Registro, actualización y eliminación de clientes y sus direcciones.
- Validación de datos y campos requeridos.
- Encriptación de datos sensibles como teléfono y direcciones.
- Interfaz web moderna y responsiva.
- Pruebas automatizadas con Selenium y Jest.

## Consulta al SRI

Por defecto, el sistema está configurado para usar un simulador de datos del SRI para facilitar el desarrollo y las pruebas. Si deseas realizar consultas reales al SRI, solo debes comentar y descomentar las siguientes líneas en [`Controlador/operaciones.js`](Controlador/operaciones.js):

```js
// Obtenemos la respuesta de la API
// const respuesta = await Api_Ruc(Ruc);

// Simulamos la respuesta de la API
const respuesta = await ObtenerDatosSimulados(Ruc);
```

- Para usar el simulador (por defecto): deja la línea `const respuesta = await ObtenerDatosSimulados(Ruc);` activa.
- Para usar la API real del SRI: comenta la línea del simulador y descomenta la línea `const respuesta = await Api_Ruc(Ruc);`.

## Instalación

1. Clona el repositorio.
2. Instala las dependencias con `npm install`.
3. Configura el archivo `.env` con tus credenciales y claves.
4. Inicia la base de datos MongoDB y el servidor con Docker Compose:
   ```sh
   docker-compose up
   ```
5. Accede a la interfaz web en [http://localhost:80](http://localhost:80).

## Pruebas

- Pruebas unitarias: `npm test`
- Pruebas Selenium: ver carpeta `Test Selenium/`

## Estructura principal

- [`Controlador/operaciones.js`](Controlador/operaciones.js): Lógica principal de operaciones CRUD y consulta al SRI.
- [`Servicios/api_ruc.js`](Servicios/api_ruc.js): Implementación de la consulta real y simulada al SRI.
- [`js/index.js`](js/index.js): Lógica del frontend.
- [`view/index.html`](view/index.html): Interfaz de usuario.

---

**Autor:**