import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../../services/productService';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Failed to load categories:', error);
    }
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/products?category=${category.id}`}
              className="block text-center border-2 border-gray-300 rounded-lg py-8 px-4 hover:border-indigo-600 hover:shadow-lg transition-all duration-300 bg-white"
            >
              <h3 className="text-xl font-semibold text-gray-800">{category.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;