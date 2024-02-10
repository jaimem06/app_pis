const Nodo = require('../models/nodo'); // Asegúrate de que esta ruta sea correcta

const buscarNodoMasCercano = async (inicio) => {
    try {
        const coords = inicio.coords;
        const nodo = await Nodo.findOne({
            geometry: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: coords
                    },
                    //Valida que el nodo esté a menos de 100 metros de distancia
                    $maxDistance: 50
                }
            }
        });

        if (!nodo) {
            throw new Error('Estás fuera del campus');
        }
        //console.log('Nodo más cercano:', nodo);
        return nodo;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

module.exports = buscarNodoMasCercano;