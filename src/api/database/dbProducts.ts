import { IProducts } from '@/interfaces';
import { db } from '.';
import { ProductModel } from '../models';
import { parseJson } from '@/utils';
import { FilterQuery } from 'mongoose';

export const getProductBySlug = async (
  slug: string
): Promise<IProducts | null> => {
  await db.connect();
  const product = await ProductModel.findOne({ slug }).lean();
  await db.disconnect();

  if (!product) {
    return null;
  }

  return parseJson(product);
};

interface ProductSlug {
  slug: string;
}

export const getAllProductsSlugs = async (): Promise<ProductSlug[]> => {
  await db.connect();
  const slugs = await ProductModel.find().select('slug -_id').lean();
  await db.disconnect();

  return slugs;
};

export const getProductsByTerm = async (term: string): Promise<IProducts[]> => {
  const query = term.toString().toLowerCase();

  await db.connect();
  const products = await ProductModel.find({
    $text: { $search: query },
  })
    .select('title images price inStock slug -_id')
    .lean();

  await db.disconnect();

  return parseJson(products);
};

export const getAllProducts = async (
  condition: FilterQuery<IProducts>
): Promise<IProducts[]> => {
  await db.connect();

  const products = await ProductModel.find(condition)
    .select('title images price slug inStock -_id')
    .lean();

  await db.disconnect();

  return parseJson(products);
};

export const getProductsByIds = async (
  productsIds: string[]
): Promise<IProducts[]> => {
  await db.connect();
  const products = await ProductModel.find({
    _id: { $in: productsIds },
  }).lean();
  await db.disconnect();

  return parseJson(products);
};
