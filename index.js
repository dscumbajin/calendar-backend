const express = require("express");
const { dbConnection } = require("./database/config");
require("dotenv").config();

//Crear el servidor de express
const app = express();

//Base de datos
dbConnection();

// Directorio Púplico
app.use(express.static("public"));

//Lectura y parseo del body
app.use(express.json());

//Rutas
app.use("/api/auth", require("./routers/auth"));

//Escuchar la peticiones del servidor
app.listen(process.env.PORT, () => {
  console.log(`Server start of port ${process.env.PORT}`);
});
