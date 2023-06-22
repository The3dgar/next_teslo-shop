import tesloApi from './tesloApi';
import { IUser } from '@/interfaces';

interface UserResponse {
  token: string;
  user: IUser;
}

export interface RegisterProps {
  email: string;
  password: string;
  name: string;
}

export const registerUser = async (props: RegisterProps) => {
  const { data } = await tesloApi.post<UserResponse>('/user/register', props);
  return data;
};

interface LoginProps {
  email: string;
  password: string;
}

export const loginUser = async (props: LoginProps) => {
  const { data } = await tesloApi.post<UserResponse>('/user/login', props);
  return data;
};

export const validate = async () => {
  const { data } = await tesloApi.get<UserResponse>('/user/validate');
  return data;
};
