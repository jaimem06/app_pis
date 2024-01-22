const express = require('express');
const Brigadista = require('../models/brigadista');
const router = express.Router();

// Crear un nuevo brigadista
router.post('/register', (req, res) => {
    const brigadista = new Brigadista(req.body);
    brigadista.save()
        .then(() => res.status(201).send(brigadista))
        .catch(error => res.status(400).send(error));
});

// Leer todos los brigadistas
router.get('/read_brigadista', (req, res) => {
    Brigadista.find()
        .then(brigadistas => res.send(brigadistas))
        .catch(error => res.status(500).send(error));
});

// Leer un brigadista por ID
router.get('/read_brigadista/:id', (req, res) => {
    Brigadista.findById(req.params.id)
        .then(brigadista => brigadista ? res.send(brigadista) : res.sendStatus(404))
        .catch(error => res.status(500).send(error));
});

// Actualizar un brigadista por ID
router.put('/update/:id', (req, res) => {
    Brigadista.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(brigadista => brigadista ? res.send(brigadista) : res.sendStatus(404))
        .catch(error => res.status(500).send(error));
});

// Eliminar un brigadista por ID
router.delete('/delete/:id', (req, res) => {
    Brigadista.findByIdAndDelete(req.params.id)
        .then(brigadista => brigadista ? res.send(brigadista) : res.sendStatus(404))
        .catch(error => res.status(500).send(error));
});

module.exports = router;