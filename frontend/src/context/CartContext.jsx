import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, quantity = 1, selectedSize, selectedColor) => {
    setCartItems(prev => {
      const existingItemIndex = prev.findIndex(
        item => item.productId === product.id && 
                item.selectedSize === selectedSize && 
                item.selectedColor === selectedColor
      );

      if (existingItemIndex > -1) {
        const newCart = [...prev];
        newCart[existingItemIndex].quantity += quantity;
        return newCart;
      }

      return [...prev, {
        productId: product.id,
        itemCode: product.itemCode,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        quantity,
        selectedSize,
        selectedColor
      }];
    });
  };

  const removeFromCart = (productId, selectedSize, selectedColor) => {
    setCartItems(prev => prev.filter(item => 
      !(item.productId === productId && item.selectedSize === selectedSize && item.selectedColor === selectedColor)
    ));
  };

  const clearCart = () => setCartItems([]);

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      clearCart,
      getCartTotal,
      getCartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};
