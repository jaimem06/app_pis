import * as Notifications from 'expo-notifications';
import { calcularRuta } from '../components/calcularRuta';

export const handleNotificationResponse = (navigation, setMarkers, setTotalDistance, setIsLoading) => {
    // Este handler se ejecuta cuando el usuario toca una notificación
    const subscription = Notifications.addNotificationResponseReceivedListener(async response => {
        //console.log(response);
        // Ejecuta la función 'calcularRuta'
        await calcularRuta(setMarkers, setTotalDistance, setIsLoading);
        // Navega primero al Tab 'auth' y luego a la pantalla 'logged'
        navigation.navigate('auth', { screen: 'logged' });
    });

    // Devuelve el objeto de suscripción
    return subscription;
};