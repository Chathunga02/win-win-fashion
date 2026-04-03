import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { getCartCount } = useCart();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-md">
      <div className="h-1.5 w-full bg-gradient-to-r from-primary via-secondary to-accent absolute top-0 left-0"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-1.5">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <img src="/logo.jpg" alt="Win Win Fashion Logo" className="h-10 w-auto object-contain" onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/150x50?text=Win+Win+Fashion" }} />
              <span className="text-xl font-bold text-primary hidden sm:block">Win Win Fashion</span>
            </Link>
          </div>
          
          <div className="hidden md:ml-6 md:flex md:space-x-8">
            <Link to="/" className="text-primary hover:text-secondary px-3 py-2 text-sm font-bold transition-all relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-secondary hover:after:w-full after:transition-all after:duration-300">Home</Link>
            <Link to="/products" className="text-primary hover:text-secondary px-3 py-2 text-sm font-bold transition-all relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-secondary hover:after:w-full after:transition-all after:duration-300">Shop</Link>
            <Link to="/about" className="text-primary hover:text-secondary px-3 py-2 text-sm font-bold transition-all relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-secondary hover:after:w-full after:transition-all after:duration-300">About Us</Link>
            <Link to="/contact" className="text-primary hover:text-secondary px-3 py-2 text-sm font-bold transition-all relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-secondary hover:after:w-full after:transition-all after:duration-300">Contact</Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative p-2 text-gray-700 hover:text-accent transition-colors group">
              <ShoppingCart className="h-6 w-6 transform group-hover:scale-110 transition-transform" />
              {getCartCount() > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-secondary rounded-full animate-bounce">
                  {getCartCount()}
                </span>
              )}
            </Link>
            <div className="md:hidden flex items-center">
              <button onClick={toggleMenu} className="text-gray-700 hover:text-primary p-2">
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b-4 border-secondary shadow-lg absolute w-full">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" onClick={toggleMenu} className="block px-3 py-2 text-base font-bold text-primary hover:text-secondary hover:bg-orange-50 rounded-md transition-colors">Home</Link>
            <Link to="/products" onClick={toggleMenu} className="block px-3 py-2 text-base font-bold text-primary hover:text-secondary hover:bg-orange-50 rounded-md transition-colors">Shop</Link>
            <Link to="/about" onClick={toggleMenu} className="block px-3 py-2 text-base font-bold text-primary hover:text-secondary hover:bg-orange-50 rounded-md transition-colors">About Us</Link>
            <Link to="/contact" onClick={toggleMenu} className="block px-3 py-2 text-base font-bold text-primary hover:text-secondary hover:bg-orange-50 rounded-md transition-colors">Contact</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
