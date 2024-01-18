const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Brigadista = mongoose.model("Brigadista");
const jwt = require('jsonwebtoken');

require('dotenv').config();

// Registro de un nuevo brigadista
router.post('/register', async (req, res) => {
    console.log('Enviado por el cliente - ', req.body);
    const { nombre, apellido, area, numeroTitular} = req.body;

    // Comprobar si ya existe un brigadista con este número titular
    const existingBrigadista = await Brigadista.findOne({ numeroTitular });
    if (existingBrigadista) {
        return res.status(400).json(["Ya existe un brigadista con este número titular"]);
    }

    const brigadista = new Brigadista({
        nombre,
        apellido,
        area,
        numeroTitular,
        password: hashedPassword
    });

    try {
        await brigadista.save();
        const token = jwt.sign({ _id: brigadista._id }, process.env.JWT_SECRET);
        res.json({ token, brigadista: { _id: brigadista._id, nombre, apellido, area, numeroTitular } });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// Obtener información de un brigadista por su ID
router.get('/brigadista/:id', async (req, res) => {
    const { id } = req.params;
    const brigadista = await Brigadista.findById(id);
    res.json(brigadista);
});

// Obtener todos los brigadistas
router.get('/read_brigadistas', async (req, res) => {
    const brigadistas = await Brigadista.find();
    res.send(brigadistas);
});

// Actualizar información de un brigadista por su ID
router.put('/brigadista/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, area, numeroTitular} = req.body;


    const updatedBrigadista = {
        nombre,
        apellido,
        area,
        numeroTitular,
        password: hashedPassword
    };

    await Brigadista.findByIdAndUpdate(id, updatedBrigadista);
    
    res.json({ message: "Brigadista actualizado correctamente" });
});

// Eliminar un brigadista por su ID
router.delete('/brigadista/:id', async (req, res) => {
    const { id } = req.params;
    await Brigadista.findByIdAndDelete(id);
    res.json({ message: "Brigadista eliminado correctamente" });
});

module.exports = router;
