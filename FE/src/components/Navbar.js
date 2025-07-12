import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Menu, X, User, ShoppingBag, TrendingUp, Plus } from 'lucide-react';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex justify-center items-center w-8 h-8 bg-gradient-to-br rounded-lg from-primary-500 to-secondary-500">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">ReWear</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-8 md:flex">
            <Link 
              to="/items" 
              className="text-gray-600 transition-colors duration-200 hover:text-primary-600"
            >
              Browse Items
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/add-item" 
                  className="flex items-center space-x-1 text-gray-600 transition-colors duration-200 hover:text-primary-600"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Item</span>
                </Link>
                <Link 
                  to="/swaps" 
                  className="text-gray-600 transition-colors duration-200 hover:text-primary-600"
                >
                  My Swaps
                </Link>
                <div className="relative group">
                  <button className="flex items-center space-x-1 text-gray-600 transition-colors duration-200 hover:text-primary-600">
                    <User className="w-4 h-4" />
                    <span>{user?.fullname}</span>
                  </button>
                  <div className="absolute right-0 invisible z-50 py-1 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:visible">
                    <Link 
                      to="/dashboard" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>
                    <Link 
                      to="/profile" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="block px-4 py-2 w-full text-sm text-left text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className="text-gray-600 transition-colors duration-200 hover:text-primary-600"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="btn-primary"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 transition-colors duration-200 hover:text-primary-600"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
              <Link 
                to="/items" 
                className="block px-3 py-2 text-gray-600 transition-colors duration-200 hover:text-primary-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Browse Items
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/add-item" 
                    className="block px-3 py-2 text-gray-600 transition-colors duration-200 hover:text-primary-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Add Item
                  </Link>
                  <Link 
                    to="/swaps" 
                    className="block px-3 py-2 text-gray-600 transition-colors duration-200 hover:text-primary-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Swaps
                  </Link>
                  <Link 
                    to="/dashboard" 
                    className="block px-3 py-2 text-gray-600 transition-colors duration-200 hover:text-primary-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/profile" 
                    className="block px-3 py-2 text-gray-600 transition-colors duration-200 hover:text-primary-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="block px-3 py-2 w-full text-left text-gray-600 transition-colors duration-200 hover:text-primary-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="block px-3 py-2 text-gray-600 transition-colors duration-200 hover:text-primary-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="block px-3 py-2 text-gray-600 transition-colors duration-200 hover:text-primary-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 