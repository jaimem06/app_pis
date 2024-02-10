const express = require('express');
const router = express.Router();
const buscarNodoMasCercano = require('../utils/nodo_cercano');

router.post('/buscar_nodoCercano', async (req, res) => {
    try {
        const inicio = req.body.coords;
        const nodo = await buscarNodoMasCercano({ coords: inicio });
        res.json({ nombreNodoMasCercano: nodo.properties.nombre });
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

module.exports = router;