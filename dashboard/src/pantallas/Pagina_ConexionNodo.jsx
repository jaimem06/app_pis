import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { readallNodoRequest, connectNodoRequest, simularSismoRequest } from '../api/auth'; //CRUD NODES
import { selectstyles, titulostyles, buttonConect, advertenciaStyle, buttonSismo } from '../styles/styles_connectNodo';
import Mapa_Conexiones from '../componentes/MapaConexiones';

function ConexionNodos() {
    const [options, setOptions] = useState([]);
    const [selectedOptionA, setSelectedOptionA] = useState(null);
    const [selectedOptionB, setSelectedOptionB] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [nodesConnected, setNodesConnected] = useState(false); // Nuevo estado
    const [sismoData, setSismoData] = useState(null); // Nuevo estado para almacenar los datos del sismo
    const [dummyState, setDummyState] = useState(false); // Forzar la actualización del componente (Tiempo)

    useEffect(() => {
        const fetchNodos = async () => {
            const response = await readallNodoRequest();
            const nodos = response.data;
            const nodoOptions = nodos.map(nodo => ({ value: nodo._id, label: nodo.properties.nombre }));
            setOptions(nodoOptions);
        };

        fetchNodos();
    }, []);

    const [sismoMessage, setSismoMessage] = useState(null); // Nuevo estado para el mensaje del sismo
    const handleSismo = async () => {
        try {
            const response = await simularSismoRequest();
            setSismoData(response.data);
            setSismoMessage(`Simulación exitosa. Magnitud: ${response.data.magnitud}`);
            setTimeout(() => {
                setSismoMessage(null);
                setDummyState(!dummyState); // Cambia el estado para forzar un nuevo renderizado
            }, 3500);
        } catch (error) {
            console.error(error);
            setSismoMessage('Error al simular el sismo.');
            setTimeout(() => {
                setSismoMessage(null);
                setDummyState(!dummyState); // Cambia el estado para forzar un nuevo renderizado
            }, 3500);
        }
    };

    const handleConnect = async () => {
        if (!selectedOptionA || !selectedOptionB) {
            setErrorMessage('Ambos nodos deben estar seleccionados.');
            setTimeout(() => {
                setErrorMessage(null);
                setDummyState(!dummyState); // Cambia el estado para forzar un nuevo renderizado
            }, 4000);
            return;
        }

        if (selectedOptionA.label === selectedOptionB.label) {
            setErrorMessage('Los nodos no deben ser iguales.');
            setTimeout(() => {
                setErrorMessage(null);
                setDummyState(!dummyState); // Cambia el estado para forzar un nuevo renderizado
            }, 4000);
            return;
        }

        try {
            await connectNodoRequest(selectedOptionA.label, selectedOptionB.label);
            setErrorMessage(null);
            setNodesConnected(!nodesConnected); // Cambia el estado cuando los nodos se conectan
        } catch (error) {
            setErrorMessage(error.response.data.message);
            setTimeout(() => {
                setErrorMessage(null);
                setDummyState(!dummyState); // Cambia el estado para forzar un nuevo renderizado
            }, 3500);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1 style={titulostyles}>Conexión de Nodos</h1>
            <div style={{
                display: 'flex', flexDirection: 'row', justifyContent: 'center', zIndex: 1, position: 'relative'
            }}>
                <Select
                    options={options}
                    onChange={setSelectedOptionA}
                    isSearchable
                    styles={selectstyles}
                />
                <Select
                    options={options}
                    onChange={setSelectedOptionB}
                    isSearchable
                    styles={selectstyles}
                />
                <button style={buttonConect} onClick={handleConnect}>
                    Conectar
                </button>
                <button style={buttonSismo} onClick={handleSismo}>
                    Simular Sismo
                </button>
            </div>
            {errorMessage && <p style={advertenciaStyle}>{errorMessage}</p>}
            {sismoMessage && <p style={advertenciaStyle}> {sismoMessage}</p>}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '80vh', // Asegura que el div ocupe toda la altura de la pantalla
                zIndex: 0, position: 'relative'
            }}>
                <Mapa_Conexiones nodesConnected={nodesConnected} />
            </div>
        </div>
    );
}

export default ConexionNodos;