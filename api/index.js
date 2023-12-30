const express = require('express');
const port = 3000;
const app = express();
const bodyParser = require('body-parser');
const mejorRuta = require('./routes/mejor_ruta');
const cors = require('cors');
// 
require('./db');
require('./models/User');
//
const authRoutes = require('./routes/authRoutes');
const requireToken = require('./Middlewares/AuthTokenRequired');
//
app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use(bodyParser.json());
app.use(authRoutes);

app.use(express.json());
app.use(mejorRuta); //Version 2
//


app.get('/', requireToken, (req, res) => {
    console.log(req.user);
    res.send(req.user);
})


app.listen(port, () => {
    console.log(`API funcionando en el puerto ${port}`);
})