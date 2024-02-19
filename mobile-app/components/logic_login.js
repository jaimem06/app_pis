import { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import APILinks from '../directionsAPI';
import { handleNotificationResponse } from '../components/event_Notification';
import { Alert } from 'react-native';

export const useLoginLogic = (navigation) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [totalDistance, setTotalDistance] = useState(0);
    const [markers, setMarkers] = useState([]);

    const handleLogin = () => {
        fetch(APILinks.URL_Login, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: username,
                password: password
            })
        })
            .then(response => response.json())
            .then(async data => {
                if (data.error) {
                    Alert.alert('Error', data.error);
                } else {
                    Alert.alert('Éxito', 'Inicio de sesión exitoso');
                    const pushToken = await registerForPushNotificationsAsync();
                    fetch(APILinks.URL_SaveToken, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            userId: data._id,
                            token: pushToken
                        })
                    })
                        .then(response => response.json())
                        .then(async data => {
                            if (data.success) {
                                console.log('Token de notificación guardado exitosamente');
                                await SecureStore.setItemAsync('token', pushToken);
                            } else {
                                console.log('Error al guardar el token de notificación:', data.message);
                            }
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });
                    navigation.navigate('logged');
                }
            })
            .catch(error => {
                Alert.alert('Error', 'Ocurrió un error al iniciar sesión');
                console.error('Error:', error);
            });
    };

    const registerForPushNotificationsAsync = async () => {
        let token;
        let experienceId = undefined;
        if (!Constants.expoConfig) {
            experienceId = `@${Constants.expoConfig.owner}/${Constants.expoConfig.slug}`;
        }
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('No se ha podido obtener el token para la notificación push.');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync({ 
            experienceId, 
            projectId: Constants.expoConfig.extra.eas.projectId 
        })).data;
        return token;
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        SecureStore.getItemAsync('token').then(token => {
            if (token) {
                navigation.navigate('logged');
            }
        });
    }, []);

    useEffect(() => {
        const subscription = handleNotificationResponse(navigation, setMarkers, setTotalDistance, setIsLoading);
    
        return () => subscription.remove();
    }, []);

    return {
        username,
        setUsername,
        password,
        setPassword,
        showPassword,
        setShowPassword,
        markers,
        setMarkers,
        handleLogin,
        registerForPushNotificationsAsync,
        toggleShowPassword,
    };
};