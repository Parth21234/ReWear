import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="text-white bg-gray-900">
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4 space-x-2">
              <div className="flex justify-center items-center w-8 h-8 bg-gradient-to-br rounded-lg from-primary-500 to-secondary-500">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">ReWear</span>
            </div>
            <p className="mb-4 max-w-md text-gray-300">
              Join the sustainable fashion revolution. Exchange, share, and discover pre-loved clothing 
              while reducing environmental impact and building a community of conscious consumers.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 transition-colors duration-200 hover:text-white">
                <Heart className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 transition-colors duration-200 hover:text-white">
                <Mail className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 transition-colors duration-200 hover:text-white">
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/items" className="text-gray-300 transition-colors duration-200 hover:text-white">
                  Browse Items
                </Link>
              </li>
              <li>
                <Link to="/add-item" className="text-gray-300 transition-colors duration-200 hover:text-white">
                  Add Item
                </Link>
              </li>
              <li>
                <Link to="/swaps" className="text-gray-300 transition-colors duration-200 hover:text-white">
                  My Swaps
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-300 transition-colors duration-200 hover:text-white">
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 transition-colors duration-200 hover:text-white">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 transition-colors duration-200 hover:text-white">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 transition-colors duration-200 hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 transition-colors duration-200 hover:text-white">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 mt-8 border-t border-gray-800">
          <div className="flex flex-col justify-between items-center md:flex-row">
            <p className="text-sm text-gray-400">
              © 2025 ReWear. All rights reserved.
            </p>
          
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 