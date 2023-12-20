import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';

const Registrar = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');
  const [dob, setDob] = useState('');

  const crearCuenta = () => {
    if (password !== cpassword) {
      Alert.alert('Las contraseñas no coinciden');
      return;
    }

    // Aquí puedes agregar el código para registrar al usuario
    console.log('Nombre: ' + name);
    console.log('Email: ' + email);
    console.log('Fecha de Nacimiento: ' + dob);
  };

  return (
    <View>
      <TextInput
        placeholder="Nombre"
        onChangeText={text => setName(text)}
        value={name}
      />
      <TextInput
        placeholder="Email"
        onChangeText={text => setEmail(text)}
        value={email}
      />
      <TextInput
        placeholder="Contraseña"
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
        value={password}
      />
      <TextInput
        placeholder="Confirmar Contraseña"
        secureTextEntry={true}
        onChangeText={text => setCPassword(text)}
        value={cpassword}
      />
      <TextInput
        placeholder="Fecha de Nacimiento"
        onChangeText={text => setDob(text)}
        value={dob}
      />
      <Button
        title="Crear Usuario"
        onPress={crearCuenta}
      />
    </View>
  );
};

export default Registrar