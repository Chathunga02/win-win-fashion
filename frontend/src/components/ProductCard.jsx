import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '');
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, 1, selectedSize, selectedColor);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="group flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
        <img 
          src={product.imageUrl || "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80"} 
          alt={product.name}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-secondary shadow-sm select-none">
          ${product.price.toFixed(2)}
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow relative z-10 transition-transform duration-300 group-hover:-translate-y-1">
        <div className="mb-1 text-xs font-bold text-accent uppercase tracking-wider">{product.category}</div>
        <h3 className="text-lg font-bold text-primary mb-2 line-clamp-1 group-hover:text-secondary transition-colors">{product.name}</h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">{product.description}</p>
        
        <div className="flex space-x-4 mb-4">
          {product.sizes && product.sizes.length > 0 && (
            <div className="flex-1">
              <label className="block text-xs text-gray-500 mb-1">Size</label>
              <select 
                className="w-full bg-gray-50 border border-gray-200 rounded-lg text-sm px-2 py-1.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
              >
                {product.sizes.map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>
          )}
          
          {product.colors && product.colors.length > 0 && (
            <div className="flex-1">
              <label className="block text-xs text-gray-500 mb-1">Color</label>
              <select 
                className="w-full bg-gray-50 border border-gray-200 rounded-lg text-sm px-2 py-1.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-transform capitalize"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
              >
                {product.colors.map(color => (
                  <option key={color} value={color}>{color}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        <button 
          onClick={handleAddToCart}
          className={`w-full flex items-center justify-center py-2.5 px-4 rounded-xl font-bold transition-all duration-300 shadow-sm hover:shadow-md ${isAdded ? 'bg-green-500 text-white scale-95' : 'bg-primary text-white hover:bg-secondary hover:-translate-y-0.5'}`}
        >
          <ShoppingCart className={`w-4 h-4 mr-2 ${isAdded ? 'animate-bounce' : ''}`} />
          {isAdded ? 'Added!' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
