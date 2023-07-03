import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';

import { db, dbOrder } from '@/api/database';
import { IOrder } from '@/interfaces';
import { authOptions } from '../auth/[...nextauth]';
import { PaymentService } from '@/services';

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
      return payOrder(req, res);

    default:
      return res.status(400).json({ message: 'Bad request' });
  }
}

async function payOrder(req: NextApiRequest, res: NextApiResponse<Data>) {
  // todo: validar que sea el usuario de la orden que este llamando
  // todo: validar que sea id de mongo

  const paymentToken = await PaymentService.getPaypalBearerToken();

  if (!paymentToken) {
    return res.status(400).json({
      message: 'Cant confirm order',
    });
  }

  const { transactionId = '', orderId = '' } = req.body;

  const validation = await PaymentService.validatePayment(
    transactionId,
    paymentToken
  );

  if (validation.status !== 'COMPLETED') {
    return res.status(401).json({
      message: 'Unrecognized Order',
    });
  }

  const order = await dbOrder.getOrderById(orderId);

  if (!order) {
    return res.status(400).json({
      message: 'Order do not exist',
    });
  }

  if (order.total !== Number(validation.purchase_units[0].amount.value)) {
    return res.status(400).json({
      message: 'Order total and payment are not equal',
    });
  }

  try {
    await dbOrder.setOrderAsPaid(order._id!, transactionId);

    // sug: enviar email confirmando
    res.status(200).json({
      message: 'Order paid',
    });
  } catch (error: any) {
    await db.disconnect();
    console.log(error.message);
    res.status(400).json({
      message: 'Order can not be paid, see server logs',
    });
  }
}
