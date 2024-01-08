import React, { useState, useEffect } from 'react';
import {
    createNodoRequest,
    readallNodoRequest,
    deleteNodoRequest
} from '../api/auth' //CRUD NODES
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

//Estilos de la pagina
import {
    formStyle, inputStyle, buttonADD, titulosStyle,
    tablaStyle, filaStyle, celdaStyle, deletebutton,
    buttonCrearNodo, buttonsForm, cancelbutton, editbutton,
    celdaButtons
}
    from '../styles/PageNodos';

const Pagina_crudNodos = () => {

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

    const facultades = [
        "Administración Central",
        "Bienestar Universitario",
        "Educación a Distancia",
        "Agropecuaria y de Recursos Nat Renovables",
        "Energía, las Ind y los Recursos Nat No Renovables",
        "Educación el Arte y la Comunicación",
        "Jurídica, Social y Administrativa",
        "Salud Humana"
    ];

    const tipos = [
        "Edificacion",
        "Ruta",
        "PDE" //Punto de Encuentro
    ]

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

    return (
        <div style={{ backgroundColor: "" }}>
            <h1 style={{ textAlign: 'center', fontSize: '25px', backgroundColor: "#2A364E", color: 'white' }}>Gestión de Nodos</h1>
            <div>
                <input style={{
                    marginLeft: "60px",
                    border: '1px solid #2A364E',
                    borderRadius: '4px',
                }} type="text" placeholder="Buscar" required />
                <button style={buttonCrearNodo} onClick={() => setShowForm(!showForm)}>Crear Nodo</button>
                {showForm && (
                    <form onSubmit={handleSubmit} style={formStyle}>
                        <label style={titulosStyle}>Nombre:</label>
                        <input style={inputStyle} type="text" name="nombre" onChange={handleChange} placeholder="Nombre" required />
                        <label style={titulosStyle}>Facultad:</label>
                        <select style={inputStyle} name="facultad" onChange={handleChange} required>
                            <option value="">Seleccione una facultad</option>
                            {facultades.map((facultad, index) => (
                                <option key={index} value={facultad}>
                                    {facultad}
                                </option>
                            ))}
                        </select>
                        <label style={titulosStyle}>Coordenadas:</label>
                        <input style={inputStyle} type="text" name="coordinates" onChange={handleChange} placeholder="Coordenadas" required />

                        <label style={titulosStyle}>Tipo:</label>
                        <select style={inputStyle} name="tipo" onChange={handleChange} required>
                            <option value="">Seleccione un tipo</option>
                            {tipos.map((tipo, index) => (
                                <option key={index} value={tipo}>
                                    {tipo}
                                </option>
                            ))}
                        </select>
                        <div style={buttonsForm}>
                            <button style={cancelbutton} type="button" onClick={handleCancel}>Cancelar</button>
                            <button style={buttonADD} type="submit">Agregar Nodo</button>
                        </div>
                    </form>
                )}
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
    );
}

export default Pagina_crudNodos;