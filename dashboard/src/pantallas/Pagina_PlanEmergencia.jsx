import React, { useState, useEffect } from 'react';
import { createPlanEmergenciaRequest } from '../api/auth';
import { readallPlanEmergenciaRequest } from '../api/auth';
import { deletePlanEmergenciaRequest } from '../api/auth';
import { updatePlanEmergenciaRequest } from '../api/auth';
import { readPlanEmergenciaRequest } from '../api/auth';
import { formPlanE, inputStyle, buttonADD, titulosStyle, buttonsForm, cancelbutton, inputRStyle, deletebutton } from '../styles/styles_pagePlanEmergency';

const Pagina_PlanEmergencia = () => {

    const [plan, setPlan] = useState({ titulo: '', resumen: '', imagen: '', link: '' });
    const obtenerPlan = async () => {
        try {
            const response = await readallPlanEmergenciaRequest();
            if (response.data.length > 0) {
                const primerPlanId = response.data[0]._id;
                console.log(primerPlanId);
                const primerPlan = await readPlanEmergenciaRequest(primerPlanId);
                setPlan(primerPlan.data);
            }
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        obtenerPlan();
    }, []);


    //Crear Plan
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!plan.titulo || !plan.resumen || !plan.imagen || !plan.link) {
            alert('Por favor, complete todos los campos.');
            return;
        }
        try {
            await createPlanEmergenciaRequest(plan);
            setPlan({ titulo: '', resumen: '', imagen: '', link: '' });
            alert('Plan creado exitosamente!');
            obtenerPlan();
        } catch (error) {
            console.error(error);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPlan(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleUpdate = async () => {
        try {
            // Obtener todos los planes
            const response = await readallPlanEmergenciaRequest();

            // Comprobar si hay al menos un plan
            if (response.data.length === 0) {
                console.error('No hay planes disponibles');
                return;
            }

            // Obtener el _id del primer plan
            const planId = response.data[0]._id;

            // Crear el plan actualizado
            const updatedPlan = {
                titulo: plan.titulo,
                resumen: plan.resumen,
                imagen: plan.imagen,
                link: plan.link
            };

            // Actualizar el plan
            const updateResponse = await updatePlanEmergenciaRequest(planId, updatedPlan);
            console.log(updateResponse.data);
            obtenerPlan();

        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async () => {
        try {
            // Obtener todos los planes
            const response = await readallPlanEmergenciaRequest();

            // Comprobar si hay al menos un plan
            if (response.data.length > 0) {
                // Obtener el _id del primer plan
                const planToDelete = response.data[0];
                const confirmDelete = window.confirm(`¿Estás seguro de que quieres eliminar el plan ${planToDelete.titulo}?`);

                if (confirmDelete) {
                    // Eliminar el primer plan
                    await deletePlanEmergenciaRequest(planToDelete._id);
                    console.log('Plan eliminado:', planToDelete._id);

                    // Actualizar el estado de los planes después de eliminar el plan
                    const nuevosPlanes = response.data.slice(1);
                    setPlan(nuevosPlanes);
                }
            } else {
                console.error('No hay planes para eliminar');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div style={{ display: 'flex', margin: '1px' }}>
            <div style={{ backgroundColor: 'oceanblue', width: '40%', height: 'auto', marginLeft: '12px' }}>

                <form onSubmit={handleSubmit} style={formPlanE} >
                    <p style={{ textAlign: "center" }}>
                        <span style={{ color: 'black' }}>CREAR PLAN DE EMERGENCIA</span>
                    </p>
                    <label style={titulosStyle}>Título del Plan:</label>
                    <input style={inputStyle} type="text" name="titulo" value={plan.titulo} onChange={handleChange} placeholder="Título del Plan" required />

                    <label style={titulosStyle}>Resumen del Plan:</label>
                    <textarea style={inputRStyle} name="resumen" value={plan.resumen} onChange={handleChange} placeholder="Resumen del Plan" required />

                    <label style={titulosStyle}>Imagen del Plan:</label>
                    <input style={inputStyle} type="text" name="imagen" value={plan.imagen} onChange={handleChange} placeholder="URL de la imagen del Plan" required />

                    <label style={titulosStyle}>Link del Plan:</label>
                    <input style={inputStyle} type="text" name="link" value={plan.link} onChange={handleChange} placeholder="Link del Plan" required />

                    <div style={buttonsForm}>
                        <button style={cancelbutton} type="button" onClick={handleUpdate}>Modificar</button>
                        <button style={buttonADD} type="submit">Agregar Plan</button>

                    </div>
                    <button style={deletebutton} type="button" onClick={handleDelete}>Eliminar</button>
                </form>
            </div>

            <div style={{ display: 'flex-end', justifyContent: 'space-between', marginLeft: '50%', borderRadius: '30px', border: ' 2px solid black', position: 'absolute', marginTop: '2%', background: 'white' }}>
                {plan && (
                    <div style={{ width: '380px', margin: '30px', overflow: 'auto', maxHeight: '750px' }}>
                        <h2 style={{ color: 'black' }}>{plan.titulo}</h2>
                        <img src={plan.imagen} />
                        <p style={{ color: 'black', textAlign: 'justify', marginBottom: '10%' }}>{plan.resumen}</p>
                        <a href={plan.link} style={styles.link}>Link del Plan de Emergencia</a>                    </div>
                )}
                <img src='https://lh3.googleusercontent.com/u/0/drive-viewer/AEYmBYSoi11WvvATFfxN436yTkaVKlWsRQYUpAP9Op_gtkWNi00AtKbpsaX8TA9S0bV_hubTYutOTXBfj0xrJqbgRwDQ19Lwvw=w1920-h979' style={{ width: '440px', height: '90px', borderBottomLeftRadius: '30px', borderBottomRightRadius: '30px' }} />

            </div>
        </div>

    );
};

const styles = {
    link: {
        color: 'black',
        textDecoration: 'none',
        textAlign: 'center',
        backgroundColor: 'skyblue',
        marginHorizontal: '7%',
        marginTop: "10%",
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
        marginRight: '15%',
        marginLeft: '20%',
        marginTop: '50%',
        contentAlign: 'center'
    }
}
export default Pagina_PlanEmergencia;
