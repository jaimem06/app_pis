import React from 'react';
import { Image, View, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import user from '../../assets/user.png'
import route from '../../assets/route.png';
import puntoEncuentro from '../../assets/pde.png';
import CustomPicker from '../../components/select_nodos';
import { Logica_BuscarRoute } from '../../components/logic_searchRoute';

const CustomMarker = ({ marker: { coordenadas, nombre }, index, totalMarkers }) => {
    let imageSource;
    let imageSize;
    if (index === 0) {
        imageSource = user;
        imageSize = 45;
    } else if (index === totalMarkers - 1) {
        imageSource = puntoEncuentro;
        imageSize = 40;
    } else {
        imageSource = route;
        imageSize = 25;
    }

    return (
        <Marker
            coordinate={{ latitude: coordenadas[0], longitude: coordenadas[1] }}
            anchor={{ x: 0.5, y: 0.5 }} // Centra la imagen
            title={nombre}
        >
            <View style={{ width: imageSize, height: imageSize, justifyContent: 'center', alignItems: 'center', aspectRatio: 1 }}>
                <Image source={imageSource} style={{ width: '100%', height: '100%', aspectRatio: 1 }} resizeMode="contain" />
            </View>
        </Marker>
    );
};

const Home = () => {
    const { inicio, setInicio, markers, buscar, filteredNodos, mapRef } = Logica_BuscarRoute();

    return (
        <View style={{ flex: 1 }}>
            <View>
                <View style={{ margin: 5 }}>
                    <CustomPicker
                        style={{ margin: 40 }}
                        data={filteredNodos}
                        selectedValue={inicio}
                        onValueChange={(itemValue) => setInicio(itemValue)}
                    />
                </View>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity onPress={buscar} style={{ backgroundColor: '#2A364E', padding: 8, borderRadius: 14, margin: 8, width: "35%" }}>
                    <Text style={{ color: 'white', textAlign: 'center', fontSize: 16 }}>Buscar Ruta</Text>
                </TouchableOpacity>
            </View>
            <View style={{ height: '82%', width: '95%', borderColor: '#2A364E', borderRadius: 10, borderWidth: 6, alignSelf: 'center' }}>
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
            </View>
        </View>
    );
};

export default Home;
