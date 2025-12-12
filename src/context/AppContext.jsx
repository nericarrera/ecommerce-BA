import React, { createContext, useState, useCallback } from 'react';
import { apiService } from '../services/api';
import { toast } from 'react-toastify';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);
  const [mascotas, setMascotas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filtro, setFiltro] = useState('');
  
  // ===== AGREGADO: Estados de autenticación =====
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Verificar si hay usuario en localStorage al iniciar
    const user = localStorage.getItem('user');
    return !!user;
  });
  
  const [usuario, setUsuario] = useState(() => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  });
  // ===== FIN DEL AGREGADO =====

  // Agregar al carrito
  const addToCart = useCallback((mascota) => {
    setCarrito(prev => {
      const existe = prev.find(item => item.id === mascota.id);
      if (existe) {
        toast.info(`${mascota.nombre} ya está en el carrito`);
        return prev;
      }
      toast.success(`${mascota.nombre} agregado al carrito`);
      return [...prev, { ...mascota, cantidad: 1 }];
    });
  }, []);

  const eliminarDelCarrito = useCallback((id) => {
    setCarrito(prev => prev.filter(item => item.id !== id));
    toast.info('Producto eliminado del carrito');
  }, []);

  const limpiarCarrito = useCallback(() => {
    setCarrito([]);
    toast.info('Carrito vaciado');
  }, []);

  const calcularTotal = useCallback(() => {
    return carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  }, [carrito]);

  const cargarMascotas = useCallback(async () => {
    setLoading(true);
    try {
      const productos = await apiService.getProductos();
      setMascotas(productos);
    } catch (error) {
      console.error('Error cargando mascotas:', error);
      toast.error('Error al cargar las mascotas');
    } finally {
      setLoading(false);
    }
  }, []);

  // ===== AGREGADO: Función para cerrar sesión =====
  const logout = useCallback(() => {
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUsuario(null);
    toast.info('Sesión cerrada');
  }, []);
  // ===== FIN DEL AGREGADO =====

  const value = {
    carrito,
    mascotas,
    loading,
    filtro,
    setFiltro,
    addToCart,
    eliminarDelCarrito,
    limpiarCarrito,
    calcularTotal,
    cargarMascotas,
    
    // ===== AGREGADO: Funciones de autenticación =====
    isAuthenticated,
    setIsAuthenticated,
    usuario,
    setUsuario,
    logout
    // ===== FIN DEL AGREGADO =====
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;