import { ValidSizes } from './Products';
import { IUser } from './User';

export interface IOrder {
  _id?: string;
  user?: IUser | string;
  orderItems: IOrderItem[];
  shippingAddress: ShippingAddress;
  paymentResult?: string;
  numberOfItems: number;
  subTotal: number;
  taxRate: number;
  total: number;

  isPaid: boolean;
  paidAt?: string;

  createdAt?: string;
  updatedAt?: string;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  zip: string;
  city: string;
  country: string;
  phone: string;
}

export interface IOrderItem {
  _id: string;
  title: string;
  size: ValidSizes;
  quantity: number;
  slug: string;
  image: string;
  price: number;
  gender: string;
}
