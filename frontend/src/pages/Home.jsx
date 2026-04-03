import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    // Fetch products from backend
    fetch('http://localhost:8080/api/products')
      .then(res => res.json())
      .then(data => {
        // Display only top 4 for featured section
        setFeaturedProducts(data.slice(0, 4));
      })
      .catch(err => console.error("Error fetching products:", err));
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Banner */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden group">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-primary/40 z-10 transition-colors duration-1000 group-hover:bg-primary/50"></div>
          <img 
            src="/background.jpg" 
            alt="Fashion Banner" 
            className="w-full h-full object-cover object-center transform transition-transform duration-[10s] group-hover:scale-110"
            onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000" }}
          />
        </div>
        
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <span className="block text-white/90 text-sm md:text-base font-bold tracking-widest uppercase mb-4 animate-bounce">
            New Arrival Collection
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight transition-transform duration-700 hover:scale-105 cursor-default drop-shadow-2xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500">
              Discover Your True Style
            </span>
          </h1>
          <p className="text-lg md:text-2xl text-white/95 mb-10 max-w-2xl mx-auto drop-shadow-lg font-medium leading-relaxed tracking-wider transition-all duration-500 hover:text-white">
            Explore our premium collection of <span className="text-yellow-300 font-bold italic decoration-wavy underline decoration-yellow-400/50 hover:decoration-yellow-400 transition-colors">tailored textiles</span> and contemporary fashion curated exclusively for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/products" 
              className="bg-accent text-white px-8 py-4 rounded-full font-bold hover:bg-orange-600 transition-all shadow-xl hover:shadow-accent/50 transform hover:-translate-y-1"
            >
              Shop Collection
            </Link>
            <Link 
              to="/about" 
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-primary transition-all backdrop-blur-sm"
            >
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-gray-50 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16 relative z-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-4 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-24 after:h-1.5 after:bg-gradient-to-r after:from-secondary after:to-accent after:rounded-full">Trending Now</h2>
            <p className="mt-6 text-gray-600 max-w-2xl mx-auto text-lg">
              Our most sought-after pieces this season. Elevate your wardrobe with these premium selections.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.length > 0 ? (
              featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              // Loading skeletons
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl h-80 animate-pulse border border-gray-100">
                  <div className="h-48 bg-gray-200 rounded-t-2xl"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-10 bg-gray-200 rounded-xl mt-4"></div>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="mt-16 text-center">
            <Link 
              to="/products" 
              className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors"
            >
              View All Products
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
