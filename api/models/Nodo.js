// models/Nodo.js
const mongoose = require("mongoose");

const nodoSchema =  mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    latitud: {
        type: Number,
        required: true
    },
    longitud: {
        type: Number,
        required: true
    },
    informacion: {
        type: String,
        required: true
    },
    facultad: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
    // Otros campos relevantes para tu aplicación
});

const Nodo = mongoose.model("Nodo", nodoSchema);

module.exports = Nodo;
