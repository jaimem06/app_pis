import APILinks from '../../directionsAPI';
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';

export default function Puntos_Map() {
  const [nodos, setNodos] = useState([]);

  useEffect(() => {
    axios.get(APILinks.URL_ReadNodos)
      .then(response => {
        setNodos(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: -4.030385714368893,
          longitude: -79.19963418131871,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {nodos.map((nodo, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: nodo.geometry.coordinates[0],
              longitude: nodo.geometry.coordinates[1],
            }}
            title={nodo.properties.nombre}
            description={`ID: ${nodo._id}`}
          />
        ))}
      </MapView>
    </View>
  );
}