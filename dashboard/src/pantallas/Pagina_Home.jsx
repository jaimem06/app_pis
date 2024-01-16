import React from "react";
import Mapa from '../componentes/Mapa'

function PaginaHome() {
    return (
        <div>
            <h1 style={{ textAlign: 'center', color: "white", backgroundColor: "#2A364E", fontSize: "25px" }}>Bienvenido a FRED-UNL</h1>
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '93vh' // Asegura que el div ocupe toda la altura de la pantalla
            }}>
                <Mapa />
            </div>
        </div>
    );
}

export default PaginaHome;