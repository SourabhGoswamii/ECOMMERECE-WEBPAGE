import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:5500/api/v1/products");

                const productArray = Array.isArray(response.data.data) 
                    ? response.data.data 
                    : Array.isArray(response.data.products) 
                    ? response.data.products 
                    : [];
                
                setProducts(productArray);
            } catch (error) {
                console.error("Error fetching products:", error);
                setProducts([]); // Prevents undefined state
            }
        };

        fetchProducts();
    }, []);

    return (
        <ProductContext.Provider value={{ products, setProducts }}>
            {children}
        </ProductContext.Provider>
    );
};
