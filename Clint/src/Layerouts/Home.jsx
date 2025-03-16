import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Search from "../Components/search";
import { FaShoppingCart, FaGithub, FaLinkedin, FaTwitter, FaUserCircle, FaEllipsisV } from "react-icons/fa";
import Card from "../Components/Card";
import Loading from "../Components/Loading";
import { useDebounce } from "react-use";

const Home = () => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [debouncedSearch, setdebouncedsearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const auth = JSON.parse(localStorage.getItem("auth")); 
  const token = auth?.token;
  const user = auth?.user;
  const navigate = useNavigate();

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

  const fetchProducts = async (query = "") => {
    setError(null);
    setLoading(true);
    try {
      const endpoint = query
        ? `${import.meta.env.VITE_BASE_URL}/products/name/${encodeURIComponent(query)}`
        : `${import.meta.env.VITE_BASE_URL}/products`;

      const response = await fetch(endpoint, API_OPTIONS);
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Failed to fetch products");

      const productsData = data.data || data || [];
      setProducts(Array.isArray(productsData) ? productsData.slice(0, 20) : []);
    } catch (error) {
      console.error("Fetch error:", error);
      setError("Error fetching products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(debouncedSearch);
  }, [debouncedSearch]);

  const handleImageError = (e) => {
    e.target.src = "/placeholder-product.png";
    e.target.onerror = null;
  };

  const features = [
    { title: "Fast Delivery", icon: "🚚", description: "Get your products delivered to your doorstep within 24 hours" },
    { title: "Secure Payment", icon: "🔒", description: "Multiple secure payment options for your convenience" },
    { title: "Premium Quality", icon: "⭐", description: "All our products go through rigorous quality checks" }
  ];

  const testimonials = [
    { name: "Sarah J.", avatar: "👩", text: "The quality of products exceeded my expectations. Fast delivery and great customer service!" },
    { name: "Michael T.", avatar: "👨", text: "Been shopping here for years. Best prices and the new website makes shopping even easier." },
    { name: "Emma W.", avatar: "👱‍♀️", text: "Love the secure payment options and the variety of products available. Highly recommend!" }
  ];

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Privacy Policy", path: "/privacy" }
  ];

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
              <Search search={search} setSearch={setSearch} onChange={(e) => setSearch(e.target.value)}
                     className="w-full rounded-full shadow-md focus:shadow-lg transition-shadow duration-300" />
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
                      0
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
      
      <main className="flex-grow">
        {!search && (
          <div className="relative overflow-hidden -scale-z-100">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-indigo-500/30 z-0"></div>
            <img src="/BANNER.png" alt="Banner" onError={handleImageError}
                 className="w-full h-64 md:h-80 object-cover object-center" />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white p-4 z-10">
              <h1 className="text-3xl md:text-4xl font-bold text-center drop-shadow-lg mb-4">
                Discover Premium Products
              </h1>
              <p className="text-lg mb-6 max-w-2xl text-center drop-shadow-md">
                Find the best deals on our exclusive collection
              </p>
              <button onClick={() => document.getElementById('products').scrollIntoView({ behavior: 'smooth' })}
                      className="px-6 py-2 bg-blue-600 text-white rounded-md font-bold transition-all duration-300 hover:bg-blue-700">
                Shop Now
              </button>
            </div>
          </div>
        )}

        <section className="py-10 px-4" id="products">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 inline-block border-b-2 border-blue-500 pb-2">
                {search ? "Search Results" : "Featured Products"}
              </h2>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <Loading />
              </div>
            ) : error ? (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-md">
                <p>{error}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.length > 0 ? (
                  products.map(product => (
                    <div key={product._id} className="transition-all duration-300 hover:-translate-y-1">
                      <Card product={product} handleImageError={handleImageError} />
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-gray-500 text-lg mb-4">No products found.</p>
                    <button onClick={() => setSearch("")}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium transition-all duration-300 hover:bg-blue-700">
                      View All Products
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
        
        {!search && products.length > 0 && (
          <>
            <section className="py-12 px-4 bg-white">
              <div className="max-w-6xl mx-auto">
                <div className="mb-8 text-center">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 inline-block border-b-2 border-blue-500 pb-2">
                    Why Choose Us
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {features.map((feature, index) => (
                    <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
                      <div className="text-center">
                        <div className="text-4xl mb-4">{feature.icon}</div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="py-12 px-4 bg-gray-50">
              <div className="max-w-6xl mx-auto">
                <div className="mb-8 text-center">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 inline-block border-b-2 border-blue-500 pb-2">
                    What Our Customers Say
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
                      <div className="text-3xl mb-3">{testimonial.avatar}</div>
                      <p className="text-gray-600 italic mb-4">"{testimonial.text}"</p>
                      <p className="text-blue-600 font-semibold">{testimonial.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}
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

export default Home;