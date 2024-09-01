import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-glass text-gray-800 py-6 rounded-tr-[64px] rounded-tl-[64px] backdrop-blur-sm">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        {/* Top Section: Links and Subscription */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Navigation Links */}
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-12 mb-8 md:mb-0">
            <div>
              <h2 className="text-lg font-bold mb-4">Customer Service</h2>
              <ul className="space-y-2">
                <li>
                  <Link to={"/freshcart/ReturnsExchanges"}className="hover:text-gray-950">Exchange & Return</Link>
                  </li>
              </ul>
            </div>
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-lg font-bold mb-4">Contact Us</h2>
            <p className="mb-2">123 Commerce St, Suite 500</p>
            <p className="mb-2">City, State, 12345</p>
            <p className="mb-2">Email: freshcar@freshcart.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="text-center">
          <p className="text-sm">&copy; 2024 freshcart App. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
