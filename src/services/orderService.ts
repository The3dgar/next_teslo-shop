import tesloApi from './tesloApi';
import { IOrder } from '@/interfaces';

export const createOrder = async (payload: IOrder): Promise<IOrder> => {
  const { data } = await tesloApi.post('/orders', payload);
  return data;
};

export const validateOrderPayment = async (
  transactionId: string,
  orderId: string
): Promise<string> => {
  const { data } = await tesloApi.post('/orders/pay', {
    transactionId,
    orderId,
  });

  return data;
};
