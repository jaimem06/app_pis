const nodoSchema = require('../models/nodo.js');

let grafo;

async function obtenerGrafo() {
    // Si el grafo ya ha sido creado, devuélvelo
    if (grafo) {
        console.log('El grafo ya ha sido creado');
        return grafo;
    }

    // Si no, crea el grafo
    const nodos = await nodoSchema.find();
    grafo = {};

    // Crea un mapa de nodos para buscar mas rapido por nombre
    const mapaNodos = {};
    for (const nodo of nodos) {
        mapaNodos[nodo.properties.nombre] = nodo;
    }

    for (const nodo of nodos) {
        const nombreNodo = nodo.properties.nombre;
        grafo[nombreNodo] = {};

        if (Array.isArray(nodo.properties.conexiones)) {
            for (const conexion of nodo.properties.conexiones) {
                /* Busca el nodo conectado en el mapa en lugar de hacer una consulta a la base
                de datos esto es mas rapido y evita hacer muchas consultas a la base de datos */
                const nodoConectado = mapaNodos[conexion.nodo];
                grafo[nombreNodo][nodoConectado.properties.nombre] = conexion.distancia;
            }
        } else {
            console.error('nodo.properties.conexiones no es un array');
        }
    }
    return grafo;
}

exports.obtenerGrafo = obtenerGrafo;