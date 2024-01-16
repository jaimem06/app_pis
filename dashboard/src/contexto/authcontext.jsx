import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest, logoutRequest } from "../api/auth";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();
export const useAuth = () => {

  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth debe estar dentro del proveedor AuthProvider")
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);//para manejar errores
  const [loading, setLoading] = useState(true);

  // Register
  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      console.log(res.data);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error.response.data);
      setErrors(error.response.data);
    }
  }

  const navigate = useNavigate();

  //Login
  const signin = async (user) => {
    try {
      const res = await loginRequest(user)
      console.log(res)
      setIsAuthenticated(true);
      setUser(res.data);
      localStorage.setItem('token', res.data.token); // Guardar token en almacenamiento local

      // Redirigir a fred/home
      navigate('/fred/home');
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  }
  const logout = async () => {
    const res = await logoutRequest();
    if (res.status === 200) { // Asume que 200 es un estado exitoso
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('token'); // Eliminar token del almacenamiento local
    } else {
      // Maneja el error. Podrías mostrar un mensaje al usuario, por ejemplo.
      console.error('Logout failed:', res);
    }
  }

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors])

  useEffect(() => {

    async function checkLogin() {
      const token = localStorage.getItem('token'); // Obtener token del almacenamiento local
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return setUser(null);
      }

      try {
        const res = await verifyTokenRequest(token);
        if (!res.data) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }
        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);

      }
    }
    checkLogin();
  }, []);
  return <AuthContext.Provider value={{
    user,
    signup,
    signin,
    isAuthenticated,
    errors,
    loading,
    logout,
  }}
  >
    {children}
  </AuthContext.Provider>;
}