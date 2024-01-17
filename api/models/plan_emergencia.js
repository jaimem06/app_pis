const mongoose = require('mongoose');
const  Schema  = mongoose.Schema;

const PlanEmergenciaSchema = new Schema({
    titulo: { 
        type: String,
        required: true }, // Título del plan de emergencia
    resumen: { 
        type: String,
        required: true }, // Resumen del plan
    imagen: { 
        type: String, 
        required: true }, // URL de la imagen relacionada con el plan
    link: { 
        type: String,
         required: true }, // Enlace a más información o recursos relacionados con el plan
}, { collection: 'planes_emergencia' }); // Nombre de la colección

module.exports = mongoose.model('PlanEmergencia', PlanEmergenciaSchema);