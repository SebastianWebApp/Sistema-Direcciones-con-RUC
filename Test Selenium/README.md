# Pruebas Automáticas del Sistema Maestro de Direcciones con Selenium

Este módulo permite realizar pruebas automáticas sobre el sistema de maestro de direcciones utilizando Selenium. Las pruebas simulan la interacción de un usuario en la interfaz web y validan el funcionamiento de las principales funcionalidades del sistema.

## Requisitos previos

- Tener el sistema principal corriendo en [http://localhost:80](http://localhost:80).
- El usuario con RUC `0992879955001` debe estar creado previamente en el sistema para que las pruebas funcionen correctamente.
- Las pruebas solo funcionan con los RUC simulados (`0992879955001` y `0992879955002`), ya que son datos hipotéticos definidos en el backend.

## Instalación de dependencias

Instala las dependencias necesarias ejecutando:

```sh
pip install -r requirements.txt
```

## Ejecución de pruebas

Ejecuta el script principal de pruebas:

```sh
python Test.py
```

Las pruebas incluyen:

- Validación de RUC inválido y válido.
- Pruebas de creación de cliente con campos completos e incompletos.
- Pruebas de filtros y visualización de información.
- Pruebas de agregar y eliminar filas de direcciones.
- Pruebas de actualización y eliminación de clientes.

## Notas

- Las pruebas están diseñadas para funcionar únicamente con los RUC simulados definidos en el backend.
- Si deseas probar con otros RUC, debes agregarlos en la lógica de simulación del backend.
- Asegúrate de que el sistema esté corriendo y accesible antes de ejecutar las pruebas.

---