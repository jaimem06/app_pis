import React from 'react';
import { formCrearNodo, inputStyle, buttonADD, titulosStyle, buttonsForm, cancelbutton } from '../../styles/styles_pageNodo';

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

const FormAddNodo = ({ handleChange, handleSubmit, handleCancel }) => {
    return (
        <form onSubmit={handleSubmit} style={formCrearNodo}>
            <p style={{textAlign: "center"}}><span style={{border: "2px solid white",
        borderRadius: "5px", padding: "3px"
        }}>CREAR NODO</span></p>
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
    );
};

export default FormAddNodo;