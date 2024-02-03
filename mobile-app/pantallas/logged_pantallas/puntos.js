import APILinks from '../../directionsAPI';
import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import { options, styles } from '../styles/styles_selectFac';

export default function Puntos_Map() {
  const [nodos, setNodos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState("Seleccione una Facultad");

  useEffect(() => {
    axios.get(APILinks.URL_ReadNodos)
      .then(response => {
        setNodos(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  const mapRef = useRef(null);
  useEffect(() => {
    if (selectedValue !== "Seleccione una Facultad") {
      axios.get(`${APILinks.URL_BuscarNodos}/${selectedValue}`)
        .then(response => {
          setNodos(response.data);

          // Calcular la latitud y longitud promedio de los nodos
          const averageLatitude = response.data.reduce((sum, nodo) => sum + nodo.geometry.coordinates[0], 0) / response.data.length;
          const averageLongitude = response.data.reduce((sum, nodo) => sum + nodo.geometry.coordinates[1], 0) / response.data.length;

          // Mover el mapa a la región promedio
          mapRef.current.animateToRegion({
            latitude: averageLatitude,
            longitude: averageLongitude,
            latitudeDelta: 0.005, // Valor más pequeño para un mayor zoom
            longitudeDelta: 0.005,
          }, 2000); // 3000 ms = 3 segundos
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [selectedValue]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ paddingLeft: "12%", paddingRight: "12%", paddingTop: 4, borderRadius: 10, color: "#2A364E", fontSize: 18, fontWeight: "bold", borderColor: "#B3DFE8", borderWidth: 3 }}>Visualizar puntos registrados de:</Text>
      <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(true)}>
        <Text style={{ color: "white", fontSize: 15 }}>{selectedValue}</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableOpacity
          style={styles.centeredView}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}
        >
          <View style={styles.modalView}>
            {options.map((option, index) => (
              <View key={index}>
                <TouchableOpacity onPress={() => { setSelectedValue(option); setModalVisible(false); }}>
                  <Text style={styles.modalText}>{option}</Text>
                </TouchableOpacity>
                <View style={styles.separator} />
              </View>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      <MapView ref={mapRef}
        style={{ width: "90%", height: "80%" }}
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
