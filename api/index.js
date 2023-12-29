const express = require('express');
const port = 3000;

const app = express();
const bodyParser = require('body-parser');
const nodoCrud = require('./routes/nodo_crud');
const mejorRuta = require('./routes/mejor_ruta');

// 
require('./db');
require('./models/User');
//
const authRoutes = require('./routes/authRoutes');
const requireToken = require('./Middlewares/AuthTokenRequired');

app.use(bodyParser.json());
app.use(authRoutes);

app.use(express.json());
app.use('/nodos', nodoCrud); // Añadido el uso del nuevo router
app.use(mejorRuta); //Version 2

app.get('/', requireToken, (req, res) => {
    console.log(req.user);
    res.send(req.user);
})


app.listen(port, () => {
    console.log(`API funcionando en el puerto ${port}`);
})