import React from 'react';
import { CartContext } from './CartContext';

export const useCartContext = () => {
  const context = React.useContext(CartContext);

  if (!context) {
    throw 'Cart Provider must be defined';
  }

  return context;
};
