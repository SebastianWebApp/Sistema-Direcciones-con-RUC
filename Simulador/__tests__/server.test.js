import * as crudDatos from "../Servicios/crud_datos_generales.js";
import * as crudInfo from "../Servicios/crud_informacion_legal.js";
import * as crudDir from "../Servicios/crud_direcciones.js";
import * as apiRuc from "../Servicios/api_ruc.js";
import * as operaciones from "../Controlador/operaciones.js";

jest.mock("../Servicios/crud_datos_generales.js");
jest.mock("../Servicios/crud_informacion_legal.js");
jest.mock("../Servicios/crud_direcciones.js");
jest.mock("../Servicios/api_ruc.js");

describe("Controlador operaciones", () => {
  let req, res;

  beforeEach(() => {
    req = { body: {}, params: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    jest.clearAllMocks();
  });

  describe("Crear_Cliente", () => {
    it("debe crear cliente correctamente", async () => {
      crudDatos.Crear_Datos_Generales.mockResolvedValue({ Estado: true, Contenido: "id1", Respuesta: "ok" });
      crudInfo.Crear_Informacion.mockResolvedValue({ Estado: true });
      crudDir.Crear_Direcciones.mockResolvedValue({ Estado: true });

      await operaciones.Crear_Cliente(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        Estado: true,
        Respuesta: "ok"
      });
    });

    it("debe manejar error en Crear_Datos_Generales", async () => {
      crudDatos.Crear_Datos_Generales.mockResolvedValue({ Estado: false, Respuesta: "error" });

      await operaciones.Crear_Cliente(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        Estado: false,
        Respuesta: "error"
      });
    });

    it("debe manejar error en Crear_Informacion y eliminar datos generales", async () => {
      crudDatos.Crear_Datos_Generales.mockResolvedValue({ Estado: true, Contenido: "id1" });
      crudInfo.Crear_Informacion.mockResolvedValue({ Estado: false, Respuesta: "error info" });
      crudDatos.Eliminar_Datos_Generales.mockResolvedValue({ Estado: true });

      await operaciones.Crear_Cliente(req, res);

      expect(crudDatos.Eliminar_Datos_Generales).toHaveBeenCalledWith("id1");
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        Estado: false,
        Respuesta: "error info"
      });
    });

    it("debe manejar error en Crear_Direcciones y eliminar informacion legal", async () => {
      crudDatos.Crear_Datos_Generales.mockResolvedValue({ Estado: true, Contenido: "id1" });
      crudInfo.Crear_Informacion.mockResolvedValue({ Estado: true });
      crudDir.Crear_Direcciones.mockResolvedValue({ Estado: false, Respuesta: "error dir" });
      crudInfo.Eliminar_Informacion.mockResolvedValue({ Estado: true });

      await operaciones.Crear_Cliente(req, res);

      expect(crudInfo.Eliminar_Informacion).toHaveBeenCalledWith("id1");
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        Estado: false,
        Respuesta: "error dir"
      });
    });
  });

  


  describe("Actualizar_Cliente", () => {
    it("debe actualizar cliente correctamente", async () => {
      crudDatos.Actualizar_Datos_Generales.mockResolvedValue({ Estado: true });
      crudInfo.Actualizar_Informacion.mockResolvedValue({ Estado: true });
      crudDir.Actualizar_Direcciones.mockResolvedValue({ Estado: true });

      await operaciones.Actualizar_Cliente(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        Estado: true,
        Respuesta: "Cliente actualizado correctamente"
      });
    });

    it("debe manejar error en Actualizar_Datos_Generales", async () => {
      crudDatos.Actualizar_Datos_Generales.mockResolvedValue({ Estado: false, Respuesta: "Error datos generales" });

      await operaciones.Actualizar_Cliente(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        Estado: false,
        Respuesta: "Error datos generales"
      });
    });

    it("debe manejar error en Actualizar_Informacion", async () => {
      crudDatos.Actualizar_Datos_Generales.mockResolvedValue({ Estado: true });
      crudInfo.Actualizar_Informacion.mockResolvedValue({ Estado: false, Respuesta: "Error info" });

      await operaciones.Actualizar_Cliente(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        Estado: false,
        Respuesta: "Error info"
      });
    });

    it("debe manejar error en Actualizar_Direcciones", async () => {
      crudDatos.Actualizar_Datos_Generales.mockResolvedValue({ Estado: true });
      crudInfo.Actualizar_Informacion.mockResolvedValue({ Estado: true });
      crudDir.Actualizar_Direcciones.mockResolvedValue({ Estado: false, Respuesta: "Error direcciones" });

      await operaciones.Actualizar_Cliente(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        Estado: false,
        Respuesta: "Error direcciones"
      });
    });
  });
  
  describe("Eliminar_Cliente", () => {
    beforeEach(() => {
      req = { params: { Id: "123" } };
    });
  
    it("debe eliminar cliente correctamente", async () => {
      crudDatos.Eliminar_Datos_Generales.mockResolvedValue({ Estado: true });
      crudInfo.Eliminar_Informacion.mockResolvedValue({ Estado: true });
      crudDir.Eliminar_Direcciones.mockResolvedValue({ Estado: true });
  
      await operaciones.Eliminar_Cliente(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        Estado: true,
        Respuesta: "Cliente eliminado correctamente"
      });
    });
  
    it("debe manejar error en Eliminar_Datos_Generales", async () => {
      crudDatos.Eliminar_Datos_Generales.mockResolvedValue({ Estado: false, Respuesta: "Error datos generales" });
  
      await operaciones.Eliminar_Cliente(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        Estado: false,
        Respuesta: "Error datos generales"
      });
    });
  
    it("debe manejar error en Eliminar_Informacion", async () => {
      crudDatos.Eliminar_Datos_Generales.mockResolvedValue({ Estado: true });
      crudInfo.Eliminar_Informacion.mockResolvedValue({ Estado: false, Respuesta: "Error info" });
  
      await operaciones.Eliminar_Cliente(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        Estado: false,
        Respuesta: "Error info"
      });
    });
  
    it("debe manejar error en Eliminar_Direcciones", async () => {
      crudDatos.Eliminar_Datos_Generales.mockResolvedValue({ Estado: true });
      crudInfo.Eliminar_Informacion.mockResolvedValue({ Estado: true });
      crudDir.Eliminar_Direcciones.mockResolvedValue({ Estado: false, Respuesta: "Error direcciones" });
  
      await operaciones.Eliminar_Cliente(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        Estado: false,
        Respuesta: "Error direcciones"
      });
    });
  });
  
  describe("Leer_Informacion_Cliente", () => {
    it("debe leer información y direcciones correctamente", async () => {
      crudInfo.Leer_Informacion.mockResolvedValue({ Estado: true, Respuesta: { legal: "info" } });
      crudDir.Leer_Direcciones.mockResolvedValue({ Estado: true, Respuesta: { direccion: "info" } });
  
      await operaciones.Leer_Informacion_Cliente(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        Estado: true,
        Respuesta: {
          Informacion_Legal: { legal: "info" },
          Direcciones: { direccion: "info" }
        }
      });
    });
  
    it("debe manejar error en Leer_Informacion", async () => {
      crudInfo.Leer_Informacion.mockResolvedValue({ Estado: false, Respuesta: "Error info" });
  
      await operaciones.Leer_Informacion_Cliente(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        Estado: false,
        Respuesta: "Error info"
      });
    });
  
    it("debe manejar error en Leer_Direcciones", async () => {
      crudInfo.Leer_Informacion.mockResolvedValue({ Estado: true, Respuesta: { legal: "info" } });
      crudDir.Leer_Direcciones.mockResolvedValue({ Estado: false, Respuesta: "Error direcciones" });
  
      await operaciones.Leer_Informacion_Cliente(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        Estado: false,
        Respuesta: "Error direcciones"
      });
    });
  });

  
  describe("Leer_Cliente", () => {
    it("debe leer clientes correctamente", async () => {
      crudDatos.Leer_Datos_Generales.mockResolvedValue({ Estado: true, Respuesta: [{ nombre: "Cliente1" }] });
  
      await operaciones.Leer_Cliente(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        Estado: true,
        Respuesta: [{ nombre: "Cliente1" }]
      });
    });
  
    it("debe manejar error al leer clientes", async () => {
      crudDatos.Leer_Datos_Generales.mockResolvedValue({ Estado: false, Respuesta: "Error al leer" });
  
      await operaciones.Leer_Cliente(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        Estado: false,
        Respuesta: "Error al leer"
      });
    });
  });

  describe("Consultar_Ruc", () => {
    it("debe devolver error si no hay Ruc", async () => {
      req.params = {};
      await operaciones.Consultar_Ruc(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        Estado: false,
        Respuesta: "El RUC es requerido"
      });
    });

    it("debe devolver error si la API responde con error", async () => {
      req.params = { Ruc: "123" };
      apiRuc.ObtenerDatosSimulados.mockResolvedValue({ Estado: false, Respuesta: "No encontrado" });

      await operaciones.Consultar_Ruc(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        Estado: false,
        Respuesta: "No encontrado"
      });
    });

    it("debe devolver datos si la API responde correctamente", async () => {
      req.params = { Ruc: "123" };
      apiRuc.ObtenerDatosSimulados.mockResolvedValue({ Estado: true, Respuesta: { nombre: "Empresa" } });

      await operaciones.Consultar_Ruc(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        Estado: true,
        Respuesta: { nombre: "Empresa" }
      });
    });
  });

});