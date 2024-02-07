import React from 'react';
import { AiFillDelete, AiFillEdit, AiOutlineSearch, AiTwotoneEnvironment } from "react-icons/ai";
import MapaFlotante from '../componentes/MapaFlotante';
import {
    tablaStyle, filaStyle, celdaStyle, deletebutton, buttonCrearNodo, editbutton,
    celdaButtons, buttonBuscar, inputBuscar, formEditarNodo
} from '../styles/styles_pageNodo';
import FormAddNodo from '../pantallas/forms/Form_CrearNodo';
import FormEditarNodo from '../pantallas/forms/Form_EditNodo'
import { useNodos } from '../contexto/nodoContext';

const Pagina_crudNodos = () => {

    const {
        searchQuery,
        setSearchQuery,
        errorMessage,
        showForm,
        setShowForm,
        showMap,
        setShowMap,
        nodos,
        handleChange,
        handleSubmit,
        handleCancel,
        handleDelete,
        handleSearch,
        handleEdit,
        handleUpdate,
        showEditForm,
        setShowEditForm,
        nodo,
        setNodo,
    } = useNodos();

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
                    <button onClick={() => setShowMap(!showMap)}><AiTwotoneEnvironment style={{ color: '#2A364E', fontSize: '35px' }} /></button>
                    {/* Muuesta el mapa y envia un prompt para que se actualice */}
                    {showMap && <MapaFlotante nodos={nodos} />}
                </div>
                {errorMessage && <p style={{ color: 'red', fontSize: '16px', textAlign: 'center', paddingBottom: '5px' }}>{errorMessage}</p>}
                {showForm && (
                    <FormAddNodo
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        handleCancel={handleCancel}
                    />
                )}
                <div style={{ overflow: 'auto', height: '550px' }}> {/* Ajusta la altura según tus necesidades */}
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
                                        <button style={editbutton} onClick={() => handleEdit(index)}>
                                            <AiFillEdit style={{ color: "white", fontSize: "24px" }} />
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
                {showEditForm && (
                        <FormEditarNodo
                            nodo={nodo}
                            setNodo={setNodo}
                            handleChange={handleChange}
                            handleSubmit={handleUpdate}
                            handleCancel={() => setShowEditForm(false)}
                        />
                )}
            </div>
        </div>
    );
}

export default Pagina_crudNodos;