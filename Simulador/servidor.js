import express, { json } from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath, pathToFileURL } from "url";
import connectToDB from "./Database/conectar.js";
import router_clientes from "./Routers/routers.js";
import logger from "./Servicios/logs.service.js";

// Permitimos la conexión con el .env
dotenv.config();
const PORT = process.env.PORT;

// Obtenemos la dirección de los elementos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Iniciamos express
const app = express();

//Middlewares
app.use(cors()); // Permite la conexión entre el Front y el Backend

// Aumentar el límite de carga a 10 MB
app.use(json({ limit: '10mb' })); // Parear JSON en las solicitudes


//Conectamos a la base de datos de MongoDB
connectToDB();


// Permite mostrar la página web segun la ruta
app.use(express.static(path.join(__dirname)));


// ---------------------- Login ------------------------------

app.get("/", (req,res) =>{
    res.sendFile(path.join(__dirname,"view","index.html"));
});


// ---------------------- Gateway ------------------------------
app.use("/api/clientes",router_clientes);


// Middleware para manejar rutas no existentes
app.use((req, res) => {
    if (req.path.startsWith("/api/")) {
        res.status(400).json({

            Estado: false,
            Respuesta: "Dirección de api errónea"

        });
    } else {
        res.status(404).send("Ruta no encontrada");
    }
});


// Iniciar Servidor
app.listen(PORT, () => {
    logger.info(`Servidor Activo http://localhost:${PORT}`);
    console.log(`Servidor Activo http://localhost:${PORT}`);
});