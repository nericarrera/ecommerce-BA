// src/context/AppProvider.jsx
import React, { useState } from 'react';
import AppContext from './AppContext';

// Proveedor del contexto
const AppProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    console.log('🔵 Agregando al carrito:', item);
    
    setCart(prevCart => {
      // Verificar si el item ya está en el carrito
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      
      if (existingItem) {
        // Si ya existe, aumentar la cantidad
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        // Si no existe, agregarlo con cantidad 1
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (index) => {
    setCart(prevCart => prevCart.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCart([]);
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    clearCart
  };

  console.log('🛒 Estado actual del carrito:', cart);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Exportar SOLO el componente (AppProvider)
export default AppProvider;