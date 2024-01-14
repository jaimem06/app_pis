import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../contexto/authcontext';
import ProtectedRoute from '../ProtectedRouther';
import Pagina_inicio from '../pantallas/Pagina_inicio';
import PaginaLogin from '../pantallas/Pagina_login';
import React from "react";
import Pagina_Logout from '../pantallas/pagina_logout';

export function routes() {

  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<PaginaLogin />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/fred/*' element={<Pagina_inicio />} />
          <Route path='/logout' element={<Pagina_Logout />} />
        </Route>

      </Routes>

    </AuthProvider>

  );

}


