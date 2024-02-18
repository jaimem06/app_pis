import * as Location from 'expo-location';
import APILinks from '../directionsAPI';
import { Alert, Platform } from 'react-native';

export const calcularRuta = async (setMarkers, setTotalDistance, isHomeActive) => {
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
      .then(response => response.json())
      .then(data => {
        if (data.error && isHomeActive) {
          Alert.alert('No se puede calcular la ruta:', data.error);
          return;
        }

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
        if (isHomeActive) {
          Alert.alert('Error', 'Ocurrió un error al calcular la ruta.');
        }
        console.error(error);
      });
};