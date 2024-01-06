import axios from './axios.js';
 
const API_URL = 'http://localhost:3000';

export const registerRequest = user => axios.post(`/register_web`, user);
export const loginRequest = user => axios.post(`/login_web`, user);
export const verifyTokenRequest = () => axios.get(`/verifyToken`);

// Direcciones CRUD NODO
export const createNodoRequest = nodo => axios.post(`/nodos`, nodo);