export interface IUser {
  _id: string;
  name: string;
  email: string;
  password?: string;
  role: string;

  createdAt?: string;
  updatedAt?: string;
}

export interface IUserByOauth {
  id: string;
  name: string;
  email: string;
  role: string;
}

export type UserRole = 'client' | 'admin';
