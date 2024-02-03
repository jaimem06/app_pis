import APILinks from '../../directionsAPI';
import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import { options, styles } from '../styles/styles_selectFac';
import { stylesVista } from '../styles/styles_puntos';
import edificacionIcon from '../../assets/location.png';
import pdeIcon from '../../assets/pde.png';
import rutaIcon from '../../assets/route.png';

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
            latitudeDelta: 0.004, // Valor más pequeño para un mayor zoom
            longitudeDelta: 0.004,
          }, 1200); // = 1.2 segundos
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [selectedValue]);

  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Text style={stylesVista.title_puntos}>Visualizar puntos registrados de:</Text>
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

      <View style={{ width: "90%", height: "86%", borderRadius: 10, borderColor: '#B3DFE8', borderWidth: 5 }}>
        <MapView ref={mapRef}
          style={{ flex: 1 }}
          initialRegion={{
            latitude: -4.030385714368893,
            longitude: -79.19963418131871,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {nodos.map((nodo, index) => {
            let icon;
            switch (nodo.properties.tipo) {
              case 'Edificacion':
                icon = edificacionIcon;
                break;
              case 'PDE':
                icon = pdeIcon;
                break;
              case 'Ruta':
                icon = rutaIcon;
                break;
              default:
                icon = null;
            }

            return (
              <Marker
                key={index}
                coordinate={{
                  latitude: nodo.geometry.coordinates[0],
                  longitude: nodo.geometry.coordinates[1],
                }}
                title={nodo.properties.nombre}
                description={`Facultad: ${nodo.properties.facultad}`}
                image={icon}
              />
            );
          })}
        </MapView>
      </View>
    </View>
  );
}
