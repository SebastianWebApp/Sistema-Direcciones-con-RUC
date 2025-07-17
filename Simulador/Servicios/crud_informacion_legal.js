import {Informacion_Legal} from "../Modelos/Informacion_Legal.js";
import {Encriptacion, Desencriptar} from "./encriptacion.js";
import logger from "./logs.service.js";
import dotenv from "dotenv";

dotenv.config();


export const Crear_Informacion = async (req, res) =>{

    const { Id, Subtipo_Contribuyente, Telefono, Tipo_Actividad } = req.body;
    try {

        const Telefono_Encrip = await Encriptacion(Telefono);

        if(!Telefono_Encrip.Estado){
            logger.error(`Error al encriptar los datos`);
            const Respuesta = {
                Estado: false,
                Respuesta: "Error al encriptar los datos"
            }

            return Respuesta;
        }


        logger.info(`Teléfono encriptado: ${Telefono_Encrip.Respuesta}`);
        const resultado = await Informacion_Legal.create(
            {
                _id: Id,
                Telefono: Telefono_Encrip.Respuesta,                
                Subtipo_Contribuyente: Subtipo_Contribuyente,
                Tipo_Actividad: Tipo_Actividad
            }
        );

        logger.info(`Información legal creado correctamente: ${resultado._id}`);
        const Respuesta = {
            Estado: true,
            Respuesta: "Cliente creado correctamente"
        }

        return Respuesta;

       
    } catch (error) {

        logger.error(`Error al crear al cliente: ${error}`);
        const Respuesta = {
            Estado: false,
            Respuesta: "Error al crear al cliente"
        }

        return Respuesta;
    }
}

export const Actualizar_Informacion = async (req, res) =>{

    const { Id, Subtipo_Contribuyente, Telefono, Tipo_Actividad } = req.body;
    try {

        const Telefono_Encrip = await Encriptacion(Telefono);

        if(!Telefono_Encrip.Estado){
            logger.error(`Error al encriptar los datos`);
            const Respuesta = {
                Estado: false,
                Respuesta: "Error al encriptar los datos"
            }

            return Respuesta;
        }


        logger.info(`Teléfono encriptado: ${Telefono_Encrip.Respuesta}`);
        const resultado = await Informacion_Legal.findByIdAndUpdate(Id,
            {
                Telefono: Telefono_Encrip.Respuesta,
                Subtipo_Contribuyente: Subtipo_Contribuyente,
                Tipo_Actividad: Tipo_Actividad
            }
        );

        logger.info(`Información legal actualizado correctamente: ${resultado._id}`);
        const Respuesta = {
            Estado: true,
            Respuesta: "Cliente actualizado correctamente"
        }

        return Respuesta;

       
    } catch (error) {

        logger.error(`Error al actualizar el cliente: ${error}`);
        const Respuesta = {
            Estado: false,
            Respuesta: "Error al actualizar el cliente"
        }

        return Respuesta;
    }
}

export const Leer_Informacion = async (req, res) =>{
    try {

        const result = await Informacion_Legal.findById(req.params.Id);
        if (result.length === 0) {
            logger.warn("No se encontraron información legal");
            const Respuesta = {
                Estado: false,
                Respuesta: "No se encontraron información legal"
            }
            return Respuesta;
        }

        const Telefono_Desencriptado = await Desencriptar(result.Telefono);
        if (!Telefono_Desencriptado.Estado) {
            logger.error(`Error al desencriptar el teléfono: ${Telefono_Desencriptado.Respuesta}`);
            const Respuesta = {
                Estado: false,
                Respuesta: "Error al desencriptar el teléfono"
            }
            return Respuesta;
        }

        const Informacion_Desencriptada = {
            Telefono: Telefono_Desencriptado.Respuesta,
            Subtipo_Contribuyente: result.Subtipo_Contribuyente,
            Tipo_Actividad: result.Tipo_Actividad
        };

      
        logger.info("Información legal leída correctamente");
        return {
            Estado: true,
            Respuesta: Informacion_Desencriptada
        };
    } catch (error) {
        logger.error(`Error al leer la información legal: ${error}`);
        const Respuesta = {
            Estado: false,
            Respuesta: "Error al leer la información legal"
        }
        return Respuesta;
    }
}

export const Eliminar_Informacion = async (Id) =>{

    try {
        const resultado = await Informacion_Legal.findByIdAndDelete(Id);

        if (!resultado) {
            // Si no se encuentra el documento para eliminar
            logger.warn(`No se encontró el cliente con ID: ${Id}`);
            return Respuesta = {
                Estado: false,
                Respuesta: "No se encontró el cliente"
            }
        }

        logger.info(`Se elimino correctamente el cliente: ${Id}`);
        const Respuesta = {
            Estado: true,
            Respuesta: "Se elimino correctamente el cliente"
        }

        return Respuesta;

       
    } catch (error) {
        logger.error(`Error al eliminar el cliente: ${error}`);
        const Respuesta = {
            Estado: false,
            Respuesta: "Error al eliminar el cliente"
        }

        return Respuesta;
    }
}
