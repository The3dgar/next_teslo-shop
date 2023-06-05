import { SHOP_CONSTANTS, db, dbProducts } from '@/api/database';
import { ProductModel } from '@/api/models';
import { IProducts } from '@/interfaces';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data =
  | {
      message: string;
    }
  | IProducts[];

export default function handlerProducts(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      return getProducts(req, res);

    default:
      return res.status(400).json({ message: 'Bad request' });
  }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { gender = 'all' } = req.query;
  let condition = {};
  if (
    gender !== 'all' &&
    SHOP_CONSTANTS.validGenders.includes(gender as string)
  ) {
    condition = {
      gender,
    };
  }
  const products = await dbProducts.getAllProducts(condition)
  // await db.connect();

  // const products = await ProductModel.find(condition)
  //   .select('title images price slug inStock -_id')
  //   .lean();

  // await db.disconnect();

  res.status(200).json(products);
};
