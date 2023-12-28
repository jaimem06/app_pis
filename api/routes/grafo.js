const nodoSchema = require('../models/Nodo.js');
const dijkstra = require('../routes/dijkstra.js');


async function crearGrafo() {
    // Obtén todos los nodos de la base de datos
    const nodos = await nodoSchema.find();

    // Crea un objeto para representar el grafo
    const grafo = {};

    // Para cada nodo en la base de datos
    for (const nodo of nodos) {
        // Usa el nombre del nodo como la clave en el objeto del grafo
        const nombreNodo = nodo.nombre;

        // Crea una lista de adyacencia para este nodo
        grafo[nodo.nombre] = {};

        // Para cada conexión de este nodo
        for (const conexion of nodo.conexiones) {
            // Busca el nodo al que esta conexión lleva
            const nodoConectado = await nodoSchema.findById(conexion.nodo);

            // Añade el nombre del nodo conectado a la lista de adyacencia
            grafo[nodo.nombre][nodoConectado.nombre]= conexion.distancia;
        }
    }

    // Devuelve el grafo
    return grafo;
}

async function rutaMasCorta(inicio, fin) {
    // Crea el grafo
     const grafo = await crearGrafo();
  
   // Usa el algoritmo de Dijkstra para encontrar la ruta más corta
    const ruta = await dijkstra(grafo, inicio, fin);
 /*    console.log("ruta: " + ruta.join(" -> ")); */
 
    return ruta;
}

exports.crearGrafo = crearGrafo;
exports.rutaMasCorta = rutaMasCorta;