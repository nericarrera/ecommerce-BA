export { default as AppContext } from './AppContext';
export { default as AppProvider } from './AppProvider';
export { default as useAppContext } from './useAppContext';

// Importa directamente para crear el hook
import { createContext, useContext } from 'react';

// Crea el contexto aquí mismo si prefieres
export const MyAppContext = createContext();

// Hook personalizado
export const useAppContext = () => {
  const context = useContext(MyAppContext);
  if (!context) {
    throw new Error('useAppContext debe usarse dentro de AppProvider');
  }
  return context;
};