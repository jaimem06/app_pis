const express = require('express');
const router = express.Router();
const { rutaMasCorta } = require('../utils/crear_grafo');
const buscarNodoMasCercano = require('../utils/nodo_cercano.js');
const Nodo = require('../models/nodo');

router.use(express.json());

router.post('/camino_minimo', async (req, res) => {
    let inicio = req.body.inicio;
    const fin = req.body.fin;

    if (!inicio || !fin) {
        return res.status(400).send('Debes proporcionar un nodo de inicio y un nodo final');
    }

    try {
        if (inicio.coords) {
            const nodoInicio = await buscarNodoMasCercano(inicio.coords);
            inicio = nodoInicio.properties.nombre; // Usa el nombre del nodo de inicio
        }

        const nodoFinal = await Nodo.findOne({ 'properties.nombre': fin });

        if (!nodoFinal) {
            return res.status(404).send('El nodo final no se encontró en la base de datos');
        }

        const ruta = await rutaMasCorta(inicio, nodoFinal.properties.nombre);
        res.json(ruta);
    } catch (error) {
        console.error('Error al calcular la ruta más corta:', error);
        res.status(500).send('Error al calcular la ruta más corta');
    }
});

module.exports = router;