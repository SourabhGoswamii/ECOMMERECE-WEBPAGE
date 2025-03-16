import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from "react-icons/fa";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      // Replace with actual API call when backend is ready
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitStatus({
        success: true,
        message: "Thank you for your message. We'll get back to you shortly!"
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: "Something went wrong. Please try again later."
      });
    } finally {
      setIsSubmitting(false);
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg max-w-2xl">
            We're here to help! Reach out to our customer support team with any questions,
            feedback, or concerns.
          </p>
          <div className="flex mt-6">
            <Link to="/" className="text-white hover:text-gray-200 transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="font-medium">Contact Us</span>
          </div>
        </div>
      </div>

      {/* Contact Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full text-blue-600 mr-4">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Our Address</h3>
                    <p className="text-gray-600 mt-1">
                      123 Commerce Street<br />
                      Market City, MC 12345
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full text-blue-600 mr-4">
                    <FaPhone />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Phone</h3>
                    <p className="text-gray-600 mt-1">(123) 456-7890</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full text-blue-600 mr-4">
                    <FaEnvelope />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Email</h3>
                    <p className="text-gray-600 mt-1">support@dptproducts.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full text-blue-600 mr-4">
                    <FaClock />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Business Hours</h3>
                    <p className="text-gray-600 mt-1">
                      Monday - Friday: 9am - 6pm<br />
                      Saturday: 10am - 4pm<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Social Media Links */}
              <div className="mt-8">
                <h3 className="font-semibold text-gray-800 mb-3">Follow Us</h3>
                <div className="flex space-x-3">
                  {["Facebook", "Instagram", "Twitter", "LinkedIn"].map((social) => (
                    <a 
                      key={social}
                      href="#" 
                      className="bg-gray-100 hover:bg-blue-100 transition-colors p-2 rounded-full text-gray-600 hover:text-blue-600"
                    >
                      <span className="sr-only">{social}</span>
                      {/* Replace with actual social media icons */}
                      <div className="w-5 h-5 flex items-center justify-center">{social[0]}</div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Send Us a Message</h2>
              
              {submitStatus && (
                <div className={`mb-6 p-4 rounded-md ${
                  submitStatus.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                }`}>
                  {submitStatus.message}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                      Your Name*
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                      Your Email*
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="email@example.com"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
                    Subject*
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="How can we help you?"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                    Your Message*
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Please describe your inquiry in detail..."
                    required
                  />
                </div>
                
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-6 py-3 bg-blue-600 text-white font-medium rounded-md transition-colors ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'
                    }`}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        {/* Map Section */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Find Us</h2>
          <div className="h-96 bg-gray-200 rounded-md overflow-hidden">
            {/* Replace with actual map implementation */}
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <p className="text-gray-500">Map placeholder - integrate Google Maps or other map service here</p>
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Frequently Asked Questions</h2>
          <div className="bg-white rounded-lg shadow-md divide-y">
            {[
              {
                question: "What are your customer service hours?",
                answer: "Our customer service team is available Monday through Friday from 9am to 6pm, and Saturday from 10am to 4pm."
              },
              {
                question: "How quickly do you respond to inquiries?",
                answer: "We aim to respond to all inquiries within 24 business hours. For urgent matters, please call our customer service line."
              },
              {
                question: "Can I visit your physical store?",
                answer: "Yes, our showroom is open during business hours. We recommend scheduling an appointment for personalized assistance."
              }
            ].map((faq, index) => (
              <div key={index} className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;