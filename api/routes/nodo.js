const express = require('express');
const nodoSchema = require('../models/Nodo.js');
const router = express.Router();

router.post('/', (req, res) => {    
    const nodo =nodoSchema(req.body);
    nodo
    .save()
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }	));
}   );

router.get('/', (req, res) => {
    nodoSchema
    .find()
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
});

router.get('/facultad/:facultad', (req, res) => {
    const facultad = req.params.facultad;
    nodoSchema
    .find({Facultad:facultad})
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
});

router.put("/:id", (req, res) => {
    const {id} = req.params;
    const { nombre, latitud, longitud, informacion, facultad, tipo } = req.body;
    nodoSchema
    .updateOne({_id:id},{$set:{nombre: nombre, latitud: latitud, longitud: longitud, informacion: informacion, facultad: facultad, tipo: tipo}},req.body)
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
});   
//borrar nodo
router.delete("/:id", (req, res) => {
    const {id} = req.params;
    nodoSchema
    .deleteOne({_id:id})
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
});

router.post('/agregar-conexion', async (req, res) => {
    const { nodo1, nodo2, distancia } = req.body;

    try {
        const nodoA = await Nodo.find({ nombre: nodo1 });
        const nodoB = await Nodo.find({ nombre: nodo2 });

        if (!nodoA || !nodoB) {
            return res.status(404).send('Nodo no encontrado');
        }

        // Agrega la conexión al nodo A
        nodoA.conexiones.push({
            nodo: nodoB._id,
            distancia: distancia
        });

        // Agrega la conexión al nodo B
        nodoB.conexiones.push({
            nodo: nodoA._id,
            distancia: distancia
        });

        await nodoA.save();
        await nodoB.save();

        res.status(200).send('Conexión agregada con éxito');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.delete('/eliminar-conexion', async (req, res) => {
    const { nodo1, nodo2 } = req.body;

    try {
        const nodoA = await Nodo.findOne({ nombre: nodo1 });
        const nodoB = await Nodo.findOne({ nombre: nodo2 });

        if (!nodoA || !nodoB) {
            return res.status(404).send('Nodo no encontrado');
        }

        // Elimina la conexión del nodo A
        nodoA.conexiones = nodoA.conexiones.filter(conexion => conexion.nodo.toString() !== nodoB._id.toString());

        // Elimina la conexión del nodo B
        nodoB.conexiones = nodoB.conexiones.filter(conexion => conexion.nodo.toString() !== nodoA._id.toString());

        await nodoA.save();
        await nodoB.save();

        res.status(200).send('Conexión eliminada con éxito');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.put('/actualizar-conexion', async (req, res) => {
    const { nodo1, nodo2, nuevaDistancia } = req.body;

    try {
        const nodoA = await Nodo.findOne({ nombre: nodo1 });
        const nodoB = await Nodo.findOne({ nombre: nodo2 });

        if (!nodoA || !nodoB) {
            return res.status(404).send('Nodo no encontrado');
        }

        // Actualiza la distancia de la conexión en el nodo A
        let conexionA = nodoA.conexiones.find(conexion => conexion.nodo.toString() === nodoB._id.toString());
        if (conexionA) {
            conexionA.distancia = nuevaDistancia;
        }

        // Actualiza la distancia de la conexión en el nodo B
        let conexionB = nodoB.conexiones.find(conexion => conexion.nodo.toString() === nodoA._id.toString());
        if (conexionB) {
            conexionB.distancia = nuevaDistancia;
        }

        await nodoA.save();
        await nodoB.save();

        res.status(200).send('Distancia de conexión actualizada con éxito');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/conexiones/:nodo', async (req, res) => {
    const { nodo } = req.params;

    try {
        const nodoBuscado = await Nodo.findOne({ nombre: nodo }).populate('conexiones.nodo');

        if (!nodoBuscado) {
            return res.status(404).send('Nodo no encontrado');
        }

        res.status(200).json(nodoBuscado.conexiones);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;