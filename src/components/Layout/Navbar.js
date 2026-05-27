import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            DYNA<span className="text-gray-800">STORE</span>
          </Link>

          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
            <Link to="/products" className="text-gray-700 hover:text-blue-600">Shop</Link>
            {user && <Link to="/orders" className="text-gray-700 hover:text-blue-600">My Orders</Link>}
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/cart" className="relative">
              <i className="fas fa-shopping-bag text-xl text-gray-700"></i>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            
            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2">
                  <i className="fas fa-user-circle text-2xl text-gray-700"></i>
                  <span className="text-gray-700">{user.full_name?.split(' ')[0]}</span>
                  <i className="fas fa-chevron-down text-xs"></i>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 hidden group-hover:block">
                  <div className="px-4 py-2 border-b">
                    <p className="text-sm font-semibold">{user.full_name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                    <i className="fas fa-sign-out-alt mr-2"></i> Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="flex items-center space-x-2">
                <i className="fas fa-user text-xl text-gray-700"></i>
                <span className="text-gray-700">Login</span>
              </Link>
            )}
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <Link to="/" className="block py-2" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/products" className="block py-2" onClick={() => setIsMenuOpen(false)}>Shop</Link>
            {user && <Link to="/orders" className="block py-2" onClick={() => setIsMenuOpen(false)}>My Orders</Link>}
            <Link to="/cart" className="block py-2" onClick={() => setIsMenuOpen(false)}>Cart ({cartCount})</Link>
            {user ? (
              <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="block w-full text-left py-2">
                Logout
              </button>
            ) : (
              <Link to="/login" className="block py-2" onClick={() => setIsMenuOpen(false)}>Login</Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;