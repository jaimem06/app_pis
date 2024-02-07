const express = require('express');
const port = 3000;
const app = express();
const bodyParser = require('body-parser');
const nodoCrud = require('./routes/nodo_crud');
const mejorRuta = require('./routes/mejor_ruta');
const { simularSismo } = require('./routes/simularSismo');
const token_notificacion = require('./routes/token_notificacion');
const enviar_notificacion = require('./routes/notificacion');
const openPort = require('./routes/purtocom').openPort;
const cors = require('cors');
// 
require('./db');
require('./models/user');
//
const recuperarCuenta = require('./routes/recuperar_cuenta');
const auth_login_mobile = require('./routes/authlogin_mobile'); // Ruta para el login MOBILE
const auth_login_web = require('./routes/authlogin_web'); // Ruta para el login WEB
const requireToken = require('./Middlewares/AuthTokenRequired');
const usuario_crud = require('./routes/usuario_crud'); // Ruta para el registro WEB
const planemergencia_crud = require('./routes/planemergencia_crud'); // Ruta para el CRUD de planes de emergencia
const brigadista_crud = require('./routes/brigadista_crud'); // Ruta para el CRUD de brigadistas

// Crea el grafo al iniciar el api
const { obtenerGrafo } = require('./utils/crear_grafo');
async function iniciar() {
    try {
        console.log('Creando grafo...');
        await obtenerGrafo();
        console.log('Grafo creado con éxito');
    } catch (error) {
        console.error('Error al crear el grafo: ', error);
        throw error;
    }
}
iniciar();

// Llama a la función openPort cada 1 segundos
setInterval(async () => {
    openPort();
    const sismo = await simularSismo();
    console.log(sismo);
//Pa que no este jodiendo
}, 1000000); // Cada mil segundos = 16.6 minutos

app.use(cors({
    // Páginas que pueden acceder al API
    origin: ['https://fredunl.unlmaps.com', 'http://localhost:5173']
}));

app.use(bodyParser.json());
app.use(auth_login_mobile);
app.use(auth_login_web);
app.use(usuario_crud);
app.use(express.json());
app.use('/nodos', nodoCrud); // Dirección para CRUD de nodos
app.use(mejorRuta); //Version 2
app.use('/planemergencia', planemergencia_crud);
app.use('/brigadista', brigadista_crud); // CRUD para brigadistas
app.use(token_notificacion); //Guardar token de notificaciones
app.use(enviar_notificacion); // Enviar notificaciones
app.use(recuperarCuenta); // Recuperar cuenta
app.get('/', requireToken, (req, res) => {
    console.log(req.user);
    res.send(req.user);
})

app.listen(port, () => {
    console.log(`API funcionando en el puerto ${port}`);
})