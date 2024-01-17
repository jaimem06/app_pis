import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { readallNodoRequest } from '../api/auth'
import PinVerde from '../assets/green_pin.svg';
import PinAzul from '../assets/blue_pin.svg';
import PinRojo from '../assets/red_pin.svg';

function Mapa({ nodos }) {

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
            mapRef.current = L.map("map-container").setView([-4.033343485558859, -79.20270309221831], 17);

            // Añade una capa de mapa (puedes usar diferentes proveedores de mapas)
            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: "FRED-UNL"
            }).addTo(mapRef.current);

            // Fuerza la actualización del mapa después de que se haya renderizado y los estilos se hayan aplicado
            setTimeout(() => {
                mapRef.current.invalidateSize();
            }, 0);

            // Agrega un evento de clic derecho al mapa para copiar las coordenadas
            mapRef.current.on('contextmenu', function (e) {
                // Prepara las coordenadas para copiarlas
                const coords = `${e.latlng.lat}, ${e.latlng.lng}`;

                // Copia las coordenadas al portapapeles
                navigator.clipboard.writeText(coords).then(function () {
                    // Muestra una notificación después de copiar las coordenadas
                    new L.Popup({ closeOnClick: true })
                        .setLatLng(e.latlng)
                        .setContent(`Coordenadas copiadas`)
                        .openOn(mapRef.current);
                }, function (err) {
                    // Hubo un error al intentar copiar al portapapeles
                    console.error('Error al copiar las coordenadas al portapapeles: ', err);
                });
            });

            // Llama a tu API y añade marcadores al mapa
            readallNodoRequest().then(response => {
                console.log(response.data); // Para ver qué estás recibiendo
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
                            icon = iconVerde; // Puedes cambiar esto al icono que quieras usar por defecto
                    }
                    L.marker(item.geometry.coordinates, { icon: icon }).addTo(mapRef.current).bindPopup(`
            <strong>${item.properties.nombre}</strong><br/>
            ${item.properties.facultad}<br/>
            ${item.properties.tipo}
        `);
                });
            });
        }

        // Limpia el mapa cuando el componente se desmonta
        return () => {
            if (mapRef.current) {
                mapRef.current.off('contextmenu'); // Elimina el evento de clic derecho
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, [nodos]);

    return (
        <div id="map-container" style={{
            height: "510px",
            width: "990px",
            borderRadius: "20px",
            border: "3px solid #2A364E",
            boxShadow: "0px 10px 25px #2A364E",
        }}></div>
    );
}

export default Mapa;