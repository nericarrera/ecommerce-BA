/* eslint-disable react-refresh/only-export-components */
// src/context/index.js
import { useContext } from 'react';
import AppContext from './AppContext';

// Re-exportar componentes
export { default as AppContext } from './AppContext';
export { default as AppProvider } from './AppProvider';

// Crear y exportar hook aquí mismo
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext debe usarse dentro de AppProvider');
  }
  return context;
};
