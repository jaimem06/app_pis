import React, { useState } from 'react';
import GestionUsuarios from './Pagina_UpdateUser'; // Asegúrate de importar tu componente de gestión de usuarios
import GestionNodos from './Pagina_registro'; // Asegúrate de importar tu componente de gestión de nodos
import '../Pagina_inicio.css';

import {Sidebar} from '../componentes/Sidebar'; // Asegúrate de que la ruta al componente Sidebar sea correcta

function Pagina_inicio(themeStyle) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div style={themeStyle}>
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}  />
        </div>
    );
}
export default Pagina_inicio;

