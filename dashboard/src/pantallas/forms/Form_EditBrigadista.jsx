import React from 'react';
import { formCrearBrigadista, inputStyle, buttonADD, titulosStyle, buttonsForm, cancelbutton, formEditarBrigadista } from '../../styles/styles_brigadista';


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

const Form_EditBrigadista = ({ brigadista, setBrigadista, handleSubmit, handleCancel, id}) => {
    const handleChange1 = (event) => {
        
        const { name, value } = event.target;

        if (name === 'area') {
            setBrigadista(prevState => ({ ...prevState, area: value }));
        } else {
            const [field, index, key] = name.split(/[\[\].]/).filter(Boolean);

            setBrigadista(prevState => {
                const updatedField = [...prevState[field]];
                if (updatedField[index]) {
                    updatedField[index][key] = value;
                }

                return { ...prevState, [field]: updatedField };
            });
        }
    };
    return (
        <form onSubmit={handleSubmit}  >
            {brigadista.titular.map((titular, index) => (
                <div key={`titular-${index}`}>
                    <label style={titulosStyle}>
                        Nombre del titular:
                        <input style={inputStyle} type="text" name={`titular[${index}].nombresCompletos`} value={titular.nombresCompletos} onChange={handleChange1} /><br/>
                    </label>
                </div>
            ))}
            {brigadista.reemplazo.map((reemplazo, index) => (
                <div key={`reemplazo-${index}`}>
                    <label style={titulosStyle}>
                        Nombre del reemplazo:
                        <input style={inputStyle} type="text" name={`reemplazo[${index}].nombresCompletos`} value={reemplazo.nombresCompletos} onChange={handleChange1} /><br/>
                    </label>
                </div>

            ))}


            <div>
                <label style={titulosStyle}> Área:
                    <select style={inputStyle} name="area" onChange={handleChange1}  >
                        <option value="">Seleccione una área</option>
                        {areas.map((area, index) => (
                            <option key={index} value={area}>
                                {area}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <button style={buttonADD} type="submit">Actualizar</button>
    <button style={cancelbutton} type="button" onClick={handleCancel}>Cancelar</button>
</div>
        </form>
    );
};
const formStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: '20px',
    zIndex: '1000',
};
export default Form_EditBrigadista;