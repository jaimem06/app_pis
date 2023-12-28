const express = require('express');
const router = express.Router();
const { rutaMasCorta } = require('../routes/grafo'); // Asume que tu función rutaMasCorta está en grafo.js

router.get('/ruta-mas-corta/:inicio/:fin', async (req, res) => {
    const inicio = req.params.inicio;
    const fin = req.params.fin;
   /*  console.log("inicio"+inicio);
    console.log("fin"+fin); */
    try {
        const ruta = await rutaMasCorta(inicio, fin);
       
        res.json(ruta);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;