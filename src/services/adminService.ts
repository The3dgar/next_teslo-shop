import { IProducts } from '@/interfaces';
import tesloApi from './tesloApi';

type IUserRole = {
  userId: string;
  role: string;
};

export const updateUserRole = async (props: IUserRole) => {
  const { data } = await tesloApi.put('/admin/users', props);
  return data;
};

export const updateProducts = async (props: IProducts) => {
  const { data } = await tesloApi.put<IProducts>('/admin/products', props);
  return data;
};

export const createProducts = async (props: IProducts) => {
  const { data } = await tesloApi.post<IProducts>('/admin/products', props);
  return data;
};

export const uploadFile = async (props: FormData) => {
  const { data } = await tesloApi.post<{ message : string}>('/admin/upload', props);
  return data;
};
