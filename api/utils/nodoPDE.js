const mongoose = require('mongoose');
const Nodo = require('../models/nodo');

async function buscarNodoPDEMasCercano(nombreInicio) {
    try {
        // Obtener el nodo de inicio por su nombre
        const inicio = await Nodo.findOne({ 'properties.nombre': nombreInicio });

        // Objeto para almacenar las distancias desde el nodo de inicio a cada nodo
        let distancias = {};
        // Crear un objeto para almacenar los nodos visitados
        let visitados = {};
        // Crear un objeto para almacenar los nodos previos en el camino más corto
        let previos = {};

        // Obtener todos los nodos
        const nodos = await Nodo.find();

        // Inicializar los objetos
        for (let nodo of nodos) {
            if (nodo._id.toString() === inicio._id.toString()) {
                distancias[nodo._id] = 0;
            } else {
                distancias[nodo._id] = Infinity;
            }
            previos[nodo._id] = null;
        }

        // Mientras haya nodos no visitados
        while (Object.keys(visitados).length < nodos.length) {
            // Obtener el nodo no visitado con la distancia más corta
            let nodoActual = obtenerNodoNoVisitadoConDistanciaMinima(distancias, visitados);

            // Marcar el nodo como visitado
            visitados[nodoActual] = true;

            // Si el nodo es de tipo PDE, hemos encontrado el nodo PDE más cercano
            if (nodos.find(nodo => nodo._id.toString() === nodoActual).properties.tipo === 'PDE') {
                return nodos.find(nodo => nodo._id.toString() === nodoActual).properties.nombre;
            }

            // Actualizar las distancias a los nodos vecinos
            for (let conexion of nodos.find(nodo => nodo._id.toString() === nodoActual).properties.conexiones) {
                let nodoVecino = await Nodo.findOne({ 'properties.nombre': conexion.nodo });
                let distancia = distancias[nodoActual] + conexion.distancia;

                if (distancia < distancias[nodoVecino._id]) {
                    distancias[nodoVecino._id] = distancia;
                    previos[nodoVecino._id] = nodoActual;
                }
            }
        }
    } catch (error) {
        console.error('Error al buscar el nodo PDE más cercano:', error);
        throw error;
    }
}

function obtenerNodoNoVisitadoConDistanciaMinima(distancias, visitados) {
    let nodoMinimo = null;
    let distanciaMinima = Infinity;

    for (let nodo in distancias) {
        if (!visitados[nodo] && distancias[nodo] < distanciaMinima) {
            nodoMinimo = nodo;
            distanciaMinima = distancias[nodo];
        }
    }

    return nodoMinimo;
}

module.exports = buscarNodoPDEMasCercano;