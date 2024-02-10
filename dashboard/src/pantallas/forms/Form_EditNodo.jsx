import React from 'react';
import { formEditarNodo, inputStyle, buttonADD, titulosStyle, buttonsForm, cancelbutton } from '../../styles/styles_pageNodo';

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
];

const FormEditarNodo = ({ nodo, handleSubmit, handleCancel, handleChange }) => {


    return (
        <form style={formEditarNodo} onSubmit={handleSubmit} >
            <p style={{ textAlign: "center", color: "white" }}><span style={{
                border: "2px solid white",
                borderRadius: "5px", padding: "3px"
            }}>EDITAR NODO</span></p>
            <label style={titulosStyle}>Nombre:</label>
            <input style={inputStyle} type="text" name="nombre" value={nodo.properties.nombre} onChange={handleChange} placeholder="Nombre" required />
            <label style={titulosStyle}>Facultad:</label>
            <select style={inputStyle} name="facultad" value={nodo ? nodo.properties.facultad : ''} onChange={handleChange} required>
                <option value="">Seleccione una facultad</option>
                {facultades.map((facultad, index) => (
                    <option key={index} value={facultad}>
                        {facultad}
                    </option>
                ))}
            </select>
            <label style={titulosStyle}>Coordenadas:</label>
            <input
                style={inputStyle}
                type="text"
                name="coordinates"
                value={nodo.geometry.coordinates.join(', ')}
                onChange={handleChange}
                placeholder="Coordenadas"
                required
            />
            <label style={titulosStyle}>Tipo:</label>
            <select style={inputStyle} name="tipo" value={nodo ? nodo.properties.tipo : ''} onChange={handleChange} required>
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
    );
};

export default FormEditarNodo;