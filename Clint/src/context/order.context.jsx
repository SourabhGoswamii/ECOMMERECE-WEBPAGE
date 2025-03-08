import { createContext, useContext, useState } from "react";

// Create Order Context
export const OrderContext = createContext();

// Custom Hook
export const useOrder = () => {
    return useContext(OrderContext);
};

// Provider Component
export const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState([]); // Store order list

    return (
        <OrderContext.Provider value={{ orders, setOrders }}>
            {children}
        </OrderContext.Provider>
    );
};
