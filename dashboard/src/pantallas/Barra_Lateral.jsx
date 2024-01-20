import React, { useState } from 'react';
import { ThemeContext } from '../App';
import { Sidebar } from '../componentes/Sidebar';
import { ThemeProvider } from 'styled-components';
import { Light, Dark } from '../styles/Themes';
import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';

import Pagina_CrudNodo from './Pagina_crudNodos';
import Pagina_crudUser from './Pagina_crudUser';
import PaginaHome from './Pagina_Home';
import ConexionNodos from './Pagina_ConexionNodo';
import Pagina_PlanEmergencia from './Pagina_PlanEmergencia';

function Pagina_inicio() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [theme, setTheme] = useState("light");
  const themeStyle = theme === "light" ? Light : Dark;
  return (

    <ThemeContext.Provider value={{ setTheme, theme }}>
      <ThemeProvider theme={themeStyle}>
        <Container className={sidebarOpen ? "sidebarState active" : ''}>
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <Routes>
            <Route path='/user' element={<Pagina_crudUser />} />
            <Route path='/crudnodo' element={<Pagina_CrudNodo />} />
            <Route path='/home' element={<PaginaHome />} />
            <Route path='/conexionnodo' element={<ConexionNodos />} />
            <Route path='/planemergencia' element={<Pagina_PlanEmergencia />} />
          </Routes>
        </Container>
      </ThemeProvider>
    </ThemeContext.Provider>

  );

}
const Container = styled.div`
  display: grid;
  grid-template-columns: 90px auto;
  background: ${({ theme }) => theme.bgtotal};
  transition:all 0.3s ;
  &.active {
    grid-template-columns: 300px auto;
  }
  height:100vh;
  `
  ;

export default Pagina_inicio;

