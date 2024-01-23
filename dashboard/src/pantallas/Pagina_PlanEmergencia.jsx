import React, { useState, useEffect } from 'react';
import { createPlanEmergenciaRequest } from '../api/auth';
import { readallPlanEmergenciaRequest } from '../api/auth';
import { deletePlanEmergenciaRequest } from '../api/auth';
import { updatePlanEmergenciaRequest } from '../api/auth';
import { readPlanEmergenciaRequest } from '../api/auth';
import { formPlanE, inputStyle, buttonADD, titulosStyle, buttonsForm, cancelbutton, inputRStyle } from '../styles/styles_pagePlanEmergency';


const Pagina_PlanEmergencia = () => {
    const [showEditForm, setShowEditForm] = useState(false);

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
        } catch (error) {
            console.error(error);
        }
    }

    const handleCancel = () => {
        setShowForm(false);
    }
    const handleEdit = (index) => {
        const planToEdit = plans[index];
        setPlan(planToEdit);
        setShowEditForm(true);
    };

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

        } catch (error) {
            console.error(error);
        }
    };

    const handleSearch = async (event) => {
        event.preventDefault();
        const searchQueryLower = searchQuery.toLowerCase();
        try {
            const response = await readallPlanEmergenciaRequest(searchQueryLower);
            if (response.data.length === 0) {
                setErrorMessage('Los datos no existen en la base');
            } else {
                setErrorMessage('');
                setPlan(response.data.filter(plan =>
                    plan.titulo.toLowerCase().includes(searchQueryLower) ||
                    plan.resumen.toLowerCase().includes(searchQueryLower)
                ));
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('Verifique los datos ingresados, error en la busqueda');
        }
    };

    const handleDelete = (index) => {
        const planToDelete = plan[index];
        const confirmDelete = window.confirm(`¿Estás seguro de que quieres eliminar el plan ${planToDelete.titulo}?`);
        if (confirmDelete) {
            deletePlanEmergenciaRequest(planToDelete._id)
                .then(response => {
                    console.log(response.data);
                    // Actualiza el estado de los planes después de eliminar el plan
                    const newPlans = plan.filter((plan, i) => i !== index);
                    setPlan(newPlans);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    };

    return (
        <div style={{ display: 'flex', margin: '1px' }}>
            <div>
                
                <form onSubmit={handleSubmit} style={formPlanE} >
                    <p style={{ textAlign: "center" }}>
                        <span style={{ color: 'black' }}>CREAR PLAN DE EMERGENCIA</span>
                    </p>
                    <label style={titulosStyle}>Título del Plan:</label>
                    <input style={inputStyle} type="text" name="titulo" value={plan.titulo} onChange={handleChange} placeholder="Título del Plan" required />

                    <label style={titulosStyle}>Resumen del Plan:</label>
                    <textarea style={inputRStyle} name="resumen" value={plan.resumen} onChange={handleChange} placeholder="Resumen del Plan" required />

                    <label style={titulosStyle}>Imagen del Plan:</label>
                    <input style={inputStyle} type="text" name="imagen"value={plan.imagen}  onChange={handleChange} placeholder="URL de la imagen del Plan" required />

                    <label style={titulosStyle}>Link del Plan:</label>
                    <input style={inputStyle} type="text" name="link"value={plan.link}  onChange={handleChange} placeholder="Link del Plan" required />

                    <div style={buttonsForm}>
                        <button style={cancelbutton} type="button" onClick={handleUpdate}>Modificar</button>
                        <button style={buttonADD} type="submit">Agregar Plan</button>
                    </div>
                </form>
            </div>

            <div style={{ display: 'flex-end', justifyContent: 'space-between', marginLeft: '50%',borderRadius:'30px', border: ' 2px solid black', position: 'absolute' ,marginTop:'2%' ,background:'#b3dfe8'}}>
                {plan && (
                    <div style={{ width: '380px',margin:'30px' }}>
                        <h2 style={{ color: 'black' }}>{plan.titulo}</h2>
                        <img src={plan.imagen} alt={plan.titulo} />
                        <p style={{ color: 'black' }}>{plan.resumen}</p>
                        <p style={{ color: 'black' }}>Link del Plan de Emergencia</p>
                        <p style={{ color: 'black' }}>{plan.link}Link de la Imagen</p>
                    </div>
                )}
            </div>
        </div>

    );
};

export default Pagina_PlanEmergencia;
