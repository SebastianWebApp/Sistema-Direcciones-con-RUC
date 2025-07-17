import mongoose from "mongoose";

const {model, models, Schema} = mongoose;

const Informacion_Legal_Esquema = new Schema({

    _id: {type: String, required: true},    
    Subtipo_Contribuyente: {type: String, required: true},
    Telefono: {type: String, required: true},
    Tipo_Actividad: {type: String, required: true},

},{
    collection: "Informacion_Legal",
    versionKey: false,
    timestamps: true 
});

export const Informacion_Legal = models.Informacion_Legal || new model("Informacion_Legal", Informacion_Legal_Esquema);


