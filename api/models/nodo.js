const mongoose = require('mongoose');
const { Schema } = mongoose;

const NodoSchema = new Schema({
    type: { type: String, default: 'Feature' },
    properties: {
        nombre: String,
        facultad: String,
        tipo: String,
        conexiones: [{
            nodo: String, // Cambiado de Schema.Types.ObjectId a String
            distancia: Number
        }]
    },
    geometry: {
        type: {
            type: String,
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
    //Nombre de la collection
}, { collection: 'nodos' });

module.exports = mongoose.model('Nodo', NodoSchema);