import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";

const Orders = () => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const token = auth?.token;
  const user = auth?.user;

  const [products, setProducts] = useState([]); // State to store all product data
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("past 3 months");
  const [expandedOrder, setExpandedOrder] = useState(null);

  // Define API_OPTIONS
  const API_OPTIONS = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      // Fetch all products
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/products`, API_OPTIONS);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch products");
      }

      const productsData = data.data || data || [];
      setProducts(Array.isArray(productsData) ? productsData : []);
    } catch (error) {
      console.error("Product Fetch Error:", error);
      // Don't set an error message here to avoid disrupting order display
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!user?._id) {
        throw new Error("User not found. Please log in again.");
      }

      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/order/user/${user._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      const data = await response.json();
      setOrders(data.data || []);
      console.log(data);
    } catch (err) {
      console.error("Order Fetch Error:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/order/${orderId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to cancel order");
      }

      setOrders(orders.filter(order => order._id !== orderId));
      alert("Order cancelled successfully");
    } catch (err) {
      console.error("Cancel Order Error:", err);
      alert(err.message || "Could not cancel the order");
    }
  };

  const toggleOrderDetails = (orderId) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderId);
    }
  };

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'PPP p'); // Format like "Apr 29, 2023, 8:30 PM"
    } catch (e) {
      return dateString;
    }
  };

  // Function to get product name by ID
  const getProductName = (productId) => {
    const product = products.find(p => p._id === productId);
    return product ? product.name : "Product not found";
  };

  // Get product details including image, price, etc.
  const getProductDetails = (productId) => {
    const product = products.find(p => p._id === productId);
    return product || null;
  };

  useEffect(() => {
    // Fetch both orders and products when the component mounts
    fetchOrders();
    fetchProducts();
  }, []);

  // Filter orders based on search term and date filter
  const filteredOrders = orders.filter(order => {
    const orderDate = new Date(order.createdAt);
    const now = new Date();
    
    // Filter by date
    if (filter === "past 3 months") {
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(now.getMonth() - 3);
      if (orderDate < threeMonthsAgo) return false;
    } else if (filter === "past 6 months") {
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(now.getMonth() - 6);
      if (orderDate < sixMonthsAgo) return false;
    } else if (filter === "2025") {
      if (orderDate.getFullYear() !== 2025) return false;
    }
    
    // Filter by search term (order ID or product name)
    if (search) {
      const searchLower = search.toLowerCase();
      
      // Check if order ID contains the search term
      if (order._id.toLowerCase().includes(searchLower)) {
        return true;
      }
      
      // Check if any product name contains the search term
      const hasMatchingProduct = order.products && order.products.some(item => {
        const product = getProductDetails(item.product);
        return product && product.name.toLowerCase().includes(searchLower);
      });
      
      if (!hasMatchingProduct) {
        return false;
      }
    }
    
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">Your Orders</h1>

      {/* Search & Filter Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="relative w-full md:max-w-md">
          <input
            type="text"
            placeholder="Search orders or products"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg p-3 w-full shadow-sm focus:ring-2 focus:ring-blue-500 pr-10"
          />
          <svg className="w-5 h-5 absolute right-3 top-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        <select 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded-lg p-3 w-full md:w-auto shadow-sm focus:ring-2 focus:ring-blue-500"
        >
          <option value="past 3 months">Past 3 months</option>
          <option value="past 6 months">Past 6 months</option>
          <option value="2025">2025</option>
          <option value="all">All orders</option>
        </select>
        
        <Link to="/" className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition font-medium w-full md:w-auto text-center">
          Back to Home
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <p className="text-red-700 font-medium">{error}</p>
          <button 
            onClick={fetchOrders} 
            className="mt-2 text-sm text-red-700 hover:underline"
          >
            Try again
          </button>
        </div>
      ) : filteredOrders.length > 0 ? (
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <div key={order._id} className="border rounded-lg shadow-md overflow-hidden">
              {/* Order Header */}
              <div className="p-5 bg-gray-50 border-b flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 text-sm">Order placed:</span>
                    <span className="font-medium">{formatDate(order.createdAt)}</span>
                  </div>
                  <p className="text-gray-500 text-sm mt-1">Order ID: <span className="font-mono text-blue-700">{order._id}</span></p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-lg">₹{order.totalAmount}</p>
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    order.status === 'Cancelled' ? 'bg-red-100 text-red-800' : 
                    order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                    order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Order Details Button */}
              <div className="px-5 py-3 bg-white border-b flex justify-between items-center">
                <button 
                  onClick={() => toggleOrderDetails(order._id)}
                  className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                >
                  {expandedOrder === order._id ? "Hide details" : "View details"}
                  <svg 
                    className={`w-4 h-4 ml-1 transform transition-transform ${expandedOrder === order._id ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {order.status !== "Cancelled" && order.status !== "Delivered" && (
                  <button
                    onClick={() => handleCancelOrder(order._id)}
                    className="bg-red-50 text-red-700 hover:bg-red-100 px-4 py-1.5 rounded-full text-sm font-medium transition"
                  >
                    Cancel Order
                  </button>
                )}
              </div>

              {/* Expanded Order Details */}
              {expandedOrder === order._id && (
                <div className="p-5 bg-white">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Shipping Info */}
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-2">Shipping Address</h3>
                      <p className="text-gray-600 whitespace-pre-line">{order.shippingAddress || "Not provided"}</p>
                    </div>
                    
                    {/* Order Info */}
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-2">Order Information</h3>
                      <div className="space-y-1 text-sm">
                        <p className="text-gray-600">User ID: <span className="font-mono">{order.username}</span></p>
                        <p className="text-gray-600">Created: {formatDate(order.createdAt)}</p>
                        <p className="text-gray-600">Last Updated: {formatDate(order.updatedAt)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Products */}
                  <div className="mt-6">
                    <h3 className="font-semibold text-gray-700 mb-3">Products</h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Product
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Price
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Quantity
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Total
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {order.products && order.products.map((item) => {
                            const productDetails = getProductDetails(item.product);
                            return (
                              <tr key={item._id || item.product} className="hover:bg-gray-50">
                                <td className="px-4 py-3 text-sm text-gray-700">
                                  <div className="flex items-center">
                                    {productDetails?.images && (
                                      <img 
                                        src={productDetails.images} 
                                        alt={productDetails?.name || "Product image"} 
                                        className="w-12 h-12 object-cover rounded mr-3"
                                      />
                                    )}
                                    <div>
                                      <p className="font-medium">
                                        {productDetails?.name || "Unknown Product"}
                                      </p>
                                      <p className="text-xs text-gray-500">
                                        {productDetails?.category || ""}
                                      </p>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                                  ₹{productDetails?.price || "N/A"}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                                  {item.quantity}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                                  ₹{productDetails ? (productDetails.price * item.quantity).toFixed(2) : "N/A"}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="py-12 text-center bg-gray-50 rounded-lg">
          <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <h2 className="mt-4 text-xl font-medium text-gray-700">No orders found</h2>
          <p className="mt-2 text-gray-500">You haven't placed any orders yet.</p>
          <Link to="/" className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Continue Shopping
          </Link>
        </div>
      )}
    </div>
  );
};

export default Orders;