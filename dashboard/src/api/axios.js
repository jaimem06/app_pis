import axios from 'axios';

 const instance =axios.create({ 
    baseURL: 'https://api-fredunl.onrender.com',
withCredentials: true,
 });
 
 export default instance;