import { ICartProduct, ShippingAddress } from '@/interfaces';
import { createContext } from 'react';

interface ContextProps {
  isLoaded: boolean;
  cart: ICartProduct[];
  numberOfItems: number;
  subTotal: number;
  taxRate: number;
  total: number;

  shippingAddress: ShippingAddress;

  addProduct: (product: ICartProduct) => void;
  updateCartQuantity: (product: ICartProduct) => void;
  removeCartProduct: (product: ICartProduct) => void;
  updateShippingAddress: (address: ShippingAddress) => void;
  createOrder: () => Promise<{ hasError: boolean; message: string }>;
}

export const CartContext = createContext({} as ContextProps);
