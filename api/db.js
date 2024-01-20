const mongoose = require('mongoose');
require('dotenv').config();
//Base de datos
//Hola Mundo
//Mongo DB
mongoose.connect(process.env.mongo_URL).then(
    () => {
        console.log('Conexion exitosa a la base de datos');
    }
)
    .catch((err) => {
        console.log(`No se pudo conectar con la base de datos ` + err);
    })