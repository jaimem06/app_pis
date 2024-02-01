const express = require('express');
const router = express.Router();
const PushToken = require('../models/notificacion_token');

router.post('/guardar_tokenNotification', async (req, res) => {
    const { userId, token } = req.body;

    if (!userId || !token) {
        return res.status(400).send({ success: false, message: 'Token o userId vacio' });
    }

    // Comprobar que el token no se haya guardado previamente para el mismo usuario
    const existingToken = await PushToken.findOne({ userId });
    if (existingToken) {
        // Si el token existente es diferente al nuevo token, actualízalo
        if (existingToken.token !== token) {
            existingToken.token = token;
            await existingToken.save();
            return res.send({ success: true, message: 'Token actualizado' });
        } else {
            // Si el token existente es igual al nuevo token, no hagas nada
            return res.send({ success: true, message: 'El token ya ha sido guardado para este usuario' });
        }
    }

    // Si no existe un token para este usuario, guárdalo
    const pushToken = new PushToken({ userId, token });
    await pushToken.save();

    res.send({ success: true, message: 'Token guardado' });
});

module.exports = router;