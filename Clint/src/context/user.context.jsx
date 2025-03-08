import { createContext, useContext, useState,useEffect } from "react";

// Create Context
export const UserContext = createContext();  

// Custom Hook to use Context
export const useUser = () => {
    return useContext(UserContext);
};

// Provider Component
export const UserProvider = ({ children }) => {
    // Load user from localStorage on initialization
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    useEffect(() => {
        if (user) {
            const { password, ...userWithoutPassword } = user;
            localStorage.setItem("user", JSON.stringify(userWithoutPassword)); // Store user when it changes
        } else {
            localStorage.removeItem("user"); // Remove if user logs out
        }
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
