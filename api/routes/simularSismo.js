// sismo.js
const express = require('express');
const router = express.Router();
const { Expo } = require('expo-server-sdk');
const PushTokenSchema = require('../models/notificacion_token');

// Crear una nueva instancia de Expo
let expo = new Expo();

router.post('/simular_sismo', async (req, res) => {
    // Número aleatorio entre 1 y 10 con dos decimales
    const magnitud = (Math.random() * 9 + 1).toFixed(2); 

    // Si la magnitud es mayor a 3, enviar notificación
    if (magnitud > 3) {
        try {
            // Obténer los tokens de la base de datos
            const tokens = await PushTokenSchema.find();

            let messages = [];
            for (let token of tokens) {
                let pushToken = token.token;
                if (!Expo.isExpoPushToken(pushToken)) {
                    continue;
                }
                messages.push({
                    to: pushToken,
                    sound: 'default',
                    title: '¡Alerta de sismo! 🚨',
                    body: `Se ha detectado un sismo de magnitud ${magnitud} Revisa la ruta de evacuación 📍`,
                    data: { prueba: 'data' },
                    badge: 3,
                    priority: 'high',
                    ios: {
                        subtitle: 'Alerta de sismo',
                    },
                });
            }

            let chunks = expo.chunkItems(messages);

            let tickets = [];
            for (let chunk of chunks) {
                try {
                    let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
                    tickets.push(...ticketChunk);
                } catch (error) {
                    console.error('Error al enviar notificaciones', error);
                    res.status(500).send({ success: false, message: 'Error al enviar notificaciones' });
                    return;
                }
            }

            console.log('Notificaciones enviadas con éxito');
        } catch (e) {
            console.error('Error al enviar notificaciones', e);
            res.status(500).send({ success: false, message: 'Error al enviar notificaciones' });
            return;
        }
    }

    res.json({ magnitud });
});

module.exports = router;