const Nodo = require('../models/nodo_modelV2');
// Radio de la Tierra en kilómetros
const R = 6378.1;

// Función para convertir grados a radianes
function aRadianes(grados) {
    return grados * (Math.PI / 180);
}

async function Haversine (nodoA, nodoB) {
    // Coordenadas correctamente primero como latitud y luego como longitud
    const latitudA = aRadianes(nodoA.geometry.coordinates[0]);
    const longitudA = aRadianes(nodoA.geometry.coordinates[1]);
    const latitudB = aRadianes(nodoB.geometry.coordinates[0]);
    const longitudB = aRadianes(nodoB.geometry.coordinates[1]);

    const diferenciaLatitud = latitudB - latitudA;
    const diferenciaLongitud = longitudB - longitudA;

    const a = Math.sin(diferenciaLatitud / 2) * Math.sin(diferenciaLatitud / 2) +
              Math.cos(latitudA) * Math.cos(latitudB) *
              Math.sin(diferenciaLongitud / 2) * Math.sin(diferenciaLongitud / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Convertir la distancia a metros y redondear a dos decimales
    const distanciaRedondeada = parseFloat((R * c * 1000).toFixed(2));

    return distanciaRedondeada;
}

module.exports = Haversine ;