import React, { useEffect, useContext } from 'react';
import { AuthContext } from '../contexto/authcontext'; // Asegúrate de que la ruta al archivo AuthContext.jsx es correcta
import {  useNavigate } from 'react-router-dom';

function Pagina_Logout() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const doLogout = async () => {
      await logout();
      navigate('/'); // Redirige al usuario a la página de login después de hacer logout
    };

    doLogout();
  }, [logout, history]);

  return (
    <div>
      <h1></h1>
    </div>
  );
}

export default Pagina_Logout;