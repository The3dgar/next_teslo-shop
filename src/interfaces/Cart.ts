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