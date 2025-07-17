import {Datos_Generales} from "../Modelos/Datos_Generales.js";
import {Encriptacion, Desencriptar} from "./encriptacion.js";
import logger from "./logs.service.js";
import dotenv from "dotenv";

dotenv.config();


export const Crear_Datos_Generales = async (req, res) =>{

    const { Ruc, Representante_Legal, Fecha_Inicio_Actividad, Fecha_Cese, Fecha_Reinicio_Actividades, Fecha_Actualizacion } = req.body;
    try {

        const Ruc_Encrip = await Encriptacion(Ruc);

        if(!Ruc_Encrip.Estado){
            logger.error(`Error al encriptar los datos`);
            const Respuesta = {
                Estado: false,
                Respuesta: "Error al encriptar los datos"
            }

            return Respuesta;
        }


        logger.info(`Ruc encriptado: ${Ruc_Encrip.Respuesta}`);
        const resultado = await Datos_Generales.create(
            {
                Ruc: Ruc_Encrip.Respuesta,
                Representante_Legal: Representante_Legal,
                Fecha_Inicio_Actividad: Fecha_Inicio_Actividad,
                Fecha_Cese: Fecha_Cese,
                Fecha_Reinicio_Actividades: Fecha_Reinicio_Actividades,
                Fecha_Actualizacion: Fecha_Actualizacion
            }
        );

        logger.info(`Datos generales del cliente creados correctamente: ${resultado._id}`);
        const Respuesta = {
            Estado: true,
            Respuesta: "Cliente creado correctamente",
            Contenido: resultado._id.toString()
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

export const Actualizar_Datos_Generales = async (req, res) =>{

    const { Id,Representante_Legal, Fecha_Inicio_Actividad, Fecha_Cese, Fecha_Reinicio_Actividades, Fecha_Actualizacion } = req.body;

    try {
        
        const resultado = await Datos_Generales.findByIdAndUpdate(
            Id , // Condición de búsqueda
            {   
                Representante_Legal: Representante_Legal,
                Fecha_Inicio_Actividad: Fecha_Inicio_Actividad,
                Fecha_Cese: Fecha_Cese,
                Fecha_Reinicio_Actividades: Fecha_Reinicio_Actividades,
                Fecha_Actualizacion: Fecha_Actualizacion
            },{
            new: true
        });

        logger.info(`Datos generales del cliente actualizado correctamente: ${resultado._id}`);

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

export const Leer_Datos_Generales = async () =>{

    try {
        const result = await Datos_Generales.find({})
        .sort({ createdAt: -1 }) // Orden descendente por fecha (los más recientes primero).
        // .limit(5); // Limitar a 5 resultados.

          // Desencriptar todos los RUCs
        const resultadoConRucDesencriptado = await Promise.all(
            result.map(async (doc) => {
                const rucDesencriptado = await Desencriptar(doc.Ruc);
                return {
                    ...doc.toObject(), // Convierte el documento de Mongoose a objeto plano
                    Ruc: rucDesencriptado.Respuesta
                };
            })
        );

        logger.info(`Datos generales del cliente leídos correctamente`);

        const Respuesta = {
            Estado: true,
            Respuesta: resultadoConRucDesencriptado
        };

        return Respuesta;

       
    } catch (error) {
        logger.error(`Error al leer los clientes: ${error}`);
        const Respuesta = {
            Estado: false,
            Respuesta: "Error al leer los clientes"
        }

        return Respuesta;
    }
}

export const Eliminar_Datos_Generales = async (Id) =>{

    try {
        const resultado = await Datos_Generales.findByIdAndDelete(Id);

        if (!resultado) {
            logger.warn(`No se encontró el cliente con ID: ${Id}`);
            // Si no se encuentra el documento para eliminar
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
