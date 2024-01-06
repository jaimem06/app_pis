import React, { useState } from 'react';
import '../Pagina_inicio.css';
import { ThemeContext } from '../App'; 
import {Sidebar} from '../componentes/Sidebar'; 
import {ThemeProvider} from 'styled-components';
import {Light, Dark} from '../styles/Themes';
import  styled  from 'styled-components';

function Pagina_inicio() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [theme, setTheme] = useState("light");
    const themeStyle = theme === "light" ? Light : Dark;
    return (
        
    <ThemeContext.Provider value={{ setTheme, theme }}>
      <ThemeProvider theme={themeStyle}>
      <Container className={sidebarOpen ? "sidebarState active" : ''}>
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}  />
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

