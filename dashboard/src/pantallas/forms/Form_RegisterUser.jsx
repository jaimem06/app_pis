import React from 'react';
import { formCrearNodo, inputStyle, buttonADD, titulosStyle, buttonsForm, cancelbutton } from '../../styles/styles_pageNodo';


const rol = [
    "Administrador",
    "Brigadista/Docente"

];

const FormRegisterUser = ({ handleChange, handleSubmit, handleCancel }) => {
    return (
        <form onSubmit={handleSubmit} style={formCrearNodo}>
            <p style={{textAlign: "center"}}><span style={{border: "2px solid white",
        borderRadius: "5px", padding: "3px"
        }}>CREAR USUARIO</span></p>
            <label style={titulosStyle}>Nombre:</label>
            <input style={inputStyle} type="text" name="name" onChange={handleChange} placeholder="Nombre" required />
            
            <label style={titulosStyle}>Email:</label>
            <input style={inputStyle} type="email" name="email" onChange={handleChange} placeholder="Email" required />
            
            <label style={titulosStyle}>Password:</label>
            <input style={inputStyle} type="password" name="password" onChange={handleChange} placeholder="Password" required />


            <label style={titulosStyle}>Rol:</label>
            <select style={inputStyle} name="rol" onChange={handleChange} required>
                <option value="">Seleccione un rol</option>
                {rol.map((rol, index) => (
                    <option key={index} value={rol}>
                        {rol}
                    </option>
                ))}
            </select>
            <label style={titulosStyle}>Date of Birth:</label>
            <input style={inputStyle} type="text" name="dob" onChange={handleChange} placeholder="Date of Birth" required />
            
            <div style={buttonsForm}>
                <button style={cancelbutton} type="button" onClick={handleCancel}>Cancelar</button>
                <button style={buttonADD} type="submit">Agregar Usuario</button>
            </div>
        </form>
    );
};

export default FormRegisterUser;