import { createContext, useContext, useState } from "react";

// Create Cart Context
export const CartContext = createContext();

// Custom Hook
export const useCart = () => {
    return useContext(CartContext);
};

// Provider Component
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]); // Store cart items

    // Function to add item to cart
    const addToCart = (product) => {
        setCart((prevCart) => [...prevCart, product]);
    };

    // Function to remove item from cart
    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };

    return (
        <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};
