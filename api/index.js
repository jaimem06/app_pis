const express = require('express');
const port = 3000;
const app = express();
const bodyParser = require('body-parser');
const nodoCrud = require('./routes/nodo_crud'); // CRUD para nodos
const mejorRuta = require('./routes/mejor_ruta');
const cookieParser = require('cookie-parser'); // Para manejar cookies del login WEB

const cors = require('cors');
// 
require('./db');
require('./models/user');
//
const auth_login_mobile = require('./routes/authlogin_mobile'); // Ruta para el login MOBILE
const auth_login_web = require('./routes/authlogin_web'); // Ruta para el login WEB
const requireToken = require('./Middlewares/AuthTokenRequired');
const register_web = require('./routes/register_web'); // Ruta para el registro WEB
/////// Parte del login WEB ////////
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
///////////////////////////////////

app.use(bodyParser.json());
app.use(auth_login_mobile);
app.use(auth_login_web);
app.use(register_web);
app.use(express.json());
app.use('/nodos', nodoCrud); // Dirección para CRUD de nodos
app.use(mejorRuta); //Version 2
//

app.get('/', requireToken, (req, res) => {
    console.log(req.user);
    res.send(req.user);
})

app.listen(port, () => {
    console.log(`API funcionando en el puerto ${port}`);
})