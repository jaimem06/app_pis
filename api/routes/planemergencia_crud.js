const express = require('express');
const router = express.Router();
const PlanEmergencia = require('../models/plan_emergencia'); // Asegúrate de que la ruta al modelo es correcta

// Crear un nuevo plan de emergencia
router.post('/', async (req, res) => {
    const nuevoPlan = new PlanEmergencia(req.body);
    try {
        const plan = await nuevoPlan.save();
        res.status(201).json(plan);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Leer todos los planes de emergencia
router.get('/read_plan', async (req, res) => {
    try {
        const planes = await PlanEmergencia.find();
        res.json(planes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Leer un plan de emergencia específico
router.get('/read_plan/:id', getPlanEmergencia, (req, res) => {
    res.json(res.plan);
});

// Actualizar un plan de emergencia
router.put('/update_plan/:id', getPlanEmergencia, async (req, res) => {
    if (req.body.titulo != null) {
        res.plan.titulo = req.body.titulo;
    }
    if (req.body.resumen != null) {
        res.plan.resumen = req.body.resumen;
    }
    if (req.body.imagen != null) {
        res.plan.imagen = req.body.imagen;
    }
    if (req.body.link != null) {
        res.plan.link = req.body.link;
    }
    try {
        const updatedPlan = await res.plan.save();
        res.json(updatedPlan);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Eliminar un plan de emergencia
router.delete('/:id', getPlanEmergencia, async (req, res) => {
    try {
        const { id } = req.params;
        await PlanEmergencia.findByIdAndDelete(id);
        res.json({ message: 'Plan de emergencia eliminado' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware para obtener un plan de emergencia por ID
async function getPlanEmergencia(req, res, next) {
    let plan;
    try {
        plan = await PlanEmergencia.findById(req.params.id);
        if (plan == null) {
            return res.status(404).json({ message: 'No se puede encontrar el plan de emergencia' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.plan = plan;
    next();
}

module.exports = router;