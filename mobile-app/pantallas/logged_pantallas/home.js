import React, { useState, useRef, useEffect } from 'react';
import { ScrollView, Image, TouchableOpacity, Text, View} from 'react-native';
import styles from '../styles/styleshome';
import MapView, { Polyline } from 'react-native-maps';
import puntoEncuentro from '../../assets/pde.png';
import { calcularRuta } from '../../components/calcularRuta';
import MarkerRuta from '../../components/markerRuta';

const Home = () => {
  const [markers, setMarkers] = useState([]);
  const mapRef = useRef(null);

  useEffect(() => {
    // Calcula la ruta inmediatamente al montar el componente
    calcularRuta(setMarkers);

    // Configura un temporizador para calcular la ruta cada minuto
    const timerId = setInterval(() => {
      calcularRuta(setMarkers);
    }, 60000); // 60000 milisegundos = 1 minuto

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

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#2A364E" }}>
      <TouchableOpacity
        style={styles.buscarButton}
        onPress={() => calcularRuta(setMarkers)}
      >
        <Text style={styles.buscarText}>Buscar zona segura cercana </Text>
        <Image source={puntoEncuentro} style={{ width: 25, height: 25 }} />
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
            <MarkerRuta key={index} marker={marker} index={index} markers={markers} />
          ))}
          <Polyline
            coordinates={markers.map(marker => marker.coordenadas)}
            strokeColor="#2A364E"
            strokeWidth={6}
          />
        </MapView>
      </View>
      <View style={styles.infoRuta}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Text style={{ padding: 10, textAlign: "justify", color: 'white' }}>
            {'Debes pasar por los siguientes puntos:\n' + markers.map((marker, index) => `${index + 1}. ${marker.nombre}`).join('\n')}
          </Text>
        </ScrollView>
      </View>
    </View>
  );
};

export default Home;