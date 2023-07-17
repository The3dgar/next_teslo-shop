import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';

import { db, dbOrder, dbProducts } from '@/api/database';
import { IOrder } from '@/interfaces';
import { Constans } from '@/utils';
import { authOptions } from '../auth/[...nextauth]';

type Data =
  | {
      message: string;
    }
  | IOrder;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'POST':
      return create(req, res);

    default:
      return res.status(400).json({ message: 'Bad request' });
  }
}

const create = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { orderItems, total } = req.body as IOrder;

  // verificar que el usuario este autenticado

  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: 'user is not authenticated' });
  }

  // crear un arreglo con los productos que la persona quiere

  await db.connect();

  const productsIds = orderItems.map((p) => p._id);
  const products = await dbProducts.getProductsByIds(productsIds);

  try {
    const subTotal = orderItems.reduce((prev, current) => {
      const currentPrice = products.find(
        (prod) => prod._id === current._id
      )?.price;

      if (!currentPrice) {
        // esto no deberia fallar nunca
        throw new Error(`Verify cart! productId: ${current._id}`);
      }

      return current.price * current.quantity + prev;
    }, 0);

    const backendTotal = subTotal * (Constans.TAX_RATE + 1);
    if (Number(backendTotal.toFixed(3)) !== total) {
      throw new Error('Total is not equal');
    }

    // todo bien hasta este punto

    const userId = session.user?._id;

    const order = await dbOrder.createOrder({
      ...req.body,
      total: Math.round(total * 100) / 100,
      isPaid: false,
      user: userId,
    });

    await db.disconnect();
    res.status(201).json(order);
  } catch (error: any) {
    await db.disconnect();
    console.log(error.message);
    res.status(400).json({
      message: error.message || 'See server logs',
    });
  }
};
