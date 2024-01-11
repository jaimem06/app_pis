import axios from './axios.js';

export const registerRequest = user => axios.post(`/register_web`, user);
export const loginRequest = user => axios.post(`/login_web`, user);
export const verifyTokenRequest = () => axios.get(`/verifyToken`);
export const logoutRequest = () => axios.get(`/logout`);
// Direcciones CRUD NODO
export const createNodoRequest = nodo => axios.post(`/nodos`, nodo);
export const readallNodoRequest = () => axios.get(`/nodos/read_nodos`);
export const deleteNodoRequest = coordinates => axios.delete(`/nodos/delete_nodo`, { data: { coordinates } });