const express = require('express');
const router = express.Router();
const Nodo = require('../models/nodo');
const Haversine = require('../utils/haversine');


// Crear un nuevo nodo
router.post('/', async (req, res) => {
    req.body.properties.conexiones = [];
    const nodo = new Nodo(req.body);
    await nodo.save();
    res.status(201).send(nodo);
});

// Leer todos los nodos
router.get('/read_nodos', async (req, res) => {
  const nodos = await Nodo.find();
  res.send(nodos);
});

// Leer un nodo específico por ID
router.get('/read_nodos_id', async (req, res) => {
  const nodo = await Nodo.findById(req.params.id);
  if (!nodo) {
    return res.status(404).send();
  }
  res.send(nodo);
});

// Actualizar un nodo por ID
router.put('/update_nodo', async (req, res) => {
  const nodo = await Nodo.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!nodo) {
    return res.status(404).send();
  }
  res.send(nodo);
});

// Eliminar un nodo por ID
router.delete('/delete_nodo', async (req, res) => {
  const nodo = await Nodo.findByIdAndDelete(req.params.id);
  if (!nodo) {
    return res.status(404).send();
  }
  res.send(nodo);
});


// Agregar una conexión a un nodo
router.post('/create_conexion', async (req, res) => {
  const { nombreNodoA, nombreNodoB } = req.body;

  // Buscar los nodos en la base de datos por nombre
  const nodoA = await Nodo.findOne({ 'properties.nombre': nombreNodoA });
  const nodoB = await Nodo.findOne({ 'properties.nombre': nombreNodoB });

  // Calcular la distancia Haversine entre los nodos
  const distancia = await Haversine(nodoA, nodoB);

  // Agregar la conexión a ambos nodos
  nodoA.properties.conexiones.push({ nodo: nodoB._id, distancia });
  nodoB.properties.conexiones.push({ nodo: nodoA._id, distancia });

  // Guardar los nodos en la base de datos
  await nodoA.save();
  await nodoB.save();

  // Enviar una respuesta con los nodos actualizados
  res.json({ nodoA, nodoB });
});

module.exports = router;