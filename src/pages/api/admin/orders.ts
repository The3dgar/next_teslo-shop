import type { NextApiRequest, NextApiResponse } from 'next';

import { db, dbOrder } from '@/api/database';
import { IOrder } from '@/interfaces';

type Data = { message: string } | IOrder[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      return getOrders(req, res);

    default:
      return res.status(400).json({ message: 'Bad request' });
  }
}

const getOrders = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();

  const orders = await dbOrder.getAllOrders()

  await db.disconnect();

  res.status(200).json(orders);
};