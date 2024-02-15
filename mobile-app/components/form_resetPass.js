import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import APILinks from '../directionsAPI';
import { styles } from '../pantallas/styles/styles_resetPass';

const RequestCodeForm = () => {
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const [password, setPassword] = useState('');
    const [isResettingPassword, setIsResettingPassword] = useState(false);
    const [message, setMessage] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRequestCode = () => {
        fetch(APILinks.URL_RecuperarCuenta, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                setIsResettingPassword(true);
                setMessage('Se ha enviado un correo electrónico con un codigo de verificación.');
            })
            .catch((error) => {
                console.error('Error:', error);
                setMessage('Ocurrió un error al solicitar el código.'); 
            });
    };

    const handleResetPassword = () => {
        if (password !== confirmPassword) {
            setMessage('Las contraseñas no coinciden.');
            return;
        }

        fetch(`${APILinks.URL_ResetPass}/${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                password: password,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.message) {
                    setMessage(data.message); // Muestra el mensaje de error
                } else {
                    setMessage('Tu contraseña ha sido cambiada.'); // Mensaje de éxito
                }
            })
            .catch((error) => {
                //console.error('Error:', error);
                setMessage('El codigo es inválido o ha vencido.'); // Mensaje de error
            });
    };

    return (
        <View style={styles.container}>
            <View style={styles.modal}>
                {/* Muestra el mensaje */}
                {message && <Text style={styles.message}>{message}</Text>}
                {!isResettingPassword ? (
                    <>
                        <TextInput
                            style={styles.input}
                            placeholder="Ingresa tu correo electrónico"
                            placeholderTextColor="white"
                            onChangeText={(text) => setEmail(text)}
                            value={email}
                        />
                        <TouchableOpacity style={styles.BtnSolicitar} onPress={handleRequestCode}>
                            <Text style={styles.BtnSolicitarText}>Solicitar código</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <>
                        <TextInput
                            style={styles.input}
                            placeholder="Ingresa el código"
                            placeholderTextColor="white"
                            onChangeText={(text) => setToken(text)}
                            value={token}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Ingresa tu nueva contraseña"
                            placeholderTextColor="white"
                            onChangeText={(text) => setPassword(text)}
                            value={password}
                            secureTextEntry={true}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Vuelve a ingresar tu contraseña"
                            placeholderTextColor="white"
                            onChangeText={(text) => setConfirmPassword(text)}
                            value={confirmPassword}
                            secureTextEntry={true}
                        />
                        <TouchableOpacity style={styles.BtnSolicitar} onPress={handleResetPassword}>
                            <Text style={styles.BtnSolicitarText}>Restablecer contraseña</Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>
        </View>
    );
};

export default RequestCodeForm;