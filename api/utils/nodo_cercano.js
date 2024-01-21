const Nodo = require('../models/nodo'); // Asegúrate de que esta ruta sea correcta

const buscarNodoMasCercano = async (coords) => {
    try {
        const nodo = await Nodo.findOne({
            geometry: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [coords.longitude, coords.latitude]
                    }
                }
            }
        });

        if (!nodo) {
            throw new Error('No se encontró ningún nodo cercano');
        }

        return nodo;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

module.exports = buscarNodoMasCercano;