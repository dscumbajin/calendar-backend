const express = require('express');
require('dotenv').config();


//Crear el servidor de express
const app = express();

// Directorio Púplico
app.use( express.static('public'));

//Lectura y parseo del body
app.use(express.json());

//Rutas
app.use('/api/auth', require('./routers/auth'));


//Escuchar la peticiones del servidor
app.listen(process.env.PORT, ()=>{
    console.log(`Server start of port ${process.env.PORT}`);
});