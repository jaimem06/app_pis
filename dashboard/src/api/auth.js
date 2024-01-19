import axios from './axios.js';

export const registerRequest = user => axios.post(`/register`, user);
export const readUserRequest = id => axios.get(`/user/${id}`);
export const readallUserRequest = () => axios.get(`/read_users`);
export const deleteUserRequest = id => axios.delete(`/user/${id}`);
export const updateUserRequest = (id, user) => axios.put(`/user/${id}`, user);

export const loginRequest = user => axios.post(`/login_web`, user);
export const verifyTokenRequest = () => axios.get(`/verifyToken`);
export const logoutRequest = () => axios.get(`/logout`);
// Direcciones CRUD NODO
export const createNodoRequest = nodo => axios.post(`/nodos`, nodo);
export const readallNodoRequest = () => axios.get(`/nodos/read_nodos`);
export const deleteNodoRequest = coordinates => axios.delete(`/nodos/delete_nodo`, { data: { coordinates } });
export const searchNodoRequest = query => axios.get(`/nodos/buscar_nodos/${query}`);
export const updateNodoRequest = (id, nodo) => axios.put(`/nodos/update_nodo/${id}`, nodo);
export const connectNodoRequest = (nombreNodoA, nombreNodoB) => axios.post(`/nodos/create_conexion`, { nombreNodoA, nombreNodoB });
// Simular SISMO
export const simularSismoRequest = () => axios.post(`/simular_sismo`);

// Direcciones CRUD PLAN DE EMERGENCIA
export const createPlanEmergenciaRequest = plan => axios.post(`/planemergencia`, plan);
export const readallPlanEmergenciaRequest = () => axios.get(`/planemergencia/read_plan`);
export const deletePlanEmergenciaRequest = id => axios.delete(`/planemergencia/delete_plan`, { data: { id } });
export const updatePlanEmergenciaRequest = (id, plan) => axios.put(`/planemergencia/update_plan/${id}`, plan);
export const readPlanEmergenciaRequest = id => axios.get(`/planemergencia/read_plan/${id}`);