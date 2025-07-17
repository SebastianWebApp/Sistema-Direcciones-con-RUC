import mongoose from "mongoose";

const {model, models, Schema} = mongoose;

const Direcciones_Esquema = new Schema({

    _id: {type: String, required: true},  
    Direccion: {type: JSON, required: true},

},{
    collection: "Direcciones",
    versionKey: false,
    timestamps: true 
});

export const Direcciones = models.Direcciones || new model("Direcciones", Direcciones_Esquema);


