import React, { useState } from 'react';
import { formCrearBrigadista, inputStyle, buttonADD, titulosStyle, buttonsForm, cancelbutton } from '../../styles/styles_brigadista';
import { inputSelectStyle } from '../../styles/styles_brigadista';
const areas = [
    "Administración Central",
    "Bienestar Universitario",
    "Educación a Distancia",
    "Agropecuaria y de Recursos Nat Renovables",
    "Energía, las Ind y los Recursos Nat No Renovables",
    "Educación el Arte y la Comunicación",
    "Jurídica, Social y Administrativa",
    "Salud Humana"
];

const Form_CrearBrigadista = ({ handleChange, handleSubmit, handleCancel }) => {
    const [numBrigadistas, setNumBrigadistas] = useState(0);

    const handleAddBrigadista = () => {
        setNumBrigadistas(prevNumBrigadistas => prevNumBrigadistas + 1);
        // Restablecer el estado del brigadista
        setBrigadista({
          area: '',
          titular: [{ nombresCompletos: '', nroTitular: '' }],
          reemplazo: [{ nombresCompletos: '', nroReemplazo: '' }],
        });
      };


    return (
        <form onSubmit={handleSubmit} style={{ ...formCrearBrigadista, overflowY: 'auto', maxHeight: '500px' }}>
            <p style={{ textAlign: "center", color: "white" }}>
                <span style={{ border: "2px solid white", borderRadius: "5px", padding: "3px" }}>CREAR BRIGADISTA</span>
            </p>

            <button type="button" onClick={handleAddBrigadista}>Agregar brigadista</button>

            {[...Array(numBrigadistas)].map((_, i) => (
    <div key={i}>
        <label style={titulosStyle}>Nombre del titular {i + 1}:</label>
        <input style={inputStyle} type="text" name={`nombresCompletosTitular${i + 1}`} onChange={handleChange} placeholder="Nombre del titular" required /><br />
        <label style={titulosStyle}>Nombre del reemplazo {i + 1}:</label>
        <input style={inputStyle} type="text" name={`nombresCompletosReemplazo${i + 1}`} onChange={handleChange} placeholder="Nombre del reemplazo" required /><br />
    </div>
))}


            <label style={titulosStyle}> Área:
                <select style={inputSelectStyle} name="area" onChange={handleChange} required >
                    <option value="">Seleccione una área</option>
                    {areas.map((area, index) => (
                        <option key={index} value={area}>
                            {area}
                        </option>
                    ))}
                </select>
            </label>
            <div style={buttonsForm}>
                <button style={cancelbutton} type="button" onClick={handleCancel}>Cancelar</button>
                <button style={buttonADD} type="submit">Crear Brigadista</button>
            </div>
        </form>
    );
};
export default Form_CrearBrigadista;