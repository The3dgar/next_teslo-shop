import type { NextApiRequest, NextApiResponse } from 'next';

import { db, dbUser } from '@/api/database';
import { IUser } from '@/interfaces';
import { validUserRoles } from '@/utils';

type Data = { message: string } | IUser[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      return getUsers(req, res);
    case 'PUT':
      return updateUser(req, res);

    default:
      return res.status(400).json({ message: 'Bad request' });
  }
}

const getUsers = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();

  const users = await dbUser.getAllUsers();

  await db.disconnect();

  res.status(200).json(users);
};

const updateUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { userId = '', role = '' } = req.body;

  if (!validUserRoles.includes(role)) {
    return res.status(400).json({ message: 'Bad request - role' });
  }

  await db.connect();

  const user = await dbUser.updateUserRole(userId, role);
  if (!user) {
    return res.status(400).json({ message: 'Bad request - user' });
  }

  await db.disconnect();

  res.status(200).json({ message: 'User updated!' });
};
