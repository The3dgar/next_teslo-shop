import type { NextApiRequest, NextApiResponse } from 'next';

import { db, dbOrder, dbProducts, dbUser } from '@/api/database';

type Data =
  | { message: string }
  | {
      numberOfOrders: number;
      notPaidOrders: number;
      paidOrders: number;
      numberOfClients: number; // role: client
      numberOfProducts: number;
      productsWithNoInventory: number;
      lowInventory: number; //productos con 10 o menos
    };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      return getNumbers(req, res);

    default:
      return res.status(400).json({ message: 'Bad request' });
  }
}

async function getNumbers(req: NextApiRequest, res: NextApiResponse<Data>) {
  await db.connect();

  const [
    { numberOfOrders, paidOrders },
    { numberOfClients },
    { lowInventory, numberOfProducts, productsWithNoInventory },
  ] = await Promise.all([
    dbOrder.generalStatus(),
    dbUser.generalStatus(),
    dbProducts.generalStatus(),
  ]);

  await db.disconnect();

  res.status(200).json({
    numberOfOrders,
    paidOrders,
    notPaidOrders: numberOfOrders - paidOrders,
    numberOfClients,
    lowInventory,
    numberOfProducts,
    productsWithNoInventory,
  });
}
