import React, { useState, useRef } from 'react';
import { Image, TouchableOpacity, Text, TextInput, View, Alert} from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import puntoEncuentro from '../../assets/pde.png';
import user from '../../assets/user.png'

const Home = () => {
  const [inicio, setInicio] = useState('');
  const [fin, setFin] = useState('');
  const [markers, setMarkers] = useState([]);
  const mapRef = useRef(null);

  const buscar = () => {
    //fetch('http://10.20.138.158:3000/camino_minimo', { // ip Universidad
    fetch('http://192.168.1.9:3000/camino_minimo', { // ip Jaime
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        inicio: inicio,
        fin: fin
      })
    })
      .then(response => response.json())
      .then(data => {
        setMarkers(data);

        // Calcular la región media de los marcadores
        let minLat = Infinity, maxLat = -Infinity, minLng = Infinity, maxLng = -Infinity;
        data.forEach(marker => {
          minLat = Math.min(minLat, marker.coordenadas[0]);
          maxLat = Math.max(maxLat, marker.coordenadas[0]);
          minLng = Math.min(minLng, marker.coordenadas[1]);
          maxLng = Math.max(maxLng, marker.coordenadas[1]);
        });
        const midLat = (minLat + maxLat) / 2;
        const midLng = (minLng + maxLng) / 2;

        // Centrar el mapa en en el lugar donde esta la ruta
        mapRef.current.animateToRegion({
          latitude: midLat,
          longitude: midLng,
          latitudeDelta: Math.abs(maxLat - minLat) * 1.1, // Añadir un 10% extra para el padding
          longitudeDelta: Math.abs(maxLng - minLng) * 1.1, // Añadir un 10% extra para el padding
        }, 1000); // Duración de la animación en milisegundos
      })
      .catch(error => {
        Alert.alert('Error', 'Hubo un error al buscar la ruta');
      });
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', height: 50 }}>
        <TextInput
          placeholder="Inicio"
          style={{ flex: 1, borderWidth: 1 }}
          onChangeText={text => setInicio(text)}
        />
        <TextInput
          placeholder="Fin"
          style={{ flex: 1, borderWidth: 1 }}
          onChangeText={text => setFin(text)}
        />
      </View>
      {/* Boton Buscar */}
      <TouchableOpacity
        style={{
          backgroundColor: '#2A364E',
          padding: 5,
          width: 260, // Tamaño horizontal
          alignItems: 'center',
          borderRadius: 5,
          alignSelf: 'center',
          marginTop: 10,
        }}
        onPress={buscar}
      >
        <Text style={{ color: 'white', fontSize: 20 }}>Buscar Ruta</Text>
      </TouchableOpacity>

      <View style={{
        borderWidth: 5,
        borderColor: '#2A364E', // Color del borde
        borderRadius: 10, // Borde redondeado
        height: '83%', // Cambiar la altura del mapa
        width: '95%', // Cambiar el ancho del mapa
        marginTop: 10,
        alignSelf: 'center',
      }}>
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
            //Cuando el tipo se Ruta no se muestra el marcador
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