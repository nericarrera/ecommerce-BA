import { useState } from "react";
import { AppContext } from "./AppContext";

export function AppProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usuario, setUsuario] = useState({ nombre: "", email: "" });
  const [cart, setCart] = useState([]);

  const addToCart = (gato) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.nombre === gato.nombre);
      if (existingItem) {
        return prevCart.map((item) =>
          item.nombre === gato.nombre ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...gato, quantity: 1 }];
      }
    });
  };

  const clearCart = () => setCart([]);

  const removeFromCart = (indexToRemove) => {
    setCart((prevCart) =>
      prevCart
        .map((item, index) =>
          index === indexToRemove ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const cerrarSesion = () => {
    setIsAuthenticated(false);
    setUsuario({ nombre: "", email: "" });
  };

  const value = {
    isAuthenticated,
    setIsAuthenticated,
    usuario,
    setUsuario,
    cerrarSesion,
    cart,
    addToCart,
    clearCart,
    removeFromCart,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
