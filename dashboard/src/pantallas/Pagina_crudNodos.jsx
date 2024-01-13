import React, { useState, useEffect } from 'react';
import {
    createNodoRequest,
    readallNodoRequest,
    deleteNodoRequest,
    searchNodoRequest
} from '../api/auth' //CRUD NODES
import { AiFillDelete, AiFillEdit, AiOutlineSearch } from "react-icons/ai";

//Estilos de la pagina
import {tablaStyle, filaStyle, celdaStyle, deletebutton, buttonCrearNodo,  editbutton,
    celdaButtons, buttonBuscar, inputBuscar
} from '../styles/styles_pageNodo';

// Formulario para crear un nodo
import FormAddNodo from '../pantallas/forms/Form_CrearNodo';

const Pagina_crudNodos = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [nodo, setNodo] = useState({
        type: 'Feature',
        properties: {
            nombre: '',
            facultad: '',
            tipo: '',
            conexiones: []
        },
        geometry: {
            type: 'Point',
            coordinates: []
        }
    });

    const [nodos, setNodos] = useState([]);

    useEffect(() => {
        const fetchNodos = async () => {
            const response = await readallNodoRequest();
            setNodos(response.data);
        };

        fetchNodos();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "coordinates") {
            setNodo(prevState => ({
                ...prevState,
                geometry: {
                    ...prevState.geometry,
                    coordinates: value.split(',').map(Number)
                }
            }));
        } else if (name in nodo.properties) {
            setNodo(prevState => ({
                ...prevState,
                properties: {
                    ...prevState.properties,
                    [name]: value
                }
            }));
        } else if (name in nodo.geometry) {
            setNodo(prevState => ({
                ...prevState,
                geometry: {
                    ...prevState.geometry,
                    [name]: value
                }
            }));
        } else {
            setNodo(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    }
    //Agregar un nodo
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nodo.properties.facultad || !nodo.properties.tipo) {
            alert('Por favor, seleccione una facultad y un tipo.');
            return;
        }

        try {
            const response = await createNodoRequest(nodo);
            console.log(response.data);
            setNodos(prevNodos => [...prevNodos, response.data]);
            setShowForm(false);
            alert('Nodo creado exitosamente!');
        } catch (error) {
            console.error(error);
        }
    }

    //Cancelar formulario
    const handleCancel = () => {
        setShowForm(false);
    }

    //Eliminar un nodo
    const handleDelete = (index) => {
        const nodoToDelete = nodos[index];
        const confirmDelete = window.confirm(`¿Estás seguro de que quieres eliminar el nodo ${nodoToDelete.properties.nombre}?`);
        if (confirmDelete) {
            deleteNodoRequest(nodoToDelete.geometry.coordinates)
                .then(response => {
                    console.log(response.data);
                    // Actualiza el estado de los nodos después de eliminar el nodo
                    const newNodos = nodos.filter((nodo, i) => i !== index);
                    setNodos(newNodos);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    };
    const handleSearch = async (event) => {
        event.preventDefault();
        const searchQueryLower = searchQuery.toLowerCase();
        try {
            const response = await searchNodoRequest(searchQueryLower);
            if (response.data.length === 0) {
                setErrorMessage('Los datos no existen en la base');
            } else {
                setErrorMessage('');
                setNodos(response.data.filter(nodo =>
                    nodo.properties.nombre.toLowerCase().includes(searchQueryLower) ||
                    nodo.properties.facultad.toLowerCase().includes(searchQueryLower) ||
                    nodo.properties.tipo.toLowerCase().includes(searchQueryLower)
                ));
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('Verifique los datos ingresados, error en la busqueda');
        }
    };

    return (
        <div>
            <h1 style={{ textAlign: 'center', fontSize: '25px', backgroundColor: "#2A364E", color: 'white', marginBottom: "10px" }}>Gestión de Nodos</h1>
            <div>
                <div style={{ display: 'flex', marginLeft: "50px", marginBottom: "5px" }}>
                    <form onSubmit={handleSearch}>
                        <input
                            style={inputBuscar}
                            type="text"
                            placeholder="Buscar"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            required
                        />
                        <button style={buttonBuscar} type="submit"><AiOutlineSearch /></button>
                    </form>
                    <button style={buttonCrearNodo} onClick={() => setShowForm(!showForm)}>Crear Nodo</button>
                </div>
                {errorMessage && <p style={{ color: 'red', fontSize: '16px', textAlign: 'center', paddingBottom: '5px' }}>{errorMessage}</p>}
                {showForm && (
                    <FormAddNodo
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        handleCancel={handleCancel}
                    />
                )}
                <div style={{ overflow: 'auto', height: '500px' }}> {/* Ajusta la altura según tus necesidades */}
                    <table style={tablaStyle}>
                        <thead>
                            <tr style={filaStyle}>
                                <th>Nombre</th>
                                <th>Facultad</th>
                                <th>Coordenadas</th>
                                <th>Tipo</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {nodos.map((nodo, index) => (
                                <tr style={filaStyle} key={index}>
                                    <td style={celdaStyle}>{nodo.properties.nombre}</td>
                                    <td style={celdaStyle}>{nodo.properties.facultad}</td>
                                    <td style={celdaStyle}>{nodo.geometry.coordinates.join(', ')}</td>
                                    <td style={celdaStyle}>{nodo.properties.tipo}</td>
                                    <td style={celdaButtons}>
                                        <button style={editbutton} onClick={() => handleEdit(index)}><AiFillEdit
                                            style={{ color: "white", fontSize: "24px" }} />
                                        </button>

                                        <button style={deletebutton} onClick={() => handleDelete(index)}> <AiFillDelete
                                            style={{ color: "white", fontSize: "24px" }} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Pagina_crudNodos;