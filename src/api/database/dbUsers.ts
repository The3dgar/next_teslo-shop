import { IUser, UserRole } from '@/interfaces';
import { db } from '.';
import { UserModel } from '../models';
import bcrypt from 'bcryptjs';

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

export const verifyUser = async (email: string, password: string) => {
  await db.connect();
  const user = await UserModel.findOne({ email });
  await db.disconnect();

  if (!user) {
    return null;
  }

  if (!bcrypt.compareSync(password, user.password!)) {
    return null;
  }

  const { _id, role, name } = user;

  return {
    _id,
    email: email.toLowerCase(),
    role,
    name,
  };
};

export const oAuthToDbUser = async (email: string, name: string) => {
  await db.connect();

  const user = await UserModel.findOne({ email });

  if (user) {
    await db.disconnect();
    const { _id, name, role, email } = user;
    return {
      _id,
      name,
      role,
      email,
    };
  }

  const newUser = await createUser({
    email,
    name,
    password: '@',
    role: 'client',
  });

  await db.disconnect();

  return {
    _id: newUser._id,
    name,
    email,
    role: newUser.role,
  };
};
