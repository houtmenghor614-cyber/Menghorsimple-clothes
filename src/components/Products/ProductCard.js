import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    toast.success('Added to cart!');
  };
  
  const discountedPrice = product.discount_price || product.original_price;
  const discountPercent = product.discount_price 
    ? Math.round(((product.original_price - product.discount_price) / product.original_price) * 100)
    : 0;
  
  const BASE_URL = 'http://127.0.0.1:8000';
  const imageUrl = product.main_image ? `${BASE_URL}${product.main_image}` : null;
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative overflow-hidden h-64">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={product.title}
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <i className="fas fa-image text-4xl text-gray-400"></i>
            </div>
          )}
          {discountPercent > 0 && (
            <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
              -{discountPercent}%
            </span>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 text-gray-800 hover:text-indigo-600 transition line-clamp-1">
            {product.title}
          </h3>
          
          <div className="flex items-center space-x-2 mb-3">
            {product.discount_price ? (
              <>
                <span className="text-2xl font-bold text-indigo-600">
                  ${product.discount_price}
                </span>
                <span className="text-gray-400 line-through">
                  ${product.original_price}
                </span>
              </>
            ) : (
              <span className="text-2xl font-bold text-indigo-600">
                ${product.original_price}
              </span>
            )}
          </div>
          
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;