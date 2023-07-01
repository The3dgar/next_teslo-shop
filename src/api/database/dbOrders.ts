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
