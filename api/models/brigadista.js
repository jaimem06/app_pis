const mongoose = require("mongoose");

const brigadistaSchema = new mongoose.Schema({
    titular: [{
        nombresComplesto: {
            type: String,
            required: true
        },
        nroTitular: {
            type: Number,
            required: true
        }
    }],
    
    reemplazo: [{
        nombresComplesto: {
            type: String,
            required: true
        },
        nroReemplazo: {
            type: Number,
            required: true
        } 
    }],
    
    area:{
        type: String,
        required: true
    }
});

mongoose.model("Brigadista", brigadistaSchema);

