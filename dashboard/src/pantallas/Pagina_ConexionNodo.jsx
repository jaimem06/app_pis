import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { readallNodoRequest } from '../api/auth'; //CRUD NODES

function ConexionNodos() {
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        const fetchNodos = async () => {
            const response = await readallNodoRequest();
            const nodos = response.data;
            const nodoOptions = nodos.map(nodo => ({ value: nodo._id, label: nodo.properties.nombre }));
            setOptions(nodoOptions);
        };

        fetchNodos();
    }, []);

    const customStyles = {
        control: (base, state) => ({
            ...base,
            height: '40px',
            minHeight: '40px',
            width: '200px',
            minWidth: '200px',
            margin: '10px',
            backgroundColor: '#9CC8F0',
            boxShadow: state.isFocused ? '0 0 0 3px #2A364E' : null, // Cambia el color del borde cuando el select está enfocado
            
        }),
    };

    return (
        <div style={{ flexDirection: 'column', alignItems: 'center' }}>
            <h1 style={{ textAlign: 'center', color: "white", backgroundColor: "#2A364E", fontSize: "25px" }}>Conexión de Nodos</h1>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '10px', color: "black"}}>
                <Select
                    options={options}
                    onChange={setSelectedOption}
                    isSearchable
                    styles={customStyles}
                />
                <Select
                    options={options}
                    onChange={setSelectedOption}
                    isSearchable
                    styles={customStyles}
                />
                <button>
                    Conectar
                </button>
            </div>
        </div>
    );
}

export default ConexionNodos;