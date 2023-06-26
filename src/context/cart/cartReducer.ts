import { ICartProduct, ShippingAddress } from '@/interfaces';
import { CartState } from './CartProvider';

interface SummaryProps {
  numberOfItems: number;
  subTotal: number;
  taxRate: number;
  total: number;
}
type CartActionType =
  | { type: 'Cart loadCart from cookies'; payload: ICartProduct[] }
  | { type: 'Cart loadAddress from cookies'; payload: ShippingAddress }
  | { type: 'Cart updateAddress'; payload: ShippingAddress }
  | { type: 'Cart updateProducts'; payload: ICartProduct[] }
  | { type: 'Cart removeProduct'; payload: ICartProduct }
  | {
      type: 'Cart updateOrderSummary';
      payload: SummaryProps;
    }
  | { type: 'Cart updateQuantity'; payload: ICartProduct };

export const cartReducer = (
  state: CartState,
  action: CartActionType
): CartState => {
  switch (action.type) {
    case 'Cart loadCart from cookies':
      return {
        ...state,
        isLoaded: true,
        cart: [...action.payload],
      };
    case 'Cart updateQuantity':
      return {
        ...state,
        cart: state.cart.map((p) => {
          if (p._id !== action.payload._id) return p;
          if (p.size !== action.payload.size) return p;
          return action.payload;
        }),
      };
    case 'Cart removeProduct':
      return {
        ...state,
        cart: state.cart.filter((p) => {
          if (p._id !== action.payload._id) return p;
          if (p.size !== action.payload.size) return p;
        }),
      };
    case 'Cart updateProducts':
      return {
        ...state,
        cart: [...action.payload],
      };
    case 'Cart updateOrderSummary':
      return {
        ...state,
        ...action.payload,
      };
    case 'Cart loadAddress from cookies':
    case 'Cart updateAddress':
      return {
        ...state,
        shippingAddress: action.payload,
      };

    default:
      return state;
  }
};
