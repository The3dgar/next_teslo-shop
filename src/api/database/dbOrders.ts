import { isValidObjectId } from 'mongoose';

import { db } from '.';
import { OrderModel } from '../models';
import { IOrder } from '@/interfaces';
import { parseJson } from '@/utils';

export const createOrder = async (payload: IOrder): Promise<IOrder> => {
  await db.connect();
  const order = await new OrderModel({ ...payload }).save({
    validateBeforeSave: true,
  });
  await db.disconnect();

  return parseJson(order);
};

export const getOrderById = async (id: string): Promise<IOrder | null> => {
  if (!isValidObjectId(id)) return null;

  await db.connect();
  const order = await OrderModel.findById(id).lean();
  await db.disconnect();

  if (!order) return null;

  if (order.orderItems) {
    order.orderItems = order.orderItems.map( p => {
      p.image = p.image.includes('http')
      ? p.image
      : `${process.env.HOST_NAME}products/${p.image}`;

      return p
    })
  }

  return parseJson(order);
};

export const getOrdersByUser = async (
  userId: string
): Promise<IOrder[] | []> => {
  if (!isValidObjectId(userId)) return [];

  await db.connect();
  const order = await OrderModel.find({ user: userId }).lean();
  await db.disconnect();
  if (!order) return [];

  return parseJson(order);
};

export const setOrderAsPaid = async (id: string, transactionId: string) => {
  if (!isValidObjectId(id)) return null;
  await db.connect();

  const updatedOrder = await OrderModel.findOneAndUpdate(
    { _id: id },
    { transactionId, isPaid: true },
    {
      new: true,
    }
  ).lean();

  await db.disconnect();
  if (!updatedOrder) return null;

  return parseJson(updatedOrder);
};

export const generalStatus = async () => {
  const [numberOfOrders, paidOrders] = await Promise.all([
    OrderModel.count(),
    OrderModel.find({ isPaid: true }).count(),
  ]);

  return {
    numberOfOrders,
    paidOrders,
  };
};

export async function getAllOrders() {
  const orders = await OrderModel.find()
    .sort({ createAt: 'desc' })
    .populate('user', 'name email')
    .lean();
  return orders;
}
