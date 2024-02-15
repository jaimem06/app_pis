import React from 'react';
import { Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, ImageBackground, Alert, Modal } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from './styles/styleslogin';
import { useLoginLogic } from '../components/logic_login';
import RequestCodeForm from '../components/form_resetPass';

const Login = ({ navigation }) => {
  const {
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
  } = useLoginLogic(navigation);

  const [isRequestingCode, setIsRequestingCode] = React.useState(false);
  return (
    <ImageBackground source={require('./fondo.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>Ingrese sus datos</Text>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isRequestingCode}
          onRequestClose={() => {
            setIsRequestingCode(false);
          }}
        >
          <RequestCodeForm />
        </Modal>
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
        <View style={styles.forgotPasswordContainer}>
          <TouchableOpacity
            onPress={() => {
              setIsRequestingCode(true);
            }}
          >
            <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
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
            activeOpacity={1}
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