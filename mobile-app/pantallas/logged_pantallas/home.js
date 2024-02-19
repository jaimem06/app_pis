import React, { useState, useRef, useEffect } from 'react';
import { ScrollView, Image, TouchableOpacity, Text, View, ActivityIndicator, Platform } from 'react-native';
import styles from '../styles/styleshome';
import MapView, { Polyline } from 'react-native-maps';
import puntoEncuentro from '../../assets/pde.png';
import { calcularRuta } from '../../components/calcularRuta';
import MarkerRuta from '../../components/markerRuta';
import APILinks from '../../directionsAPI';
import { handleNotificationResponse } from '../../components/event_Notification';

const Home = ({navigation}) => {
  const [markers, setMarkers] = useState([]);
  const mapRef = useRef(null);
  const [nodos, setNodos] = useState([]);
  const [totalDistance, setTotalDistance] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch(APILinks.URL_ReadNodos)
      .then(response => response.json())
      .then(data => setNodos(data.map(nodo => nodo.properties.nombre)))
      .catch(error => console.error(error));

    calcularRuta(setMarkers, setTotalDistance, setIsLoading);

    const timerId = setInterval(() => {
      calcularRuta(setMarkers, setTotalDistance, setIsLoading);
    }, 1800000);

    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    if (mapRef.current && markers.length > 0) {
      mapRef.current.fitToCoordinates(markers.map(marker => marker.coordenadas), {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
  }, [markers]);

  useEffect(() => {
    const subscription = handleNotificationResponse(navigation, setMarkers, setTotalDistance, setIsLoading);

    return () => subscription.remove();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: "#2A364E" }}>
      <View style={{ alignItems: 'center' }}>
        <TouchableOpacity
          style={styles.buscarButton}
          onPress={() => calcularRuta(setMarkers, setTotalDistance, setIsLoading)}
        >
          <Text style={styles.buscarText}>Buscar zona segura cercana </Text>
          <Image source={puntoEncuentro} style={{ width: 25, height: 25 }} />
        </TouchableOpacity>
      </View>
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
            <MarkerRuta key={index} marker={marker} index={index} markers={markers} />
          ))}
          <Polyline
            coordinates={markers.map(marker => marker.coordenadas)}
            strokeColor="#2A364E"
            strokeWidth={6}
          />
        </MapView>
      </View>
      {isLoading && (
        <View style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(12,43,212,0.1)',
        }}>
          <ActivityIndicator size={Platform.OS === 'ios' ? 300 : 'large'} color="#2A364E" />
        </View>
      )}
      <View style={{ alignItems: 'center', height: "15%" }}>
        <View style={styles.infoRuta}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Text style={{ padding: 10, textAlign: "justify", color: 'white' }}>
              {'Debes pasar por los siguientes puntos:\n' + markers.map((marker, index) => `${index + 1}. ${marker.nombre}`).join('\n')}
              {'\nDistancia total: ' + totalDistance.toFixed(2) + ' metros'}
            </Text>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default Home;