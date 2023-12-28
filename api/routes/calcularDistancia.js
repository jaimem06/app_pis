const nodoSchema = require('../models/Nodo.js');

// Función para convertir grados a radianes
function aRadianes(grados) {
    return grados * (Math.PI / 180);
}

// Función para calcular la distancia entre dos nodos utilizando el algoritmo de Haversine
async function calcularDistancia(nodoA, nodoB) {
    const latitudA = aRadianes(nodoA.latitud);
    const longitudA = aRadianes(nodoA.longitud);
    const latitudB = aRadianes(nodoB.latitud);
    const longitudB = aRadianes(nodoB.longitud);

    const diferenciaLatitud = latitudB - latitudA;
    const diferenciaLongitud = longitudB - longitudA;

    const a = Math.sin(diferenciaLatitud / 2) * Math.sin(diferenciaLatitud / 2) +
              Math.cos(latitudA) * Math.cos(latitudB) *
              Math.sin(diferenciaLongitud / 2) * Math.sin(diferenciaLongitud / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Radio de la Tierra en kilómetros
    const R = 6371;

    return R * c;
}

module.exports = calcularDistancia;