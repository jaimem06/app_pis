import { calcularRuta } from '../pantallas/logged_pantallas/home';
import * as Notifications from 'expo-notifications';

export const handleNotificationResponse = (navigation, setMarkers) => {
    return Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
        // Navega primero al Tab 'auth' y luego a la pantalla 'logged'
        navigation.navigate('auth', { screen: 'logged' });
        // Ejecuta la función 'calcularRuta'
        calcularRuta(setMarkers);
    });
};