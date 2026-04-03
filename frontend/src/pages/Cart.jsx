import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowRight, ShoppingBag } from 'lucide-react';

const Cart = () => {
  const { cartItems, removeFromCart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [checkoutData, setCheckoutData] = useState({
    name: '', email: '', address: '', city: '', zipCode: '', phone: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(null);

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Create order object matching backend expectaion
    const orderData = {
      items: cartItems.map(item => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        selectedSize: item.selectedSize,
        selectedColor: item.selectedColor
      })),
      totalAmount: getCartTotal(),
      customerDetails: checkoutData
    };

    fetch('http://localhost:8080/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    })
    .then(res => res.json())
    .then(data => {
      setIsProcessing(false);
      setOrderComplete(data.id);
      clearCart();
    })
    .catch(err => {
      console.error("Order failed", err);
      setIsProcessing(false);
      alert("Failed to process order. Please try again.");
    });
  };

  if (orderComplete) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h2>
          <p className="text-gray-500 mb-6">Thank you for your purchase. Your order ID is <span className="font-mono font-bold text-gray-900">#{orderComplete}</span>.</p>
          <button 
            onClick={() => navigate('/products')}
            className="w-full bg-gray-900 text-white font-bold py-3 px-4 rounded-xl hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="bg-white p-10 rounded-3xl shadow-sm text-center max-w-lg w-full border border-gray-100">
          <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="h-10 w-10 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">Looks like you haven't added any items to your cart yet.</p>
          <Link 
            to="/products"
            className="inline-flex items-center justify-center w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-blue-700 transition-colors"
          >
            Start Shopping
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Cart Items */}
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <ul className="divide-y divide-gray-100">
                {cartItems.map((item, index) => (
                  <li key={`${item.productId}-${item.selectedSize}-${item.selectedColor}-${index}`} className="p-6 flex flex-col sm:flex-row items-center sm:items-start group">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100 border border-gray-100">
                      <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover object-center" />
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-6 flex-1 flex flex-col w-full">
                      <div className="flex justify-between">
                        <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                        <p className="text-lg font-bold text-gray-900">Rs {(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <div className="mt-1 flex text-sm text-gray-500">
                        {item.selectedColor && <p className="capitalize border-r border-gray-300 pr-3 mr-3">{item.selectedColor}</p>}
                        {item.selectedSize && <p>Size {item.selectedSize}</p>}
                      </div>
                      <div className="mt-4 flex flex-1 items-end justify-between">
                        <p className="text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-md">Qty {item.quantity}</p>
                        <button 
                          onClick={() => removeFromCart(item.productId, item.selectedSize, item.selectedColor)}
                          className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6 bg-gray-50 p-4 rounded-xl border border-gray-100">
                Order Summary
                <div className="flex justify-between items-center mt-2 font-normal text-base text-gray-600">
                  <span>Total</span>
                  <span className="font-bold text-gray-900">Rs {getCartTotal().toFixed(2)}</span>
                </div>
              </h2>

              <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 pt-2 border-t border-gray-100">Shipping Details</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-xs font-medium text-gray-700 mb-1">Full Name</label>
                    <input required type="text" value={checkoutData.name} onChange={e => setCheckoutData({...checkoutData, name: e.target.value})} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                    <input required type="email" value={checkoutData.email} onChange={e => setCheckoutData({...checkoutData, email: e.target.value})} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-medium text-gray-700 mb-1">Address</label>
                    <input required type="text" value={checkoutData.address} onChange={e => setCheckoutData({...checkoutData, address: e.target.value})} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-xs font-medium text-gray-700 mb-1">City</label>
                    <input required type="text" value={checkoutData.city} onChange={e => setCheckoutData({...checkoutData, city: e.target.value})} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-xs font-medium text-gray-700 mb-1">Zip Code</label>
                    <input required type="text" value={checkoutData.zipCode} onChange={e => setCheckoutData({...checkoutData, zipCode: e.target.value})} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-medium text-gray-700 mb-1">Phone</label>
                    <input required type="text" value={checkoutData.phone} onChange={e => setCheckoutData({...checkoutData, phone: e.target.value})} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={isProcessing}
                  className={`w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-6 ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isProcessing ? 'Processing Order...' : `Pay Rs ${getCartTotal().toFixed(2)}`}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
