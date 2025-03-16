import React from "react";
import { Link } from "react-router-dom";

const ReturnPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Return Policy</h1>
          <p className="text-lg max-w-2xl">
            Understand our return guidelines and procedures.
          </p>
          <div className="flex mt-6">
            <Link to="/" className="text-white hover:text-gray-200">Home</Link>
            <span className="mx-2">/</span>
            <span className="font-medium">Return Policy</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Returning a Product</h2>
        <p className="text-gray-600 mb-4">
          We want you to love your purchase. If you need to return a product, here’s what you should know.
        </p>

        <h3 className="text-xl font-semibold mb-4 text-gray-800">1. Return Eligibility</h3>
        <p className="text-gray-600 mb-4">Returns are accepted within 30 days of delivery if the item is unused and in original packaging.</p>

        <h3 className="text-xl font-semibold mb-4 text-gray-800">2. How to Initiate a Return</h3>
        <p className="text-gray-600 mb-4">To start a return, email our support team with your order details and reason for return.</p>

        <h3 className="text-xl font-semibold mb-4 text-gray-800">3. Return Shipping</h3>
        <p className="text-gray-600">Customers are responsible for return shipping costs unless the item was defective.</p>
      </div>
    </div>
  );
};

export default ReturnPolicy;
