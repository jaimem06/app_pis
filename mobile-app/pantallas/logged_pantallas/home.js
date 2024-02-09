import React, { useState, useRef, useEffect } from 'react';
import { ScrollView, Image, TouchableOpacity, Text, View } from 'react-native';
import styles from '../styles/styleshome';
import MapView, { Polyline } from 'react-native-maps';
import puntoEncuentro from '../../assets/pde.png';
import { calcularRuta } from '../../components/calcularRuta';
import MarkerRuta from '../../components/markerRuta';
import CustomPicker from '../../components/select_nodos';
import APILinks from '../../directionsAPI';

const Home = () => {
  const [markers, setMarkers] = useState([]);
  const mapRef = useRef(null);
  const [selectedNodo, setSelectedNodo] = useState(null); // Estado para el nodo seleccionado
  const [nodos, setNodos] = useState([]); // Estado para todos los nodos

  useEffect(() => {
    fetch(APILinks.URL_ReadNodos)
      .then(response => response.json())
      .then(data => {
        const nodosEdificacion = data
          // Filtra los nodos para incluir solo los de tipo 'Edificacion'
          .filter(nodo => nodo.properties.tipo === 'Edificacion')
          .map(nodo => nodo.properties.nombre);
        setNodos(nodosEdificacion);
      })
      .catch(error => console.error(error));

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
    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: "#2A364E" }}>
      <View style={{ alignItems: 'center' }}>
        <TouchableOpacity
          style={styles.buscarButton}
          onPress={() => calcularRuta(setMarkers)}
        >
          <Text style={styles.buscarText}>Buscar zona segura cercana </Text>
          <Image source={puntoEncuentro} style={{ width: 25, height: 25 }} />
        </TouchableOpacity>
        <Text style={{ color: "white", margin: "1%", fontSize: 13}}>TAMBIÉN PUEDES BUSCAR DESDE UN PUNTO ESPECÍFICO</Text>
      </View>
      <View style={{ flexDirection: 'row', margin: "1%", alignItems: "center", justifyContent: 'center' }}>
        <CustomPicker
          data={nodos.filter(Boolean)} // Filtra los nodos para eliminar los valores undefined
          selectedValue={selectedNodo || ''} // Usa una cadena vacía como valor predeterminado si selectedNodo es undefined
          onValueChange={(itemValue) => setSelectedNodo(itemValue)}
        />
        <View style={{ alignItems: 'center', margin: 4 }}>
          <Text style={{ color: 'white', fontSize: 10 }}>¿No conoces tu ubicación?</Text>
          <TouchableOpacity
            style={{ width: "100%", height: 22, backgroundColor: 'blue', borderRadius: 10, justifyContent: 'center' }}
            onPress={() => console.log('Botón presionado')}
          >
            <Text style={{ color: 'white', textAlign: 'center', fontSize: 12 }}>Buscar mi ubicación</Text>
          </TouchableOpacity>
        </View>
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
      <View style={{ alignItems: 'center', height: "15%" }}>
        <View style={styles.infoRuta}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Text style={{ padding: 10, textAlign: "justify", color: 'white' }}>
              {'Debes pasar por los siguientes puntos:\n' + markers.map((marker, index) => `${index + 1}. ${marker.nombre}`).join('\n')}
              {'\nDistancia total: ' + markers.reduce((total, marker) => total + marker.distancia, 0) + ' metros'}
            </Text>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default Home;