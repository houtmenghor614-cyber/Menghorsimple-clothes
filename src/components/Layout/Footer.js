import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-indigo-400">DYNASTORE</h3>
            <p className="text-gray-400">Your one-stop shop for the latest fashion trends.</p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-indigo-400">Home</Link></li>
              <li><Link to="/products" className="text-gray-400 hover:text-indigo-400">Shop</Link></li>
              <li><Link to="/orders" className="text-gray-400 hover:text-indigo-400">My Orders</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li><i className="fas fa-phone mr-2"></i> +855 12 345 678</li>
              <li><i className="fas fa-envelope mr-2"></i> support@dynastore.com</li>
              <li><i className="fas fa-map-marker-alt mr-2"></i> Phnom Penh, Cambodia</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-indigo-400 text-2xl"><i className="fab fa-facebook"></i></a>
              <a href="#" className="text-gray-400 hover:text-indigo-400 text-2xl"><i className="fab fa-instagram"></i></a>
              <a href="#" className="text-gray-400 hover:text-indigo-400 text-2xl"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-gray-400 hover:text-indigo-400 text-2xl"><i className="fab fa-telegram"></i></a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 DYNASTORE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;