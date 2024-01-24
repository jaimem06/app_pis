import React,{useEffect,useState} from "react";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import {  Platform } from 'react-native';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  Notifications.addNotificationReceivedListener(notification => {
    console.log(notification);
  });
  
  // Configura el manejador de notificaciones cuando la aplicación está en segundo plano o cerrada
  Notifications.addNotificationResponseReceivedListener(response => {
    console.log(response);
  });
  
  async function registerForPushNotificationsAsync() {
    let token;
  
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      // Learn more about projectId:
      // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
      token = (await Notifications.getExpoPushTokenAsync({ projectId: '65976fdc-d9ff-4c6b-800e-700435b8ee5a' })).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    return token;
  }
const useNotifications = () => {
    const [expoPushToken, setExpoPushToken] = useState('');
    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    
      }, []);
      return expoPushToken;
    

}

export default useNotifications;
  