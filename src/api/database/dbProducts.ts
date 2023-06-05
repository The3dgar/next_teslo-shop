import { IProducts } from '@/interfaces';
import { db } from '.';
import { ProductModel } from '../models';

export const parseJson = (obj = {}) => JSON.parse(JSON.stringify(obj));

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

export const getAllProducts = async (condition = {}): Promise<IProducts[]> => {
  await db.connect();

  const products = await ProductModel.find(condition)
    .select('title images price slug inStock -_id')
    .lean();

  await db.disconnect();

  return parseJson(products);
};
