import React from "react";
import { Link } from "react-router-dom";

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Refund Policy</h1>
          <p className="text-lg max-w-2xl">
            Learn about our refund eligibility and process.
          </p>
          <div className="flex mt-6">
            <Link to="/" className="text-white hover:text-gray-200">Home</Link>
            <span className="mx-2">/</span>
            <span className="font-medium">Refund Policy</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Refund Process</h2>
        <p className="text-gray-600 mb-4">
          We strive to provide a seamless shopping experience. If you're not satisfied, here’s how our refund policy works.
        </p>

        <h3 className="text-xl font-semibold mb-4 text-gray-800">1. Eligibility for Refund</h3>
        <p className="text-gray-600 mb-4">Refunds are available within 30 days of purchase if the product is unused and in its original condition.</p>

        <h3 className="text-xl font-semibold mb-4 text-gray-800">2. Refund Process</h3>
        <p className="text-gray-600 mb-4">To request a refund, contact our support team with your order details.</p>

        <h3 className="text-xl font-semibold mb-4 text-gray-800">3. Processing Time</h3>
        <p className="text-gray-600">Refunds will be processed within 7-10 business days after approval.</p>
      </div>
    </div>
  );
};

export default RefundPolicy;
