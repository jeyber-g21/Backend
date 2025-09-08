"use strict";

const express = require("express");
const connectDB = require("./index");
const articleRoutes = require("./routes/article");
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");

const app = express();

// Middlewares
app.use(express.json());
//COnfig CORS
app.use(cors(corsOptions));
// Conexión a MongoDB
connectDB();
//Subir Imagenes
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Rutas
app.use("/api", articleRoutes);

// Inicio del servidor
app.listen(3000, () => {
  console.log("🚀 Servidor corriendo en http://localhost:3000");
});
