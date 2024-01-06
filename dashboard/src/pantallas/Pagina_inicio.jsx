import React, { useState } from 'react';
import '../Pagina_inicio.css';
import { ThemeContext } from '../App'; 
import {Sidebar} from '../componentes/Sidebar'; 
import {ThemeProvider} from 'styled-components';
import {Light, Dark} from '../styles/Themes';
import  styled  from 'styled-components';
import { Routes , Route } from 'react-router-dom';
import Pagina_DeleteUser from '../pantallas/Pagina_DeleteUser';
import Pagina_UpdateUser from '../pantallas/Pagina_UpdateUser';
import Pagina_CrudNodo from '../pantallas/Pagina_crudNodos';
import Pagina_registro from '../pantallas/Pagina_registro';
import  {AuthContext}  from '../contexto/authcontext';
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
            <Route path='/register' element={<Pagina_registro/>}/>
          <Route path='/eliminacion' element={<Pagina_DeleteUser/>}/>
          <Route path='/actualizacion' element={<Pagina_UpdateUser/>}/>
          <Route path='/crudnodo' element={<Pagina_CrudNodo/>}/>
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

