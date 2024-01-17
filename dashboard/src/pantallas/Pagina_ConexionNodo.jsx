import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { readallNodoRequest, connectNodoRequest } from '../api/auth'; //CRUD NODES
import { selectstyles, titulostyles, buttonConect, advertenciaStyle} from '../styles/styles_connectNodo';
import Mapa_Conexiones from '../componentes/MapaConexiones';

function ConexionNodos() {
    const [options, setOptions] = useState([]);
    const [selectedOptionA, setSelectedOptionA] = useState(null);
    const [selectedOptionB, setSelectedOptionB] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [nodesConnected, setNodesConnected] = useState(false); // Nuevo estado
    const [lastConnection, setLastConnection] = useState(null); // Nuevo estado para la última conexión

    useEffect(() => {
        const fetchNodos = async () => {
            const response = await readallNodoRequest();
            const nodos = response.data;
            const nodoOptions = nodos.map(nodo => ({ value: nodo._id, label: nodo.properties.nombre }));
            setOptions(nodoOptions);
        };

        fetchNodos();
    }, []);

    const handleConnect = async () => {
        if (!selectedOptionA || !selectedOptionB) {
            setErrorMessage('Ambos nodos deben estar seleccionados.');
            return;
        }

        if (selectedOptionA.label === selectedOptionB.label) {
            setErrorMessage('Los nodos no deben ser iguales.');
            return;
        }

        try {
            await connectNodoRequest(selectedOptionA.label, selectedOptionB.label);
            setErrorMessage(null);
            setNodesConnected(!nodesConnected); // Cambia el estado cuando los nodos se conectan
            setLastConnection({ from: selectedOptionA.label, to: selectedOptionB.label }); // Almacena la última conexión
        } catch (error) {
            setErrorMessage(error.response.data.message);
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
            </div>
            {errorMessage && <p style={advertenciaStyle}>{errorMessage}</p>}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '80vh', // Asegura que el div ocupe toda la altura de la pantalla
                zIndex: 0, position: 'relative'
            }}>
                <Mapa_Conexiones nodesConnected={nodesConnected} lastConnection={lastConnection} />
            </div>
        </div>
    );
}

export default ConexionNodos;