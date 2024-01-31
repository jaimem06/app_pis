import APILinks from '../../directionsAPI';
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Image, View, TouchableOpacity, Alert, Text } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import puntoEncuentro from '../../assets/pde.png';
import user from '../../assets/user.png'
import CustomPicker from '../../components/select_nodos';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomMarker = ({ marker: { tipo, coordenadas } }) => {
    if (tipo === "Ruta") {
        return null;
    }

    const imageSource = tipo === 'PDE' ? puntoEncuentro : user;
    const style = { width: 40, height: 40, borderRadius: 5, overflow: 'hidden' };

    return (
        <Marker coordinate={{ latitude: coordenadas[0], longitude: coordenadas[1] }}>
            <View style={style}>
                <Image source={imageSource} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
            </View>
        </Marker>
    );
};

const calculateRegion = (data) => {
    let minLat = Infinity, maxLat = -Infinity, minLng = Infinity, maxLng = -Infinity;
    data.forEach(({ coordenadas }) => {
        minLat = Math.min(minLat, coordenadas[0]);
        maxLat = Math.max(maxLat, coordenadas[0]);
        minLng = Math.min(minLng, coordenadas[1]);
        maxLng = Math.max(maxLng, coordenadas[1]);
    });
    const midLat = (minLat + maxLat) / 2;
    const midLng = (minLng + maxLng) / 2;

    return {
        latitude: midLat,
        longitude: midLng,
        latitudeDelta: Math.abs(maxLat - minLat) * 1.1,
        longitudeDelta: Math.abs(maxLng - minLng) * 1.1,
    };
};

const Home = () => {
    const [inicio, setInicio] = useState(''); const [fin, setFin] = useState(''); const [markers, setMarkers] = useState([]); const [nodos, setNodos] = useState([]); const mapRef = useRef(null);
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

    const buscar = () => {
        fetch(APILinks.URL_CaminoMinimo, {
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
                const region = calculateRegion(data);
                mapRef.current.animateToRegion(region, 1000);
            })
            .catch(error => {
                Alert.alert('Error', `Hubo un error al buscar la ruta: ${error.message}`);
            });
    };

    const filteredNodos = useMemo(() =>
        nodos.filter(nodo => nodo.properties.tipo !== 'Ruta').map(nodo => nodo.properties.nombre),
        [nodos]
    );

    return (
        <View style={{ flex: 1 }}>
            <View>
                <View style={{ flexDirection: 'row', justifyContent: "space-around" }}>
                    <Text style={{ fontSize: 15 }}>Escoje tu nodo inicio</Text>
                    <Text style={{ fontSize: 15 }}>Escoje tu nodo final</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <CustomPicker
                        style={{ margin: 40 }}
                        data={filteredNodos}
                        selectedValue={inicio}
                        onValueChange={(itemValue) => setInicio(itemValue)}
                    />
                    <CustomPicker
                        style={{ margin: 40 }}
                        data={filteredNodos}
                        selectedValue={fin}
                        onValueChange={(itemValue) => setFin(itemValue)}
                    />
                </View>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity onPress={buscar} style={{ backgroundColor: '#2A364E', padding: 5, borderRadius: 20, margin: 10, width: "50%" }}>
                    <Text style={{ color: 'white', textAlign: 'center', fontSize: 18 }}>BUSCAR</Text>
                </TouchableOpacity>
            </View>
            <View style={{ height: '80%', width: '85%', borderColor: '#2A364E', borderRadius: 10, borderWidth: 6, alignSelf: 'center' }}>
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
                        <CustomMarker key={index} marker={marker} />
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