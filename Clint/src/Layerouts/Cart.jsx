import React, { useEffect, useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const auth = JSON.parse(localStorage.getItem("auth")) || {};
  const token = auth?.token;
  const user = auth?.user;

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  const fetchCart = async () => {
    setLoading(true);
    setError(null);

    try {
      if (!user?._id) {
        throw new Error("User not found. Please log in again.");
      }

      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/cart/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch cart");
      }

      const data = await response.json();
      console.log("Cart Data:", data);
      
      const cartItems = data.data?.products || [];
      const filteredCart = cartItems.filter((item) => item.product);
      setCart(filteredCart);

      const calculatedSubtotal = filteredCart.reduce(
        (acc, item) => acc + (item.product?.price || 0) * item.quantity,
        0
      );
      setSubtotal(calculatedSubtotal);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/cart/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity }),
      });

      if (response.ok) fetchCart();
    } catch (err) {
      console.error("Error updating quantity", err);
    }
  };

  const removeItem = async (productId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/cart/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ user: user._id }),
      });

      if (response.ok) fetchCart();
    } catch (err) {
      console.error("Error removing item", err);
    }
  };

  const placeOrder = async () => {
    try {
      const orderDetails = {
        username: user.name,
        user: user._id,
        products: cart.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
        })),
        shippingAddress: user.address,
        totalAmount: subtotal,
      };

      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderDetails),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Order placement failed.");

      alert("Order placed successfully!");

      // Call checkout to empty the cart
      const checkoutResponse = await fetch(`${import.meta.env.VITE_BASE_URL}/cart/checkout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!checkoutResponse.ok) {
        throw new Error("Failed to checkout");
      }

      // Refresh the cart
      fetchCart();

      // Redirect to orders page
      navigate("/order");
    } catch (err) {
      console.error("Error placing order:", err);
      alert("Failed to place order. Try again.");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (!token) {
    return <Navigate to="/" />;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-md h-16 flex items-center px-6">
        <div className="max-w-6xl mx-auto flex justify-between w-full">
          <Link to="/" className="text-2xl font-bold text-white">
            DPT-PRODUCTS
          </Link>
          <Link to="/" className="text-white font-semibold hover:text-gray-900 transition">
            Home
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Cart</h1>

        {/* Show User Details */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Customer Details</h2>
          <p className="text-gray-600"><strong>Name:</strong> {user.name}</p>
          <p className="text-gray-600"><strong>Shipping Address:</strong> {user.address || "No address provided"}</p>
        </div>

        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : cart.length > 0 ? (
          <>
            {/* Cart Items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cart.map((item) =>
                item.product ? (
                  <div key={item.product._id} className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold text-gray-800">{item.product.name}</h2>
                    <p className="text-gray-600"><strong>Price:</strong> ₹{item.product.price}</p>
                    <p className="text-gray-600"><strong>Quantity:</strong> {item.quantity}</p>
                    <p className="text-gray-600"><strong>Total:</strong> ₹{(item.product.price * item.quantity).toFixed(2)}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
                        onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                      >
                        +
                      </button>
                      <button
                        className="bg-gray-300 text-gray-800 px-3 py-1 rounded-lg hover:bg-gray-400"
                        onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                        onClick={() => removeItem(item.product._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : null
              )}
            </div>

            {/* Summary */}
            <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-gray-800 mb-2">Order Summary</h2>
              <p className="text-gray-600"><strong>Total Items:</strong> {cart.length}</p>
              <p className="text-gray-600"><strong>Subtotal:</strong> ₹{subtotal}</p>

              <button
                className="bg-green-500 text-white px-6 py-3 rounded-lg mt-4 w-full hover:bg-green-600 transition"
                onClick={placeOrder}
              >
                Place Order
              </button>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-600 text-lg">Your cart is empty 🛒</p>
        )}
      </div>
    </div>
  );
};

export default Cart;