const express = require('express');
const port = 3000;
const app = express();
const bodyParser = require('body-parser');
const nodoCrud = require('./routes/nodo_crud'); // CRUD para nodos
const mejorRuta = require('./routes/mejor_ruta');
const cookieParser = require('cookie-parser');

const cors = require('cors');
// 
require('./db');
require('./models/User');
//
const authRoutes = require('./routes/authRoutes');
const requireToken = require('./Middlewares/AuthTokenRequired');
//
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(bodyParser.json());
app.use(authRoutes);



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