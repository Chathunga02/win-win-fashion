import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Lock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-white mt-12 border-t border-primary/20 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent mb-4">
              Win Win Fashion
            </h3>
            <p className="text-gray-300 text-sm">
              Your premier destination for high-quality textiles and trendy fashion. Providing stylish apparel for every occasion.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/products" className="text-gray-400 hover:text-white transition-colors">Shop All</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/cart" className="text-gray-400 hover:text-white transition-colors">Shopping Cart</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-accent mr-2 mt-0.5 flex-shrink-0" />
                <a href="https://share.google/4muD5gZOOQH0E7WUG" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white hover:underline transition-colors line-clamp-2">Mahara, Kadawatha, Sri Lanka</a>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-accent mr-2" />
                <span className="text-gray-300">0112 924 548</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-accent mr-2" />
                <a href="mailto:winwinfashion1234@gmail.com" className="text-gray-300 hover:text-white hover:underline transition-colors">winwinfashion1234@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary/40 mt-12 pt-8 flex justify-between items-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Win Win Fashion. All rights reserved.</p>
          <Link to="/admin-login" className="text-primary/50 hover:text-secondary mt-1 flex items-center transition-colors">
            <Lock className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
