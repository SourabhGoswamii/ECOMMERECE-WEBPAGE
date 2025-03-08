import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../context/product.context.jsx";
import axios from "axios";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../../assests/Table.jsx";
import ProductModal from "./product,model.jsx";

const Product = () => {
    const { products, setProducts } = useContext(ProductContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get("http://localhost:5500/api/v1/products");
            setProducts(response.data.data || []); // Handle API response structure
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                console.log(localStorage.getItem('token'));
                if (!token) {
                    console.error("No token found! User is not authenticated.");
                    return;
                }
                await axios.delete(`http://localhost:5500/api/v1/products/${id}`);
                fetchProducts(); // Refresh product list
            } catch (error) {
                console.error("Error deleting product:", error);
            }
        }
    };

    return (
        <div className="p-4">
            {/* Add Product Button */}
            <button
                onClick={() => {
                    setSelectedProduct(null); // Reset product for new addition
                    setIsModalOpen(true);
                }}
                className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
                Add Product
            </button>

            {products.length === 0 ? (
                <p className="text-center text-gray-500">No products available</p>
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Product</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Stock</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product._id}>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>${product.price}</TableCell>
                                <TableCell>{product.category}</TableCell>
                                <TableCell>{product.stock}</TableCell>
                                <TableCell>
                                    <button
                                        className="mr-2 border px-2 py-1 rounded bg-yellow-500 text-white"
                                        onClick={() => {
                                            setSelectedProduct(product);
                                            setIsModalOpen(true);
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                        onClick={() => handleDelete(product._id)}
                                    >
                                        Delete
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}

            {/* Product Modal for Add/Edit */}
            <ProductModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                product={selectedProduct}
                refreshProducts={fetchProducts}
            />
        </div>
    );
};

export default Product;
