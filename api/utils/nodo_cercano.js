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