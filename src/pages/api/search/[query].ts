import { db } from '@/api/database';
import { ProductModel } from '@/api/models';
import { IProducts } from '@/interfaces';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data =
  | {
      message: string;
    }
  | IProducts[];

export default function handlerSearch(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      return searchProducts(req, res);

    default:
      return res.status(400).json({ message: 'Bad request' });
  }
}

const searchProducts = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  let { query = '' } = req.query;

  if (!query.length) {
    return res.status(400).json({ message: 'Must specified the query search' });
  }

  query = query.toString().toLowerCase();

  await db.connect();
  const products = await ProductModel.find({
    $text: { $search: query },
  })
    .select('title images price inStock slug -_id')
    .lean();

  await db.disconnect();

  if (!products) return res.status(404).json({ message: 'Product not found' });

  res.status(200).json(products);
};
