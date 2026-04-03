import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { Filter } from 'lucide-react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [category, setCategory] = useState('');
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [sortBy, setSortBy] = useState('');

  const fetchProducts = () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (size) params.append('size', size);
    if (color) params.append('color', color);
    if (sortBy) params.append('sortBy', sortBy);

    fetch(`http://localhost:8080/api/products?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load products", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, [category, size, color, sortBy]);

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b-2 border-primary pb-6">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">Shop Collection</h1>
            <p className="text-gray-500 font-medium">Discover all our premium clothing items.</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center bg-white border border-gray-200 rounded-lg p-1 shadow-sm">
            <span className="text-sm text-gray-500 px-3 border-r border-gray-200 hidden sm:inline-block">Sort by:</span>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-sm font-medium text-gray-700 py-1.5 pl-3 pr-8 focus:outline-none"
            >
              <option value="">Latest Arrivals</option>
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white p-6 rounded-2xl shadow-md border-t-4 border-secondary sticky top-24">
              <div className="flex items-center text-lg font-bold text-primary mb-6">
                <Filter className="w-5 h-5 mr-2 text-secondary" />
                Filters
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-primary mb-2">Category</label>
                  <select 
                    value={category} 
                    onChange={e => setCategory(e.target.value)}
                    className="w-full bg-orange-50/50 border border-orange-100 rounded-lg py-2 px-3 text-sm text-primary font-medium focus:ring-2 focus:ring-secondary focus:border-secondary focus:outline-none transition-colors"
                  >
                    <option value="">All Categories</option>
                    <option value="T-Shirts">T-Shirts</option>
                    <option value="Blouses">Blouses</option>
                    <option value="Pants">Pants</option>
                    <option value="Dresses">Dresses</option>
                    <option value="Outerwear">Outerwear</option>
                  </select>
                </div>
                
                <hr className="border-gray-100" />
                
                <div>
                  <label className="block text-sm font-bold text-primary mb-2">Size</label>
                  <div className="flex flex-wrap gap-2">
                    {['XS', 'S', 'M', 'L', 'XL', '30', '32', '34', '36'].map(s => (
                      <button
                        key={s}
                        onClick={() => setSize(size === s ? '' : s)}
                        className={`px-3 py-1.5 text-xs font-bold rounded-md border-2 transition-all ${size === s ? 'bg-secondary text-white border-secondary shadow-md scale-105' : 'bg-white text-primary border-orange-100 hover:border-secondary hover:text-secondary'}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <hr className="border-gray-100" />

                <button 
                  onClick={() => { setCategory(''); setSize(''); setColor(''); setSortBy(''); }}
                  className="w-full py-2.5 text-sm text-secondary font-bold hover:bg-secondary hover:text-white border-2 border-secondary rounded-lg transition-all"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl h-80 animate-pulse border border-gray-100">
                    <div className="h-48 bg-gray-200 rounded-t-2xl"></div>
                  </div>
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
                <div className="text-gray-400 mb-4 h-16 w-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                  <Filter className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500">Try adjusting your filters to find what you're looking for.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
