import React, { useState, useRef, useEffect } from 'react';
import { ScrollView, Image, TouchableOpacity, Text, View, Alert } from 'react-native';
import styles from '../styles/styleshome';
import MapView, { Marker, Polyline } from 'react-native-maps';
import puntoEncuentro from '../../assets/pde.png';
import user from '../../assets/user.png';
import * as Location from 'expo-location';

 export const calcularRuta = async (setMarkers) => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('Permiso de acceso a la ubicación denegado');
    return;
  }

  let location = await Location.getCurrentPositionAsync({});
  console.log(location.coords);
  let inicio = {
    coords: [location.coords.latitude, location.coords.longitude]
  };

  fetch('http://192.168.1.2:3000/camino_minimo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      inicio: inicio
    })
  })
    .then(response => {
      // Comprueba si el servidor ha devuelto un código de estado HTTP exitoso
      if (!response.ok) {
        throw new Error(`El servidor devolvió un error: ${response.status}`);
      }

      // Comprueba si la respuesta es un JSON válido
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.indexOf('application/json') !== -1) {
        return response.json();
      } else {
        throw new Error('La respuesta del servidor no es un JSON válido');
      }
    })
    .then(data => {
      console.log(data);
      let newMarkers = data.map(item => ({
        nombre: item.nombre,
        tipo: item.tipo,
        coordenadas: {
          longitude: item.coordenadas[1],
          latitude: item.coordenadas[0]
        }
      }));

      setMarkers(newMarkers);
    })
    .catch(error => {
      console.error(error);
    });
};

const Home = () => {
  const [markers, setMarkers] = useState([]);
  const mapRef = useRef(null);

  useEffect(() => {
    calcularRuta(setMarkers);
  }, []);

  calcularRuta(setMarkers);

  useEffect(() => {
    if (mapRef.current && markers.length > 0) {
      mapRef.current.fitToCoordinates(markers.map(marker => marker.coordenadas), {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
  }, [markers]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity
        style={styles.buscarButton}
        onPress={calcularRuta}
      >
        <Text style={styles.buscarText}>Buscar Zona Segura Cercana</Text>
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
          {markers.map((marker, index) => {
            if (index === 0 || index === markers.length - 1) {
              return (
                <Marker
                  key={index}
                  coordinate={marker.coordenadas}
                >
                  {index === 0 && (
                    <View style={{ width: 45, height: 45, overflow: 'hidden' }}>
                      <Image source={user} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
                    </View>
                  )}
                  {index === markers.length - 1 && (
                    <View style={{ width: 40, height: 40, borderRadius: 5, overflow: 'hidden' }}>
                      <Image source={puntoEncuentro} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
                    </View>
                  )}
                </Marker>
              );
            }
          })}
          <Polyline
            coordinates={markers.map(marker => marker.coordenadas)}
            strokeColor="#2A364E"
            strokeWidth={6}
          />
        </MapView>
      </View>
      <View style= {{width: '95%', marginTop: 15}}>
        <ScrollView style={{
          display: 'flex',
          alignContent: 'center',
          borderColor: 'white',
          borderRadius: 20,
          backgroundColor: "#2A364E",
        }}>
          <Text style={{ padding: 10, textAlign: "justify", color: "white" }}>
            {'Debes pasar por los siguientes puntos:\n' + markers.map((marker, index) => `${index + 1}. ${marker.nombre}`).join('\n')}
          </Text>
        </ScrollView>
      </View>
    </View>
  );
};

export default Home;