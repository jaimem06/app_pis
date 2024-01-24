const express = require('express');
const axios = require('axios');
const router = express.Router();

// Enviar una notificación
router.post('/send-notification', (req, res) => {
    const message = {
        to: req.body.expoPushToken,
        sound: 'default',
        title: 'Ruta de Evacuacion',
        body: 'Cuerpo de la notificación',
        data: { data: 'Aquí van los datos adicionales' },
    };

    axios.post('https://exp.host/--/api/v2/push/send', message)
        .then(response => {
            res.json({ message: 'Notificación enviada correctamente!' });
        })
        .catch(error => {
            console.log(error);
            res.json({ error: 'Hubo un error al enviar la notificación' });
        });
});

module.exports = router;