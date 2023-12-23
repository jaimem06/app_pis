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

module.exports = router;