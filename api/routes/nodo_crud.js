const express = require('express');
const router = express.Router();
const Nodo = require('../models/nodo');
const Haversine = require('../utils/haversine');


// Crear un nuevo nodo
router.post('/', async (req, res) => {
  req.body.properties.conexiones = [];

  // Verifica si ya existe un nodo con el mismo nombre
  const existingNodeByName = await Nodo.findOne({ 'properties.nombre': req.body.properties.nombre });
  if (existingNodeByName) {
    return res.status(400).send({ error: 'Ya existe un nodo con el mismo nombre.' });
  }

  // Verifica si ya existe un nodo con las mismas coordenadas
  const existingNodeByCoordinates = await Nodo.findOne({ 'geometry.coordinates': req.body.geometry.coordinates });
  if (existingNodeByCoordinates) {
    return res.status(400).send({ error: 'Ya existe un nodo con las mismas coordenadas.' });
  }

  const nodo = new Nodo(req.body);
  await nodo.save();
  res.status(201).send(nodo);
});

// Leer todos los nodos
router.get('/read_nodos', async (req, res) => {
  const nodos = await Nodo.find();
  res.send(nodos);
});

// Buscar nodos por nombre, tipo o facultad
const removeAccents = require('remove-accents');

router.get('/buscar_nodos/:query', async (req, res) => {
  const query = req.params.query.toLowerCase();
  const regex = new RegExp(query, 'i'); // 'i' hace que la búsqueda sea insensible a mayúsculas y minúsculas

  const nodos = await Nodo.find({
    $or: [
      { 'properties.nombre': regex },
      { 'properties.tipo': regex },
      { 'properties.facultad': regex }
    ]
  });

  if (!nodos || nodos.length === 0) {
    return res.status(404).send({ message: 'No se encontraron nodos con la consulta proporcionada.' });
  }

  res.send(nodos);
});

// Actualizar un nodo por ID
router.put('/update_nodo/:id', async (req, res) => {
  // Extraer los campos que deseas actualizar de req.body
  const { nombre, facultad, tipo, geometry } = req.body;

  // Buscar el nodo a actualizar por su ID
  const nodo = await Nodo.findById(req.params.id);

  if (!nodo) {
    return res.status(404).send({ message: 'No se encontró un nodo con el ID proporcionado.' });
  }

  // Guardar el nombre anterior del nodo para actualizar las conexiones
  const nombreAnterior = nodo.properties.nombre;

  // Actualizar los campos del nodo
  nodo.properties.nombre = nombre;
  nodo.properties.facultad = facultad;
  nodo.properties.tipo = tipo;
  nodo.geometry = geometry;

  // Recalcular las distancias de las conexiones y actualizar los nombres
  for (let conexion of nodo.properties.conexiones) {
    const nodoConectado = await Nodo.findOne({ 'properties.nombre': conexion.nodo });
    if (nodoConectado) {

      // `Haversine` es una función que devuelve una promesa
      let distancia = await Haversine(nodo, nodoConectado);

      // Ahora `distancia` debería ser un número, no una promesa
      conexion.distancia = distancia;

      // Encuentra la conexión correspondiente en el nodo conectado y actualiza su distancia y nombre
      let conexionInversa = nodoConectado.properties.conexiones.find(c => c.nodo === nombreAnterior);
      if (conexionInversa) {
        conexionInversa.distancia = distancia;
        conexionInversa.nodo = nombre; // Actualizar el nombre del nodo
        await nodoConectado.save();
      }
    }
  }

  // Guardar el nodo con las distancias de las conexiones actualizadas
  await nodo.save();

  res.send(nodo);
});

// Eliminar un nodo por coordenadas
router.delete('/delete_nodo', async (req, res) => {
  const nodo = await Nodo.findOne({ "geometry.coordinates": req.body.coordinates });
  if (!nodo) {
    return res.status(404).send();
  }
  // Para borrar el nodo y sus conexiones con otros nodos:
  // Buscar todos los nodos que tienen una conexión con el nodo que se está eliminando
  const connectedNodos = await Nodo.find({ "properties.conexiones.nodo": nodo.properties.nombre });

  // Eliminar la conexión con el nodo que se está eliminando
  for (let connectedNodo of connectedNodos) {
    const index = connectedNodo.properties.conexiones.findIndex(conexion => conexion.nodo === nodo.properties.nombre);
    if (index > -1) {
      connectedNodo.properties.conexiones.splice(index, 1);
      await connectedNodo.save();
    }
  }
  await Nodo.deleteOne({ _id: nodo._id });

  res.send(nodo);
});

// Agregar una conexión a un nodo
router.post('/create_conexion', async (req, res) => {
  const { nombreNodoA, nombreNodoB } = req.body;

  // Buscar los nodos en la base de datos por nombre
  const nodoA = await Nodo.findOne({ 'properties.nombre': nombreNodoA });
  const nodoB = await Nodo.findOne({ 'properties.nombre': nombreNodoB });

  // Verificar que ambos nodos existen
  if (!nodoA || !nodoB) {
    return res.status(404).send({ message: 'No se encontró uno o ambos nodos.' });
  }

  // Calcular la distancia Haversine entre los nodos
  const distancia = await Haversine(nodoA, nodoB);

  // Agregar la conexión a ambos nodos
  nodoA.properties.conexiones.push({ nodo: nodoB.properties.nombre, idNodo: nodoB._id, distancia });
  nodoB.properties.conexiones.push({ nodo: nodoA.properties.nombre, idNodo: nodoA._id, distancia });

  // Guardar los nodos en la base de datos
  await nodoA.save();
  await nodoB.save();

  // Enviar una respuesta con los nodos actualizados
  res.json({ nodoA, nodoB });
});

module.exports = router;