const nodoSchema = require('../models/nodo.js');
const dijkstra = require('./dijkstra.js');

async function crearGrafo () {
    // Obtén todos los nodos de la base de datos
    const nodos = await nodoSchema.find();

    // Crea un objeto para representar el grafo
    const grafo = {};

    // Para cada nodo en la base de datos
    for (const nodo of nodos) {
        // Usa el nombre del nodo como la clave en el objeto del grafo
        const nombreNodo = nodo.properties.nombre;

        // Crea una lista de adyacencia para este nodo
        grafo[nombreNodo] = {};

        // Comprueba si nodo.properties.conexiones es un array antes de intentar iterar sobre él
        if (Array.isArray(nodo.properties.conexiones)) {
            // Para cada conexión de este nodo
            for (const conexion of nodo.properties.conexiones) {
                // Busca el nodo al que esta conexión lleva
                const nodoConectado = await nodoSchema.findById(conexion.nodo);

                // Añade el nombre del nodo conectado a la lista de adyacencia
                grafo[nombreNodo][nodoConectado.properties.nombre] = conexion.distancia;
            }
        } else {
            console.error('nodo.properties.conexiones no es un array');
        }
    }

    // Devuelve el grafo
    return grafo;
}

async function rutaMasCorta(inicio, fin) {
    try {
        // Crea el grafo
        const grafo = await crearGrafo();
        console.log('Grafo creado con éxito');

        // Usa el algoritmo de Dijkstra para encontrar la ruta más corta
        const ruta = dijkstra(grafo, inicio, fin);
        console.log('Ruta calculada con éxito: ', ruta);

        // Convierte los nombres de los nodos en la ruta a sus correspondientes coordenadas
        const rutaCoordenadas = [];
        for (const nombreNodo of ruta) {
            const nodo = await nodoSchema.findOne({ 'properties.nombre': nombreNodo });
            rutaCoordenadas.push(nodo.geometry.coordinates);
        }

        return rutaCoordenadas;
    } catch (error) {
        console.error('Error al calcular la ruta más corta: ', error);
        throw error;
    }
}

exports.crearGrafo = crearGrafo;
exports.rutaMasCorta = rutaMasCorta;