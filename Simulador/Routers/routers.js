import { Router } from 'express';
import {Crear_Cliente, Actualizar_Cliente, Leer_Cliente, Leer_Informacion_Cliente, Eliminar_Cliente, Consultar_Ruc} from "../Controlador/operaciones.js"
const router_clientes = Router();


router_clientes.post('/Crear', Crear_Cliente);
router_clientes.delete('/Eliminar/:Id', Eliminar_Cliente);
router_clientes.put('/Actualizar', Actualizar_Cliente);
router_clientes.get('/Leer', Leer_Cliente);
router_clientes.get('/LeerInformacion/:Id', Leer_Informacion_Cliente);
router_clientes.get('/ConsultarRuc/:Ruc', Consultar_Ruc);
export default router_clientes;

