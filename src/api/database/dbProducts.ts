import { IProducts } from '@/interfaces';
import { db } from '.';
import { ProductModel } from '../models';
import { parseJson } from '@/utils';
import { FilterQuery } from 'mongoose';

const resetProductImages = (product: IProducts):IProducts => {
  product.images = product.images.map((img) => {
    return img.includes('http')
      ? img
      : `${process.env.HOST_NAME}products/${img}`;
  });

  return product;
};

export const getProductBySlug = async (
  slug: string
): Promise<IProducts | null> => {
  const product = await ProductModel.findOne({ slug }).lean();

  if (!product) {
    return null;
  }

  return parseJson(resetProductImages(product));
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

  const updateProducts = products.map( p => resetProductImages(p))
  return parseJson(updateProducts);
};

export const getAllProducts = async (
  condition: FilterQuery<IProducts>
): Promise<IProducts[]> => {
  await db.connect();

  const products = await ProductModel.find(condition)
    .select('title images price slug inStock -_id')
    .lean();

  await db.disconnect();

  const updateProducts = products.map( p => resetProductImages(p))
  return parseJson(updateProducts);
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

export const generalStatus = async () => {
  const [numberOfProducts, productsWithNoInventory, lowInventory] =
    await Promise.all([
      ProductModel.count(),
      ProductModel.find({ inStock: 0 }).count(),
      ProductModel.find({ inStock: { $lte: 10 } }).count(),
    ]);

  return {
    numberOfProducts,
    productsWithNoInventory,
    lowInventory,
  };
};

export const getAllProductsForAdmin = async () => {
  const products = await ProductModel.find().sort({ title: 'asc' }).lean();
  const updateProducts = products.map( p => resetProductImages(p))
  return parseJson(updateProducts);
};

export const getById = async (id: string) => {
  const product = await ProductModel.findById(id);

  return product;
};

export const updateProduct = async (product: IProducts) => {
  const productUpdated = await ProductModel.findByIdAndUpdate(
    product._id,
    product,
    {
      new: true,
    }
  );

  return productUpdated as IProducts;
};

export async function createProduct(body: IProducts) {
  const product = new ProductModel(body);
  await product.save();
  return product as IProducts;
}
