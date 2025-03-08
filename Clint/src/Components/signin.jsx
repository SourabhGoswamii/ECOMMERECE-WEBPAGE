import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/user.context';
import axios from '../config/axios';
import { motion } from 'framer-motion';
import loginIllustration from '../assests/login.webp';

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    function submitHandler(e) {
        e.preventDefault();

        axios.post('/auth/signIn', { email, password })
            .then((res) => {
                localStorage.setItem('token', res.data.data.token);
                setUser(res.data.data.user);
                if(res.data.data.user.role === 'admin') {
                    navigate(`/admin/dashboard`);
                }
                else {
                    navigate(`/:${res.data.data.user._id}`);
                }
            })
            .catch((err) => {
                console.log(err.response.data);
            });
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-2xl flex w-full max-w-4xl overflow-hidden">
                {/* Left Side - Form */}
                <motion.div 
                    className="w-1/2 p-10 flex flex-col justify-center"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Holla, Welcome Back</h2>
                    <p className="text-gray-500 mb-6">Hey, welcome back to your special place</p>
                    <form onSubmit={submitHandler}>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                id="email"
                                className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                id="password"
                                className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="Enter your password"
                            />
                        </div>
                        <div className="flex justify-between items-center text-sm text-gray-500 mb-6">
                            <div>
                                <input type="checkbox" id="remember" className="mr-2" />
                                <label htmlFor="remember">Remember me</label>
                            </div>
                            <a href="#" className="text-purple-500 hover:underline">Forgot Password?</a>
                        </div>
                        <motion.button
                            type="submit"
                            className="w-full p-3 rounded bg-purple-500 text-white hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Sign In
                        </motion.button>
                    </form>
                    <p className="text-gray-500 mt-4 text-center">
                        Don't have an account? <Link to="/signup" className="text-purple-500 hover:underline">Sign Up</Link>
                    </p>
                </motion.div>
                
                {/* Right Side - Illustration */}
                <motion.div 
                    className="w-1/2 bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center relative"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                > 
                   <img src={loginIllustration} alt="Sign In Illustration" className="object-cover w-full h-full" />
                </motion.div>
            </div>
        </div>
    );
};

export default Signin;
