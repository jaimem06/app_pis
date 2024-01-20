import React, { useEffect, useState } from 'react';
import Mapa from '../componentes/Mapa';
import { readallNodoRequest } from '../api/auth';
import edificioIcon from '../assets/location.svg';
import meetingPoint from "../assets/meeting_point.svg";
import rutaIcon from "../assets/red_pin.svg";


function PaginaHome() {
    const [nodos, setNodos] = useState([]);
    const [numRuta, setNumRuta] = useState(0);
    const [numBloque, setNumBloque] = useState(0);
    const [numPDE, setNumPDE] = useState(0);

    useEffect(() => {
        const fetchNodos = async () => {
            const response = await readallNodoRequest();
            setNodos(response.data);
        };

        fetchNodos();
    }, []);

    useEffect(() => {
        const rutaNodos = nodos.filter(nodo => nodo.properties.tipo === 'Ruta');
        setNumRuta(rutaNodos.length);

        const bloqueNodos = nodos.filter(nodo => nodo.properties.tipo === 'Edificacion');
        setNumBloque(bloqueNodos.length);

        const pdeNodos = nodos.filter(nodo => nodo.properties.tipo === 'PDE');
        setNumPDE(pdeNodos.length);
    }, [nodos]);

    return (
        <div>
            <h1 style={{ textAlign: 'center', color: "white", backgroundColor: "#2A364E", fontSize: "25px", marginBottom: "20px"}}>Bienvenido a FRED-UNL</h1>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <p style={styleInfo}><img style={iconStyle} src={rutaIcon}/>Nodos Ruta: {numRuta}</p>
                <p style={styleInfo}><img style={iconStyle} src={edificioIcon}/>Nodos de Edificación: {numBloque}</p>
                <p style={styleInfo}><img style={iconStyle} src={meetingPoint}/>Puntos de Encuentro: {numPDE}</p>
            </div>
            <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    height: '82vh' // Asegura que el div ocupe toda la altura de la pantalla
            }}>
                    <Mapa />
            </div>
        </div>
    );
}
const styleInfo = {
    backgroundColor: "#2A364E",
    borderRadius: "15px",
    width: '25%',
    marginRight: "20px",
    padding: "15px",
    textAlign: "center",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}
const iconStyle = {
    width: "32px",
    height: "32px",
    marginRight: "4px",
}

export default PaginaHome;