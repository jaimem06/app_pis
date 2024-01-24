const express = require('express');
const router = express.Router();
const { rutaMasCorta } = require('../utils/crear_grafo');
const buscarNodoMasCercano = require('../utils/nodo_cercano.js');
const buscarNodoPDEMasCercano = require('../utils/nodoPDE.js');
const Nodo = require('../models/nodo');

router.use(express.json());

router.post('/camino_minimo', async (req, res) => {
    let inicio = req.body.inicio;
    let fin = req.body.fin;

    if (!inicio) {
        return res.status(400).send('Debes proporcionar un nodo de inicio');
    }

    try {
        if (inicio.coords && Array.isArray(inicio.coords) && inicio.coords.length === 2) {
            const nodoInicio = await buscarNodoMasCercano(inicio);
            inicio = nodoInicio.properties.nombre; // Usa el nombre del nodo de inicio
        } else if (typeof inicio === 'string') {
            // Comprueba si el nodo de inicio existe en la base de datos
            const nodoInicio = await Nodo.findOne({ 'properties.nombre': inicio });
            if (!nodoInicio) {
                return res.status(404).send('El nodo de inicio no se encontró en la base de datos');
            }
        } else {
            return res.status(400).send('El nodo de inicio debe ser un objeto con la propiedad coords o un string');
        }

        // Si no se proporcionó un nodo final, usa el nodo PDE más cercano
        if (!fin) {
            fin = await buscarNodoPDEMasCercano(inicio);
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