import { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import useNotifications from './hooks/useNotifications';
import * as Notifications from 'expo-notifications';
import Navigation from './Navegation';
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
export default function App() {
  const expoPushToken = useNotifications();

  useEffect(() => {
    if (expoPushToken) {
      fetch('http://192.168.1.24:3000/notification/send-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          expoPushToken: expoPushToken,
          title: 'Título de la notificación',
          body: 'Cuerpo de la notificación',
          data: { data: 'Aquí van los datos adicionales' },
        }),
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
    }
  }, [expoPushToken]);
 useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification);
    });

    return () => subscription.remove();
  }, []);

  // Manejador para notificaciones recibidas mientras la app está en segundo plano o cerrada
  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => subscription.remove();
  }, []);
  return (
    <Navigation/>
  );
}