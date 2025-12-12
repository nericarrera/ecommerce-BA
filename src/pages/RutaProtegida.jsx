import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContext } from './context';

const RutaProtegida = ({ children }) => {
  const { isAuthenticated } = useContext(AppContext);
  
  // Verificar si el usuario está autenticado
  if (!isAuthenticated) {
    // Si no está autenticado, redirigir al login
    return <Navigate to="/iniciar-sesion" replace />;
  }
  
  // Si está autenticado, mostrar el contenido protegido
  return children;
};

export default RutaProtegida;