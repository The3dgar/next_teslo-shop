import { useEffect, useReducer } from 'react';
import { CartContext, cartReducer } from './';
import { ICartProduct } from '@/interfaces';
import Cookie from 'js-cookie';
import { Constans } from '@/utils';

export interface CartState {
  cart: ICartProduct[];
  numberOfItems: number;
  subTotal: number;
  taxRate: number;
  total: number;
}

const CART_INITIAL_STATE: CartState = {
  cart: [],
  numberOfItems: 0,
  subTotal: 0,
  taxRate: 0,
  total: 0,
};

interface Props {
  children: React.ReactNode;
}
export const CartProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

  useEffect(() => {
    try {
      const cookieProducts = Cookie.get('cart')
        ? JSON.parse(Cookie.get('cart')!)
        : [];

      dispatch({ type: 'Cart loadCart from cookies', payload: cookieProducts });
    } catch (error) {
      dispatch({ type: 'Cart loadCart from cookies', payload: [] });
    }
  }, []);

  useEffect(() => {
    if (state.cart.length) {
      Cookie.set('cart', JSON.stringify(state.cart));
    }
  }, [state.cart]);

  useEffect(() => {
    const numberOfItems = state.cart.reduce(
      (prev, current) => current.quantity + prev,
      0
    );

    const subTotal = state.cart.reduce(
      (prev, current) => current.price * current.quantity + prev,
      0
    );

    const taxRate = subTotal * Constans.TAX_RATE;

    const orderSummary = {
      numberOfItems,
      subTotal,
      taxRate,
      total: subTotal + taxRate,
    };

    dispatch({ type: 'Cart updateOrderSummary', payload: orderSummary });
  }, [state.cart]);

  const addProduct = (product: ICartProduct) => {
    // verificar siexiste un producto con ese id
    const productsInCart = state.cart.some((p) => p._id === product._id);

    if (!productsInCart) {
      return dispatch({
        type: 'Cart updateProducts',
        payload: [...state.cart, product],
      });
    }

    // tiene la misma talla?
    const productInCartWithDifferentSize = state.cart.some(
      (p) => p._id === product._id && p.size === product.size
    );

    if (!productInCartWithDifferentSize) {
      return dispatch({
        type: 'Cart updateProducts',
        payload: [...state.cart, product],
      });
    }

    // es una talla que ya existe
    const updatedProducts = state.cart.map((p) => {
      if (p._id !== product._id) return p;
      if (p.size !== product.size) return p;

      // actualizar la cantidad
      p.quantity += product.quantity;
      return p;
    });

    dispatch({ type: 'Cart updateProducts', payload: updatedProducts });
  };

  const updateCartQuantity = (product: ICartProduct) => {
    dispatch({ type: 'Cart updateQuantity', payload: product });
  };
  const removeCartProduct = (product: ICartProduct) => {
    dispatch({ type: 'Cart removeProduct', payload: product });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addProduct,
        updateCartQuantity,
        removeCartProduct,
      }}>
      {children}
    </CartContext.Provider>
  );
};
