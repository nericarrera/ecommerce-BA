import React, { createContext, useState, useCallback } from 'react';
import { apiService } from '../services/api';
import { toast } from 'react-toastify';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);
  const [mascotas, setMascotas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filtro, setFiltro] = useState('');
  
  // Estados de autenticación
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const user = localStorage.getItem('user');
    return !!user;
  });
  
  const [usuario, setUsuario] = useState(() => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  });

  // Agregar al carrito - CORREGIDO: usa addToCart (no agregarAlCarrito)
  const addToCart = useCallback((mascota) => {
    setCarrito(prev => {
      if (!prev) return [{ ...mascota, cantidad: 1 }];
      
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
    setCarrito(prev => {
      if (!prev) return [];
      return prev.filter(item => item.id !== id);
    });
    toast.info('Producto eliminado del carrito');
  }, []);

  const limpiarCarrito = useCallback(() => {
    setCarrito([]);
    toast.info('Carrito vaciado');
  }, []);

  const calcularTotal = useCallback(() => {
    if (!carrito || carrito.length === 0) return 0;
    return carrito.reduce((total, item) => {
      const precio = item.precio || 0;
      const cantidad = item.cantidad || 1;
      return total + (precio * cantidad);
    }, 0);
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

  const buscarMascotas = useCallback(async (termino) => {
    if (!termino.trim()) {
      await cargarMascotas();
      return;
    }
    setLoading(true);
    try {
      const resultados = await apiService.buscarProductos(termino);
      setMascotas(resultados);
    } catch (error) {
      console.error('Error buscando:', error);
      toast.error('Error en la búsqueda');
    } finally {
      setLoading(false);
    }
  }, [cargarMascotas]);

  const filtrarPorCategoria = useCallback(async (categoria) => {
    setLoading(true);
    try {
      const resultados = await apiService.getProductosPorCategoria(categoria);
      setMascotas(resultados);
    } catch (error) {
      console.error('Error filtrando:', error);
      toast.error('Error al filtrar');
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUsuario(null);
    toast.info('Sesión cerrada');
  }, []);

  const value = {
    // Estados
    carrito,
    mascotas,
    loading,
    filtro,
    isAuthenticated,
    usuario,
    
    // Funciones para modificar estados
    setCarrito,
    setMascotas,
    setLoading,
    setFiltro,
    setIsAuthenticated,
    setUsuario,
    
    // Funciones del carrito
    addToCart,           // ¡IMPORTANTE! Esto se usa en Gatos.jsx, Perros.jsx, etc.
    eliminarDelCarrito,
    limpiarCarrito,
    calcularTotal,
    
    // Funciones de mascotas
    cargarMascotas,
    buscarMascotas,
    filtrarPorCategoria,
    
    // Autenticación
    logout
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;