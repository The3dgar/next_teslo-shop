import tesloApi from './tesloApi';
import { IOrder } from '@/interfaces';

export const createOrder = async (payload: IOrder): Promise<IOrder> => {
  const { data } = await tesloApi.post('/orders', payload);
  return data;
};
