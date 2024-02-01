const mongoose = require("mongoose");

const brigadistaSchema = new mongoose.Schema({
    titular: [{
        nombresCompletos: {
            type: String,
            required: true
        },
        nroTitular: {
            type: Number,
            required: true
        }
    }],
    reemplazo: [{
        nombresCompletos: {
            type: String,
            required: true
        },
        nroReemplazo: {
            type: Number,
            required: true
        }
    }],
    area: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Brigadista', brigadistaSchema);