// Archivo para guardar las URL del API
const BASE_URL = 'http://10.20.139.171:3000';

const APILinks = {
    URL_CaminoMinimo: `${BASE_URL}/camino_minimo`,
    URL_PlanEmergencia: `${BASE_URL}/planemergencia/read_plan`,
    URL_Login: `${BASE_URL}/login_mobile`,
    URL_Brigadista: `${BASE_URL}/brigadista/read_brigadista`,
    URL_ReadNodos: `${BASE_URL}/nodos/read_nodos`,
    URL_SaveToken: `${BASE_URL}/guardar_tokenNotification`,
    URL_BuscarNodos: `${BASE_URL}/nodos/buscar_nodos`,
};
  export default APILinks;