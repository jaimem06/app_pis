const express = require('express');
const nodoSchema = require('../models/Nodo.js');
const router = express.Router();
const calcularDistancia = require('../routes/calcularDistancia.js');

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
    const { nodo1, nodo2 } = req.body;

    try {
        const nodoA = await nodoSchema.findOne({ nombre: nodo1 });
        const nodoB = await nodoSchema.findOne({ nombre: nodo2 });

        if (!nodoA || !nodoB) {
            return res.status(404).send('Nodo no encontrado');
        }
        const distancia = await calcularDistancia(nodoA, nodoB);
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

router.post('/eliminar-conexion', async (req, res) => {
    const { conexionId } = req.body;

    try {
        // Buscar el nodo que contiene la conexión
        const nodo = await nodoSchema.findOne({ 'conexiones._id': conexionId });

        if (!nodo) {
            return res.status(404).send('Conexión no encontrada');
        }

        // Elimina la conexión
        nodo.conexiones.id(conexionId).remove();

        await nodo.save();

        res.status(200).send('Conexión eliminada con éxito');
    } catch (error) {
        if (error.name === 'CastError') {
            res.status(400).send('El valor proporcionado no es un ObjectId válido');
        } else {
            res.status(500).send(error.message);
        }
    }
});

router.put('/actualizar-conexion', async (req, res) => {
    const { nodo1, nodo2, nuevaDistancia } = req.body;

    try {
        const nodoA = await nodoSchema.findOne({ nombre: nodo1 });
        const nodoB = await nodoSchema.findOne({ nombre: nodo2 });

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
        const nodoBuscado = await nodoSchema.findOne({ nombre: nodo }).populate('conexiones.nodo');

        if (!nodoBuscado) {
            return res.status(404).send('Nodo no encontrado');
        }

        res.status(200).json(nodoBuscado.conexiones);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;