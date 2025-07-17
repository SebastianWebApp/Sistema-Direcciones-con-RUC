import {Crear_Datos_Generales, Actualizar_Datos_Generales, Leer_Datos_Generales, Eliminar_Datos_Generales} from "../Servicios/crud_datos_generales.js";
import {Crear_Informacion, Actualizar_Informacion, Leer_Informacion, Eliminar_Informacion} from "../Servicios/crud_informacion_legal.js";
import {Crear_Direcciones, Actualizar_Direcciones, Leer_Direcciones, Eliminar_Direcciones} from "../Servicios/crud_direcciones.js";
import {Api_Ruc, ObtenerDatosSimulados} from "../Servicios/api_ruc.js";
import logger from "../Servicios/logs.service.js";


export const Crear_Cliente = async (req, res) => {

    const inicio = performance.now(); // Marca de tiempo inicial


    const Crear_Datos_Generales_Cliente = await Crear_Datos_Generales(req,res);

    if(!Crear_Datos_Generales_Cliente.Estado){
        res.status(400).json({    
            Estado: Crear_Datos_Generales_Cliente.Estado,
            Respuesta: Crear_Datos_Generales_Cliente.Respuesta           
        });
    }

    req.body.Id = Crear_Datos_Generales_Cliente.Contenido;
    const Crear_Informacion_Legal = await Crear_Informacion(req,res);

    if(!Crear_Informacion_Legal.Estado){

        const Eliminar = await Eliminar_Datos_Generales(Crear_Datos_Generales_Cliente.Contenido);

        res.status(400).json({    
            Estado: Crear_Informacion_Legal.Estado,
            Respuesta: Crear_Informacion_Legal.Respuesta           
        });
    }

    const Crear_Direcciones_Cliente = await Crear_Direcciones(req,res);
    if(!Crear_Direcciones_Cliente.Estado){

        const Eliminar = await Eliminar_Informacion(Crear_Datos_Generales_Cliente.Contenido);

        res.status(400).json({    
            Estado: Crear_Direcciones_Cliente.Estado,
            Respuesta: Crear_Direcciones_Cliente.Respuesta           
        });
    }

    const fin = performance.now(); // Marca de tiempo final
    const tiempoEjecucion = fin - inicio; // Tiempo de ejecución en miliseg
    logger.info(`Tiempo de ejecución crear cliente: ${tiempoEjecucion} ms`);

   res.status(200).json({
        Estado: Crear_Datos_Generales_Cliente.Estado,
        Respuesta: Crear_Datos_Generales_Cliente.Respuesta
    });


}


export const Actualizar_Cliente = async (req, res) => {

    const inicio = performance.now(); // Marca de tiempo inicial

    const Actualizar_Datos_Generales_Cliente = await Actualizar_Datos_Generales(req,res);

    if(!Actualizar_Datos_Generales_Cliente.Estado){
        res.status(400).json({    
            Estado: Actualizar_Datos_Generales_Cliente.Estado,
            Respuesta: Actualizar_Datos_Generales_Cliente.Respuesta           
        });
    }

    const Actualizar_Informacion_Legal = await Actualizar_Informacion(req,res);

    if(!Actualizar_Informacion_Legal.Estado){
        res.status(400).json({    
            Estado: Actualizar_Informacion_Legal.Estado,
            Respuesta: Actualizar_Informacion_Legal.Respuesta           
        });
    }

    const Actualizar_Direcciones_Cliente = await Actualizar_Direcciones(req,res);
    if(!Actualizar_Direcciones_Cliente.Estado){
        res.status(400).json({    
            Estado: Actualizar_Direcciones_Cliente.Estado,
            Respuesta: Actualizar_Direcciones_Cliente.Respuesta           
        });
    }

    const fin = performance.now(); // Marca de tiempo final
    const tiempoEjecucion = fin - inicio; // Tiempo de ejecución en miliseg
    logger.info(`Tiempo de ejecución actualizar cliente: ${tiempoEjecucion} ms`);

   res.status(200).json({
        Estado: true,
        Respuesta: "Cliente actualizado correctamente"
    });

}

export const Leer_Cliente = async (req, res) => {

    const inicio = performance.now(); // Marca de tiempo inicial

    const Leer_Datos_Generales_Cliente = await Leer_Datos_Generales();

    if(!Leer_Datos_Generales_Cliente.Estado){
        res.status(400).json({    
            Estado: Leer_Datos_Generales_Cliente.Estado,
            Respuesta: Leer_Datos_Generales_Cliente.Respuesta           
        });
    }

    const fin = performance.now(); // Marca de tiempo final
    const duracion = fin - inicio;
    logger.info(`Tiempo de ejecución leer cliente: ${duracion} ms`);

    res.status(200).json({
        Estado: true,
        Respuesta: Leer_Datos_Generales_Cliente.Respuesta
    });

}


export const Leer_Informacion_Cliente = async (req, res) => {

    const inicio = performance.now(); // Marca de tiempo inicial

    const Leer_Informacion_Legal = await Leer_Informacion(req, res);

    if(!Leer_Informacion_Legal.Estado){
        res.status(400).json({    
            Estado: Leer_Informacion_Legal.Estado,
            Respuesta: Leer_Informacion_Legal.Respuesta           
        });
    }

    const Leer_Direcciones_Cliente = await Leer_Direcciones(req, res);

    if(!Leer_Direcciones_Cliente.Estado){
        res.status(400).json({    
            Estado: Leer_Direcciones_Cliente.Estado,
            Respuesta: Leer_Direcciones_Cliente.Respuesta           
        });
    }

    const fin = performance.now(); // Marca de tiempo final
    const duracion = fin - inicio;
    logger.info(`Tiempo de ejecución leer información cliente: ${duracion} ms`);

    res.status(200).json({
        Estado: true,
        Respuesta: {
            Informacion_Legal: Leer_Informacion_Legal.Respuesta,
            Direcciones: Leer_Direcciones_Cliente.Respuesta
        }
    });

}


export const Eliminar_Cliente = async (req, res) => {

    const inicio = performance.now(); // Marca de tiempo inicial

    const {Id} = req.params;

    const Eliminar_Datos_Generales_Cliente = await Eliminar_Datos_Generales(Id);

    if(!Eliminar_Datos_Generales_Cliente.Estado){
        res.status(400).json({    
            Estado: Eliminar_Datos_Generales_Cliente.Estado,
            Respuesta: Eliminar_Datos_Generales_Cliente.Respuesta           
        });
    }

    const Eliminar_Informacion_Legal = await Eliminar_Informacion(Id);

    if(!Eliminar_Informacion_Legal.Estado){
        res.status(400).json({    
            Estado: Eliminar_Informacion_Legal.Estado,
            Respuesta: Eliminar_Informacion_Legal.Respuesta           
        });
    }

    const Eliminar_Direcciones_Cliente = await Eliminar_Direcciones(Id);
    if(!Eliminar_Direcciones_Cliente.Estado){
        res.status(400).json({    
            Estado: Eliminar_Direcciones_Cliente.Estado,
            Respuesta: Eliminar_Direcciones_Cliente.Respuesta           
        });
    }

    const fin = performance.now(); // Marca de tiempo final
    const tiempoEjecucion = fin - inicio; // Tiempo de ejecución en miliseg
    logger.info(`Tiempo de ejecución eliminar cliente: ${tiempoEjecucion} ms`);

   res.status(200).json({
        Estado: true,
        Respuesta: "Cliente eliminado correctamente"
    });

}

export const Consultar_Ruc = async (req, res) => {

    const inicio = performance.now(); // Marca de tiempo inicial

    const { Ruc } = req.params;

    if(!Ruc){
        return res.status(400).json({
            Estado: false,
            Respuesta: "El RUC es requerido"
        });
    }

    // Obtenemos la respuesta de la API
    // const respuesta = await Api_Ruc(Ruc);

    // Simulamos la respuesta de la API
    const respuesta = await ObtenerDatosSimulados(Ruc);

    if(!respuesta.Estado){
        return res.status(400).json({
            Estado: false,
            Respuesta: respuesta.Respuesta
        });
    }

    const fin = performance.now(); // Marca de tiempo final
    const duracion = fin - inicio;
    logger.info(`Tiempo de ejecución consultar RUC: ${duracion} ms`);

    return res.status(200).json({
        Estado: true,
        Respuesta: respuesta.Respuesta
    });

}