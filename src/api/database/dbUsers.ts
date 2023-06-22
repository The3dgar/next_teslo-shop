import { IUser, UserRole } from '@/interfaces';
import { db } from '.';
import { UserModel } from '../models';

export const getUserByEmail = async (email = ''): Promise<IUser | null> => {
  await db.connect();
  const user = await UserModel.findOne({ email });
  await db.disconnect();

  return user;
};

interface UserProps {
  email: string;
  password: string;
  name: string;
  role: UserRole;
}

export const createUser = async (userProps: UserProps): Promise<IUser> => {
  await db.connect();
  const user = await new UserModel({ ...userProps }).save({
    validateBeforeSave: true,
  });
  await db.disconnect();

  return user;
};

export const getUserById = async (id: string) => {
  await db.connect();
  const user = await UserModel.findById(id).lean();
  await db.disconnect();

  return user;
};
