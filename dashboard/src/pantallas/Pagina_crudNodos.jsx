import React, { useState, useEffect } from 'react';
import { createNodoRequest, readallNodoRequest } from '../api/auth' //CRUD NODES

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createNodoRequest(nodo);
            console.log(response.data);
            // Aquí puedes manejar la respuesta. Por ejemplo, puedes mostrar un mensaje de éxito o actualizar el estado de tu aplicación.
        } catch (error) {
            console.error(error);
            // Aquí puedes manejar los errores. Por ejemplo, puedes mostrar un mensaje de error.
        }
    }

    //Estilos formulario
    const formStyle = {
        //Estilos flotantes
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '1000',
        //////////////
        display: 'flex',
        flexDirection: 'column',
        alightItems: 'center',
        border: '1px solid black',
        padding: '20px',
        marginTop: '20px',
        backgroundColor: '#2A364E',
        width: '30%',
        margin: '0 auto',
        borderRadius: '10px',
        fontSize: '20px'
    };

    //Estilos entrada de texto
    const inputStyle = {
        color: '#2A364E',
        margin: '10px',
        borderRadius: '5px',
    };

    const buttonStyle = {
        backgroundColor: 'white',
        borderRadius: '5px',
        width: '65%',
    };

    const titulosStyle = {
        color: 'white',
        textAlign: 'left',
        fontSize: '16px',
    };

    const tablaStyle = {
        border: '1px solid white',
        padding: '20px',
        marginTop: '20px',
        backgroundColor: '#2A364E',
        width: '90%',
        margin: '0 auto',
        borderRadius: '10px',
        fontSize: '15px'
    };

    const filaStyle = {
        border: '1px solid white',
        textAlign: 'center',
    };

    const celdaStyle = {
        border: '1px solid white'
    };

    return (
        <div>
            <h1 style={{ textAlign: 'center', fontSize: '40px', color: '#3E91E5' }}>Gestión de Nodos</h1>
            <div>
                <label style={titulosStyle}>Nombre:</label>
                <input style={inputStyle} type="text" placeholder="Nombre" required />
                <button style={{
                    width: '18%',
                    backgroundColor: '#2A364E',
                    borderRadius: '8px',
                    border: '2px solid #3E91E5',
                    fontSize: '18px',
                    alightItems: 'left',
                    color: 'white',
                    margin: '20px'

                }} onClick={() => setShowForm(!showForm)}>Crear Nodo</button>
                {showForm && (
                    <form onSubmit={handleSubmit} style={formStyle}>
                        <label style={titulosStyle}>Nombre:</label>
                        <input style={inputStyle} type="text" name="nombre" onChange={handleChange} placeholder="Nombre" required />
                        <label style={titulosStyle}>Facultad:</label>
                        <input style={inputStyle} type="text" name="facultad" onChange={handleChange} placeholder="Facultad" required />
                        <label style={titulosStyle}>Coordenadas:</label>
                        <input style={inputStyle} type="text" name="coordinates" onChange={handleChange} placeholder="Coordenadas" required />
                        <label style={titulosStyle}>Tipo:</label>
                        <input style={inputStyle} type="text" name="tipo" onChange={handleChange} placeholder="Tipo" required />
                        <button style={buttonStyle} type="submit">Crear Nodo</button>
                    </form>
                )}
                <table style={tablaStyle}>
                    <thead>
                        <tr style={filaStyle}>
                            <th>Nombre</th>
                            <th>Facultad</th>
                            <th>Coordenadas</th>
                            <th>Tipo</th>
                            <th>Acciones</th> {/* Nueva celda para el título de la columna */}
                        </tr>
                    </thead>
                    <tbody>
                        {nodos.map((nodo, index) => (
                            <tr style={filaStyle} key={index}>
                                <td style={celdaStyle}>{nodo.properties.nombre}</td>
                                <td style={celdaStyle}>{nodo.properties.facultad}</td>
                                <td style={celdaStyle}>{nodo.geometry.coordinates.join(', ')}</td>
                                <td style={celdaStyle}>{nodo.properties.tipo}</td>
                                <td style={celdaStyle}> {/* Nueva celda para los botones */}
                                    <button onClick={() => handleEdit(index)}>Editar</button>
                                    <button onClick={() => handleUpdate(index)}>Actualizar</button>
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