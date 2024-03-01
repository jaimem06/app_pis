const Nodo = require('../models/nodo');
// Radio de la Tierra en kilómetros
const R = 6378.1;
// Función para convertir grados a radianes
function aRadianes(grados) {
    return grados * (Math.PI / 180);
}
async function Haversine (nodoA, nodoB) {
    // Coordenadas correctamente primero como latitud y luego como longitud
    const latitudA = aRadianes(nodoA.geometry.coordinates[0]);                      // 1
    const longitudA = aRadianes(nodoA.geometry.coordinates[1]);                     // 1
    const latitudB = aRadianes(nodoB.geometry.coordinates[0]);                      // 1    
    const longitudB = aRadianes(nodoB.geometry.coordinates[1]);                     // 1
    const diferenciaLatitud = latitudB - latitudA;                                  // 1
    const diferenciaLongitud = longitudB - longitudA;                               // 1

    const a = Math.sin(diferenciaLatitud / 2) * Math.sin(diferenciaLatitud / 2) +   // 1    
              Math.cos(latitudA) * Math.cos(latitudB) *
              Math.sin(diferenciaLongitud / 2) * Math.sin(diferenciaLongitud / 2);  // 1
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Convertir la distancia a metros y redondear a dos decimales
    const distanciaRedondeada = parseFloat((R * c * 1000).toFixed(2));              // 1           

    return distanciaRedondeada;
}                                                                                // T(n) = 9
module.exports = Haversine ;
// T(n) = 9
// T(n) = O(1)
/* La complejidad de la función Haversine es constante,
ya que no depende de ninguna variable de entrada. */

// T(n) = 9// T(n) = 9// T(n) = 9// T(n) = 9// T(n) = 9// T(n) = 9// T(n) = 9// T(n) = 9// T(n) = 9// T(n) = 9// T(n) = 9