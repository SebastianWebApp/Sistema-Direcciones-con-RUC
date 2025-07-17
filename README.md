# Sistema Maestro Detalle de Direcciones

Este proyecto es un sistema de maestro-detalle para la gestión de clientes y sus direcciones, con integración para consultar información de empresas en el SRI utilizando el RUC. Incluye pruebas automatizadas con Selenium para validar el funcionamiento de la interfaz web.

## Características principales

- Consulta de información de empresas en el SRI por RUC (real o simulada).
- Registro, actualización y eliminación de clientes y sus direcciones.
- Validación de datos y campos requeridos.
- Encriptación de datos sensibles como teléfono y direcciones.
- Interfaz web moderna y responsiva.
- Pruebas automatizadas con Selenium y Jest.

## Consulta al SRI

Por defecto, el sistema está configurado para usar un simulador de datos del SRI para facilitar el desarrollo y las pruebas. Si deseas realizar consultas reales al SRI, solo debes comentar y descomentar las siguientes líneas en `Simulador/Controlador/operaciones.js`:

```js
// Obtenemos la respuesta de la API
// const respuesta = await Api_Ruc(Ruc);

// Simulamos la respuesta de la API
const respuesta = await ObtenerDatosSimulados(Ruc);
```

- Para usar el simulador (por defecto): deja la línea `const respuesta = await ObtenerDatosSimulados(Ruc);` activa.
- Para usar la API real del SRI: comenta la línea del simulador y descomenta la línea `const respuesta = await Api_Ruc(Ruc);`.

## Pruebas Automáticas con Selenium

El sistema incluye un módulo de pruebas automáticas con Selenium que simula la interacción de un usuario en la interfaz web y valida las principales funcionalidades.

### Requisitos previos para pruebas Selenium

- Tener el sistema principal corriendo en [http://localhost:80](http://localhost:80).
- El usuario con RUC `0992879955001` debe estar creado previamente en el sistema para que las pruebas funcionen correctamente.
- Las pruebas solo funcionan con los RUC simulados (`0992879955001` y `0992879955002`), ya que son datos hipotéticos definidos en el backend.

### Instalación de dependencias para pruebas

```sh
pip install -r Test Selenium/requirements.txt
```

### Ejecución de pruebas

```sh
python Test Selenium/Test.py
```

Las pruebas incluyen:

- Validación de RUC inválido y válido.
- Pruebas de creación de cliente con campos completos e incompletos.
- Pruebas de filtros y visualización de información.
- Pruebas de agregar y eliminar filas de direcciones.
- Pruebas de actualización y eliminación de clientes.

## Instalación general del sistema

1. Clona el repositorio.
2. Instala las dependencias con `npm install`.
3. Configura el archivo `.env` con tus credenciales y claves.
4. Inicia la base de datos MongoDB y el servidor con Docker Compose:
   ```sh
   docker-compose up
   ```
5. Accede a la interfaz web en [http://localhost:80](http://localhost:80).

## Estructura principal

- `Simulador/Controlador/operaciones.js`: Lógica principal de operaciones CRUD y consulta al SRI.
- `Simulador/Servicios/api_ruc.js`: Implementación de la consulta real y simulada al SRI.
- `Simulador/js/index.js`: Lógica del frontend.
- `Simulador/view/index.html`: Interfaz de usuario.
- `Test Selenium/`: Pruebas automáticas con Selenium.

---

**Autor:** Mateo Espinosa