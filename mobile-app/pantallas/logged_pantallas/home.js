import React, { useState, useRef } from 'react';
import { Image, TouchableOpacity, Text, View, Alert } from 'react-native';
import styles from '../styles/styleshome';
import MapView, { Marker, Polyline } from 'react-native-maps';
import puntoEncuentro from '../../assets/pde.png';
import user from '../../assets/user.png';
import * as Location from 'expo-location';


const Home = () => {
  const [markers, setMarkers] = useState([]);
  const mapRef = useRef(null);

  const calcularRuta = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso de acceso a la ubicación denegado');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    let inicio = { coords: location.coords };
    let fin = { coords: { latitude: 0, longitude: 0 } }; // Aquí puedes poner las coordenadas del nodo PDE más cercano

    fetch('http://192.168.1.2:3000/camino_minimo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ inicio, fin })
    })
      .then(response => response.json())
      .then(data => {
        // Aquí puedes manejar la respuesta del servidor
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        style={styles.buscarButton}
        onPress={calcularRuta}
      >
        <Text style={styles.buscarText}>Calcular Ruta</Text>
      </TouchableOpacity>

      <View style={styles.mapViewContainer}>
        <MapView
          ref={mapRef}
          style={{ flex: 1 }}
          initialRegion={{
            latitude: -4.03368694010248,
            longitude: -79.20258117615484,
            latitudeDelta: 0.003,
            longitudeDelta: 0.003,
          }}
        >
          {markers.map((marker, index) => (
            marker.tipo !== "Ruta" && (
              <Marker
                key={index}
                coordinate={{
                  latitude: marker.coordenadas[0],
                  longitude: marker.coordenadas[1]
                }}
              >
                {marker.tipo === 'PDE' && (
                  <View style={{ width: 40, height: 40, borderRadius: 5, overflow: 'hidden' }}>
                    <Image source={puntoEncuentro} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
                  </View>
                )}
                {marker.tipo === 'Edificacion' && (
                  <View style={{ width: 45, height: 45, overflow: 'hidden' }}>
                    <Image source={user} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
                  </View>
                )}
              </Marker>
            )
          ))}
          <Polyline
            coordinates={markers.map(marker => ({
              latitude: marker.coordenadas[0],
              longitude: marker.coordenadas[1],
            }))}
            strokeColor="#2A364E"
            strokeWidth={6}
          />
        </MapView>
      </View>
    </View>
  );
};

export default Home;
