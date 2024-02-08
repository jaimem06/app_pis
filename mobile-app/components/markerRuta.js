import React from 'react';
import { View, Image } from 'react-native'; 
import { Marker } from 'react-native-maps';
import puntoEncuentro from '../assets/pde.png';
import user from '../assets/user.png';
import route from '../assets/route.png';

const MarkerRuta = ({ marker, index, markers }) => {
    if (marker.tipo === 'Ruta') {
        return (
            <Marker
                key={index}
                coordinate={marker.coordenadas}
                anchor={{ x: 0.5, y: 0.5 }}
                title={marker.nombre}
            >
                <View style={{ width: 25, height: 25, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={route} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
                </View>
            </Marker>
        );
    }

    if (index === 0 || index === markers.length - 1) {
        return (
            <Marker
                key={index}
                coordinate={marker.coordenadas}
                anchor={{ x: 0.5, y: 0.5 }}
                title={marker.nombre}
            >
                {index === 0 && (
                    <View style={{ width: 45, height: 45, overflow: 'hidden' }}>
                        <Image source={user} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
                    </View>
                )}
                {index === markers.length - 1 && (
                    <View style={{ width: 40, height: 40, borderRadius: 5, overflow: 'hidden' }}>
                        <Image source={puntoEncuentro} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
                    </View>
                )}
            </Marker>
        );
    }

    return null;
};

export default MarkerRuta;