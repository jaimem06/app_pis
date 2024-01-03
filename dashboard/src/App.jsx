import {BrowserRouter,Routes,Route} from 'react-router-dom';

import { AuthProvider } from './contexto/authcontext';
import ProtectedRoute from './ProtectedRouther';
import Pagina_inicio from './pantallas/Pagina_inicio';
import Pagina_registro from './pantallas/Pagina_registro'; 
import PaginaLogin from './pantallas/Pagina_login';
import Pagina_DeleteUser from './pantallas/Pagina_DeleteUser';
import Pagina_UpdateUser from './pantallas/Pagina_UpdateUser';
  function App() { 
  return (
    <AuthProvider>
      <BrowserRouter>
      <Routes>
      <Route path='/' element={<PaginaLogin/>}/>
      <Route element={<ProtectedRoute/>}>
      <Route path='/HomePage' element={<Pagina_inicio/>}/>
      <Route path='/register' element={<Pagina_registro/>}/>
      <Route path='/eliminacion' element={<Pagina_DeleteUser/>}/>
      <Route path='/actualizacion' element={<Pagina_UpdateUser/>}/>
      </Route>
      
      </Routes>
         </BrowserRouter>
    </AuthProvider>
  );
}

export default App;