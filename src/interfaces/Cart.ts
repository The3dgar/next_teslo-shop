import { ValidSizes } from './Products';

export interface ICartProduct {
  _id: string;
  image: string;
  price: number;
  size?: ValidSizes;
  slug: string;
  tags: string[];
  title: string;
  gender: ValidGender;
  quantity: number;
}

export type ValidGender = 'men' | 'women' | 'kid' | 'unisex';
