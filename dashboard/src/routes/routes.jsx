import {Routes, Route} from 'react-router-dom';
import { AuthProvider } from '../contexto/authcontext';
import ProtectedRoute from '../ProtectedRouther';
import Pagina_inicio from '../pantallas/Pagina_inicio';
import Pagina_registro from '../pantallas/Pagina_registro'; 
import PaginaLogin from '../pantallas/Pagina_login';

import styled from "styled-components";
import { Light, Dark } from "../styles/Themes";
import { ThemeProvider } from "styled-components";
import React, { useState } from "react";
import { ThemeContext } from "../App";
import { Sidebar } from '../componentes/Sidebar';
import Pagina_Logout from '../pantallas/pagina_logout';

export function routes() { 

  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<PaginaLogin/>}/>
        <Route element={<ProtectedRoute/>}>
          <Route path='/fred/*' element={<Pagina_inicio />}/>
          <Route path='/logout' element={<Pagina_Logout/>}/>
        </Route>
       
      </Routes>
     
    </AuthProvider>
   
  );

}


