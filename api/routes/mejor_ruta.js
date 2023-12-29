const express = require('express');
const router = express.Router();
const grafo = require('../utils/crear_grafo');

router.use(express.json()); // Para poder parsear el cuerpo de las solicitudes POST

router.post('/camino_minimo', async (req, res) => {
    const inicio = req.body.inicio;
    const fin = req.body.fin;

    if (!inicio || !fin) {
        return res.status(400).send('Debes proporcionar un nodo de inicio y un nodo final');
    }

    try {
        const ruta = await grafo.rutaMasCorta(inicio, fin);
        const coordenadas = ruta.map(nodo => ({nombre: nodo, coordenadas: nodo.coordenadas}));
        res.json(coordenadas);
    } catch (error) {
        res.status(500).send('Hubo un error al calcular la ruta más corta');
    }
});

module.exports = router;