import {Direcciones} from "../Modelos/Direcciones.js";
import {Encriptacion, Desencriptar} from "./encriptacion.js";
import logger from "./logs.service.js";
import dotenv from "dotenv";

dotenv.config();


export const Crear_Direcciones = async (req, res) =>{

    const { Id, Direccion } = req.body;
    try {

        for (let index = 0; index < Direccion.length; index++) {
            if(Direccion[index].Telefono){
                const Telefono_Encrip = await Encriptacion(Direccion[index].Telefono);

                if(!Telefono_Encrip.Estado){
                    logger.error(`Error al encriptar los datos`);
                    const Respuesta = {
                        Estado: false,
                        Respuesta: "Error al encriptar los datos"
                    }

                    return Respuesta;
                }
                

                logger.info(`Teléfono encriptado: ${Telefono_Encrip.Respuesta}`);
                Direccion[index].Telefono = Telefono_Encrip.Respuesta;
            }

            if(Direccion[index].Calle_Principal){
                const Calle_Principal_Encrip = await Encriptacion(Direccion[index].Calle_Principal);

                if(!Calle_Principal_Encrip.Estado){
                    logger.error(`Error al encriptar los datos`);
                    const Respuesta = {
                        Estado: false,
                        Respuesta: "Error al encriptar los datos"
                    }

                    return Respuesta;
                }
                

                logger.info(`Calle Principal encriptada: ${Calle_Principal_Encrip.Respuesta}`);
                Direccion[index].Calle_Principal = Calle_Principal_Encrip.Respuesta;
            }

            if(Direccion[index].Calle_Secundaria){
                const Calle_Secundaria_Encrip = await Encriptacion(Direccion[index].Calle_Secundaria);

                if(!Calle_Secundaria_Encrip.Estado){
                    logger.error(`Error al encriptar los datos`);
                    const Respuesta = {
                        Estado: false,
                        Respuesta: "Error al encriptar los datos"
                    }

                    return Respuesta;
                }
                

                logger.info(`Calle Secundaria encriptada: ${Calle_Secundaria_Encrip.Respuesta}`);
                Direccion[index].Calle_Secundaria = Calle_Secundaria_Encrip.Respuesta;
            }

            if(Direccion[index].Numero_Casa){
                const Numero_Casa_Encrip = await Encriptacion(Direccion[index].Numero_Casa);

                if(!Numero_Casa_Encrip.Estado){
                    logger.error(`Error al encriptar los datos`);
                    const Respuesta = {
                        Estado: false,
                        Respuesta: "Error al encriptar los datos"
                    }

                    return Respuesta;
                }
                

                logger.info(`Número de Casa encriptado: ${Numero_Casa_Encrip.Respuesta}`);
                Direccion[index].Numero_Casa = Numero_Casa_Encrip.Respuesta;
            }            
        }



        const resultado = await Direcciones.create(
            {
                _id: Id,
                Direccion: Direccion
            }
        );

        logger.info(`Cliente creado correctamente: ${resultado._id}`);
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

export const Actualizar_Direcciones = async (req, res) =>{

    const { Id, Direccion } = req.body;
    try {

        for (let index = 0; index < Direccion.length; index++) {
            if(Direccion[index].Telefono){
                const Telefono_Encrip = await Encriptacion(Direccion[index].Telefono);

                if(!Telefono_Encrip.Estado){
                    logger.error(`Error al encriptar los datos`);
                    const Respuesta = {
                        Estado: false,
                        Respuesta: "Error al encriptar los datos"
                    }

                    return Respuesta;
                }
                

                logger.info(`Teléfono encriptado: ${Telefono_Encrip.Respuesta}`);
                Direccion[index].Telefono = Telefono_Encrip.Respuesta;
            }

            if(Direccion[index].Calle_Principal){
                const Calle_Principal_Encrip = await Encriptacion(Direccion[index].Calle_Principal);

                if(!Calle_Principal_Encrip.Estado){
                    logger.error(`Error al encriptar los datos`);
                    const Respuesta = {
                        Estado: false,
                        Respuesta: "Error al encriptar los datos"
                    }

                    return Respuesta;
                }
                

                logger.info(`Calle Principal encriptada: ${Calle_Principal_Encrip.Respuesta}`);
                Direccion[index].Calle_Principal = Calle_Principal_Encrip.Respuesta;
            }

            if(Direccion[index].Calle_Secundaria){
                const Calle_Secundaria_Encrip = await Encriptacion(Direccion[index].Calle_Secundaria);

                if(!Calle_Secundaria_Encrip.Estado){
                    logger.error(`Error al encriptar los datos`);
                    const Respuesta = {
                        Estado: false,
                        Respuesta: "Error al encriptar los datos"
                    }

                    return Respuesta;
                }
                

                logger.info(`Calle Secundaria encriptada: ${Calle_Secundaria_Encrip.Respuesta}`);
                Direccion[index].Calle_Secundaria = Calle_Secundaria_Encrip.Respuesta;
            }

            if(Direccion[index].Numero_Casa){
                const Numero_Casa_Encrip = await Encriptacion(Direccion[index].Numero_Casa);

                if(!Numero_Casa_Encrip.Estado){
                    logger.error(`Error al encriptar los datos`);
                    const Respuesta = {
                        Estado: false,
                        Respuesta: "Error al encriptar los datos"
                    }

                    return Respuesta;
                }
                

                logger.info(`Número de Casa encriptado: ${Numero_Casa_Encrip.Respuesta}`);
                Direccion[index].Numero_Casa = Numero_Casa_Encrip.Respuesta;
            }            
        }

        const resultado = await Direcciones.findByIdAndUpdate(Id,
            {
                Direccion: Direccion
            },{
            new: true
        });

        logger.info(`Cliente actualizado correctamente: ${resultado._id}`);
        const Respuesta = {
            Estado: true,
            Respuesta: "Cliente actualizado correctamente"
        }

        return Respuesta;

       
    } catch (error) {

        logger.error(`Error al actualizar al cliente: ${error}`);
        const Respuesta = {
            Estado: false,
            Respuesta: "Error al actualizar al cliente"
        }

        return Respuesta;
    }
}

export const Leer_Direcciones = async (req, res) =>{
    try {
        const result = await Direcciones.findById(req.params.Id);

        if (result.length === 0) {
            logger.warn("No se encontraron direcciones");
            return {
                Estado: false,
                Respuesta: "No se encontraron direcciones"
            };
        }

        
        for (let index = 0; index < result.Direccion.length; index++) {
            if(result.Direccion[index].Telefono){
                const Telefono_Desencrip = await Desencriptar(result.Direccion[index].Telefono);

                if(!Telefono_Desencrip.Estado){
                    logger.error(`Error al desencriptar los datos`);
                    return {
                        Estado: false,
                        Respuesta: "Error al desencriptar los datos"
                    };
                }
                

                logger.info(`Teléfono desencriptado: ${Telefono_Desencrip.Respuesta}`);
                result.Direccion[index].Telefono = Telefono_Desencrip.Respuesta;
            }
            if(result.Direccion[index].Calle_Principal){
                const Calle_Principal_Desencrip = await Desencriptar(result.Direccion[index].Calle_Principal);

                if(!Calle_Principal_Desencrip.Estado){
                    logger.error(`Error al desencriptar los datos`);
                    return {
                        Estado: false,
                        Respuesta: "Error al desencriptar los datos"
                    };
                }
                

                logger.info(`Calle Principal desencriptada: ${Calle_Principal_Desencrip.Respuesta}`);
                result.Direccion[index].Calle_Principal = Calle_Principal_Desencrip.Respuesta;
            }
            if(result.Direccion[index].Calle_Secundaria){
                const Calle_Secundaria_Desencrip = await Desencriptar(result.Direccion[index].Calle_Secundaria);

                if(!Calle_Secundaria_Desencrip.Estado){
                    logger.error(`Error al desencriptar los datos`);
                    return {
                        Estado: false,
                        Respuesta: "Error al desencriptar los datos"
                    };
                }
                

                logger.info(`Calle Secundaria desencriptada: ${Calle_Secundaria_Desencrip.Respuesta}`);
                result.Direccion[index].Calle_Secundaria = Calle_Secundaria_Desencrip.Respuesta;
            }
            if(result.Direccion[index].Numero_Casa){
                const Numero_Casa_Desencrip = await Desencriptar(result.Direccion[index].Numero_Casa);

                if(!Numero_Casa_Desencrip.Estado){
                    logger.error(`Error al desencriptar los datos`);
                    return {
                        Estado: false,
                        Respuesta: "Error al desencriptar los datos"
                    };
                }
                

                logger.info(`Número de Casa desencriptado: ${Numero_Casa_Desencrip.Respuesta}`);
                result.Direccion[index].Numero_Casa = Numero_Casa_Desencrip.Respuesta;
            }
        }


        logger.info("Direcciones leídas correctamente");
        return {
            Estado: true,
            Respuesta: result.Direccion
        };

    } catch (error) {
        logger.error(`Error al leer las direcciones: ${error}`);
        return {
            Estado: false,
            Respuesta: "Error al leer las direcciones"
        };
    }
}

export const Eliminar_Direcciones = async (Id) =>{

    try {
        const resultado = await Direcciones.findByIdAndDelete(Id);

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
