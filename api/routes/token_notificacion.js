const express = require('express');
const app = express();
const PushToken = require('../models/notificacion_token');

app.post('/guardar_tokenNotification', async (req, res) => {
    const { userId, token } = req.body;

    // Validar que el token y el userId no sean nulos o vacíos
    if (!userId || !token) {
        return res.status(400).send({ success: false, message: 'Token o userId vacio' });
    }

    // Comprobar que el token no se haya guardado previamente para el mismo usuario
    const existingToken = await PushToken.findOne({ userId });
    if (existingToken) {
        return res.status(400).send({ success: false, message: 'El token ya ha sido guardado para este usuario' });
    }
    // Guardar el token en la base de datos
    const pushToken = new PushToken({ userId, token });
    await pushToken.save();

    res.send({ success: true });
});