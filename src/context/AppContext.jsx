import { createContext, useContext, useState } from "react"

export const AppContext = createContext()

export function AppProvided({ children }) {

    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [usuario, setUsuario] = useState({ nombre: "", email: "" })
    
    const [cart, setCart] = useState([])
    
    // Agregar al carrito
    const addToCart = (gato) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.nombre === gato.nombre)
            if (existingItem) {
                return prevCart.map((item) =>
                    item.nombre === gato.nombre
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            } else {
                return [...prevCart, { ...gato, quantity: 1 }]
            }
        })
    }

    // Vaciar carrito
    const clearCart = () => setCart([])

    // Eliminar items del carrito
    const removeFromCart = (indexToRemove) => {
        setCart((prevCart) =>
            prevCart
                .map((item, index) =>
                    index === indexToRemove
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item) => item.quantity > 0)
        )
    }

    // Cerrar sesión
    const cerrarSesion = () => {
        setIsAuthenticated(false)
        setUsuario({ nombre: "", email: "" })
    }

    const value = {

        // Autentication
        isAuthenticated,
        setIsAuthenticated,
        usuario,
        setUsuario,
        cerrarSesion,

        // Carrito
        cart,
        addToCart,
        clearCart,
        removeFromCart
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export function useAppContext() {
	const context = useContext(AppContext)
	if (!context) {
		throw new Error("userAppContext debe usarse dentro de AppProvider")
	}
	return context
}