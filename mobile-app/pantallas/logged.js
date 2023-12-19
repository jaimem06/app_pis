import React, { useEffect } from 'react';
import { Text, View, BackHandler, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

const Logged = ({ navigation }) => {
  useEffect(() => {
    const backAction = () => {
      return true; // Esto previene la navegación hacia atrás
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );
    return () => backHandler.remove(); // Limpia el listener al desmontar el componente
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BIENVENIDO</Text>
      <Text
        style={{ ...styles.logout, backgroundColor: '#2A364E', borderRadius: 10 }}
        onPress={() => {
          navigation.navigate('login');
        }}
      >
        Cerrar Sesión
      </Text>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: -4.033472411554267,
            longitude: -79.20263150505272,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
        />
      </View>
    </View>
  );
};

// Estilos de la pantalla
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
  },
  mapContainer: {
    width: '90%',
    height: '70%',
    marginTop: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  logout: {
    color: 'white',
    padding: 10,
    textAlign: 'center',
  },
});

export default Logged;