let Expo = require('expo-server-sdk');

let expo = new Expo.default();

let messages = [];
let somePushTokens = ['ExponentPushToken[lJZT5_NlmMhqMRXBHKNASR]']; // Usa el token completo
for (let pushToken of somePushTokens) {
    // Construye el mensaje
    messages.push({
        to: pushToken,
        sound: 'default',
        title: '¡Alerta de sismo! 🚨',
        body: 'Revisa la ruta de evacuación 📍',
        data: { prueba: 'data' },
        badge: 3,
        priority: 'high',
        ios: {
            subtitle: 'Subtítulo de la notificación',
        },
    })
}

// Ahora puedes usar expo.sendPushNotificationsAsync para enviar las notificaciones
expo.sendPushNotificationsAsync(messages).then(receipts => {
    console.log(receipts);
}).catch(e => {
    console.error(e);
});