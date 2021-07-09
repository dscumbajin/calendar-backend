const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./database/config");
require("dotenv").config();

//Crear el servidor de express
const app = express();

//Base de datos
dbConnection();

//CORS

app.use(cors());

// Directorio Púplico
app.use(express.static("public"));

//Lectura y parseo del body
app.use(express.json());

//Rutas
app.use("/api/auth", require("./routers/auth"));
app.use("/api/events", require("./routers/events"));

//Escuchar la peticiones del servidor
app.listen(process.env.PORT, () => {
  console.log(`Server start of port ${process.env.PORT}`);
});
