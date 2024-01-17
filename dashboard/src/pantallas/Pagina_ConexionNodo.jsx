import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { readallNodoRequest, connectNodoRequest } from '../api/auth'; //CRUD NODES
import { selectstyles, titulostyles, buttonConect } from '../styles/styles_connectNodo';

function ConexionNodos() {
    const [options, setOptions] = useState([]);
    const [selectedOptionA, setSelectedOptionA] = useState(null);
    const [selectedOptionB, setSelectedOptionB] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

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
        if (selectedOptionA && selectedOptionB) {
            if (selectedOptionA.label === selectedOptionB.label) {
                setErrorMessage('Los nodos no deben ser iguales.');
                return;
            }

            try {
                await connectNodoRequest(selectedOptionA.label, selectedOptionB.label);
                setErrorMessage(null);
            } catch (error) {
                setErrorMessage(error.response.data.message);
            }
        }
    };

    return (
        <div style={{ flexDirection: 'column', alignItems: 'center' }}>
            <h1 style={titulostyles}>Conexión de Nodos</h1>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <div style={{
                display: 'flex', flexDirection: 'row', justifyContent: 'center'
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
        </div>
    );
}

export default ConexionNodos;