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
                    //Valida que el nodo esté a menos de 50 metros de distancia
                    $maxDistance: 50
                }
            }
        });

        if (!nodo) {
            // Devuelve un objeto con un mensaje de error
            return { error: 'Te encuentras fuera del campus.' };
        }
        //console.log('Nodo más cercano:', nodo);
        return nodo;
    } catch (error) {
        console.error(error);
        // En caso de ocurrir un error inesperado
        return { error: 'Ocurrió un error al buscar el nodo más cercano' };
    }
};

module.exports = buscarNodoMasCercano;