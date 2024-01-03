import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Pagina_inicio.css';

function Pagina_inicio() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <h1 style={{ fontSize: '2em', color: 'white', textAlign: 'center' }}>¡Bienvenido a nuestra página de inicio!</h1>
            <button className="menu-button" onClick={() => setIsOpen(!isOpen)}>
                ☰
            </button>
            {isOpen && (
                <ul class="nav flex-column" style={{ listStyleType: 'none', padding: 0 }}>
                    <li class="nav-item" style={{ margin: '10px 0', border: '1px solid black', padding: '10px', width: '200px' }}>
                        <Link class="nav-link active" aria-current="page" to="/register" onClick={() => setIsOpen(false)}>Registro de usuario</Link>
                    </li>
                    <li class="nav-item" style={{ margin: '10px 0', border: '1px solid black', padding: '10px', width: '200px' }}>
                        <Link class="nav-link" to="/actualizacion" onClick={() => setIsOpen(false)}>Actualizar usuario</Link>
                    </li>
                    <li class="nav-item" style={{ margin: '10px 0', border: '1px solid black', padding: '10px', width: '200px' }}>
                        <Link class="nav-link" to="/eliminacion" onClick={() => setIsOpen(false)}>Eliminar Usuario</Link>
                    </li>
                </ul>
            )}
        </div>
    )
}

export default Pagina_inicio;