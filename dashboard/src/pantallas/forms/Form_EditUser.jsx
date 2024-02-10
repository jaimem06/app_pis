import React from 'react';
import { formEditarNodo, inputStyle, buttonADD, titulosStyle, buttonsForm, cancelbutton } from '../../styles/styles_pageNodo';


const rol = [
    "Administrador",
    "Brigadista/Docente"
];

const Form_EditUser = ({ user, handleChange, handleSubmit, handleCancel }) => {

    return (
        <form onSubmit={handleSubmit} style={formEditarNodo}>
            <p style={{ textAlign: "center", color: "white" }}><span style={{
                border: "2px solid white",
                borderRadius: "5px", padding: "3px"
            }}>EDITAR USUARIO</span></p>
            <label style={titulosStyle}>Nombre:</label>
            <input style={inputStyle} type="text" name="name" value={user ? user.name : ''} onChange={handleChange} placeholder="Nombre" required />

            <label style={titulosStyle}>Email:</label>
            <input style={inputStyle} type="email" name="email" value={user ? user.email : ''} onChange={handleChange} placeholder="Email" required />

            <label style={titulosStyle}>Password:</label>
            <input style={inputStyle} type="password" name="password" onChange={handleChange} placeholder="Password" required />

            <label style={titulosStyle}>Rol:</label>
            <select style={inputStyle} name="rol" value={user ? user.rol : ''} onChange={handleChange} required>
                <option value="">Seleccione un rol</option>
                {rol.map((rol, index) => (
                    <option key={index} value={rol}>
                        {rol}
                    </option>
                ))}
            </select>
            <label style={titulosStyle}>Date of Birth:</label>
            <input style={inputStyle} type="date" name="dob" value={user ? user.dob : ''} onChange={handleChange} placeholder="Date of Birth" required />

            <div style={buttonsForm}>
                <button style={cancelbutton} type="button" onClick={handleCancel}>Cancelar</button>
                <button style={buttonADD} type="submit">Editar Usuario</button>
            </div>
        </form>
    );
};

export default Form_EditUser;