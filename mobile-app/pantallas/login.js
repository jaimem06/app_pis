import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, ImageBackground, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from './styleslogin';

const Login = ({ navigation }) => { // Agregar navigation aquí
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    fetch('http://192.168.1.9:3000/login_mobile', { // ip Jaime
    // fetch('http://192.168.1.30:3000/signin', { // ip Wilson

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
      .then(data => {
        if (data.error) {
          Alert.alert('Error', data.error);
        } else {
          Alert.alert('Éxito', 'Inicio de sesión exitoso');
          navigation.navigate('logged'); //Pantalla si el inicio de sesión es exitoso
        }
      })
      .catch(error => {
        Alert.alert('Error', 'Ocurrió un error al iniciar sesión');
        console.error('Error:', error);
      });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

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