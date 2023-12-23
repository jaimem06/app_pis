const express = require('express');
const port = 3000;

const app = express();
const bodyParser = require('body-parser');
const nodoRoutes = require('./routes/nodo');
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

//

app.get('/', requireToken, (req, res) => {
    console.log(req.user);
    res.send(req.user);
})

app.listen(port, () => {
    console.log(`API funcionando en el puerto ${port}`);
})