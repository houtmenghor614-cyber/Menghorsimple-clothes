import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative bg-gray-900 text-white">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.0.3"
          alt="Hero"
          className="w-full h-full object-cover opacity-50"
        />
      </div>
      <div className="relative container mx-auto px-4 py-32">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">DYNA Collection 2024</h1>
        <p className="text-xl mb-8">Discover the latest trends and elevate your style</p>
        <Link to="/products" className="btn-primary inline-block">
          Shop Now
        </Link>
      </div>
    </div>
  );
};

export default Hero;