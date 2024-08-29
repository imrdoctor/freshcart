import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-zinc-200 text-gray-800 py-6">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        {/* Top Section: Links and Subscription */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          {/* Navigation Links */}
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-12 mb-8 md:mb-0">
            <div>
              <h2 className="text-lg font-bold mb-4">Shop</h2>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-gray-950">Men</a></li>
                <li><a href="#" className="hover:text-gray-950">Women</a></li>
                <li><a href="#" className="hover:text-gray-950">Kids</a></li>
                <li><a href="#" className="hover:text-gray-950">Accessories</a></li>
              </ul>
            </div>
            <div>
              <h2 className="text-lg font-bold mb-4">Customer Service</h2>
              <ul className="space-y-2">
                <li>
                  <Link to={"/freshcart/ReturnsExchanges"}className="hover:text-gray-950">Exchange & Return</Link>
                  </li>
              </ul>
            </div>
          </div>

          {/* Subscription Form */}
          <div className="w-full md:w-1/3">
            <h2 className="text-lg font-bold mb-4">Stay Connected</h2>
            <form className="flex items-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-2 text-gray-800 rounded-l-lg border-green-600"
              />
              <button className="bg-green-600 hover:bg-green-600 text-white p-2 rounded-r-lg">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Middle Section: Social Media and Contact Information */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Social Media Icons */}
          <div className="mb-8 md:mb-0">
            <h2 className="text-lg font-bold mb-4">Follow Us</h2>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-950"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="hover:text-gray-950"><i className="fab fa-twitter"></i></a>
              <a href="#" className="hover:text-gray-950"><i className="fab fa-instagram"></i></a>
              <a href="#" className="hover:text-gray-950"><i className="fab fa-linkedin"></i></a>
            </div>
          </div>

          {/* Contact Information */}
          <div className="text-center md:text-left">
            <h2 className="text-lg font-bold mb-4">Contact Us</h2>
            <p className="mb-2">123 Commerce St, Suite 500</p>
            <p className="mb-2">City, State, 12345</p>
            <p className="mb-2">Email: support@ecommerce.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="text-center mt-8">
          <p className="text-sm">&copy; 2024 E-Commerce App. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
