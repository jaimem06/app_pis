const express = require('express');
const port = 3000;
const app = express();
const bodyParser = require('body-parser');
const nodoCrud = require('./routes/nodo_crud'); // CRUD para nodos
const mejorRuta = require('./routes/mejor_ruta');

const cors = require('cors');
// 
require('./db');
require('./models/user');
//
const auth_login_mobile = require('./routes/authlogin_mobile'); // Ruta para el login MOBILE
const auth_login_web = require('./routes/authlogin_web'); // Ruta para el login WEB
const requireToken = require('./Middlewares/AuthTokenRequired');
const usuario_crud = require('./routes/usuario_crud'); // Ruta para el registro WEB

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
//

app.get('/', requireToken, (req, res) => {
    console.log(req.user);
    res.send(req.user);
})

app.listen(port, () => {
    console.log(`API funcionando en el puerto ${port}`);
})