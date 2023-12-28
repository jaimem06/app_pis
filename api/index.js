const express = require('express');
const port = 3000;

const app = express();
const bodyParser = require('body-parser');
const nodoRoutes = require('./routes/nodo');
const {crearGrafo} = require('./routes/grafo');
const rutaMasCortaRouter = require('./routes/grafoRouter');
// 
require('./db');
require('./models/User');
//
const authRoutes = require('./routes/authRoutes');
const requireToken = require('./Middlewares/AuthTokenRequired');
//

app.use(bodyParser.json());
app.use(authRoutes);

app.use(express.json());
app.use('/api/nodos',nodoRoutes);
app.use(rutaMasCortaRouter);
//
app.get('/crear-grafo', async (req, res) => {
    try {
        const grafo = await crearGrafo();
        res.json(grafo);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});


app.get('/', requireToken, (req, res) => {
    console.log(req.user);
    res.send(req.user);
})

app.listen(port, () => {
    console.log(`API funcionando en el puerto ${port}`);
})