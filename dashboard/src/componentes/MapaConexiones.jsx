import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { readallNodoRequest } from '../api/auth'
import PinVerde from '../assets/green_pin.svg';
import PinAzul from '../assets/blue_pin.svg';
import PinRojo from '../assets/red_pin.svg';

function Mapa_Conexiones({ nodesConnected }) { // Cambia nodos a nodesConnected

    const mapRef = useRef(null);

    const iconVerde = L.icon({
        iconUrl: PinVerde,
        iconSize: [15], // Tamaño del icono
    });

    const iconRojo = L.icon({
        iconUrl: PinRojo,
        iconSize: [11], // Tamaño del icono
    });

    const iconAzul = L.icon({
        iconUrl: PinAzul,
        iconSize: [15], // Tamaño del icono
    });

    useEffect(() => {
        if (!mapRef.current) {
            // Configura el mapa cuando el componente se monta
            mapRef.current = L.map("map-container").setView([-4.033343485558859, -79.20270309221831], 18);

            // Añade una capa de mapa (puedes usar diferentes proveedores de mapas)
            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: "Mapa de Conexiones"
            }).addTo(mapRef.current);

            // Fuerza la actualización del mapa después de que se haya renderizado y los estilos se hayan aplicado
            setTimeout(() => {
                mapRef.current.invalidateSize();
            }, 0);
        }

        // Limpia el mapa cuando el componente se desmonta
        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        if (mapRef.current) {
            // Llama al API y añade marcadores al mapa
            readallNodoRequest().then(response => {
                console.log(response.data); // Para ver qué estás recibiendo
                const markers = {};
                response.data.forEach(item => {
                    let icon;
                    switch (item.properties.tipo) {
                        case 'Ruta':
                            icon = iconRojo;
                            break;
                        case 'Edificacion':
                            icon = iconAzul;
                            break;
                        case 'PDE':
                            icon = iconVerde;
                            break;
                        default:
                            icon = iconVerde;
                    }
                    markers[item.properties.nombre] = L.marker(item.geometry.coordinates, { icon: icon }).addTo(mapRef.current).bindPopup(`
                        <strong>${item.properties.nombre}</strong><br/>
                        ${item.properties.facultad}<br/>
                        ${item.properties.tipo}
                    `);
                });

                // Dibuja las conexiones
                response.data.forEach(item => {
                    item.properties.conexiones.forEach(conexion => {
                        const nodoConexion = markers[conexion.nodo];
                        if (nodoConexion) {
                            const latlngs = [
                                L.latLng(item.geometry.coordinates),
                                L.latLng(nodoConexion.getLatLng())
                            ];
                            const color = conexion.ultimaConexion ? 'red' : '#2A364E'; // Cambia el color si es la última conexión
                            const polyline = L.polyline(latlngs, { color: color, weight: 1 }).addTo(mapRef.current);
                        }
                    });
                });
            });
        }
    }, [nodesConnected]); // Cambia nodos a nodesConnected

    return (
        <div id="map-container" style={{
            height: "450px",
            width: "990px",
            borderRadius: "10px",
            border: "3px solid #2A364E",
            margin: "0 auto",
        }}></div>
    );
}

export default Mapa_Conexiones;