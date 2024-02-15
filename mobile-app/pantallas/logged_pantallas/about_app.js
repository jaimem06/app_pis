import { View, Text, Image, ScrollView, Linking, Button, TouchableOpacity } from 'react-native';
import React from 'react';
import { styles } from '../styles/styles_acercade';

const profileImageUri = 'https://cdn.icon-icons.com/icons2/2556/PNG/512/profile_picture_user_icon_153075.png';
const instagramIconUri = 'https://cdn.icon-icons.com/icons2/1584/PNG/512/3721672-instagram_108066.png';

const teamMembers = [
  { name: 'Alyce Elianne Maldonado Hoyos', email: 'alyce.maldonado@unl.edu.ec', instagram: 'https://instagram.com/alyce1201' },
  { name: 'Jaime David Mendoza Orosco', email: 'jaime.mendoza@unl.edu.ec', instagram: 'https://instagram.com/jaimedavid.16' },
  { name: 'Wilson Isael Gonzalez Armijos', email: 'wilson.i.gonzalez@unl.edu.ec', instagram: 'https://instagram.com/wilsong7578' },
  { name: 'Danny Vinicio Cobos Vega', email: 'danny.cobos@unl.edu.ec', instagram: 'https://instagram.com/danny.cobos.1654' },
];

const About_App = () => {
  const sendEmail = (email) => {
    Linking.openURL(`mailto:${email}`);
  };

  const openInstagram = (instagramUrl) => {
    Linking.openURL(instagramUrl);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Acerca de la Aplicación</Text>
      <Text style={styles.text}>
        Esta aplicación fue desarrollada como parte del Proyecto Integrador de Saberes del Cuarto Ciclo de la carrera de Ingeniería en Computación, este proyecto representa el trabajo final de dicho ciclo, y esta destinada para la gestión de situaciones de emergencia, pero se enfoca principalmente en la creación de la ruta más óptima en caso de un sismo.
      </Text>
      <Text style={styles.title}>Integrantes del Equipo:</Text>
      {teamMembers.map((member, index) => (
        <View key={index} style={styles.item}>
          <Image source={{ uri: profileImageUri }} style={styles.image} />
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{member.name}</Text>
            <Text style={styles.email}>{member.email}</Text>
            <View style={styles.buttonContainer}>
              <Button title="Enviar correo" onPress={() => sendEmail(member.email)} />
              <TouchableOpacity onPress={() => openInstagram(member.instagram)}>
                <Image source={{ uri: instagramIconUri }} style={styles.icon} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
      <Text style={styles.footer}>© 2024 Equipo de FRED-UNL</Text>
    </ScrollView>
  )
}

export default About_App;