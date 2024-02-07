const { Expo } = require('expo-server-sdk');
const PushTokenSchema = require('../models/notificacion_token');
const { receiveDato } = require('./purtocom');

// Crear una nueva instancia de Expo
let expo = new Expo();
let notificationSent = false;
let lastMagnitude = null;

async function simularSismo() {
    const magnitud = parseFloat(receiveDato());

    // Si la magnitud es la misma que la última vez, no hacer nada
    if (magnitud === lastMagnitude) {
        return { magnitud };
    }

    // Si la magnitud es mayor a 5 y la notificación aún no se ha enviado, enviar notificación
    if (magnitud >= 5 && !notificationSent) {
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

            let chunks = expo.chunkPushNotifications(messages);

            for (let chunk of chunks) {
                try {
                    let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
                    console.log(ticketChunk);
                } catch (error) {
                    console.error('Error al enviar notificaciones', error);
                    return;
                }
            }

            console.log('Notificaciones enviadas con éxito');
            notificationSent = true; // Marca que la notificación ya se envió
        } catch (e) {
            console.error('Error al enviar notificaciones', e);
            return;
        }
    }

    // Si la magnitud es menor o igual a 5, reinicia la variable de control
    if (magnitud <= 5) {
        notificationSent = false;
    }

    // Guardar la magnitud para la próxima vez
    lastMagnitude = magnitud;

    return { magnitud };
}

module.exports = {
    simularSismo
};