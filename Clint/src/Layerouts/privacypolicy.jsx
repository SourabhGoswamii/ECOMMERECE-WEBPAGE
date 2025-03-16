import React from "react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-lg max-w-2xl">
            Learn how we collect, use, and protect your personal information.
          </p>
          <div className="flex mt-6">
            <Link to="/" className="text-white hover:text-gray-200">Home</Link>
            <span className="mx-2">/</span>
            <span className="font-medium">Privacy Policy</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Privacy Matters</h2>
        <p className="text-gray-600 mb-4">
          At DPT Products, we value your privacy. This policy outlines how we collect, use, and safeguard your personal information.
        </p>

        <h3 className="text-xl font-semibold mb-4 text-gray-800">1. Information We Collect</h3>
        <p className="text-gray-600 mb-4">We collect data such as your name, email, address, and payment details when you make a purchase.</p>

        <h3 className="text-xl font-semibold mb-4 text-gray-800">2. How We Use Your Information</h3>
        <p className="text-gray-600 mb-4">We use your data to process orders, improve our services, and personalize your shopping experience.</p>

        <h3 className="text-xl font-semibold mb-4 text-gray-800">3. Data Protection</h3>
        <p className="text-gray-600">We implement security measures to protect your information against unauthorized access.</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
