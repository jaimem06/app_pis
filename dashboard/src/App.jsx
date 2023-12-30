import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Pagina_registro from './pantallas/Pagina_registro'; 
import PaginaLogin from './pantallas/Pagina_login';
import { AuthProvider } from './contexto/authcontext';
  function App() { 
  return (
    <AuthProvider>
      <BrowserRouter>
      <Routes>
      <Route path='/' element={<h1>Home page</h1>}/>
      <Route path='/login' element={<PaginaLogin/>}/>
      <Route path='/register' element={<Pagina_registro/>}/>
      <Route path='/eliminacion' element={<h1>Eliminar</h1>}/>
      <Route path='/actualizacion' element={<h1>Actualizar</h1>}/>
      </Routes>
         </BrowserRouter>
    </AuthProvider>
  );
}

export default App;