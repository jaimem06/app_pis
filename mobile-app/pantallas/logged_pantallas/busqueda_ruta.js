import React, { useState } from 'react';
import { Image, View, TouchableOpacity, Text, ActivityIndicator, Platform } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import user from '../../assets/user.png'
import route from '../../assets/route.png';
import puntoEncuentro from '../../assets/pde.png';
import CustomPicker from '../../components/select_nodos';
import { Logica_BuscarRoute } from '../../components/logic_searchRoute';

const markerConfig = {
    user: {
        imageSource: user,
        imageSize: 40
    },
    puntoEncuentro: {
        imageSource: puntoEncuentro,
        imageSize: 35
    },
    route: {
        imageSource: route,
        imageSize: 20
    }
};

const CustomMarker = ({ marker: { coordenadas, nombre }, index, totalMarkers }) => {
    let config;
    if (index === 0) {
        config = markerConfig.user;
    } else if (index === totalMarkers - 1) {
        config = markerConfig.puntoEncuentro;
    } else {
        config = markerConfig.route;
    }

    return (
        <Marker
            coordinate={{ latitude: coordenadas[0], longitude: coordenadas[1] }}
            anchor={{ x: 0.5, y: 0.5 }} // Centra la imagen
            title={nombre}
        >
            <View style={{ width: config.imageSize, height: config.imageSize, justifyContent: 'center', alignItems: 'center', aspectRatio: 1 }}>
                <Image source={config.imageSource} style={{ width: '100%', height: '100%', aspectRatio: 1 }} resizeMode="center" />
            </View>
        </Marker>
    );
};

const Home = () => {
    const [nodoCercano, setNodoCercano] = useState(null);
    const { inicio, setInicio, markers, buscar, buscarNodoCercano, filteredNodos, mapRef, isLoading } = Logica_BuscarRoute(setNodoCercano);

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <CustomPicker
                data={filteredNodos}
                selectedValue={nodoCercano || inicio}
                onValueChange={(itemValue) => {
                    setInicio(itemValue);
                    setNodoCercano(itemValue);
                }}
            />
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: 'black', textAlign: 'center', fontSize: 13 }}>¿No conoces tu bloque? Nosotros lo buscamos:</Text>
                <TouchableOpacity onPress={buscarNodoCercano} style={{ backgroundColor: '#B3DFE8', borderRadius: 12, margin: 2, width: "20%", padding: 2 }}>
                    <Text style={{ color: '#2A364E', textAlign: 'center', fontSize: 13 }}>Pulsa aquí</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => {
                buscar();
                setNodoCercano(null);
            }} style={{ backgroundColor: '#2A364E', padding: 8, borderRadius: 14, margin: 8, width: "95%" }}>
                <Text style={{ color: 'white', textAlign: 'center', fontSize: 16 }}>Buscar Ruta</Text>
            </TouchableOpacity>
            <View style={{ height: '82%', width: '95%', borderColor: '#2A364E', borderRadius: 10, borderWidth: 6 }}>
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
                    {
                        markers.map((marker, index) => (
                            <CustomMarker key={index} marker={marker} index={index} totalMarkers={markers.length} />
                        ))
                    }
                    <Polyline
                        coordinates={markers.map(marker => ({
                            latitude: marker.coordenadas[0],
                            longitude: marker.coordenadas[1],
                        }))}
                        strokeColor="#2A364E"
                        strokeWidth={6}
                    />
                </MapView>
                {isLoading && (
                    <View style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(12,43,212,0.1)',
                    }}>
                        <ActivityIndicator size={Platform.OS === 'ios' ? 300 : 'large'} color="#2A364E" />
                    </View>
                )}
            </View>
        </View>
    );
};

export default Home;
