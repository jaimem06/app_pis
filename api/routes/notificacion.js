const express = require('express');
const router = express.Router();
const { Expo } = require('expo-server-sdk');
const PushTokenSchema = require('../models/notificacion_token');

// Crear una nueva instancia de Expo
let expo = new Expo();

router.post('/enviar_notificacion', async (req, res) => {
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
                body: 'Revisa la ruta de evacuación 📍',
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
                res.status(500).send({ success: false, message: 'Error al enviar notificaciones' });
                return;
            }
        }

        console.log('Notificaciones enviadas con éxito');
        res.status(200).send({ success: true, message: 'Notificaciones enviadas' });
    } catch (e) {
        res.status(500).send({ success: false, message: 'Error al enviar notificaciones' });
    }
});

module.exports = router;