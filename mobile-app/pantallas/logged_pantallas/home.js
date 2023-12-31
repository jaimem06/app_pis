import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';

const Home = () => {
  const [inicio, setInicio] = useState('');
  const [fin, setFin] = useState('');
  const [markers, setMarkers] = useState([]);

  const buscar = () => {
    fetch('http://192.168.1.3:3000/camino_minimo', {
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
      <Button title="Buscar" onPress={buscar} />
      <View style={{ flex: 1, borderWidth: 1, marginTop: 10 }}>
        <MapView 
          style={{ flex: 1 }}
          initialRegion={{
            latitude: -4.03368694010248,
            longitude: -79.20258117615484,
            latitudeDelta: 0.003,
            longitudeDelta: 0.003,
          }}
        >
          {markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: marker.nombre[0], 
                longitude: marker.nombre[1]
              }}
            />
          ))}
          <Polyline
            coordinates={markers.map(marker => ({
              latitude: marker.nombre[0],
              longitude: marker.nombre[1],
            }))}
            strokeColor="#1fa30d" // fallback for when `strokeColors` is not supported by the map-provider
            strokeWidth={4}
          />
        </MapView>
      </View>
    </View>
  );
};

export default Home;