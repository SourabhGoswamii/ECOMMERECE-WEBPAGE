import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductModal = ({ isOpen, onClose, product, refreshProducts }) => {
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        category: "",
        stock: "",
    });

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name,
                price: product.price,
                category: product.category,
                stock: product.stock,
            });
        }
    }, [product]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (product) {
                // Update Product (PUT request)
                await axios.put(`http://localhost:5500/api/v1/products/${product._id}`, formData);
            } else {
                // Add Product (POST request)
                await axios.post("http://localhost:5500/api/v1/products", formData);
            }
            refreshProducts(); // Refresh product list after add/edit
            onClose();
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">{product ? "Edit Product" : "Add Product"}</h2>
                <form onSubmit={handleSubmit}>
                    <label className="block mb-2">Name</label>
                    <input className="border p-2 w-full" name="name" value={formData.name} onChange={handleChange} required />

                    <label className="block mt-2 mb-2">Price</label>
                    <input className="border p-2 w-full" name="price" value={formData.price} onChange={handleChange} required />

                    <label className="block mt-2 mb-2">Category</label>
                    <input className="border p-2 w-full" name="category" value={formData.category} onChange={handleChange} required />

                    <label className="block mt-2 mb-2">Stock</label>
                    <input className="border p-2 w-full" name="stock" value={formData.stock} onChange={handleChange} required />

                    <div className="mt-4 flex justify-between">
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                            {product ? "Update" : "Add"}
                        </button>
                        <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded" onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductModal;
