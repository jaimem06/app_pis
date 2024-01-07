import React, { useState } from "react";
import { routes } from "./routes/routes";
import { BrowserRouter } from "react-router-dom";
export const ThemeContext = React.createContext(null);
function App() {

  return (
    <BrowserRouter>
      {routes()}
    </BrowserRouter>
  );
}
export default App;
