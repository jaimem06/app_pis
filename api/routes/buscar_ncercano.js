const express = require('express');
const router = express.Router();
const buscarNodoMasCercano = require('../utils/nodo_cercano');

router.post('/buscar_nodoCercano', async (req, res) => {
    try {
        const inicio = req.body.coords;
        const resultado = await buscarNodoMasCercano({ coords: inicio });

        // Si la respuesta contiene un mensaje de error, envía una respuesta con el mensaje de error
        if (resultado.error) {
            res.status(400).json({ error: resultado.error });
            return;
        }

        res.json({ nombreNodoMasCercano: resultado.properties.nombre });
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

module.exports = router;