const Nodo = require('../models/nodo');

// Función para calcular la distancia entre dos puntos
function calcularDistancia(coord1, coord2) {
    const dx = coord2[0] - coord1[0];
    const dy = coord2[1] - coord1[1];
    return Math.sqrt(dx * dx + dy * dy);
}

async function nodo_cercanoPDE(longitude, latitude) {
    // Obtén todos los nodos de tipo "PDE"
    const nodos = await Nodo.find({ 'properties.tipo': 'PDE' });

    let nodoMasCercano = null;
    let distanciaMinima = Infinity;

    for (const nodo of nodos) {
        const distancia = calcularDistancia([longitude, latitude], nodo.geometry.coordinates);
        if (distancia < distanciaMinima) {
            nodoMasCercano = nodo;
            distanciaMinima = distancia;
        }
    }

    return nodoMasCercano ? nodoMasCercano.properties.nombre : null;
}

module.exports = nodo_cercanoPDE;