import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./contexto/authcontext";

function ProtectedRoute({}) {
  const { loading,isAuthenticated } = useAuth();
  if (loading) return <h1>Cargando</h1>;
  if (!loading &&!isAuthenticated) return <Navigate to="/"  replace/>;
  return (
    <Outlet /> //el outlet es el componente que se renderiza en la ruta padre
  );
}
export default ProtectedRoute;