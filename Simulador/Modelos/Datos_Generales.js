import mongoose from "mongoose";

const {model, models, Schema} = mongoose;

const Datos_Generales_Esquema = new Schema({

    Ruc: {type: String, required: true},
    Representante_Legal: {type: String, required: true},
    Fecha_Inicio_Actividad: {type: String, required: true},
    Fecha_Cese: {type: String, required: false},
    Fecha_Reinicio_Actividades: {type: String, required: false},
    Fecha_Actualizacion: {type: JSON, required: true},



},{
    collection: "Datos_Generales",
    versionKey: false,
    timestamps: true 
});

export const Datos_Generales = models.Datos_Generales || new model("Datos_Generales", Datos_Generales_Esquema);


