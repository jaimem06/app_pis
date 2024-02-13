import { useState, useEffect, useRef, useMemo } from 'react';
import APILinks from '../directionsAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const calculateMinMaxLatLong = (data) => {
    return data.reduce((acc, { coordenadas }) => {
        return {
            minLat: Math.min(acc.minLat, coordenadas[0]),
            maxLat: Math.max(acc.maxLat, coordenadas[0]),
            minLng: Math.min(acc.minLng, coordenadas[1]),
            maxLng: Math.max(acc.maxLng, coordenadas[1]),
        };
    }, { minLat: Infinity, maxLat: -Infinity, minLng: Infinity, maxLng: -Infinity });
};

export const calculateRegion = (data) => {
    const { minLat, maxLat, minLng, maxLng } = calculateMinMaxLatLong(data);
    const midLat = (minLat + maxLat) / 2;
    const midLng = (minLng + maxLng) / 2;

    return {
        latitude: midLat,
        longitude: midLng,
        latitudeDelta: Math.abs(maxLat - minLat) * 1.1,
        longitudeDelta: Math.abs(maxLng - minLng) * 1.1,
    };
};

export const Logica_BuscarRoute = () => {
    const [inicio, setInicio] = useState('');
    const [markers, setMarkers] = useState([]);
    const [nodos, setNodos] = useState([]);
    const mapRef = useRef(null);

    const resetInicio = () => {
        setInicio(null);
    };

    useEffect(() => {
        const fetchNodos = async () => {
            try {
                let data = await AsyncStorage.getItem('nodos');
                if (data !== null) {
                    setNodos(JSON.parse(data));
                } else {
                    data = await fetch(APILinks.URL_ReadNodos);
                    const jsonData = await data.json();
                    setNodos(jsonData);
                    await AsyncStorage.setItem('nodos', JSON.stringify(jsonData));
                }
            } catch (error) {
                Alert.alert('Error', `Hubo un error al cargar los nodos: ${error.message}`);
            }
        };
        fetchNodos();
    }, []);
    
    const buscar = async () => {
        if (!inicio) {
            Alert.alert('Nodo inicio no seleccionado', 'Por favor seleccione un punto de inicio para buscar la Ruta.');
            return;
        }
        try {
            const response = await fetch(APILinks.URL_CaminoMinimo, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    inicio: inicio
                })
            });
            const { ruta, totalDistance } = await response.json();
            setMarkers(ruta);
            const region = calculateRegion(ruta);
            mapRef.current.animateToRegion(region, 1000);
            setInicio(null);
        } catch (error) {
            Alert.alert('Error', `Hubo un error al buscar la ruta: ${error.message}`);
        }
    };

    const filteredNodos = useMemo(() =>
        nodos.filter(nodo => nodo.properties.tipo !== 'Ruta').map(nodo => nodo.properties.nombre),
        [nodos]
    );
    return {
        inicio,
        setInicio,
        markers,
        buscar,
        filteredNodos,
        mapRef
    };
};