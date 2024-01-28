const mongoose = require('mongoose');

const PushTokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    token: {
        type: String,
        required: true
    }
});

const PushToken = mongoose.model('Notificacion_Token', PushTokenSchema);

module.exports = PushToken;