import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaGithub, FaLinkedin, FaTwitter, FaUserCircle, FaEllipsisV, FaArrowLeft } from "react-icons/fa";
import Card from "../Components/Card";
import Loading from "../Components/Loading";
import Search from "../Components/search";
import { useDebounce } from "react-use";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setdebouncedsearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const auth = (() => {
    try {
      const storedAuth = localStorage.getItem("auth");
      return storedAuth ? JSON.parse(storedAuth) : null;
    } catch (error) {
      console.error("Error parsing auth data:", error);
      return null;
    }
  })();
  const token = auth?.token;
  const user = auth?.user;

  useDebounce(() => {
    setdebouncedsearch(search);
  }, 500, [search]);

  const API_OPTIONS = {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": token ? `Bearer ${token}` : "",
    },
  };

  const handleNavigation = (route) => {
    navigate(`/${route.toLowerCase()}`);
    setMenuOpen(false);
  };

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (debouncedSearch) {
      navigate(`/?search=${encodeURIComponent(debouncedSearch)}`);
    }
  };

  const fetchProduct = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/products/${id}`, API_OPTIONS);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch product details");
      }

      setProduct(data.data || data);
      
      if (data.data?.category) {
        fetchRelatedProducts(data.data.category);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setError("Error fetching product details");
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedProducts = async (category) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/products/category/${category}`,
        API_OPTIONS
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch related products");
      }

      // Filter out the current product and limit to 4 items
      const filteredProducts = (data.data || [])
        .filter(item => item._id !== id)
        .slice(0, 4);
      
      setRelatedProducts(filteredProducts);
    } catch (error) {
      console.error("Related products fetch error:", error);
    }
  };

  const addToCart = () => {
    if (!user || !token) {
      navigate("/login?redirect=cart");
      return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    // Check if product already in cart
    const existingItemIndex = cart.findIndex(item => item.product._id === product._id);
    
    if (existingItemIndex !== -1) {
      // Update quantity if already in cart
      cart[existingItemIndex].quantity += quantity;
    } else {
      // Add new item to cart
      cart.push({
        product: product,
        quantity: quantity
      });
    }
    
    localStorage.setItem("cart", JSON.stringify(cart));
    
    // Show success feedback
    alert("Product added to cart successfully!");
  };

  const handleImageError = (e) => {
    e.target.src = "/placeholder-product.png";
    e.target.onerror = null;
  };

  useEffect(() => {
    if (id) {
      fetchProduct();
      setQuantity(1);
    }
  }, [id]);

  const menuItems = [
    { title: "My Account", icon: "👤", route: "Account" },
    { title: "My Orders", icon: "📦", route: "Order" },
    { title: "Shopping Cart", icon: "🛒", route: "Cart" }
  ];

  const helpItems = [
    { title: "Contact Us", route: "contact" },
    { title: "About Us", route: "about" },
    { title: "Privacy Policy", route: "privacy" },
    { title: "Refund Policy", route: "refunds" },
    { title: "Return Policy", route: "returns" }
  ];

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Privacy Policy", path: "/privacy" }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      <nav className="shadow-xl bg-gradient-to-r from-blue-600 to-indigo-700 sticky top-0 z-10 transform transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-3">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 text-white hover:bg-blue-700 rounded-full transition-colors">
                  <FaEllipsisV className="text-xl" />
                </button>
                
                {menuOpen && (
                  <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-xl transform origin-top-left transition-all duration-200">
                    <div className="p-2">
                      <h3 className="text-sm font-semibold text-gray-500 px-3 py-2">Quick Access</h3>
                      {menuItems.map(item => (
                        <div key={item.route} onClick={() => handleNavigation(item.route)}
                             className="px-3 py-2 hover:bg-gray-100 rounded-md flex items-center cursor-pointer">
                          <span className="mr-2">{item.icon}</span>
                          <span>{item.title}</span>
                        </div>
                      ))}
                      
                      <div className="border-t border-gray-200 my-2"></div>
                      <h3 className="text-sm font-semibold text-gray-500 px-3 py-2">Help & Information</h3>
                      {helpItems.map(item => (
                        <div key={item.route} onClick={() => handleNavigation(item.route)}
                             className="px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer">
                          {item.title}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link to="/" className="text-2xl font-bold text-white hover:text-gray-200 transition-colors duration-300 flex items-center">
                <span className="relative">DPT-PRODUCTS</span>
              </Link>
            </div>
            
            <div className="flex-1 max-w-md mx-4">
              <Search 
                search={search} 
                setSearch={setSearch} 
                onChange={(e) => setSearch(e.target.value)}
                onSubmit={handleSearchSubmit}
                className="w-full rounded-full shadow-md focus:shadow-lg transition-shadow duration-300" 
              />
            </div>

            <div className="flex items-center space-x-3">
              {user && token ? (
                <div className="flex items-center space-x-3">
                  <div className="hidden md:flex items-center space-x-2">
                    <FaUserCircle className="text-white text-xl" />
                    <span className="text-white font-medium">{user.name}</span>
                  </div>
                  <Link to="/cart" className="text-white hover:text-gray-200 transition-colors duration-300 relative p-1">
                    <FaShoppingCart className="text-xl" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {JSON.parse(localStorage.getItem("cart"))?.length || 0}
                    </span>
                  </Link>
                  <button onClick={() => {
                    localStorage.removeItem("auth");
                    window.location.reload();
                  }} className="px-3 py-1 bg-white text-blue-700 rounded-md font-medium hover:bg-gray-100 transition-all duration-300 text-sm">
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-x-2">
                  <Link to="/login" className="px-3 py-1 bg-white text-blue-700 rounded-md font-medium hover:bg-gray-100 transition-all duration-300 text-sm">
                    Login
                  </Link>
                  <Link to="/signup" className="px-3 py-1 bg-transparent text-white border border-white rounded-md font-medium transition-all duration-300 text-sm">
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      
      <main className="flex-grow py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <div className="mb-6">
            <button 
              onClick={() => navigate(-1)} 
              className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              <FaArrowLeft className="mr-2" /> Back to Products
            </button>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loading />
            </div>
          ) : error ? (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-md">
              <p>{error}</p>
            </div>
          ) : product ? (
            <div>
              <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Product Image */}
                  <div className="flex justify-center items-center bg-gray-50 rounded-lg p-4">
                    <img 
                      src={product.imageUrl || product.images || "/placeholder-product.png"} 
                      alt={product.name}
                      className="max-h-80 object-contain" 
                      onError={handleImageError}
                    />
                  </div>
                  
                  {/* Product Details */}
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-2xl font-bold text-blue-600">
                        ${parseFloat(product.price).toFixed(2)}
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                        product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                      </div>
                    </div>
                    
                    <div className="mb-4 pb-4 border-b border-gray-200">
                      <h3 className="text-sm uppercase text-gray-500 mb-2">Category</h3>
                      <p className="text-gray-700">{product.category}</p>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="text-sm uppercase text-gray-500 mb-2">Description</h3>
                      <p className="text-gray-700 whitespace-pre-line">{product.description}</p>
                    </div>
                    
                    {product.stock > 0 && (
                      <div>
                        <div className="flex flex-col md:flex-row md:items-center mb-6">
                          <div className="flex items-center mb-4 md:mb-0 md:mr-6">
                            <span className="text-sm uppercase text-gray-500 mr-3">Quantity</span>
                            <div className="flex border border-gray-300 rounded-md">
                              <button 
                                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                                className="px-3 py-1 text-xl hover:bg-gray-100 transition-colors"
                                disabled={quantity <= 1}
                              >
                                -
                              </button>
                              <div className="px-4 py-1 border-x border-gray-300 min-w-[40px] text-center">
                                {quantity}
                              </div>
                              <button 
                                onClick={() => setQuantity(prev => Math.min(product.stock, prev + 1))}
                                className="px-3 py-1 text-xl hover:bg-gray-100 transition-colors"
                                disabled={quantity >= product.stock}
                              >
                                +
                              </button>
                            </div>
                            <span className="text-sm text-gray-500 ml-3">
                              {product.stock} available
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap space-y-3 md:space-y-0 md:space-x-3">
                          <button 
                            onClick={addToCart}
                            disabled={product.stock <= 0}
                            className={`w-full md:w-auto px-6 py-3 rounded-md font-bold flex items-center justify-center space-x-2 ${
                              product.stock > 0 
                                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            } transition-colors duration-300`}
                          >
                            <FaShoppingCart />
                            <span>Add to Cart</span>
                          </button>
                          
                          <Link 
                            to="/cart"
                            className="w-full md:w-auto px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-md font-bold transition-colors duration-300 flex items-center justify-center space-x-2"
                          >
                            <span>Buy Now</span>
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Specifications section */}
              <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Specifications</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border-b border-gray-200 pb-2">
                    <span className="text-sm text-gray-500">Category:</span>
                    <span className="ml-2 font-medium">{product.category}</span>
                  </div>
                  <div className="border-b border-gray-200 pb-2">
                    <span className="text-sm text-gray-500">Stock:</span>
                    <span className="ml-2 font-medium">{product.stock || 0} units</span>
                  </div>
                  <div className="border-b border-gray-200 pb-2">
                    <span className="text-sm text-gray-500">ID:</span>
                    <span className="ml-2 font-medium">{product._id}</span>
                  </div>
                </div>
              </div>
              
              {/* Related Products Section */}
              {relatedProducts.length > 0 && (
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">You May Also Like</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {relatedProducts.map(relatedProduct => (
                      <div key={relatedProduct._id} className="transition-all duration-300 hover:-translate-y-1">
                        <Card product={relatedProduct} handleImageError={handleImageError} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Product not found.</p>
              <Link 
                to="/"
                className="mt-4 inline-block px-6 py-3 bg-blue-600 text-white rounded-md font-bold hover:bg-blue-700 transition-colors"
              >
                Back to Home
              </Link>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About DPT-PRODUCTS</h3>
              <p className="text-gray-400 mb-4">
                We provide high-quality products at competitive prices. Our mission is to ensure customer satisfaction with every purchase.
              </p>
              <div className="flex space-x-4">
                {[FaGithub, FaLinkedin, FaTwitter].map((Icon, index) => (
                  <a key={index} href="#" className="text-gray-400 hover:text-white transition-colors">
                    <Icon className="text-xl" />
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {quickLinks.map(link => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-gray-400 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <address className="not-italic text-gray-400">
                <p className="mb-2">123 Commerce Street</p>
                <p className="mb-2">Market City, MC 12345</p>
                <p className="mb-2">Email: support@dptproducts.com</p>
                <p>Phone: (123) 456-7890</p>
              </address>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} DPT-PRODUCTS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProductDetail;