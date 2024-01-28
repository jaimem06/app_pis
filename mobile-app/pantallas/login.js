import APILinks from '../directionsAPI';
import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, ImageBackground, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from './styles/styleslogin';
import * as SecureStore from 'expo-secure-store';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

const Login = ({ navigation }) => { // Agregar navigation como parámetro
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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
          // Registrar para notificaciones push después de iniciar sesión
          const pushToken = await registerForPushNotificationsAsync();
          console.log(pushToken);

          // Guardar el token de notificación en la base de datos
          fetch(APILinks.URL_SaveToken, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              userId: data._id, // Usar '_id' en lugar de 'userId'
              token: pushToken
            })
          })
            .then(response => response.json())
            .then(data => {
              if (data.success) {
                console.log('Token de notificación guardado exitosamente');
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

  async function registerForPushNotificationsAsync() {
    let token;
    let experienceId = undefined;
    if (!Constants.expoConfig) {
      // Absence of the expoConfig means we're in bare workflow
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
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  React.useEffect(() => {
    SecureStore.getItemAsync('token').then(token => {
      if (token) {
        navigation.navigate('logged');
      }
    });
  }, []);
  
  return (

    <ImageBackground source={require('./fondo.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>Ingrese sus datos</Text>

        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="account" size={24} color="#2A364E" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Usuario"
            onChangeText={(text) => setUsername(text)}
            value={username}
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="lock" size={24} color="#2A364E" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={!showPassword}
          />
          <TouchableWithoutFeedback onPress={toggleShowPassword}>
            <MaterialCommunityIcons
              name={showPassword ? 'eye-off' : 'eye'}
              size={24}
              color="#868686"
              style={styles.eyeIcon}
            />
          </TouchableWithoutFeedback>
        </View>
        <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      {/* Nuevos botones */}
      <View style={styles.bottomButtonsContainer}>
        <TouchableOpacity
          activeOpacity={1} // Agregado
          style={styles.bottomButton}
          onPress={() => {
            navigation.navigate('info');
          }}>
          <MaterialCommunityIcons name="information-outline" size={40} color="#B3DFE8" />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={1} // Agregado
          style={styles.bottomButton}
          onPress={() => {
            navigation.navigate('brigadista');
          }}>
          <MaterialCommunityIcons name="account-hard-hat" size={40} color="#B3DFE8" />
        </TouchableOpacity>
      </View>
      </View>
    </ImageBackground>
  );

};

export default Login;