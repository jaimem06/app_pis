import * as Location from 'expo-location';
import APILinks from '../directionsAPI';
import { Alert, Platform } from 'react-native';

export const calcularRuta = async (setMarkers, setTotalDistance) => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso de acceso a la ubicación denegado');
      return;
    }
    // En caso de ser IOS se utiliza mejor precisión
    let location = await Location.getCurrentPositionAsync({
        accuracy: Platform.OS === 'ios' ? Location.Accuracy.BestForNavigation : Location.Accuracy.High,
    });
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
        if (!response.ok) {
          throw new Error(`El servidor devolvió un error: ${response.status}`);
        }

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.indexOf('application/json') !== -1) {
          return response.json();
        } else {
          throw new Error('La respuesta del servidor no es un JSON válido');
        }
      })
      .then(data => {
        console.log(data);
        let newMarkers = data.ruta.map(item => ({
          nombre: item.nombre,
          tipo: item.tipo,
          coordenadas: {
            longitude: item.coordenadas[1],
            latitude: item.coordenadas[0]
          }
        }));

        setMarkers(newMarkers);
        setTotalDistance(data.totalDistancia);
      })
      .catch(error => {
        console.error(error);
      });
};