import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const RutaProtegida = ({ children }) => {
  const { isAuthenticated } = useContext(AppContext);
  
  if (!isAuthenticated) {
    return <Navigate to="/iniciar-sesion" replace />;
  }
  
  return children;
};

export default RutaProtegida;