import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import { routes } from "./routes/routes";
import styled from "styled-components";
import { BrowserRouter } from "react-router-dom";
import { Sidebar } from "./componentes/Sidebar";
import { Light, Dark } from "./styles/Themes";
import { ThemeProvider } from "styled-components";
export const ThemeContext = React.createContext(null);
function App() {


  return (

    <BrowserRouter>



      {routes()}


    </BrowserRouter>

  );
}

export default App;
