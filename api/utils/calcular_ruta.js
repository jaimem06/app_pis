const dijkstra = require('./dijkstra.js');
const nodoSchema = require('../models/nodo.js');
const { obtenerGrafo } = require('./crear_grafo.js');

async function rutaMasCorta(inicio, fin) {
    try {
        // Obtiene el grafo
        console.time('Obtener grafo');
        const grafo = await obtenerGrafo();
        console.log('Grafo obtenido con éxito');
        console.timeEnd('Obtener grafo');
        // Usa el algoritmo de Dijkstra para encontrar la ruta más corta
        const ruta = dijkstra(grafo, inicio, fin);

        // Convierte los nombres de los nodos en la ruta a sus correspondientes coordenadas y tipo
        const rutaCoordenadas = [];
        let totalDistancia = 0;
        for (const nombreNodo of ruta) {
            const nodo = await nodoSchema.findOne({ 'properties.nombre': nombreNodo });
            rutaCoordenadas.push({ nombre: nombreNodo, coordenadas: nodo.geometry.coordinates, tipo: nodo.properties.tipo });

            // Suma las distancias de las conexiones del nodo
            for (const conexion of nodo.properties.conexiones) {
                totalDistancia += conexion.distancia;
            }
        }

        return { ruta: rutaCoordenadas, totalDistancia };
    } catch (error) {
        console.error('Error al calcular la ruta más corta: ', error);
        throw error;
    }
}

exports.rutaMasCorta = rutaMasCorta;