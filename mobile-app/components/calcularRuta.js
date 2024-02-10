import * as Location from 'expo-location';
import APILinks from '../directionsAPI';
import { Alert } from 'react-native';

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
  
    fetch(APILinks.URL_CaminoMinimo, {
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