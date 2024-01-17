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