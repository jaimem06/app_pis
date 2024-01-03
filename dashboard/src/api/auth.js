import axios from './axios.js';
 
const API_URL = 'http://localhost:3000';

export const registerRequest = user => axios.post(`/register_web`, user);
export const loginRequest = user => axios.post(`/login_web`, user);
export const verifyTokenRequest = () => axios.get(`/verifyToken`);



/* export const getUsers = () => axios.get(`${API_URL}/get`);
export const getUser = id => axios.get(`${API_URL}/get/${id}`);
export const updateUser = (id, user) => axios.put(`${API_URL}/update/${id}`, user);
export const deleteUser = id => axios.delete(`${API_URL}/delete/${id}`); */