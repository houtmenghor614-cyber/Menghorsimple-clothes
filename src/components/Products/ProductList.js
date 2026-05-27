import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from './ProductCard';
import ProductFilter from './ProductFilter';
import { getProducts, getCategories } from '../../services/productService';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    search: '',
    minPrice: '',
    maxPrice: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, filters]);

  const loadData = async () => {
    try {
      const [productsData, categoriesData] = await Promise.all([
        getProducts(),
        getCategories()
      ]);
      setProducts(productsData);
      setCategories(categoriesData);
      
      const categoryParam = searchParams.get('category');
      if (categoryParam) {
        setFilters(prev => ({ ...prev, category: categoryParam }));
      }
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = [...products];
    
    if (filters.category) {
      filtered = filtered.filter(p => p.category_id === parseInt(filters.category));
    }
    
    if (filters.search) {
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    
    if (filters.minPrice) {
      const price = parseFloat(filters.minPrice);
      filtered = filtered.filter(p => {
        const finalPrice = p.discount_price || p.original_price;
        return finalPrice >= price;
      });
    }
    
    if (filters.maxPrice) {
      const price = parseFloat(filters.maxPrice);
      filtered = filtered.filter(p => {
        const finalPrice = p.discount_price || p.original_price;
        return finalPrice <= price;
      });
    }
    
    setFilteredProducts(filtered);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/4">
          <ProductFilter 
            categories={categories}
            filters={filters}
            setFilters={setFilters}
          />
        </div>
        
        <div className="lg:w-3/4">
          <div className="mb-4 flex justify-between items-center">
            <p className="text-gray-600">
              Found {filteredProducts.length} products
            </p>
          </div>
          
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No products found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;