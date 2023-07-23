import { db, dbProducts } from '@/api/database';
import { ProductModel } from '@/api/models';
import { IProducts } from '@/interfaces';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data =
  | {
      message: string;
    }
  | IProducts;

export default function handlerProductsBySlug(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      return getProductsBySlug(req, res);

    default:
      return res.status(400).json({ message: 'Bad request' });
  }
}

const getProductsBySlug = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { slug } = req.query;
  await db.connect();

  const product = await dbProducts.getProductBySlug(slug as string)

  await db.disconnect();

  if (!product) return res.status(404).json({ message: 'Product not found' });

  res.status(200).json(product);
};
