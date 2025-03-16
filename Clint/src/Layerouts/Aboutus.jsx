import React from "react";
import { Link } from "react-router-dom";
import { FaHistory, FaAward, FaUsers, FaHandshake } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-lg max-w-2xl">
            Learn about our story, mission, and the team behind our products.
          </p>
          <div className="flex mt-6">
            <Link to="/" className="text-white hover:text-gray-200 transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="font-medium">About Us</span>
          </div>
        </div>
      </div>

      {/* About Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Our Story */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 md:pr-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded in 2015, our company began with a simple vision: to provide high-quality products that make everyday life better. What started as a small operation in a garage has grown into a trusted brand serving customers worldwide.
              </p>
              <p className="text-gray-600 mb-4">
                Our journey has been driven by continuous innovation and a deep commitment to customer satisfaction. We've expanded our product line over the years, but our core values remain unchanged.
              </p>
              <p className="text-gray-600">
                Today, we're proud to serve thousands of customers across the globe, offering solutions that combine quality, functionality, and style.
              </p>
            </div>
            <div className="md:w-1/2 mt-6 md:mt-0">
              <div className="bg-gray-200 rounded-lg h-full flex items-center justify-center">
                <p className="text-gray-500">Company timeline image placeholder</p>
              </div>
            </div>
          </div>
        </div>

        {/* Our Mission & Values */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Mission & Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Our Mission</h3>
              <p className="text-gray-600">
                To enrich lives by providing innovative, high-quality products that solve real problems and exceed customer expectations, while maintaining a commitment to sustainability and ethical business practices.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Our Vision</h3>
              <p className="text-gray-600">
                To become the most trusted and beloved brand in our industry, recognized for exceptional product quality, outstanding customer service, and positive impact on communities worldwide.
              </p>
            </div>
          </div>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <FaAward className="text-blue-600 text-3xl mb-4" />,
                title: "Excellence",
                description: "We strive for excellence in everything we do, from product design to customer service."
              },
              {
                icon: <FaUsers className="text-blue-600 text-3xl mb-4" />,
                title: "Customer Focus",
                description: "Our customers are at the heart of every decision we make."
              },
              {
                icon: <FaHandshake className="text-blue-600 text-3xl mb-4" />,
                title: "Integrity",
                description: "We conduct business with honesty, transparency, and ethical standards."
              }
            ].map((value, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                {value.icon}
                <h4 className="text-lg font-semibold mb-2 text-gray-800">{value.title}</h4>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Team */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Meet Our Team</h2>
          <p className="text-gray-600 mb-8">
            Behind every great product is a team of dedicated professionals. Meet the people who make our vision a reality.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Jane Doe",
                position: "CEO & Founder",
                bio: "With over 15 years of industry experience, Jane leads our company with vision and passion."
              },
              {
                name: "John Smith",
                position: "Chief Product Officer",
                bio: "John oversees product development, ensuring innovation and quality in everything we create."
              },
              {
                name: "Emily Johnson",
                position: "Customer Experience Manager",
                bio: "Emily ensures that every customer interaction exceeds expectations."
              },
              {
                name: "Michael Wong",
                position: "Head of Design",
                bio: "Michael brings creativity and user-focused design to all our products."
              }
            ].map((member, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-gray-400">Photo</span>
                </div>
                <h4 className="text-lg font-semibold text-center mb-1 text-gray-800">{member.name}</h4>
                <p className="text-blue-600 text-center text-sm mb-3">{member.position}</p>
                <p className="text-gray-600 text-center">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Why Choose Us */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Quality Products",
                description: "Every product undergoes rigorous testing to ensure it meets our high standards."
              },
              {
                title: "Exceptional Service",
                description: "Our dedicated customer support team is always ready to assist you."
              },
              {
                title: "Satisfaction Guarantee",
                description: "We stand behind our products with a 100% satisfaction guarantee."
              },
              {
                title: "Continuous Innovation",
                description: "We're constantly developing new solutions to meet evolving customer needs."
              }
            ].map((point, index) => (
              <div key={index} className="flex">
                <div className="bg-blue-100 p-3 rounded-full text-blue-600 mr-4 h-12 w-12 flex items-center justify-center">
                  <span className="font-bold">{index + 1}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">{point.title}</h3>
                  <p className="text-gray-600">{point.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;