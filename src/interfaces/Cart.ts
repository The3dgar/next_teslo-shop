import { ValidTypes } from './Products';
import { ValidSizes } from './Products';

export interface ICartProduct {
  _id: string;
  images: string;
  price: number;
  size?: ValidSizes;
  slug: string;
  tags: string[];
  title: string;
  gender: 'men' | 'women' | 'kid' | 'unisex';
  quantity: number;
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