import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/user.context';
import axios from '../config/axios';
import { motion } from 'framer-motion';
import signupIllustration from '../assests/register.webp'; // Ensure correct image path

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [contact, setContact] = useState('');

    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    function submitHandler(e) {
        e.preventDefault();

        axios.post('/auth/signUp', { name, email, password, address, contact })
            .then((res) => {
                localStorage.setItem('token', res.data.data.token);
                setUser(res.data.data.user);
                navigate(`/:${res.data.data.user._id}`);
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
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Join Us</h2>
                    <p className="text-gray-500 mb-6">Create your account to get started</p>
                    <form onSubmit={submitHandler}>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="name">Username</label>
                            <input
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                id="name"
                                className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your Name"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                id="email"
                                className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                id="password"
                                className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your password"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="address">Address</label>
                            <input
                                onChange={(e) => setAddress(e.target.value)}
                                type="text"
                                id="address"
                                className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your Address"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 mb-2" htmlFor="contact">Contact Info</label>
                            <input
                                onChange={(e) => setContact(e.target.value)}
                                type="number"
                                id="contact"
                                className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your Contact Info"
                            />
                        </div>
                        <motion.button
                            type="submit"
                            className="w-full p-3 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Sign Up
                        </motion.button>
                    </form>
                    <p className="text-gray-500 mt-4 text-center">
                        Already have an account? <Link to="/signIn" className="text-blue-500 hover:underline">Sign In</Link>
                    </p>
                </motion.div>

                {/* Right Side - Illustration */}
                <motion.div 
                    className="w-1/2 bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center relative overflow-hidden"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                > 
                    <img src={signupIllustration} alt="Sign Up Illustration" className="w-full h-full object-cover" />
                </motion.div>
            </div>
        </div>
    );
};

export default SignUp;
