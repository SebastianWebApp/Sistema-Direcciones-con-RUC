import logger from "./logs.service.js";
import dotenv from "dotenv";
import fetch from "node-fetch";
dotenv.config();

const API_SRI = process.env.API_SRI;


export const Api_Ruc = async (Ruc) => {

    try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+API_SRI);
        myHeaders.append("Accept", "application/json");

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        const response = await fetch(`https://webservices.ec/api/ruc/${Ruc}`, requestOptions);
        const result = await response.json();

        if (result.error === true) {
            const errorMsg = result?.data?.error || "RUC no válido";
            logger.error(`Error al consultar el RUC: ${errorMsg}`);
            return{
                Estado: false,
                Respuesta: errorMsg
            };
        }

        logger.info(`Consulta realizada correctamente para el RUC: ${Ruc}`);
        return{
            Estado: true,
            Respuesta: result.data // solo devolvemos el data limpio
        };

    } catch (error) {
        logger.error(`Error al consultar el RUC: ${error}`);
        return {
            Estado: false,
            Respuesta: "Error al consultar el RUC"
        };
    }
};


export const ObtenerDatosSimulados = async (ruc) => {
    // Simular un pequeño delay
    await new Promise((res) => setTimeout(res, 500));

    if (!ruc || ruc.length < 13) {
        return {
            Estado: false,
            Respuesta: "RUC min. 13"            
        };
    }

    if (ruc !== "0992879955001" && ruc !== "0992879955002") {
        return {
            Estado: false,
            Respuesta: "Incorrect ruc"            
        };
    }

    if( ruc === "0992879955002") {
        return {

            Estado: true,
            Respuesta: {

                main: [
                    {
                        numeroRuc: "0992879955002",
                        razonSocial: "ACCROACHCODE S.A.",
                        estadoContribuyenteRuc: "ACTIVO",
                        actividadEconomicaPrincipal:
                            "ACTIVIDADES DE PLANIFICACIÓN Y DISEÑO DE SISTEMAS INFORMÁTICOS QUE INTEGRAN EQUIPO Y PROGRAMAS INFORMÁTICOS Y TECNOLOGÍA DE LAS COMUNICACIONES.",
                        tipoContribuyente: "SOCIEDAD",
                        regimen: "GENERAL",
                        categoria: null,
                        obligadoLlevarContabilidad: "SI",
                        agenteRetencion: "NO",
                        contribuyenteEspecial: "NO",
                        informacionFechasContribuyente: {
                            fechaInicioActividades: "2014-10-08 00:00:00.0",
                            fechaCese: "",
                            fechaReinicioActividades: "",
                            fechaActualizacion: "2024-07-15 22:50:08.0",
                        },
                        representantesLegales: [
                            {
                                identificacion: "0924349095",
                                nombre: "BUITRON CARRASCO GUSTAVO ENRIQUE"
                            }
                        ],
                        motivoCancelacionSuspension: null,
                        contribuyenteFantasma: "NO",
                        transaccionesInexistente: "NO"
                    }
                ],
                addit: [
                    {
                        nombreFantasiaComercial: "PAGOS & FACTURAS",
                        tipoEstablecimiento: "MAT",
                        direccionCompleta: "GUAYAS / GUAYAQUIL / TARQUI / VICTOR EMILIO ESTRADA 706-B Y FICUS",
                        estado: "ABIERTO",
                        numeroEstablecimiento: "001",
                        matriz: "SI"
                    },
                    {
                        nombreFantasiaComercial: "ACCROACHCODE",
                        tipoEstablecimiento: "OFI",
                        direccionCompleta: "GUAYAS / GUAYAQUIL / GUAYAQUIL / FICUS 706-B Y VICTOR EMILIO ESTRADA",
                        estado: "CERRADO",
                        numeroEstablecimiento: "002",
                        matriz: "NO"
                    }
                ]  
            }      
        };
    }

     if( ruc === "0992879955001") {
        return {

            Estado: true,
            Respuesta: {

                main: [
                    {
                        numeroRuc: "0992879955001",
                        razonSocial: "ACCROACHCODE S.A.",
                        estadoContribuyenteRuc: "ACTIVO",
                        actividadEconomicaPrincipal:
                            "ACTIVIDADES DE PLANIFICACIÓN Y DISEÑO DE SISTEMAS INFORMÁTICOS QUE INTEGRAN EQUIPO Y PROGRAMAS INFORMÁTICOS Y TECNOLOGÍA DE LAS COMUNICACIONES.",
                        tipoContribuyente: "SOCIEDAD",
                        regimen: "GENERAL",
                        categoria: null,
                        obligadoLlevarContabilidad: "SI",
                        agenteRetencion: "NO",
                        contribuyenteEspecial: "NO",
                        informacionFechasContribuyente: {
                            fechaInicioActividades: "2014-10-08 00:00:00.0",
                            fechaCese: "",
                            fechaReinicioActividades: "",
                            fechaActualizacion: "2024-07-15 22:50:08.0",
                        },
                        representantesLegales: [
                            {
                                identificacion: "0924349095",
                                nombre: "BUITRON CARRASCO GUSTAVO ENRIQUE"
                            }
                        ],
                        motivoCancelacionSuspension: null,
                        contribuyenteFantasma: "NO",
                        transaccionesInexistente: "NO"
                    }
                ],
                addit: [
                    {
                        nombreFantasiaComercial: "PAGOS & FACTURAS",
                        tipoEstablecimiento: "MAT",
                        direccionCompleta: "GUAYAS / GUAYAQUIL / TARQUI / VICTOR EMILIO ESTRADA 706-B Y FICUS",
                        estado: "ABIERTO",
                        numeroEstablecimiento: "001",
                        matriz: "SI"
                    },
                    {
                        nombreFantasiaComercial: "ACCROACHCODE",
                        tipoEstablecimiento: "OFI",
                        direccionCompleta: "GUAYAS / GUAYAQUIL / GUAYAQUIL / FICUS 706-B Y VICTOR EMILIO ESTRADA",
                        estado: "CERRADO",
                        numeroEstablecimiento: "002",
                        matriz: "NO"
                    }
                ]  
            }      
        };
    }
};
